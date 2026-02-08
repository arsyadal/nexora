"use client";

import { useEffect, useRef } from "react";

export default function P5Backdrop() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let p5Instance: any;
    let mounted = true;

    const init = async () => {
      const mod = await import("p5");
      const P5 = mod.default ?? mod;
      if (!hostRef.current || !mounted) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      p5Instance = new P5((p: any) => {
        p.setup = () => {
          p.createCanvas(hostRef.current!.offsetWidth, hostRef.current!.offsetHeight);
          p.noFill();
          p.stroke(124, 231, 217, 30);
          p.strokeWeight(1);
        };

        p.windowResized = () => {
          p.resizeCanvas(hostRef.current!.offsetWidth, hostRef.current!.offsetHeight);
        };

        p.draw = () => {
          if (prefersReduced) {
            p.noLoop();
          }
          p.clear();
          p.background(0, 0, 0, 0);
          const t = p.frameCount * 0.01;
          for (let i = 0; i < 7; i += 1) {
            const y = p.height * 0.15 + i * (p.height * 0.1) + p.sin(t + i) * 10;
            p.beginShape();
            for (let x = 0; x <= p.width; x += 40) {
              const offset = p.sin(t + x * 0.01 + i) * 18;
              p.vertex(x, y + offset);
            }
            p.endShape();
          }
        };
      }, hostRef.current);
    };

    init();

    return () => {
      mounted = false;
      if (p5Instance) {
        p5Instance.remove();
      }
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0 opacity-40" />;
}
