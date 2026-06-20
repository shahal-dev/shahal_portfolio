"use client";

import React, { useEffect, useRef } from "react";

const DEFAULT_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789#%&*<>/[]=+";

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** ms to wait before the reveal starts */
  delay?: number;
  /** total reveal duration in ms (defaults to scale with length) */
  duration?: number;
  /** "mount" starts immediately, "view" waits until scrolled into view */
  trigger?: "mount" | "view";
  chars?: string;
}

/**
 * Reveals text with a sci-fi "decode / loading" scramble: characters churn
 * through random glyphs and resolve left-to-right.
 *
 * The real text is server-rendered and kept as the element's accessible label,
 * so screen readers, SEO and no-JS all get the plain string; only the visible
 * glyphs animate. Honors `prefers-reduced-motion`.
 */
export function ScrambleText({
  text,
  className,
  style,
  delay = 0,
  duration,
  trigger = "mount",
  chars = DEFAULT_CHARS,
}: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = text;
      return;
    }

    const letters = Array.from(text);
    const dur = duration ?? Math.min(1600, 400 + letters.length * 45);
    const rand = () => chars[(Math.random() * chars.length) | 0];

    const render = (p: number) => {
      const revealed = p * letters.length;
      let out = "";
      for (let i = 0; i < letters.length; i++) {
        const ch = letters[i];
        if (ch === " " || ch === "\n") out += ch;
        else if (i < revealed) out += ch;
        else out += rand();
      }
      el.textContent = out;
    };

    let raf = 0;
    let startTime = -1;
    let started = false;

    const frame = (now: number) => {
      if (startTime < 0) startTime = now;
      const elapsed = now - startTime - delay;
      if (elapsed < 0) {
        render(0);
        raf = requestAnimationFrame(frame);
        return;
      }
      const p = Math.min(elapsed / dur, 1);
      render(p);
      if (p < 1) raf = requestAnimationFrame(frame);
      else el.textContent = text;
    };

    const start = () => {
      if (started) return;
      started = true;
      raf = requestAnimationFrame(frame);
    };

    let io: IntersectionObserver | undefined;
    if (trigger === "view") {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            io?.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(el);
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [text, delay, duration, trigger, chars]);

  return (
    <span ref={ref} className={className} style={style} aria-label={text}>
      {text}
    </span>
  );
}

export default ScrambleText;
