"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Cloud, Layers, Terminal, Zap, ArrowDown } from "lucide-react";
import { SakugaButton } from "@/components/sakuga";

export function Hero({ about, skills }: { about?: any; skills?: any }) {
  const role = "Full-Stack Developer & Agentic AI Engineer";
  const experience = about?.yearsOfExperience ? `${about.yearsOfExperience}+ years of experience` : "2+ years of experience";
  const bio = about?.bio || "Building scalable products, production-ready web platforms, and autonomous AI-powered experiences.";
  const projectsCount = about?.projectsCompleted || 25;
  const techCount = about?.technologiesUsed || 20;

  const valueCards = [
    {
      number: "01",
      sfx: "バシッ",
      icon: <Code2 className="h-5 w-5 text-[#ff5fa8]" />,
      title: "Full-Stack Products",
      description: "Modern web applications with responsive UX, optimized APIs, and bulletproof backend architectures.",
    },
    {
      number: "02",
      sfx: "ズザッ",
      icon: <Sparkles className="h-5 w-5 text-[#8f8df7]" />,
      title: "AI & Agentic Systems",
      description: "Intelligent autonomous systems built with Python, Gemini APIs, LangChain, LangGraph, and modern LLM toolchains.",
    },
    {
      number: "03",
      sfx: "カチッ",
      icon: <Cloud className="h-5 w-5 text-[#ff5fa8]" />,
      title: "Cloud & DevOps",
      description: "Scalable deployments, Docker microservices, CI/CD pipelines, and cloud infra across AWS, Azure, and Render.",
    },
    {
      number: "04",
      sfx: "ドン!",
      icon: <Layers className="h-5 w-5 text-[#8f8df7]" />,
      title: "Product Architecture",
      description: "Turning ambitious ideas into maintainable, production-ready systems with genuine developer craftsmanship.",
    },
  ];

  const scrollSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="pt-8 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#1d1a4a]/10">
      {/* Top Banner / Announcement pill - Clean inline layout without overflow */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        <span className="sfx-tag text-[10px] animate-pulse">ACTIVE SDE</span>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#dcdaf0] bg-[#f4f3fc] text-xs font-bold text-[#1d1a4a]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff5fa8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff5fa8]"></span>
          </span>
          <span>Available for New Roles &amp; High-Impact Projects</span>
        </div>

        {/* Clean, non-overflowing location badge (fixed tooltip clipping bug) */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#dcdaf0] bg-white text-xs font-bold text-[#1d1a4a]">
          <span>📍</span>
          <span>Surat, India</span>
          <span className="text-[#8580b0] font-normal text-[11px]">• Open to Remote</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* Left Column: Comic Title & Narrative */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 flex flex-col items-start"
        >
          <h1 className="font-sakuga-title text-4xl sm:text-5xl lg:text-6xl text-[#1d1a4a] leading-[1.08] tracking-tight mb-6">
            Hi, I&apos;m Dev Sakarsawala.
            <br />
            <span className="text-[#8580b0] font-normal not-italic text-3xl sm:text-4xl lg:text-5xl block mt-2">
              {role}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#1d1a4a]/85 max-w-2xl leading-relaxed mb-8 font-medium">
            {bio} Crafting production software at the frontier of full-stack engineering,
            autonomous agent workflows, and reactive web applications.
          </p>

          {/* Interactive Action Buttons using Sakuga Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a href="#projects" onClick={(e) => { e.preventDefault(); scrollSection("projects"); }}>
              <SakugaButton variant="primary">
                View Selected Work ⚡
              </SakugaButton>
            </a>

            <a href="#contact" onClick={(e) => { e.preventDefault(); scrollSection("contact"); }}>
              <SakugaButton variant="secondary">
                Let&apos;s Build Together &rarr;
              </SakugaButton>
            </a>

            <a href="#vfx-station" onClick={(e) => { e.preventDefault(); scrollSection("vfx-station"); }}>
              <span className="manga-badge text-xs hover:border-[#1d1a4a]">
                Test VFX Lab 💥
              </span>
            </a>
          </div>

          {/* Stat Badges in Manga Panel format */}
          <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full max-w-xl">
            <div className="manga-card p-4 text-center bg-white">
              <div className="font-sakuga-title text-2xl sm:text-3xl text-[#1d1a4a]">
                {experience.split(" ")[0]}
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8580b0] mt-0.5">
                Experience
              </div>
            </div>

            <div className="manga-card p-4 text-center bg-white">
              <div className="font-sakuga-title text-2xl sm:text-3xl text-[#ff5fa8]">
                {projectsCount}+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8580b0] mt-0.5">
                Completed
              </div>
            </div>

            <div className="manga-card p-4 text-center bg-white">
              <div className="font-sakuga-title text-2xl sm:text-3xl text-[#8f8df7]">
                {techCount}+
              </div>
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#8580b0] mt-0.5">
                Technologies
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Comic Portrait Panel with new real user photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-4 flex flex-col items-center lg:items-end"
        >
          <div className="manga-panel p-3 bg-white w-full max-w-[320px] relative screentone-bg">
            {/* Comic corner indicator */}
            <div className="absolute top-2 right-2 bg-[#ff5fa8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
              CHAPTER 01
            </div>

            {/* Profile image container using the new uploaded image */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-[#1d1a4a] bg-[#f4f3fc] relative group">
              <img
                src="/profile.jpg"
                alt="Dev Sakarsawala"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-[#1d1a4a]/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center justify-between">
                <span>DEV SAKARSAWALA</span>
                <span className="text-[#ff5fa8] font-sakuga-title text-sm">ドン!</span>
              </div>
            </div>

            <div className="mt-3 px-2 py-1">
              <div className="text-xs font-bold uppercase tracking-widest text-[#8580b0] flex items-center justify-between">
                <span>CREED</span>
                <span className="font-mono text-[10px]">#001</span>
              </div>
              <p className="font-sakuga-title text-sm text-[#1d1a4a] mt-1">
                &ldquo;Ideas &rarr; Code &rarr; Real Impact.&rdquo;
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* What I Do Section / Value Pillars */}
      <div className="mt-20 pt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="sfx-tag text-[9px]">SYSTEM ARCHITECTURE</span>
            </div>
            <h2 className="font-sakuga-title text-2xl sm:text-3xl text-[#1d1a4a]">
              What I Engineer
            </h2>
          </div>
          <span className="text-xs font-bold text-[#8580b0]">
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
              className="manga-card p-6 bg-white flex flex-col justify-between relative group hover:border-[#1d1a4a]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-[#8580b0] bg-[#f4f3fc] px-2.5 py-1 rounded-md border border-[#dcdaf0]">
                    {card.number}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="sfx-tag text-[9px] opacity-0 group-hover:opacity-100 transition-opacity">
                      {card.sfx}
                    </span>
                    <div className="p-2 rounded-xl bg-[#f4f3fc] border border-[#dcdaf0] group-hover:border-[#1d1a4a] transition-colors">
                      {card.icon}
                    </div>
                  </div>
                </div>

                <h3 className="font-sakuga-title text-lg text-[#1d1a4a] mb-2 group-hover:text-[#ff5fa8] transition-colors">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#8580b0] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#dcdaf0] flex items-center justify-between text-xs font-bold text-[#1d1a4a]">
                <span className="text-[11px] text-[#8580b0]">Production Ready</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
