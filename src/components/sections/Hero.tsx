"use client";

import React, { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Sparkles,
  Cloud,
  Layers,
  Eye,
  EyeOff,
  Crosshair,
  Terminal,
  Cpu,
  Binary,
  Braces,
  Smartphone,
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
  const riderRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // relative to portrait
  const [relativePos, setRelativePos] = useState({ xPercent: 50, yPercent: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const [isNearVisor, setIsNearVisor] = useState(false);
  const [isVisorLockedOpen, setIsVisorLockedOpen] = useState(false);

  // Parallax Tilt values
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  // Update coordinate tracking from mouse or touch event
  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!riderRef.current) return;
    const rect = riderRef.current.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100));

    setMousePos({ x, y });
    setRelativePos({ xPercent, yPercent });

    // AR glasses are located around x: 24%..76%, y: 16%..44%
    const inVisorZone =
      xPercent >= 24 && xPercent <= 76 && yPercent >= 16 && yPercent <= 44;
    setIsNearVisor(inVisorZone);

    // 3D Parallax tilt
    const tiltX = ((yPercent - 50) / 50) * -3.5;
    const tiltY = ((xPercent - 50) / 50) * 4.5;
    setTilt({ rotateX: tiltX, rotateY: tiltY });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    updatePosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsNearVisor(false);
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsHovering(true);
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
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
      className="pt-3 sm:pt-6 pb-16 px-3 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10"
    >
      {/* Top Banner / Engineering Status Line */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="sfx-tag text-[10px] animate-pulse bg-[#18181b] text-white">
            HERO // SYSTEM
          </span>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#fee2e2] bg-[#fff1f2] text-xs font-bold text-[#18181b]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#dc2626]"></span>
            </span>
            <span>ACTIVE SDE // FULL-STACK &amp; AGENTIC AI</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[#fee2e2] bg-white text-xs font-bold text-[#18181b]">
            <span>📍</span>
            <span>Surat, India</span>
            <span className="text-[#71717a] font-normal text-[11px]">
              • Open to Global Remote
            </span>
          </div>
        </div>

        {/* Visor State Toggle Button */}
        <button
          onClick={toggleVisor}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#18181b] bg-white text-xs font-bold text-[#18181b] shadow-[2px_2px_0px_#18181b] hover:shadow-[3px_3px_0px_#dc2626] hover:border-[#dc2626] transition-all cursor-pointer"
          title="Click to toggle AR Code Visor on/off"
        >
          {isVisorLockedOpen ? (
            <>
              <Eye className="w-3.5 h-3.5 text-[#dc2626]" />
              <span className="text-[#dc2626]">AR VISOR LIFTED // CLEAR FACE</span>
            </>
          ) : (
            <>
              <Binary className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>AR CODE VISOR // TAP TO TOGGLE</span>
            </>
          )}
        </button>
      </div>

      {/* Main Coding Hero Stage / Canvas */}
      <div
        className="w-full rounded-3xl border-2 border-[#18181b] bg-gradient-to-b from-[#f8f9fa] via-[#eef2f6] to-[#e4e9f0] relative overflow-hidden shadow-[6px_6px_0px_#18181b] p-4 sm:p-6 lg:p-10 select-none flex flex-col justify-between min-h-0 lg:min-h-[720px]"
      >
        {/* Subtle Developer Track Grid & Background Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.85)_0%,transparent_70%)]" />

        {/* Desktop Floating Badges */}
        <div className="absolute top-8 left-8 hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#fee2e2] text-[11px] font-mono font-bold text-[#dc2626] shadow-sm pointer-events-none animate-pulse">
          <Braces className="w-3 h-3 text-[#dc2626]" />
          <span>LangGraph Agents</span>
        </div>
        <div className="absolute top-10 right-10 hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#18181b]/10 text-[11px] font-mono font-bold text-[#18181b] shadow-sm pointer-events-none">
          <Cpu className="w-3 h-3 text-[#10b981]" />
          <span>Next.js 16 • React 19</span>
        </div>

        {/* ============================================================== */}
        {/* CENTER VISUAL: Giant Split Backdrop + Interactive Portrait     */}
        {/* ============================================================== */}
        <div
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[380px] sm:h-[460px] md:h-[500px] lg:absolute lg:inset-0 lg:h-full flex items-end justify-center overflow-hidden pointer-events-auto cursor-crosshair"
        >
          {/* Layer 1: Giant Split Backdrop Typography - "DEV" & "CODE" */}
          <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 lg:px-12 pointer-events-none z-10">
            {/* Left: "DEV" */}
            <div className="flex-1 flex justify-start">
              <span
                className="text-[#dc2626] font-black uppercase tracking-[-0.05em] leading-none select-none text-[22vw] sm:text-[18vw] lg:text-[180px] xl:text-[220px] drop-shadow-[0_4px_24px_rgba(220,38,38,0.18)]"
                style={{
                  fontFamily: "var(--app-font-display), sans-serif",
                  WebkitTextStroke: "1px rgba(220, 38, 38, 0.4)",
                }}
              >
                DEV
              </span>
            </div>

            {/* Right: "CODE" */}
            <div className="flex-1 flex justify-end">
              <span
                className="text-[#18181b] font-black uppercase tracking-[-0.05em] leading-none select-none text-[22vw] sm:text-[18vw] lg:text-[180px] xl:text-[220px] drop-shadow-[0_4px_24px_rgba(24,24,27,0.12)]"
                style={{
                  fontFamily: "var(--app-font-display), sans-serif",
                  WebkitTextStroke: "1px rgba(24, 24, 27, 0.4)",
                }}
              >
                CODE
              </span>
            </div>
          </div>

          {/* Layer 2: Central Developer Silhouette with Interactive AR Visor Reveal */}
          <div
            ref={riderRef}
            onClick={toggleVisor}
            className="relative z-20 flex items-end justify-center w-[290px] sm:w-[380px] md:w-[440px] lg:w-[540px] xl:w-[600px] max-w-full aspect-[896/1200] origin-bottom transition-transform duration-150 ease-out"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
            }}
          >
            {/* Base Image: AR Visor Active (Reflecting Glowing Red Code Stream) */}
            <img
              src="/dev-coding-closed.webp"
              alt="Dev Sakarsawala - AR Code Visor"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_30px_rgba(24,24,27,0.22)] select-none"
              loading="eager"
            />

            {/* Overlay Image: Visor Lifted / Open (Revealing Dev's Face & Natural Eyes) */}
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
                src="/dev-coding-open.webp"
                alt="Dev Sakarsawala - Face Revealed"
                className="w-full h-full object-contain select-none"
                loading="eager"
              />
            </div>

            {/* Interactive Visor Lens HUD Ring that tracks cursor */}
            {isHovering && !isVisorLockedOpen && (
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/80 bg-white/10 backdrop-blur-[1px] shadow-[0_0_30px_rgba(255,255,255,0.7),inset_0_0_15px_rgba(220,38,38,0.25)] transition-opacity duration-100 z-30 flex items-center justify-center"
                style={{
                  left: mousePos.x,
                  top: mousePos.y,
                  width: isNearVisor ? 140 : 110,
                  height: isNearVisor ? 140 : 110,
                  opacity: isNearVisor ? 1 : 0.6,
                }}
              >
                {/* Crosshair HUD Reticle */}
                {isNearVisor && (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Crosshair className="w-5 h-5 text-[#dc2626] animate-pulse" />
                    <span className="absolute -bottom-6 bg-[#18181b]/95 text-white font-mono text-[9px] font-bold px-2.5 py-0.5 rounded-full whitespace-nowrap border border-[#dc2626]/50 shadow-md">
                      DECODE // FACE REVEALED
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Touch Indicator Pill (subtle helper) */}
            <div className="lg:hidden absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#18181b]/85 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold flex items-center gap-1.5 border border-[#dc2626]/40 shadow-sm pointer-events-none whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-ping" />
              <span>{isVisorLockedOpen ? "VISOR LIFTED • TAP TO LOWER" : "TAP FACE TO LIFT AR VISOR"}</span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* RESPONSIVE CONTENT CARDS:                                      */}
        {/* Desktop (lg:): Fixed in bottom corners                         */}
        {/* Mobile (< lg): Stacked neatly below portrait without covering  */}
        {/* ============================================================== */}
        <div className="relative z-30 w-full mt-6 lg:mt-0 flex flex-col lg:flex-row lg:items-end justify-between gap-6 pointer-events-none">
          {/* Left Side: Tagline, Narrative, CTAs & Visor Prompt */}
          <div className="max-w-full lg:max-w-md xl:max-w-lg pointer-events-auto">
            <div className="bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-2 border-[#18181b] shadow-[4px_4px_0px_#18181b] space-y-4">
              <div>
                <span className="text-[#dc2626] font-mono text-xs font-bold tracking-wider uppercase block mb-1">
                  // SDE &amp; AGENTIC ARCHITECT
                </span>
                <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-[#18181b] uppercase tracking-tight leading-none">
                  COMPILE IDEAS.
                  <br />
                  <span className="text-[#dc2626]">SHIP PRODUCTION.</span>
                </h1>
              </div>

              <p className="text-xs sm:text-sm text-[#18181b]/80 leading-relaxed font-medium">
                <strong className="text-[#18181b]">Dev Sakarsawala</strong> —{" "}
                {role}. Architecting modern full-stack web platforms, autonomous
                LangGraph agent workflows, and high-performance cloud applications.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollSection("projects");
                  }}
                  className="w-full sm:w-auto"
                >
                  <SakugaButton variant="primary">
                    EXPLORE WORK ⚡
                  </SakugaButton>
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollSection("contact");
                  }}
                  className="w-full sm:w-auto"
                >
                  <SakugaButton variant="secondary">
                    TERMINAL CONTACT ↗
                  </SakugaButton>
                </a>
              </div>

              {/* Interactive Visor Hint / Toggle */}
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
                    ? "• AR VISOR LIFTED (CLICK TO LOWER)"
                    : "• HOVER/TAP AR VISOR TO REVEAL FACE"}
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Live Developer Terminal & Telemetry Card */}
          <div className="max-w-full lg:max-w-[300px] xl:max-w-[320px] w-full pointer-events-auto">
            <div className="bg-[#18181b] text-white p-4 sm:p-5 rounded-2xl border-2 border-[#18181b] shadow-[4px_4px_0px_#dc2626] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[#27272a] pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                  <span className="font-mono text-xs font-bold tracking-wider text-[#a1a1aa]">
                    DEV.KERNEL // v2.5
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#27272a] text-[#dc2626] font-bold">
                  DEPLOYED
                </span>
              </div>

              {/* Spec lines */}
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>ENGINEER</span>
                  <span className="text-white font-bold">// DEV SAKARSAWALA</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>CORE STACK</span>
                  <span className="text-white font-bold">// NEXT.JS • REACT 19</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>AGENT ENGINE</span>
                  <span className="text-white font-bold">// LANGGRAPH &amp; GEMINI</span>
                </div>
                <div className="flex justify-between text-[#a1a1aa]">
                  <span>STATUS</span>
                  <span className="text-[#10b981] font-bold">// ACTIVE ON CORE</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#27272a] flex items-center justify-between text-[10px] font-mono text-[#71717a]">
                <span>UPTIME: 99.9% PROD</span>
                <button
                  onClick={toggleVisor}
                  className="text-[#dc2626] hover:underline font-bold cursor-pointer"
                >
                  {isVisorLockedOpen ? "LOWER AR VISOR" : "LIFT AR VISOR"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value Pillars / System Architecture Disciplines */}
      <div className="mt-14 pt-2">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {valueCards.map((card, idx) => (
            <motion.div
              key={card.number}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="manga-card p-5 sm:p-6 bg-white flex flex-col justify-between relative group hover:border-[#18181b]"
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
