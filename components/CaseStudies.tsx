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
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

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
      <div className="container-shell relative flex flex-col gap-10">
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
          ].map((study, index) => (
            <motion.a
              key={study.title}
              href="#"
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
              onClick={(event) => {
                event.preventDefault();
                setActive(index);
              }}
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
                  Open preview →
                </p>
              </div>
            </motion.a>
          ))}
        </div>
        <a
          href="/case-studies"
          className="text-xs uppercase tracking-[0.3em] text-ink-300 transition hover:text-ink-50"
        >
          View full case studies →
        </a>
      </div>

      {active !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/70 px-6"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-ink-900 shadow-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-ink-800/80 via-ink-900/80 to-ink-900/95" />
            <div className="absolute -right-12 top-6 h-40 w-40 rounded-full bg-accent-500/15 blur-[90px]" />
            <div className="absolute bottom-8 left-6 h-32 w-32 rounded-full bg-ember-500/12 blur-[90px]" />

            <div className="relative flex flex-col gap-8 p-8 md:p-10">
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                  Project Preview
                </p>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ink-300 transition hover:text-ink-50"
                  onClick={() => setActive(null)}
                  aria-label="Close preview"
                >
                  ×
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-900 p-6">
                  <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                    Preview Scene
                  </p>
                  <div className="mt-4 grid gap-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-20 rounded-2xl border border-white/10 bg-white/5"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-ink-50">
                    {active === 0 ? "AtlasPay Platform" : "Nova Robotics"}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200">
                    {active === 0
                      ? "Onboarding flow audit, motion system draft, and KPI tracking across a 6-week launch sprint."
                      : "Storytelling scroll sequence, modular CMS blocks, and 3D accents tuned for performance."}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-300">
                    {(active === 0
                      ? ["Fintech", "Motion System", "Conversion"]
                      : ["Robotics", "Storytelling", "CMS"]).map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 px-3 py-1"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 space-y-2 text-sm text-ink-200">
                    {(active === 0
                      ? ["Discovery + KPI audit", "Prototype sprint", "Launch QA + tracking"]
                      : ["Narrative map", "3D + motion blocks", "CMS + performance"]).map((row) => (
                      <div key={row} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                        <span>{row}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-300">
                  {(active === 0
                    ? ["+42% demo conversions", "1.9s LCP", "98 Lighthouse"]
                    : ["3x engagement", "92 SEO", "0.9 CLS"]).map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full border border-white/10 px-3 py-1"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full bg-accent-500 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-ink-900"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
