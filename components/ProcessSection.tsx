"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedHeading from "./AnimatedHeading";

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

export default function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"]
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="bg-ink-900 section-pad"
    >
      <div className="container-shell mb-12">
        <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
          Process
        </p>
        <motion.div
          className="reveal-line mt-4 h-px w-16 bg-accent-400/60"
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={reducedMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <AnimatedHeading
          text="A four-step delivery pipeline tuned for momentum."
          className="mt-4 font-display text-3xl font-semibold text-ink-50 md:text-4xl"
        />
      </div>

      <div ref={trackRef} className="relative flex flex-col items-center gap-12">
        <motion.div
          className="process-line-vertical pointer-events-none absolute left-1/2 top-3 hidden h-[calc(100%-24px)] w-px -translate-x-1/2 bg-gradient-to-b from-accent-400/60 via-white/20 to-transparent md:block"
          style={{ scaleY: reducedMotion ? 1 : lineScale, transformOrigin: "top" }}
        />
        <motion.div
          className="pointer-events-none absolute left-1/2 top-3 hidden h-24 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-accent-300/70 to-transparent blur-[2px] md:block"
          animate={
            reducedMotion
              ? undefined
              : { y: ["0%", "320%"] }
          }
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {[
          {
            title: "Discover",
            detail: "Align on vision, metrics, and technical constraints.",
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="6" />
                <line x1="16" y1="16" x2="21" y2="21" />
              </svg>
            )
          },
          {
            title: "Design",
            detail: "Craft high-fidelity interfaces and motion prototypes.",
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M4 20h6" />
                <path d="M5 15l9-9 4 4-9 9H5z" />
              </svg>
            )
          },
          {
            title: "Develop",
            detail: "Ship modular UI with performance budgets and QA gates.",
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M8 9l-4 3 4 3" />
                <path d="M16 9l4 3-4 3" />
                <path d="M10 20l4-16" />
              </svg>
            )
          },
          {
            title: "Deliver",
            detail: "Launch, monitor, and iterate with data-driven updates.",
            icon: (
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 19c3-1 5-3 6-6 3-1 5-3 6-6 1 3 1 6-1 8-2 2-5 2-8 4z" />
                <path d="M9 15l-4 4" />
              </svg>
            )
          }
        ].map((step, index) => (
          <motion.div
            key={step.title}
            className="process-step relative flex w-full max-w-3xl flex-col items-center text-center"
            initial={reducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={
              reducedMotion
                ? undefined
                : { y: -4, scale: 1.01 }
            }
          >
            <div className="absolute top-3 hidden h-3 w-3 rounded-full border border-accent-400/70 bg-ink-900 md:block" />
            <div className="flex items-center gap-3 text-accent-300">
              <motion.div
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5"
                animate={
                  reducedMotion
                    ? undefined
                    : { scale: [1, 1.06, 1], rotate: [0, -3, 0] }
                }
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {step.icon}
              </motion.div>
              <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                0{index + 1}
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-semibold text-ink-50">
              {step.title}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-200">
              {step.detail}
            </p>
            <div className="mt-6 h-px w-12 bg-accent-400/60" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
