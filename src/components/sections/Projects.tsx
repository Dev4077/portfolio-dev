"use client";

import React, { useState } from "react";
import { ExternalLink, Github, Sparkles, Layers, ArrowRight, Eye } from "lucide-react";
import { SakugaButton, SakugaTooltip } from "@/components/sakuga";

const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    title: "AI Podcast Generator (Gemini Powered)",
    description:
      "A full-stack MERN web application that automatically generates natural multi-speaker podcast scripts and synthesized voice audio using Google's Gemini API and text-to-speech pipelines.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini APIs",
      "Audio Playback",
      "Render Deploy",
    ],
    githubUrl: "https://github.com/Dev4077/ai-podcast-frontend-gen",
    liveUrl: "https://ai-podcast-frontend-gen.onrender.com/",
    category: "AI / Full-Stack SaaS",
    year: "2024",
    imageUrl: "https://constantsys.glozic.dev/vaibhavi-app/assets/Screenshot_2026-05-26_at_1.01.35_PM.png",
  },
  {
    id: "proj-2",
    title: "Radhakrishna Inventory Management System",
    description:
      "A comprehensive business platform for electrical enterprise operations with real-time stock monitoring, billing, AI-assisted business analytics with Gemini API, and audio notifications.",
    techStack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Gemini APIs",
      "Tailwind CSS",
      "Render Deploy",
    ],
    githubUrl: "https://github.com/Dev4077/radhakrishna-web",
    liveUrl: "https://radhakrishna.sakarsa.com/",
    category: "MERN Full-Stack",
    year: "2024",
    imageUrl: "https://constantsys.glozic.dev/vaibhavi-app/assets/Screenshot_2026-05-26_at_1.18.19_PM.png",
  },
];

export function Projects({ projects = [] }: { projects?: any[] }) {
  const allProjects = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const [filter, setFilter] = useState<string>("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(allProjects.map((p) => p.category).filter(Boolean))),
  ];

  const filtered =
    filter === "ALL" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sfx-tag text-[10px]">SELECTED WORKS</span>
            <span className="text-xs font-bold text-[#71717a]">CHAPTER 04</span>
          </div>
          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#18181b]">
            Featured Engineering Projects
          </h2>
          <p className="text-sm text-[#71717a] max-w-xl mt-2">
            Production-grade systems, AI-powered web applications, and real-world tools with responsive interfaces and robust backends.
          </p>
        </div>

        <a
          href="https://github.com/Dev4077"
          target="_blank"
          rel="noreferrer"
          className="manga-badge text-xs hover:border-[#18181b] self-start md:self-auto"
        >
          <span>View All on GitHub</span>
          <span aria-hidden="true">&#8599;</span>
        </a>
      </div>

      {/* Filter Tabs if multiple categories */}
      {categories.length > 2 && (
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === cat
                  ? "bg-[#18181b] text-white shadow-[2px_2px_0px_#dc2626]"
                  : "bg-[#fff1f2] text-[#18181b] border border-[#fee2e2] hover:border-[#18181b]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Projects List in Manga Panel Format */}
      <div className="flex flex-col gap-10">
        {filtered.map((project, idx) => (
          <div
            key={project.id || project._id || idx}
            className="manga-panel p-6 sm:p-8 bg-white grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Left: Project Details */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-xs font-bold text-white bg-[#18181b] px-2.5 py-1 rounded-md">
                    ACT #{(idx + 1).toString().padStart(2, "0")}
                  </span>
                  {project.category && (
                    <span className="manga-badge text-[11px] h-6 py-0 bg-[#fff1f2] border-[#fee2e2]">
                      {project.category}
                    </span>
                  )}
                  {project.year && (
                    <span className="text-xs font-mono text-[#71717a] ml-auto">
                      {project.year}
                    </span>
                  )}
                </div>

                <h3 className="font-sakuga-title text-2xl sm:text-3xl text-[#18181b] mb-3 leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-[#18181b]/80 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#dc2626]" /> Technologies &amp; Toolchain
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg border border-[#fee2e2] bg-[#fff1f2] text-xs font-bold text-[#18181b]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons using Sakuga Controls */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#fee2e2]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SakugaButton variant="primary">
                      Launch Demo ⚡
                    </SakugaButton>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SakugaButton variant="secondary">
                      GitHub Source ↗
                    </SakugaButton>
                  </a>
                )}
              </div>
            </div>

            {/* Right: Live Interactive Website Preview (iframe) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden border-2 border-[#18181b] bg-[#18181b] relative group shadow-[4px_4px_0px_#18181b] flex flex-col">
                {/* Browser Top Bar */}
                <div className="h-10 bg-[#18181b] text-white px-3 sm:px-4 flex items-center justify-between shrink-0 select-none border-b border-[#27272a]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                  </div>

                  {project.liveUrl ? (
                    <div className="flex items-center gap-1.5 bg-[#27272a] px-3 py-1 rounded-md text-[11px] font-mono text-[#a1a1aa] max-w-[200px] sm:max-w-[260px] truncate">
                      <span className="text-[#10b981] text-[10px]">🔒</span>
                      <span className="truncate">
                        {project.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-mono text-[#71717a]">
                      PREVIEW
                    </span>
                  )}

                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1 bg-[#10b981]/10 border border-[#10b981]/30 px-1.5 py-0.5 rounded text-[9px] font-bold text-[#10b981]">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10b981]"></span>
                      </span>
                      <span>LIVE</span>
                    </div>
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#a1a1aa] hover:text-[#ef4444] transition-colors p-1"
                        title="Open live site in new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Live Preview Iframe */}
                <div className="relative flex-1 w-full bg-white overflow-hidden">
                  {project.liveUrl ? (
                    <iframe
                      src={project.liveUrl}
                      title={`${project.title} Live Preview`}
                      className="w-full h-full border-0 bg-white"
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center screentone-bg bg-[#fff1f2]">
                      <div className="w-12 h-12 rounded-xl bg-[#18181b] text-white flex items-center justify-center font-sakuga-title text-xl mb-3 shadow-[2px_2px_0px_#dc2626]">
                        {(idx + 1).toString().padStart(2, "0")}
                      </div>
                      <span className="font-sakuga-title text-base text-[#18181b]">
                        {project.title}
                      </span>
                      <span className="sfx-tag text-[9px] mt-2 bg-[#dc2626]">
                        PRODUCTION READY
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
