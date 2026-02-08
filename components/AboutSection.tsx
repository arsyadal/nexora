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

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const revealProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.3 },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  const title =
    "We design high-performing experiences for teams that move fast.";

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-ink-900 section-pad"
    >
      <div className="container-shell flex max-w-6xl flex-col gap-8">
        <motion.p
          className="text-xs uppercase tracking-[0.4em] text-ink-300"
          {...revealProps}
        >
          About Nexora
        </motion.p>
        <motion.div
          className="reveal-line h-px w-16 bg-accent-400/60"
          initial={reducedMotion ? false : { scaleX: 0 }}
          whileInView={reducedMotion ? undefined : { scaleX: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <AnimatedHeading
          text={title}
          className="font-display text-3xl font-semibold text-ink-50 md:text-4xl"
        />
        <motion.p
          className="max-w-3xl text-base leading-relaxed text-ink-200 md:text-lg"
          {...revealProps}
        >
          NEXORA is a boutique creative technology studio blending product strategy,
          interactive design, and scalable engineering. We help founders and product
          leaders bring ambitious platforms to life with motion, clarity, and a
          measurable lift in conversion.
        </motion.p>
        <motion.div
          className="grid gap-8 md:grid-cols-[1.2fr_1.8fr]"
          {...revealProps}
        >
          <motion.div
            className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
              Focus Areas
            </p>
            <div className="mt-6 flex flex-col gap-3">
              {[
                {
                  title: "Product-first",
                  detail:
                    "Discovery-led workshops that translate vision into an executable roadmap."
                },
                {
                  title: "Motion systems",
                  detail:
                    "Purposeful animation that reinforces hierarchy and boosts engagement."
                },
                {
                  title: "Engineering rigor",
                  detail:
                    "Performance budgets, testing, and deployment pipelines that scale."
                }
              ].map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group flex items-center justify-between rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    active === index
                      ? "border-accent-400/70 bg-ink-900/60 text-ink-50 shadow-glow"
                      : "border-white/10 bg-transparent text-ink-300 hover:border-white/30"
                  }`}
                >
                  <span className="font-semibold">{item.title}</span>
                  <span
                    className={`text-xs uppercase tracking-[0.3em] transition ${
                      active === index ? "text-accent-200" : "text-ink-400"
                    }`}
                  >
                    View
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/80 via-ink-900/80 to-ink-900/90 p-8 shadow-card"
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="absolute -right-10 top-8 h-40 w-40 rounded-full bg-accent-500/10 blur-[80px]" />
            <div className="absolute bottom-8 left-10 h-32 w-32 rounded-full bg-ember-500/10 blur-[80px]" />
            <div className="relative flex h-full flex-col justify-between gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                  {active === 0
                    ? "Strategy"
                    : active === 1
                      ? "Motion"
                      : "Delivery"}
                </p>
                <h3 className="mt-4 text-2xl font-semibold text-ink-50">
                  {active === 0
                    ? "Align stakeholders with a shared product narrative."
                    : active === 1
                      ? "Design motion that clarifies, guides, and delights."
                      : "Engineer a stable launch with measurable outcomes."}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-200">
                  {active === 0
                    ? "We run product discovery sprints that unify vision, prioritize scope, and map critical user journeys."
                    : active === 1
                      ? "We build a reusable motion language across pages, transitions, and micro-interactions."
                      : "We harden releases with performance audits, instrumentation, and staged rollouts."}
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em] text-ink-300">
                {(active === 0
                  ? ["Vision workshop", "Journey mapping", "Roadmap"]
                  : active === 1
                    ? ["GSAP system", "Scroll storytelling", "Micro-interactions"]
                    : ["QA pipeline", "Analytics", "Optimization"]).map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
