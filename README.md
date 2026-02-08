# NEXORA — Interactive Tech Company Profile

Production‑ready company profile built with Next.js 14 (App Router), GSAP, Three.js (R3F), and Framer Motion. The site showcases a creative tech studio with high‑performance motion, lightweight 3D, and a clean professional tone.

## Highlights
- Lightweight 3D hero using R3F with GSAP‑controlled camera + scroll
- Framer Motion scroll reveals across sections
- GSAP used for precise 3D timeline control + button micro‑interaction
- Motion respects `prefers-reduced-motion`
- Skeleton loading state via `app/loading.tsx`
- Clean, deployable structure for Vercel

## Tech Stack
- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- GSAP + ScrollTrigger
- Three.js via @react-three/fiber + @react-three/drei
- Framer Motion

## Project Structure
```
/app
  layout.tsx
  page.tsx
  globals.css
  loading.tsx
  icon.svg
/components
  AboutSection.tsx
  AnimatedHeading.tsx
  CaseStudies.tsx
  ContactSection.tsx
  Hero3D.tsx
  PageTransition.tsx
  ProcessSection.tsx
  ServicesSection.tsx
/lib
  gsap.ts
/public
  /models
  /images
```

## Getting Started
```bash
npm install
npm run dev
```
Open `http://localhost:3000`.

## Key Behavior
- **Hero 3D**: Scroll controls camera + object rotation (GSAP ScrollTrigger).
- **Process**: Vertical timeline with animated line fill + glow.
- **Case Studies**: Minimal line‑icon cards, full card clickable.
- **Sound**: Optional ambient audio toggle (user‑gesture required).

## Assets
- 3D models can be placed in `public/models` (optional).
- Replace icons or add images in `public/images` if needed.

## Deployment
Optimized for Vercel. Use:
```bash
npm run build
npm run start
```

## Notes
- Barba.js is included for transition parity with creative‑coding roles, but App Router transitions are handled by `PageTransition`.
- To remove sound: delete the toggle in `Hero3D.tsx` and related audio logic.
