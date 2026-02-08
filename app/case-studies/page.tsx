export default function CaseStudiesPage() {
  return (
    <main
      className="relative bg-ink-900 text-ink-50"
      data-barba="container"
      data-barba-namespace="case-studies"
    >
      <section className="section-pad">
        <div className="container-shell space-y-6">
          <a
            href="/"
            className="text-xs uppercase tracking-[0.3em] text-ink-300 transition hover:text-ink-50"
          >
            ← Back to Home
          </a>
          <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
            Case Studies
          </p>
          <h1 className="font-display text-4xl font-semibold md:text-5xl">
            Deep dives into launch strategy, motion systems, and technical execution.
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-ink-200">
            Each case study documents the design rationale, motion system, and
            performance outcomes. Use this as a quick portfolio reference.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-10">
          {[
            {
              title: "AtlasPay Platform",
              focus: "Fintech onboarding + conversion uplift",
              summary:
                "Mapped the onboarding funnel, shipped motion prototypes, and optimized LCP to 1.9s across devices.",
              metrics: ["+42% demo conversions", "1.9s LCP", "98 Lighthouse"],
              stack: ["Next.js", "GSAP", "R3F", "Segment"],
              timeline: [
                "Week 1: discovery + KPI baseline",
                "Week 2: onboarding IA + wireframes",
                "Week 3: motion system + prototyping",
                "Week 4: build, QA, launch"
              ]
            },
            {
              title: "Nova Robotics",
              focus: "Storytelling + modular CMS system",
              summary:
                "Built scroll storytelling with lightweight 3D accents and a modular content system for marketing teams.",
              metrics: ["3x engagement", "92 SEO score", "0.9 CLS"],
              stack: ["Next.js", "Framer Motion", "Pixi.js", "Sanity"],
              timeline: [
                "Week 1: narrative mapping",
                "Week 2: 3D blocks + motion tests",
                "Week 3: CMS integration",
                "Week 4: optimization + launch"
              ]
            }
          ].map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
            >
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                    {item.focus}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-ink-50">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-ink-200">
                    {item.summary}
                  </p>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                      Outcomes
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-ink-200">
                      {item.metrics.map((metric) => (
                        <div key={metric} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent-400" />
                          <span>{metric}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                      Stack
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.2em] text-ink-300">
                      {item.stack.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/10 px-3 py-1"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
                      Timeline
                    </p>
                    <div className="mt-3 space-y-2 text-sm text-ink-200">
                      {item.timeline.map((step) => (
                        <p key={step}>{step}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-28 rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-900"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-900 px-8 py-14 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
            Ready for your launch?
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold text-ink-50 md:text-4xl">
            Let’s build the next case study together.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ink-200">
            We help teams ship motion‑led products with measurable results. Share
            your timeline and we will map a fast, performance‑first plan.
          </p>
          <a
            href="/#contact"
            className="mt-6 inline-flex rounded-full bg-accent-500 px-8 py-3 text-sm font-semibold text-ink-900"
          >
            Start a Project
          </a>
        </div>
      </section>
    </main>
  );
}
