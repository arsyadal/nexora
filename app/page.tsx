import dynamic from "next/dynamic";
import AboutSection from "../components/AboutSection";
import ServicesSection from "../components/ServicesSection";
import ProcessSection from "../components/ProcessSection";
import CaseStudies from "../components/CaseStudies";
import ContactSection from "../components/ContactSection";
import PixiParticles from "../components/PixiParticles";
import Footer from "../components/Footer";

const Hero3D = dynamic(() => import("../components/Hero3D"), {
  ssr: false,
  loading: () => (
    <section className="relative flex min-h-screen items-center justify-center bg-ink-900 text-ink-50">
      <div className="pointer-events-none absolute inset-0 bg-hero-gradient opacity-60" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_120deg,rgba(124,231,217,0.65),rgba(255,138,77,0.5),rgba(124,231,217,0.4))] opacity-70 blur-[2px]" />
          <div className="absolute inset-[2px] rounded-2xl border border-white/15" />
          <div className="absolute inset-0 opacity-70 animate-[spin_10s_linear_infinite]">
            <div className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-300 shadow-glow" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-ink-50">
            <svg
              viewBox="0 0 48 48"
              className="h-7 w-7"
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
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.4em] text-ink-300">
            Initializing Nexora
          </p>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-[loadingbar_1.4s_ease-in-out_infinite] rounded-full bg-accent-400/70" />
          </div>
        </div>
      </div>
    </section>
  )
});

export default function Home() {
  return (
    <main
      className="relative overflow-hidden"
      data-barba="container"
      data-barba-namespace="home"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
        <div className="absolute right-[-120px] top-[30%] h-72 w-72 rounded-full bg-ember-500/10 blur-[120px]" />
      </div>
      <Hero3D />
      <div className="pointer-events-none absolute inset-x-0 top-[100vh] bottom-0 -z-10">
        <PixiParticles />
      </div>
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <CaseStudies />
      <ContactSection />
      <Footer />
    </main>
  );
}
