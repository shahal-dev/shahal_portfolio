"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

import { Background } from "@/once-ui/components";
import { effects } from "@/app/resources";

// three.js is heavy, so the galaxy loads in its own chunk after hydration and
// never runs on the server.
const GalaxyBackdrop = dynamic(
  () => import("./GalaxyBackdrop").then((m) => m.GalaxyBackdrop),
  { ssr: false },
);

// Routes that use the full-screen lifecycle galaxy instead of the default
// ambient background.
const GALAXY_ROUTES = ["/", "/about"];

/**
 * Chooses the page backdrop by route: the full-screen lifecycle galaxy on the
 * landing and about pages, and the standard Once UI ambient background
 * everywhere else.
 */
export function SceneBackground() {
  const pathname = usePathname();

  if (pathname && GALAXY_ROUTES.includes(pathname)) {
    return <GalaxyBackdrop />;
  }

  return (
    <Background
      mask={{
        cursor: effects.mask.cursor,
        x: effects.mask.x,
        y: effects.mask.y,
        radius: effects.mask.radius,
      }}
      gradient={{
        display: effects.gradient.display,
        x: effects.gradient.x,
        y: effects.gradient.y,
        width: effects.gradient.width,
        height: effects.gradient.height,
        tilt: effects.gradient.tilt,
        colorStart: effects.gradient.colorStart,
        colorEnd: effects.gradient.colorEnd,
        opacity: effects.gradient.opacity as
          | 0
          | 10
          | 20
          | 30
          | 40
          | 50
          | 60
          | 70
          | 80
          | 90
          | 100,
      }}
      dots={{
        display: effects.dots.display,
        color: effects.dots.color,
        size: effects.dots.size as any,
        opacity: effects.dots.opacity as any,
      }}
      grid={{
        display: effects.grid.display,
        color: effects.grid.color,
        width: effects.grid.width as any,
        height: effects.grid.height as any,
        opacity: effects.grid.opacity as any,
      }}
      lines={{
        display: effects.lines.display,
        opacity: effects.lines.opacity as any,
      }}
    />
  );
}

export default SceneBackground;
