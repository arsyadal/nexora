import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  const win = window as typeof window & { __gsapScrollTrigger?: boolean };
  if (!win.__gsapScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    win.__gsapScrollTrigger = true;
  }
}

export { gsap, ScrollTrigger };
