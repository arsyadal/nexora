export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink-900 px-6 py-12 md:px-12">
      <div className="container-shell flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-ink-50">
            <svg
              viewBox="0 0 48 48"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="square"
              strokeLinejoin="miter"
            >
              <path d="M11 34V14l12 16V14" />
              <path d="M29 14l10 20" />
              <path d="M39 14l-10 20" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-50">NEXORA</p>
            <p className="text-xs uppercase tracking-[0.3em] text-ink-400">
              Creative Tech Studio
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 text-xs uppercase tracking-[0.3em] text-ink-300">
          <a href="#about" className="transition hover:text-ink-50">
            About
          </a>
          <a href="#services" className="transition hover:text-ink-50">
            Services
          </a>
          <a href="#process" className="transition hover:text-ink-50">
            Process
          </a>
          <a href="/case-studies" className="transition hover:text-ink-50">
            Case Studies
          </a>
          <a href="#contact" className="transition hover:text-ink-50">
            Contact
          </a>
        </div>

        <div className="text-xs uppercase tracking-[0.3em] text-ink-400">
          © 2026 Nexora. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
