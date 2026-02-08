"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "../lib/gsap";
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

function Scene({ triggerRef }: { triggerRef: React.RefObject<HTMLDivElement> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const shaderRef = useRef<THREE.ShaderMaterial>(null);
  const { camera, invalidate } = useThree();
  const reducedMotion = useReducedMotion();
  const [curve, tubeGeometry, edgesGeometry] = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const segments = 200;
    const a = 1.1;
    for (let i = 0; i <= segments; i += 1) {
      const t = (i / segments) * Math.PI * 2;
      const denom = 1 + Math.sin(t) * Math.sin(t);
      const x = (a * Math.cos(t)) / denom;
      const y = (a * Math.sin(t) * Math.cos(t)) / denom;
      points.push(new THREE.Vector3(x, y, Math.sin(t) * 0.25));
    }

    const c = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.5);
    const tube = new THREE.TubeGeometry(c, 200, 0.22, 18, true);
    const edges = new THREE.EdgesGeometry(tube, 12);
    return [c, tube, edges] as const;
  }, []);

  useEffect(() => {
    return () => {
      tubeGeometry.dispose();
      edgesGeometry.dispose();
    };
  }, [edgesGeometry, tubeGeometry]);

  const shader = useMemo(
    () => ({
      uniforms: {
        uProgress: { value: 0 },
        uAccent: { value: new THREE.Color("#7ce7d9") },
        uEmber: { value: new THREE.Color("#ff8a4d") }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uProgress;
        uniform vec3 uAccent;
        uniform vec3 uEmber;
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453);
        }
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        void main() {
          float wave = smoothstep(0.0, 1.0, vUv.y + uProgress * 0.25);
          vec3 color = mix(uEmber, uAccent, wave);
          float n = noise(vUv * 6.0 + uProgress * 0.2);
          float alpha = (0.16 + n * 0.06) * (1.0 - vUv.y);
          float dist = distance(vUv, vec2(0.5));
          float mask = smoothstep(0.65, 0.2, dist);
          gl_FragColor = vec4(color, alpha * mask);
        }
      `
    }),
    []
  );

  useLayoutEffect(() => {
    if (!triggerRef.current || !meshRef.current || reducedMotion) return;

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "bottom+=100% top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      timeline.to(
        camera.position,
        {
          z: 4.5,
          onUpdate: () => {
            camera.updateProjectionMatrix();
            invalidate();
          }
        },
        0
      );

      if (meshRef.current) {
        timeline.to(
          meshRef.current.rotation,
          {
            x: Math.PI * 0.25,
            y: Math.PI * 1.35,
            onUpdate: invalidate
          },
          0
        );
      }

      if (ringRef.current) {
        timeline.to(
          ringRef.current.rotation,
          {
            z: Math.PI * 0.6,
            onUpdate: invalidate
          },
          0
        );
      }

      if (shaderRef.current) {
        timeline.to(
          shaderRef.current.uniforms.uProgress,
          {
            value: 1,
            onUpdate: invalidate
          },
          0
        );
      }
    });

    return () => context.revert();
  }, [camera, invalidate, reducedMotion, triggerRef]);

  useEffect(() => {
    if (!triggerRef.current || !groupRef.current || reducedMotion) return;

    const target = triggerRef.current;
    const group = groupRef.current;

    const rotateX = gsap.quickTo(group.rotation, "x", {
      duration: 0.6,
      ease: "power2.out",
      onUpdate: invalidate
    });
    const rotateY = gsap.quickTo(group.rotation, "y", {
      duration: 0.6,
      ease: "power2.out",
      onUpdate: invalidate
    });

    const onMove = (event: PointerEvent) => {
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      rotateX(-y * 0.12);
      rotateY(x * 0.12);
    };

    target.addEventListener("pointermove", onMove);

    return () => target.removeEventListener("pointermove", onMove);
  }, [invalidate, reducedMotion, triggerRef]);

  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, -1.6]}>
        <planeGeometry args={[4.6, 3.2, 1, 1]} />
        <shaderMaterial ref={shaderRef} args={[shader]} transparent />
      </mesh>
      <mesh ref={meshRef} geometry={tubeGeometry}>
        <meshPhysicalMaterial
          color="#c8fff6"
          metalness={0.2}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.05}
          iridescence={0.8}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[200, 600]}
          emissive="#1a6b64"
          emissiveIntensity={0.25}
        />
      </mesh>
      <lineSegments>
        <primitive object={edgesGeometry} attach="geometry" />
        <lineBasicMaterial color="#e7f9f6" transparent opacity={0.18} />
      </lineSegments>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.05, 64]} />
        <meshBasicMaterial
          color="#7ce7d9"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2.6, 0, 0]}>
        <torusGeometry args={[1.55, 0.03, 12, 120]} />
        <meshStandardMaterial
          color="#ff8a4d"
          emissive="#f46a2e"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

export default function Hero3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<null | {
    ctx: AudioContext;
    gain: GainNode;
    osc: OscillatorNode | null;
    filter: BiquadFilterNode | null;
  }>(null);
  const toneRef = useRef<any>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const stats = Array.from(
      sectionRef.current.querySelectorAll<HTMLElement>("[data-count]")
    );

    if (reducedMotion) {
      stats.forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        el.textContent = `${target}${el.dataset.suffix ?? ""}`;
      });
      return;
    }

    const context = gsap.context(() => {
      stats.forEach((el) => {
        const target = Number(el.dataset.count ?? "0");
        const suffix = el.dataset.suffix ?? "";

        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: target,
            duration: 1.4,
            ease: "power2.out",
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: el,
              start: "top 85%"
            },
            onUpdate: () => {
              el.textContent = `${Math.round(
                Number(el.innerText)
              )}${suffix}`;
            }
          }
        );
      });
    }, sectionRef);

    return () => context.revert();
  }, [reducedMotion]);

  const initAudio = async () => {
    if (!audioRef.current) {
      const ctx = new AudioContext();
      const gain = ctx.createGain();
      gain.gain.value = 0.035;
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 800;
      filter.connect(gain);
      gain.connect(ctx.destination);
      audioRef.current = { ctx, gain, osc: null, filter };
    }

    const { ctx } = audioRef.current;
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
  };

  const playClick = async (nextState: boolean) => {
    await initAudio();
    if (!audioRef.current) return;
    const { ctx, gain, filter } = audioRef.current;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = nextState ? 880 : 220;
    osc.connect(filter ?? gain);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);

    try {
      const mod = await import("tone");
      const Tone = (mod as unknown as { default?: any }).default ?? mod;
      if (Tone?.Synth) {
        if (!toneRef.current) {
          toneRef.current = new Tone.Synth({
            oscillator: { type: "sine" },
            envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.4 }
          }).toDestination();
          toneRef.current.volume.value = -12;
        }
        if (Tone.start) await Tone.start();
        toneRef.current.triggerAttackRelease(nextState ? "E5" : "A3", "8n");
      }
    } catch {
      // fallback already handled by Web Audio
    }
  };

  useEffect(() => {
    document.documentElement.dataset.sound = soundOn ? "on" : "off";
    const startAmbient = async () => {
      await initAudio();
      if (!audioRef.current) return;
      const { ctx, gain, filter } = audioRef.current;
      if (audioRef.current.osc) return;
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 180;
      osc.connect(filter ?? gain);
      osc.start();
      audioRef.current.osc = osc;
    };

    const stopAmbient = () => {
      if (!audioRef.current?.osc) return;
      const { ctx, osc } = audioRef.current;
      osc.stop(ctx.currentTime + 0.05);
      osc.disconnect();
      audioRef.current.osc = null;
    };

    const updateByScroll = () => {
      if (!audioRef.current?.osc) return;
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
      const base = 180;
      const range = 60;
      audioRef.current.osc.frequency.value = base + range * progress;
      const targetGain = 0.03 + 0.01 * Math.sin(progress * Math.PI);
      audioRef.current.gain.gain.setTargetAtTime(
        targetGain,
        audioRef.current.ctx.currentTime,
        0.15
      );
    };

    if (soundOn) {
      startAmbient();
      updateByScroll();
      window.addEventListener("scroll", updateByScroll, { passive: true });
    } else {
      stopAmbient();
      window.removeEventListener("scroll", updateByScroll);
    }

    return () => {
      window.removeEventListener("scroll", updateByScroll);
    };
  }, [soundOn]);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || reducedMotion) return;
    const target = sectionRef.current;
    const text = textRef.current;
    const moveX = gsap.quickTo(text, "x", { duration: 0.6, ease: "power2.out" });
    const moveY = gsap.quickTo(text, "y", { duration: 0.6, ease: "power2.out" });

    const onMove = (event: PointerEvent) => {
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      moveX(x * 14);
      moveY(y * 10);
    };

    target.addEventListener("pointermove", onMove);
    return () => target.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        if (audioRef.current.osc) {
          audioRef.current.osc.stop();
          audioRef.current.osc.disconnect();
          audioRef.current.osc = null;
        }
        if (audioRef.current.filter) {
          audioRef.current.filter.disconnect();
          audioRef.current.filter = null;
        }
        audioRef.current.gain.disconnect();
        audioRef.current.ctx.close();
        audioRef.current = null;
      }
      if (toneRef.current) {
        toneRef.current.dispose();
        toneRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-hero-gradient"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid-fade opacity-50" />
      <div className="noise-overlay absolute inset-0" />

      <div
        ref={textRef}
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-20 md:px-12"
      >
        <header className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-ink-300">
          <div className="flex items-center gap-3">
            <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-transparent shadow-card">
              <span className="absolute inset-0 rounded-2xl bg-[conic-gradient(from_120deg,rgba(124,231,217,0.65),rgba(255,138,77,0.5),rgba(124,231,217,0.4))] opacity-70 blur-[2px]" />
              <span className="absolute inset-[2px] rounded-2xl bg-transparent" />
              <span className="absolute inset-0 rounded-2xl border border-white/15" />
              <span className="absolute inset-0 opacity-70 animate-[spin_10s_linear_infinite]">
                <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-300 shadow-glow" />
              </span>
              <svg
                viewBox="0 0 48 48"
                className="relative h-7 w-7 text-ink-50"
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
            </span>
            <div>
              <p className="font-display text-sm font-semibold text-ink-50">
                NEXORA
              </p>
              <p className="text-[10px] tracking-[0.3em] text-ink-400">
                CREATIVE TECH
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[10px] shadow-card backdrop-blur md:flex">
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#process" className="nav-link">
              Process
            </a>
            <a href="/case-studies" className="nav-link">
              Case Studies
            </a>
            <a
              href="#contact"
              className="rounded-full border border-accent-400/40 px-3 py-1 text-[10px] font-semibold text-accent-300 transition hover:border-accent-300/80 hover:text-accent-200"
            >
              Contact
            </a>
          </nav>
        </header>

        <div className="flex flex-col gap-6">
          <p className="text-xs uppercase tracking-[0.4em] text-ink-200">
            Interactive Tech Studio
          </p>
          <AnimatedHeading
            as="h1"
            text="Build experiences that feel engineered, cinematic, and beautifully fast."
            className="max-w-3xl font-display text-4xl font-semibold leading-tight text-ink-50 md:text-6xl"
          />
          <p className="max-w-2xl text-base leading-relaxed text-ink-200 md:text-lg">
            We partner with product teams to design, prototype, and ship immersive
            web platforms. Our focus is performance-first motion, thoughtful 3D,
            and interfaces that convert ambition into clarity.
          </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-900 shadow-glow transition hover:translate-y-[-1px]"
          >
            Start a Project
          </a>
          <a
            href="/case-studies"
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-ink-100 transition hover:border-white/40"
          >
            View Case Studies
          </a>
          <button
            type="button"
            onClick={async () => {
              const next = !soundOn;
              await playClick(next);
              setSoundOn(next);
            }}
            className="rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-ink-100 transition hover:border-white/40"
            data-no-barba
          >
            Sound {soundOn ? "On" : "Off"}
          </button>
        </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-8 text-sm text-ink-300">
          <div>
            <p
              className="text-2xl font-semibold text-ink-50"
              data-count="12"
              data-suffix="+"
            >
              12+
            </p>
            <p>Launches delivered since 2022</p>
          </div>
          <div>
            <p
              className="text-2xl font-semibold text-ink-50"
              data-count="98"
              data-suffix="%"
            >
              98%
            </p>
            <p>Performance scores above 90</p>
          </div>
          <div>
            <p
              className="text-2xl font-semibold text-ink-50"
              data-count="24"
              data-suffix="+"
            >
              24+
            </p>
            <p>Clients across SaaS & fintech</p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {reducedMotion ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-56 w-56 rounded-full bg-accent-500/15 blur-[1px]" />
          </div>
        ) : (
          <Canvas
            camera={{ position: [0, 0, 7], fov: 45 }}
            dpr={[1, 1.6]}
            gl={{ antialias: true, alpha: true }}
            frameloop="demand"
          >
          <ambientLight intensity={0.45} />
          <directionalLight position={[3, 3, 4]} intensity={0.7} />
          <pointLight position={[-4, -2, 3]} intensity={0.6} color="#7ce7d9" />
          <pointLight position={[4, 2, -3]} intensity={0.4} color="#ff8a4d" />
            <Scene triggerRef={sectionRef} />
          </Canvas>
        )}
      </div>
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-ink-300">
        <span>Scroll</span>
        <div className="h-10 w-[2px] overflow-hidden rounded-full bg-white/10">
          <div className="h-1/2 w-full animate-[loadingbar_1.6s_ease-in-out_infinite] rounded-full bg-accent-400/70" />
        </div>
      </div>
    </section>
  );
}
