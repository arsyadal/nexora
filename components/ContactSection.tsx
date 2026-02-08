"use client";

import { useEffect, useRef, useState } from "react";
import AnimatedHeading from "./AnimatedHeading";
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

export default function ContactSection() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!buttonRef.current || reducedMotion) return;

    const button = buttonRef.current;

    const onEnter = () => {
      gsap.to(button, {
        scale: 1.03,
        boxShadow: "0 0 35px rgba(63, 211, 197, 0.35)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    const onLeave = () => {
      gsap.to(button, {
        scale: 1,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.3,
        ease: "power2.out"
      });
    };

    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    return () => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;

    const context = gsap.context(() => {
      gsap.from(".contact-line", {
        scaleX: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%"
        }
      });
    });

    return () => context.revert();
  }, [reducedMotion]);

  return (
    <section id="contact" className="bg-ink-900 px-6 pb-24 pt-10 md:px-12">
      <div className="container-shell flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-900 px-8 py-16 text-center shadow-card backdrop-blur">
        <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
          Let&apos;s build together
        </p>
        <div className="contact-line reveal-line h-px w-16 bg-accent-400/60" />
        <AnimatedHeading
          text="Ready to ship a product experience that feels premium and performs at scale?"
          className="max-w-2xl font-display text-3xl font-semibold text-ink-50 md:text-4xl"
        />
        <p className="max-w-xl text-sm leading-relaxed text-ink-200">
          Tell us about the launch you&apos;re planning. We&apos;ll respond within two
          business days with a tailored plan, timeline, and technical approach.
        </p>
        <button
          ref={buttonRef}
          className="mt-4 rounded-full bg-accent-500 px-8 py-3 text-sm font-semibold text-ink-900"
        >
          Book a Strategy Call
        </button>
      </div>
    </section>
  );
}
