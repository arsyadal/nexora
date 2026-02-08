"use client";

import { useEffect, useRef } from "react";

export default function PixiParticles() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: any;
    let mounted = true;

    const init = async () => {
      const PIXI = await import("pixi.js");
      if (!hostRef.current || !mounted) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      app = new PIXI.Application();
      await app.init({
        resizeTo: hostRef.current,
        backgroundAlpha: 0,
        antialias: true
      });

      hostRef.current.appendChild(app.canvas);

      const particles: Array<{
        dot: any;
        vx: number;
        vy: number;
      }> = [];
      const count = 40;
      for (let i = 0; i < count; i += 1) {
        const dot = new PIXI.Graphics();
        dot.circle(0, 0, 1.5 + Math.random() * 2.5).fill({
          color: 0x7ce7d9,
          alpha: 0.35
        });
        dot.x = Math.random() * app.renderer.width;
        dot.y = Math.random() * app.renderer.height;
        dot.alpha = 0.3 + Math.random() * 0.5;
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        app.stage.addChild(dot);
        particles.push({ dot, vx, vy });
      }

      if (!prefersReduced) {
        app.ticker.add(() => {
          for (const p of particles) {
            p.dot.x += p.vx;
            p.dot.y += p.vy;
            if (p.dot.x < 0 || p.dot.x > app.renderer.width) p.vx *= -1;
            if (p.dot.y < 0 || p.dot.y > app.renderer.height) p.vy *= -1;
          }
        });
      }
    };

    init();

    return () => {
      mounted = false;
      if (app) {
        app.destroy(true, { children: true });
      }
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="sound-reactive absolute inset-0 opacity-35"
    />
  );
}
