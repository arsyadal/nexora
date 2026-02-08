"use client";
import { motion } from "framer-motion";
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

export default function CaseStudies() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="bg-ink-900 section-pad"
    >
      <div className="container-shell flex flex-col gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
            Case Studies
          </p>
          <motion.div
            className="reveal-line mt-4 h-px w-16 bg-accent-400/60"
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <AnimatedHeading
            text="Selected launches with measurable outcomes."
            className="mt-4 font-display text-3xl font-semibold text-ink-50 md:text-4xl"
          />
        </div>

        <div className="grid gap-8">
          {[
            {
              title: "AtlasPay Platform",
              metric: "+42% demo conversions",
              summary:
                "A fintech onboarding flow reimagined with frictionless motion and a performance budget under 120kb.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 9h6" />
                  <path d="M7 13h10" />
                  <path d="M16 9h1" />
                </svg>
              )
            },
            {
              title: "Nova Robotics",
              metric: "3x faster site engagement",
              summary:
                "A storytelling site blending subtle 3D with modular CMS sections for a global product launch.",
              icon: (
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="7" cy="17" r="2" />
                  <path d="M9 16l3-3 3 1 3-4" />
                  <path d="M15 5h4v4" />
                  <path d="M3 20h18" />
                </svg>
              )
            }
          ].map((study) => (
            <motion.a
              key={study.title}
              href="#contact"
              className="case-study group relative grid gap-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-[1.2fr_2fr]"
              {...revealProps}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: "0 26px 70px rgba(20, 21, 30, 0.35)"
              }}
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              <div className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-accent-500/15 blur-[70px] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -left-10 bottom-6 h-24 w-24 rounded-full bg-ember-500/15 blur-[70px] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="flex min-h-[220px] items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-900 text-ink-200">
                <div className="flex flex-col items-center gap-4 text-center">
                  <motion.div
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5 text-accent-300"
                    variants={{
                      rest: { scale: 1, rotate: 0 },
                      hover: { scale: 1.06, rotate: -4 }
                    }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    {study.icon}
                  </motion.div>
                  <p className="text-xs uppercase tracking-[0.3em] text-ink-300">
                    {study.title}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                    {study.metric}
                  </p>
                  <h3 className="mt-3 text-2xl font-semibold text-ink-50">
                    {study.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200">
                    {study.summary}
                  </p>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent-300">
                  View project details →
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
