import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const isBrowser = typeof window !== "undefined";

if (isBrowser && !gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
