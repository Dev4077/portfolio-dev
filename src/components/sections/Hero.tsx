"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  Cloud,
  Layers,
  ArrowRight,
  Eye,
  EyeOff,
  Crosshair,
  Volume2,
  ChevronRight,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { SakugaButton } from "@/components/sakuga";

export function Hero({ about, skills }: { about?: any; skills?: any }) {
  const role = "Full-Stack Developer & Agentic AI Engineer";
  const experience = about?.yearsOfExperience
    ? `${about.yearsOfExperience}+ years of experience`
    : "2+ years of experience";
  const bio =
    about?.bio ||
    "Building scalable products, production-ready web platforms, and autonomous AI-powered experiences.";
  const projectsCount = about?.projectsCompleted || 25;
  const techCount = about?.technologiesUsed || 20;

  // Interactive Visor States
  const stageRef = useRef<HTMLDivElement>(null);
  const riderRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // relative to rider
  const [relativePos, setRelativePos] = useState({ xPercent: 50, yPercent: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isNearVisor, setIsNearVisor] = useState(false);
  const [isVisorLockedOpen, setIsVisorLockedOpen] = useState(false);

  // Parallax Tilt values
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Handle Mouse movement across the Hero Stage
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!riderRef.current) return;
      const rect = riderRef.current.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

      setMousePos({ x, y });
      setRelativePos({ xPercent, yPercent });

      // Determine if cursor is near the helmet/visor region
      // In our 3:4 portrait: helmet is centered horizontally (25%..75%), visor is y: (16%..44%)
      const inVisorZone =
        xPercent >= 22 && xPercent <= 78 && yPercent >= 12 && yPercent <= 48;
      setIsNearVisor(inVisorZone);

      // 3D Parallax tilt (subtle and high quality)
      const tiltX = ((yPercent - 50) / 50) * -4;
      const tiltY = ((xPercent - 50) / 50) * 5;
      setTilt({ rotateX: tiltX, rotateY: tiltY });
    },
    []
  );

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsNearVisor(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const toggleVisor = () => {
    setIsVisorLockedOpen((prev) => !prev);
  };

  const scrollSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const valueCards = [
    {
      number: "01",
      sfx: "バシッ",
      icon: <Code2 className="h-5 w-5 text-[#dc2626]" />,
      title: "Full-Stack Products",
      description:
        "Modern web applications with responsive UX, optimized APIs, and bulletproof backend architectures.",
    },
    {
      number: "02",
      sfx: "ズザッ",
      icon: <Sparkles className="h-5 w-5 text-[#ef4444]" />,
      title: "AI & Agentic Systems",
      description:
        "Intelligent autonomous systems built with Python, Gemini APIs, LangChain, LangGraph, and modern LLM toolchains.",
    },
    {
      number: "03",
      sfx: "カチッ",
      icon: <Cloud className="h-5 w-5 text-[#dc2626]" />,
      title: "Cloud & DevOps",
      description:
        "Scalable deployments, Docker microservices, CI/CD pipelines, and cloud infra across AWS, Azure, and Render.",
    },
    {
      number: "04",
      sfx: "ドン!",
      icon: <Layers className="h-5 w-5 text-[#ef4444]" />,
      title: "Product Architecture",
      description:
        "Turning ambitious ideas into maintainable, production-ready systems with genuine developer craftsmanship.",
    },
  ];

  return (
    <section
      id="hero"
      className="pt-4 sm:pt-8 pb-16 px-3 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10"
    >
      {/* Top Banner / Status Line */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="sfx-tag text-[10px] animate-pulse bg-[#18181b] text-white">
            HERO SECTION
          </span>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#fee2e2] bg-[#fff1f2] text-xs font-bold text-[#18181b]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]"></span>
            </span>
            <span>RACING SPEC // SDE ACTIVE</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#fee2e2] bg-white text-xs font-bold text-[#18181b]">
            <span>📍</span>
            <span>Surat, India</span>
            <span className="text-[#71717a] font-normal text-[11px]">
              • Open to Global Remote
            </span>
          </div>
        </div>

        {/* Visor Quick State Indicator / Toggle */}
        <button
          onClick={toggleVisor}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#18181b] bg-white text-xs font-bold text-[#18181b] shadow-[2px_2px_0px_#18181b] hover:shadow-[3px_3px_0px_#dc2626] hover:border-[#dc2626] transition-all cursor-pointer"
          title="Click to toggle helmet visor open/closed"
        >
          {isVisorLockedOpen ? (
            <>
              <Eye className="w-3.5 h-3.5 text-[#dc2626]" />
              <span className="text-[#dc2626]">VISOR LIFTED // FACE REVEALED</span>
            </>
          ) : (
            <>
              <EyeOff className="w-3.5 h-3.5 text-[#71717a]" />
              <span>VISOR TINTED // CLICK TO LIFT</span>
            </>
          )}
        </button>
      </div>

      {/* Main Cinematic Racing Canvas / Stage */}
      <div
        ref={stageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="w-full min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] rounded-3xl border-2 border-[#18181b] bg-gradient-to-b from-[#f5f6f8] via-[#e9edf2] to-[#e4e8ee] relative overflow-hidden shadow-[6px_6px_0px_#18181b] flex flex-col justify-between p-4 sm:p-8 lg:p-12 select-none"
      >
        {/* Subtle Background Track Grid & Vignette */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.85)_0%,transparent_70%)]" />

        {/* Layer 1: Giant Split Backdrop Typography - "RED LINE" */}
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 lg:px-12 pointer-events-none z-10">
          {/* Left: "RED" */}
          <div className="flex-1 flex justify-start">
            <span
              className="text-[#dc2626] font-black uppercase tracking-[-0.05em] leading-none select-none text-[22vw] sm:text-[20vw] lg:text-[180px] xl:text-[220px] drop-shadow-[0_4px_24px_rgba(220,38,38,0.18)]"
              style={{
                fontFamily: "var(--app-font-display), sans-serif",
                WebkitTextStroke: "1px rgba(220, 38, 38, 0.4)",
              }}
            >
              RED
            </span>
          </div>

          {/* Right: "LINE" */}
          <div className="flex-1 flex justify-end">
            <span
              className="text-[#18181b] font-black uppercase tracking-[-0.05em] leading-none select-none text-[22vw] sm:text-[20vw] lg:text-[180px] xl:text-[220px] drop-shadow-[0_4px_24px_rgba(24,24,27,0.12)]"
              style={{
                fontFamily: "var(--app-font-display), sans-serif",
                WebkitTextStroke: "1px rgba(24, 24, 27, 0.4)",
              }}
            >
              LINE
            </span>
          </div>
        </div>

        {/* Layer 2: Central Motorcycle Racer with Dynamic Visor Reveal */}
        <div
          ref={riderRef}
          onClick={toggleVisor}
          className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center z-20 cursor-crosshair group"
          style={{
            perspective: 1000,
          }}
        >
          <div
            className="relative w-[340px] sm:w-[440px] md:w-[500px] lg:w-[560px] xl:w-[620px] max-w-full aspect-[896/1200] transition-transform duration-150 ease-out origin-bottom"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            }}
          >
            {/* Base Image: Visor Closed (Dark Tinted Mirror Visor) */}
            <img
              src="/hero-cutout-closed.webp"
              alt="Dev Sakarsawala - Racing Helmet Visor Closed"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_20px_35px_rgba(24,24,27,0.22)] select-none"
              loading="eager"
            />

            {/* Overlay Image: Visor Open (Revealing Dev's Face) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none transition-[mask-image] duration-150"
              style={{
                WebkitMaskImage: isVisorLockedOpen
                  ? "linear-gradient(black, black)"
                  : isHovering
                  ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)`
                  : "none",
                maskImage: isVisorLockedOpen
                  ? "linear-gradient(black, black)"
                  : isHovering
                  ? `radial-gradient(circle 140px at ${mousePos.x}px ${mousePos.y}px, black 0%, black 50%, rgba(0,0,0,0.6) 75%, transparent 100%)`
                  : "none",
              }}
            >
              <img
                src="/hero-cutout-open.webp"
                alt="Dev Sakarsawala - Visor Open Face Revealed"
                className="w-full h-full object-contain select-none"
                loading="eager"
              />
            </div>

            {/* Interactive Visor Refraction & Smoke Glow Cursor Ring */}
            {isHovering && !isVisorLockedOpen && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/10 backdrop-blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.7),inset_0_0_15px_rgba(220,38,38,0.25)] transition-opacity duration-100 z-30 flex items-center justify-center"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  width: isNearVisor ? 150 : 120,
                  height: isNearVisor ? 150 : 120,
                  opacity: isNearVisor ? 1 : 0.6,
                }}
              >
                {/* Crosshair HUD Reticle */}
                {isNearVisor && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Crosshair className="w-5 h-5 text-[#dc2626] animate-pulse" />
                    <span className="absolute -bottom-6 bg-[#18181b]/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap border border-[#dc2626]/50">
                      FACE REVEALED // DEV
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Layer 3: Foreground Content Overlays */}
        {/* Left Side: Tagline, Narrative, CTAs & Visor Prompt */}
        <div className="relative z-30 max-w-sm sm:max-w-md lg:max-w-lg mt-auto sm:my-auto pointer-events-auto">
          <div className="bg-white/85 sm:bg-white/90 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-2 border-[#18181b] shadow-[4px_4px_0px_#18181b] space-y-4">
            <div>
              <span className="text-[#dc2626] font-mono text-xs font-bold tracking-wider uppercase block mb-1">
                // SDE RACING ARCHITECTURE
              </span>
              <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#18181b] uppercase tracking-tight leading-none">
                BRAKE LATE.
                <br />
                <span className="text-[#dc2626]">LEAVE NOTHING.</span>
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#18181b]/80 leading-relaxed font-medium">
              <strong className="text-[#18181b]">Dev Sakarsawala</strong> —{" "}
              {role}. Turning ambitious product ideas into high-speed,
              production-grade web platforms and autonomous AI agent pipelines.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollSection("projects");
                }}
              >
                <SakugaButton variant="primary">
                  JOIN THE GRID ⚡
                </SakugaButton>
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollSection("contact");
                }}
              >
                <SakugaButton variant="secondary">
                  WATCH THE LAP ↗
                </SakugaButton>
              </a>
            </div>

            {/* Live Interactive Visor Hint */}
            <div
              onClick={toggleVisor}
              className="pt-2 flex items-center gap-2 cursor-pointer group/hint select-none"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#dc2626]"></span>
              </span>
              <span className="font-mono text-[11px] font-bold text-[#18181b] group-hover/hint:text-[#dc2626] transition-colors">
                {isVisorLockedOpen
                  ? "• VISOR IS LIFTED (CLICK TO LOWER)"
                  : "• MOVE TO LIFT THE VISOR"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Telemetry & Rider Spec Card (matching reference UI) */}
        <div className="relative z-30 self-end max-w-[280px] sm:max-w-[320px] w-full pointer-events-auto mt-4 lg:mt-0">
          <div className="bg-[#18181b] text-white p-4 sm:p-5 rounded-2xl border-2 border-[#18181b] shadow-[4px_4px_0px_#dc2626] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[#27272a] pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                <span className="font-mono text-xs font-bold tracking-wider text-[#a1a1aa]">
                  RIDER 07 // DEV
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#27272a] text-[#dc2626] font-bold">
                GRID READY
              </span>
            </div>

            {/* Spec lines */}
            <div className="space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between text-[#a1a1aa]">
                <span>CALLSIGN</span>
                <span className="text-white font-bold">// VERMILION</span>
              </div>
              <div className="flex justify-between text-[#a1a1aa]">
                <span>DISPATCH</span>
                <span className="text-white font-bold">// FULL-STACK SDE</span>
              </div>
              <div className="flex justify-between text-[#a1a1aa]">
                <span>AGENT ENGINE</span>
                <span className="text-white font-bold">// LANGGRAPH + GEMINI</span>
              </div>
              <div className="flex justify-between text-[#a1a1aa]">
                <span>STATUS</span>
                <span className="text-[#10b981] font-bold">// ON THE GRID</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-[10px] font-mono text-[#71717a]">
              <span>TELEMETRY: 99.9% UPTIME</span>
              <button
                onClick={toggleVisor}
                className="text-[#dc2626] hover:underline font-bold"
              >
                {isVisorLockedOpen ? "CLOSE VISOR" : "LIFT VISOR"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Value Pillars / System Architecture Disciplines */}
      <div className="mt-16 pt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="sfx-tag text-[9px]">SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="font-sakuga-title text-2xl sm:text-3xl text-[#18181b]">
              What I Engineer
            </h2>
          </div>
          <span className="text-xs font-bold text-[#71717a]">
            04 CORE DISCIPLINES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valueCards.map((card, idx) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="manga-card p-6 bg-white flex flex-col justify-between relative group hover:border-[#18181b]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#71717a] bg-[#fff1f2] px-2.5 py-1 rounded-md border border-[#fee2e2]">
                    {card.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="sfx-tag text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                      {card.sfx}
                    </span>
                    <div className="p-2 rounded-xl bg-[#fff1f2] border border-[#fee2e2] group-hover:border-[#18181b] transition-colors">
                      {card.icon}
                    </div>
                  </div>
                </div>

                <h3 className="font-sakuga-title text-lg text-[#18181b] mb-2 group-hover:text-[#dc2626] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-xs font-bold text-[#18181b]">
                <span className="text-[11px] text-[#71717a]">Production Ready</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
