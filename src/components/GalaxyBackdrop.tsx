"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A full-screen, scroll-driven galaxy rendered behind all page content.
 *
 * Scroll position drives a single `progress` value (0 → 1) that does two things
 * at once:
 *
 *  1. **Life cycle morph** — every particle interpolates along
 *     gas cloud → (perturbation / proto-disk collapse) → spiral disk →
 *     elliptical old galaxy. The collapse/perturbation phase is a turbulence
 *     bump layered on the gas→disk transition, so no extra keyframe is needed.
 *  2. **Camera fly-through** — the camera moves through keyframes so each life
 *     stage is seen from a flattering angle (high & far for gas, top-down for
 *     the spiral, side-on for the elliptical).
 *
 * The cursor is a **black hole**: nearby particles are pulled into a gaussian
 * gravity well and given a tangential swirl (accretion), glowing as they fall in.
 *
 * All of the per-particle work happens in a GLSL vertex shader, so 100k+ points
 * morph and warp every frame without touching the main thread.
 */
export function GalaxyBackdrop() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmall = window.matchMedia("(max-width: 768px)").matches;
    const COUNT = isSmall ? 40000 : 100000;

    // --- Renderer (opaque deep-space backdrop) ------------------------------
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    const dprCap = isSmall ? 1.5 : 2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
    renderer.setClearColor(0x04030c, 1);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 300);

    // --- Per-particle attributes -------------------------------------------
    // Box–Muller normal sample.
    const randn = () => {
      let u = 0;
      let v = 0;
      while (u === 0) u = Math.random();
      while (v === 0) v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const gas = new Float32Array(COUNT * 3); // also the geometry "position"
    const diskCyl = new Float32Array(COUNT * 3); // radius, angle0, height
    const ellip = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT * 3);

    // Gas cloud: a large flattened sphere seeded with a few denser clumps.
    const clumps: number[][] = [];
    for (let k = 0; k < 7; k++) {
      clumps.push([randn() * 5.5, randn() * 2.6, randn() * 5.5]);
    }

    const branches = 2;
    const spin = 1.0;
    const galaxyRadius = 5.2;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;

      // --- gas ---
      if (Math.random() < 0.3) {
        const c = clumps[(Math.random() * clumps.length) | 0];
        gas[i3] = c[0] + randn() * 2.3;
        gas[i3 + 1] = c[1] + randn() * 1.4;
        gas[i3 + 2] = c[2] + randn() * 2.3;
      } else {
        const rr = 9.5 * Math.cbrt(Math.random());
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        gas[i3] = rr * Math.sin(phi) * Math.cos(theta);
        gas[i3 + 1] = rr * Math.cos(phi) * 0.7;
        gas[i3 + 2] = rr * Math.sin(phi) * Math.sin(theta);
      }

      // --- spiral disk (cylindrical: radius, base angle, height) ---
      if (Math.random() < 0.17) {
        // Bright central bulge.
        const r = Math.pow(Math.random(), 2.5) * 1.1;
        diskCyl[i3] = r;
        diskCyl[i3 + 1] = Math.random() * Math.PI * 2;
        diskCyl[i3 + 2] = randn() * 0.55 * (1 - r / 1.4);
      } else {
        const r = Math.pow(Math.random(), 1.7) * galaxyRadius + 0.18;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        diskCyl[i3] = r;
        diskCyl[i3 + 1] = branchAngle + r * spin + randn() * 0.18;
        diskCyl[i3 + 2] = randn() * (0.10 + 0.02 * r);
      }

      // --- elliptical (triaxial gaussian) ---
      ellip[i3] = randn() * 3.6;
      ellip[i3 + 1] = randn() * 2.3;
      ellip[i3 + 2] = randn() * 3.0;

      // --- seed ---
      seed[i3] = Math.random();
      seed[i3 + 1] = Math.random();
      seed[i3 + 2] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(gas, 3));
    geometry.setAttribute("aDiskCyl", new THREE.BufferAttribute(diskCyl, 3));
    geometry.setAttribute("aEllip", new THREE.BufferAttribute(ellip, 3));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seed, 3));

    // --- Shaders ------------------------------------------------------------
    const uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: isSmall ? 0.085 : 0.055 },
      uScale: { value: 0.5 * renderer.domElement.height },
      uMouse3D: { value: new THREE.Vector3(999, 999, 999) },
      uMouseStrength: { value: 0 },
    };

    const vertexShader = /* glsl */ `
      uniform float uTime;
      uniform float uProgress;
      uniform float uSize;
      uniform float uScale;
      uniform vec3  uMouse3D;
      uniform float uMouseStrength;

      attribute vec3 aDiskCyl; // radius, angle0, height
      attribute vec3 aEllip;
      attribute vec3 aSeed;

      varying vec3 vColor;

      void main() {
        float p = uProgress;
        float t = uTime;

        // gas anchor (built-in "position") with gentle drift
        vec3 gas = position + vec3(
          sin(t * 0.12 + aSeed.x * 6.2831),
          cos(t * 0.10 + aSeed.y * 6.2831),
          sin(t * 0.11 + aSeed.z * 6.2831)
        ) * 0.35;

        // spiral disk anchor with differential rotation (inner spins faster)
        float r = aDiskCyl.x;
        float ang = aDiskCyl.y + t * (0.9 / (0.6 + r));
        vec3 disk = vec3(cos(ang) * r, aDiskCyl.z, sin(ang) * r);

        // elliptical anchor with slow tumble
        float et = t * 0.06;
        float ce = cos(et), se = sin(et);
        vec3 ell = vec3(ce * aEllip.x + se * aEllip.z, aEllip.y, -se * aEllip.x + ce * aEllip.z);

        // life-cycle morph: gas -> disk -> elliptical
        vec3 pos;
        if (p < 0.6) {
          pos = mix(gas, disk, smoothstep(0.05, 0.58, p));
        } else {
          pos = mix(disk, ell, smoothstep(0.62, 1.0, p));
        }

        // perturbation / collapse turbulence (peaks ~p=0.30)
        float turb = exp(-pow((p - 0.30) / 0.15, 2.0));
        vec3 churn = vec3(
          sin(aSeed.x * 18.0 + t * 0.7),
          sin(aSeed.y * 18.0 + t * 0.6),
          sin(aSeed.z * 18.0 + t * 0.8)
        );
        pos += churn * turb * (0.8 + r * 0.12);

        // cursor black hole: gaussian gravity well + tangential swirl
        vec3 toHole = uMouse3D - pos;
        float d = length(toHole);
        float well = uMouseStrength * exp(-d * d / (2.0 * 1.5 * 1.5));
        vec3 dir = toHole / max(d, 1e-4);
        pos += dir * well * 1.9;
        vec3 tang = normalize(cross(vec3(0.0, 1.0, 0.0), dir + vec3(1e-4)));
        pos += tang * well * 1.4;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;

        float twinkle = 0.78 + 0.22 * sin(t * 2.5 + aSeed.x * 40.0);
        float size = uSize * (0.55 + aSeed.z * 0.9) * twinkle;
        gl_PointSize = clamp(size * (uScale / -mvPosition.z), 1.0, 40.0);

        // ---- color per life stage ----
        vec3 cGas  = vec3(0.30, 0.42, 0.80);
        vec3 cHot  = vec3(1.00, 0.80, 0.52);
        vec3 cCore = vec3(1.00, 0.97, 0.92);
        vec3 cArm  = vec3(0.50, 0.62, 1.00);
        vec3 cPink = vec3(1.00, 0.55, 0.82);
        vec3 cSpiral = mix(cArm, cCore, smoothstep(3.6, 0.0, r));
        cSpiral = mix(cSpiral, cPink, 0.20 * step(0.62, aSeed.y) * smoothstep(1.0, 4.5, r));
        vec3 cEllip = vec3(1.00, 0.66, 0.42);

        vec3 col;
        if (p < 0.30) {
          col = mix(cGas, cHot, smoothstep(0.10, 0.30, p));
        } else if (p < 0.62) {
          col = mix(cHot, cSpiral, smoothstep(0.30, 0.62, p));
        } else {
          col = mix(cSpiral, cEllip, smoothstep(0.62, 1.0, p));
        }
        col += vec3(1.0, 0.55, 0.25) * well * 2.0; // accretion glow

        vColor = col;
      }
    `;

    const fragmentShader = /* glsl */ `
      varying vec3 vColor;
      void main() {
        float dd = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, dd);
        if (a < 0.01) discard;
        gl_FragColor = vec4(vColor, a * 0.9);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      transparent: true,
    });

    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    scene.add(points);

    // --- Camera keyframes (one flattering view per life stage) --------------
    const KF: { p: number; pos: [number, number, number] }[] = [
      { p: 0.0, pos: [0, 7, 19] },
      { p: 0.3, pos: [3.5, 4.5, 16] },
      { p: 0.55, pos: [0, 11, 11] },
      { p: 0.78, pos: [10.5, 6, 9] },
      { p: 1.0, pos: [14, 2.5, 13.5] },
    ];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const camFor = (p: number, out: THREE.Vector3) => {
      if (p <= KF[0].p) return out.fromArray(KF[0].pos);
      if (p >= KF[KF.length - 1].p) return out.fromArray(KF[KF.length - 1].pos);
      for (let i = 0; i < KF.length - 1; i++) {
        if (p >= KF[i].p && p <= KF[i + 1].p) {
          const tt = (p - KF[i].p) / (KF[i + 1].p - KF[i].p);
          const s = tt * tt * (3 - 2 * tt);
          return out.set(
            lerp(KF[i].pos[0], KF[i + 1].pos[0], s),
            lerp(KF[i].pos[1], KF[i + 1].pos[1], s),
            lerp(KF[i].pos[2], KF[i + 1].pos[2], s),
          );
        }
      }
      return out;
    };

    // --- Input: scroll progress + cursor black hole -------------------------
    let targetProgress = 0;
    let progress = 0;

    const readScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      targetProgress = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };
    readScroll();
    window.addEventListener("scroll", readScroll, { passive: true });

    let clockTime = 0;
    let mx = 0;
    let my = 0; // target NDC
    let smx = 0;
    let smy = 0; // smoothed NDC
    let lastMove = -10;
    let strength = 0;
    const onMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = -((e.clientY / window.innerHeight) * 2 - 1);
      lastMove = clockTime;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // --- Animation loop -----------------------------------------------------
    const camPos = new THREE.Vector3();
    const holeNdc = new THREE.Vector3();
    const holeDir = new THREE.Vector3();
    const hole = new THREE.Vector3();
    const target = new THREE.Vector3(0, 0.5, 0);

    let last = performance.now();
    let visible = true;
    let raf = 0;

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (visible) {
        clockTime += dt * (reduce ? 0.35 : 1);
        uniforms.uTime.value = clockTime;

        // ease scroll progress
        progress += (targetProgress - progress) * 0.06;
        uniforms.uProgress.value = progress;

        // cursor strength fades in on move, out when idle
        const idle = clockTime - lastMove > 2.2;
        const strengthTarget = idle ? 0 : 1;
        strength += (strengthTarget - strength) * 0.07;
        uniforms.uMouseStrength.value = strength;
        smx += (mx - smx) * 0.1;
        smy += (my - smy) * 0.1;

        // camera through keyframes + slow orbit + subtle mouse parallax
        camFor(progress, camPos);
        const orbit = clockTime * 0.04 * (reduce ? 0 : 1);
        const co = Math.cos(orbit);
        const so = Math.sin(orbit);
        const cx = camPos.x * co - camPos.z * so;
        const cz = camPos.x * so + camPos.z * co;
        camera.position.set(cx + smx * 0.9, camPos.y + smy * 0.7, cz);
        camera.lookAt(target);

        // project cursor onto the galaxy's depth to place the black hole
        holeNdc.set(smx, smy, 0.5).unproject(camera);
        holeDir.copy(holeNdc).sub(camera.position).normalize();
        const dist = camera.position.length();
        hole.copy(camera.position).addScaledVector(holeDir, dist);
        uniforms.uMouse3D.value.copy(hole);

        renderer.render(scene, camera);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // --- Resize & visibility ------------------------------------------------
    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, dprCap));
      uniforms.uScale.value = 0.5 * renderer.domElement.height;
      readScroll();
    };
    window.addEventListener("resize", onResize);

    const onVisibility = () => {
      visible = !document.hidden;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Cleanup ------------------------------------------------------------
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
    >
      <div ref={mountRef} style={{ position: "absolute", inset: 0, filter: "blur(0px)"
      }} />
      {/* Vignette keeps page content readable while leaving the core bright */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(125% 125% at 50% 38%, rgba(4,3,12,0) 0%, rgba(4,3,12,0.28) 68%, rgba(4,3,12,0.62) 100%)",
        }}
      />
    </div>
  );
}

export default GalaxyBackdrop;
