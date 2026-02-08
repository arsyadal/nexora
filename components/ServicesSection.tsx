"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const revealProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.25 },
        transition: { duration: 0.6, ease: "easeOut" }
      };

  const services = [
    {
      title: "Experience Strategy",
      copy:
        "User journeys, information architecture, and narrative systems that set the foundation for scalable growth.",
      chips: ["Workshops", "IA + UX flows", "Product narrative"],
      lead: "Translate vision into a roadmap that keeps teams aligned.",
      detail:
        "We synthesize stakeholder input into a clear product direction, then validate assumptions with rapid prototypes and research snapshots.",
      includes: [
        "Discovery workshop",
        "User journey map",
        "IA + sitemap",
        "Feature prioritization",
        "Success metrics"
      ]
    },
    {
      title: "Interactive Engineering",
      copy:
        "GSAP, WebGL, and performance tuning that keeps motion smooth and budgets intact.",
      chips: ["GSAP systems", "R3F motion", "Performance budgets"],
      lead: "Build motion systems that feel cinematic and stay fast.",
      detail:
        "From scroll storytelling to micro-interactions, we engineer animation that reinforces hierarchy without sacrificing LCP.",
      includes: [
        "Motion system spec",
        "Scroll storytelling",
        "3D integration",
        "Performance budget",
        "QA + Lighthouse"
      ]
    },
    {
      title: "Launch & Optimization",
      copy:
        "Pre-launch QA, analytics instrumentation, and post-release improvements to sustain momentum.",
      chips: ["QA + audits", "Analytics", "Iteration cycles"],
      lead: "Ship confidently with measurable post-launch lift.",
      detail:
        "We harden releases with automated checks, event tracking, and a tactical iteration plan for the first 60 days.",
      includes: [
        "Pre-launch checklist",
        "Analytics events",
        "A/B test plan",
        "Performance monitoring",
        "Iteration roadmap"
      ]
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative z-10 bg-ink-900 section-pad pb-32"
    >
      <div className="container-shell flex flex-col gap-10">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
            Services
          </p>
          <motion.div
            className="reveal-line mt-4 h-px w-16 bg-accent-400/60"
            initial={reducedMotion ? false : { scaleX: 0 }}
            whileInView={reducedMotion ? undefined : { scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <svg
            className="services-svg mt-6 h-4 w-48"
            viewBox="0 0 200 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <motion.line
              x1="2"
              y1="2"
              x2="198"
              y2="2"
              stroke="rgba(124,231,217,0.65)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeDasharray="320"
              strokeDashoffset="320"
              initial={reducedMotion ? false : { strokeDashoffset: 320 }}
              whileInView={reducedMotion ? undefined : { strokeDashoffset: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </svg>
          <AnimatedHeading
            text="A full-stack creative partner for modern product teams."
            className="mt-4 font-display text-3xl font-semibold text-ink-50 md:text-4xl"
          />
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ink-200 md:text-base">
            We focus on three services with clear outcomes. Each engagement includes
            a deliverables checklist so teams know exactly what they receive.
          </p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-ink-400">
            Showing {services.length} services
          </p>
        </div>

        <div className="grid gap-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="service-card group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur transition duration-300 hover:border-white/40"
              {...revealProps}
              whileHover={{
                y: -6,
                scale: 1.01,
                boxShadow: "0 26px 70px rgba(20, 21, 30, 0.35)"
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-accent-500/15 blur-[60px] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -left-10 bottom-6 h-24 w-24 rounded-full bg-ember-500/15 blur-[60px] opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-ink-300">
                <span>Service</span>
                <span className="text-ink-400">0{index + 1} / 03</span>
              </div>
              <p className="mt-3 text-xl font-semibold text-ink-50">
                {service.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-200">
                {service.copy}
              </p>
              <p className="mt-5 text-sm font-semibold text-ink-50">
                {service.lead}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-200">
                {service.detail}
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-300">
                {service.chips.map((chip) => (
                  <span
                    key={chip}
                    className="rounded-full border border-white/10 px-3 py-1"
                  >
                    {chip}
                  </span>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                  Deliverables
                </p>
                <div className="mt-3 grid gap-2 text-sm text-ink-200">
                  {service.includes.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 h-px w-10 bg-accent-400/60 transition-all duration-500 group-hover:w-16" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
