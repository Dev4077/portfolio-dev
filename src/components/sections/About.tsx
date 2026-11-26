"use client";

import React from "react";
import { Hammer, Sparkles, Terminal, Code2, ArrowRight } from "lucide-react";
import { SakugaButton } from "@/components/sakuga";

export function About({ about }: { about?: any }) {
  const philosophy =
    about?.codingPhilosophy ||
    "Clean code is not written by following a set of rules. It is written by a programmer who genuinely cares — about readability, about maintainability, and about the next developer who will build upon it.";

  const bio =
    about?.bio ||
    "I am a Full-stack Developer with a passion for building scalable, production-grade applications. I thrive at the intersection of elegant frontend experiences and robust backend systems. From React to Node.js and AI agent workflows, I craft software that solves real problems and scales with confidence.";

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Narrative */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-3">
            <span className="sfx-tag text-[10px]">ORIGIN &amp; CREED</span>
            <span className="text-xs font-bold text-[#71717a]">CHAPTER 02</span>
          </div>

          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#18181b] mb-6">
            A builder, not just a coder.
          </h2>

          <div className="text-base sm:text-lg text-[#18181b]/85 leading-relaxed space-y-4 mb-8">
            <p className="font-medium">
              {bio}
            </p>
          </div>

          {/* Philosophy Manga Quote Box */}
          <div className="manga-panel p-6 bg-[#fff1f2] relative screentone-bg">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#dc2626] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Core Philosophy
              </span>
              <span className="sfx-tag text-[9px]">カチッ</span>
            </div>

            <blockquote className="font-sakuga-title text-base sm:text-lg text-[#18181b] leading-relaxed italic">
              &ldquo;{philosophy}&rdquo;
            </blockquote>

            <div className="mt-4 pt-3 border-t border-[#fee2e2] flex items-center justify-between text-xs font-bold text-[#71717a]">
              <span>Dev Sakarsawala</span>
              <span className="font-mono text-[11px]">Engineering Manifesto</span>
            </div>
          </div>
        </div>

        {/* Right Column: Currently Building & Photo Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Currently Building Card with Dev's Photo */}
          <div className="manga-card p-6 bg-white border-2 border-[#18181b] shadow-[4px_4px_0px_#18181b]">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#18181b] shrink-0 bg-[#fff1f2]">
                <img
                  src="/profile.jpg"
                  alt="Dev Sakarsawala"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="sfx-tag text-[8px] bg-[#dc2626]">ACTIVE LAB</span>
                  <span className="text-[11px] font-bold text-[#71717a]">SDE-1</span>
                </div>
                <h3 className="font-sakuga-title text-lg text-[#18181b]">
                  Agentic Graph Workflows
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#71717a] leading-relaxed mb-6">
              Engineering autonomous workflows where specialized agents plan, coordinate, and execute multi-step operations using LangChain, LangGraph, and Gemini 2.5 API reasoning loops.
            </p>

            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <SakugaButton variant="secondary" className="w-full text-center">
                Explore Projects &rarr;
              </SakugaButton>
            </a>
          </div>

          {/* Core Focus Badges */}
          <div className="manga-card p-6 bg-[#fff1f2]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#71717a] mb-3">
              Specialized Focus Areas
            </h4>

            <div className="flex flex-wrap gap-2">
              <span className="manga-badge text-xs bg-white">MERN Architecture</span>
              <span className="manga-badge text-xs bg-white">LangGraph Workflows</span>
              <span className="manga-badge text-xs bg-white">Next.js App Router</span>
              <span className="manga-badge text-xs bg-white">Redis Query Caching</span>
              <span className="manga-badge text-xs bg-white">Docker &amp; Microservices</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
