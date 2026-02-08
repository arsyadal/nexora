"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "../lib/gsap";

const useReducedMotion = () => {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
};

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const initialLoad = useRef(true);

  useEffect(() => {
    if (!overlayRef.current || reducedMotion) return;

    const overlay = overlayRef.current;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    if (initialLoad.current) {
      gsap.set(overlay, { opacity: 1, filter: "blur(0px)" });
      tl.fromTo(
        overlay,
        { opacity: 1, filter: "blur(0px)" },
        { opacity: 0, filter: "blur(8px)", duration: 0.8, ease: "power2.out" }
      );
      initialLoad.current = false;
      return;
    }

    tl.set(overlay, { opacity: 1, filter: "blur(0px)" })
      .to(overlay, { opacity: 0, filter: "blur(8px)", duration: 0.6 })
      .set(overlay, { opacity: 0, filter: "blur(0px)" });

    return () => {
      tl.kill();
      gsap.set(overlay, { clearProps: "transform" });
    };
  }, [pathname, reducedMotion]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const initBarba = async () => {
      const barba = (await import("@barba/core")).default;

      barba.init({
        sync: true,
        transitions: [
          {
            name: "fade",
            async leave(data: any) {
              if (reducedMotion) return;
              await gsap.to(data.current.container, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.out"
              });
            },
            async enter(data: any) {
              if (reducedMotion) return;
              gsap.set(data.next.container, { opacity: 0 });
              await gsap.to(data.next.container, {
                opacity: 1,
                duration: 0.35,
                ease: "power2.out"
              });
            }
          }
        ],
        prevent: ({ el }: { el?: HTMLElement | null }) =>
          el?.hasAttribute("data-no-barba") ?? false
      });

      cleanup = () => barba.destroy();
    };

    initBarba();

    return () => cleanup?.();
  }, [reducedMotion]);

  return (
    <div
      ref={overlayRef}
      className="pointer-events-none fixed inset-0 z-50 bg-ink-900 opacity-0"
    />
  );
}
