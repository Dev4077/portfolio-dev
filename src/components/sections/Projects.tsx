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
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#1d1a4a]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sfx-tag text-[10px]">SELECTED WORKS</span>
            <span className="text-xs font-bold text-[#8580b0]">CHAPTER 04</span>
          </div>
          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#1d1a4a]">
            Featured Engineering Projects
          </h2>
          <p className="text-sm text-[#8580b0] max-w-xl mt-2">
            Production-grade systems, AI-powered web applications, and real-world tools with responsive interfaces and robust backends.
          </p>
        </div>

        <a
          href="https://github.com/Dev4077"
          target="_blank"
          rel="noreferrer"
          className="manga-badge text-xs hover:border-[#1d1a4a] self-start md:self-auto"
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
                  ? "bg-[#1d1a4a] text-white shadow-[2px_2px_0px_#ff5fa8]"
                  : "bg-[#f4f3fc] text-[#1d1a4a] border border-[#dcdaf0] hover:border-[#1d1a4a]"
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
                  <span className="font-mono text-xs font-bold text-white bg-[#1d1a4a] px-2.5 py-1 rounded-md">
                    ACT #{(idx + 1).toString().padStart(2, "0")}
                  </span>
                  {project.category && (
                    <span className="manga-badge text-[11px] h-6 py-0 bg-[#f4f3fc] border-[#dcdaf0]">
                      {project.category}
                    </span>
                  )}
                  {project.year && (
                    <span className="text-xs font-mono text-[#8580b0] ml-auto">
                      {project.year}
                    </span>
                  )}
                </div>

                <h3 className="font-sakuga-title text-2xl sm:text-3xl text-[#1d1a4a] mb-3 leading-snug">
                  {project.title}
                </h3>

                <p className="text-sm sm:text-base text-[#1d1a4a]/80 leading-relaxed mb-6 font-normal">
                  {project.description}
                </p>

                {/* Tech Stack Chips */}
                <div className="mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#8580b0] mb-2 flex items-center gap-1.5">
                    <Layers className="w-3 h-3 text-[#ff5fa8]" /> Technologies &amp; Toolchain
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack?.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg border border-[#dcdaf0] bg-[#f4f3fc] text-xs font-bold text-[#1d1a4a]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons using Sakuga Controls */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#dcdaf0]">
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

            {/* Right: Manga Illustration Container */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border-2 border-[#1d1a4a] bg-[#f4f3fc] relative group shadow-[3px_3px_0px_#1d1a4a]">
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center screentone-bg">
                    <div className="w-12 h-12 rounded-xl bg-[#1d1a4a] text-white flex items-center justify-center font-sakuga-title text-xl mb-3 shadow-[2px_2px_0px_#ff5fa8]">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    <span className="font-sakuga-title text-base text-[#1d1a4a]">
                      {project.title}
                    </span>
                    <span className="sfx-tag text-[9px] mt-2">PRODUCTION READY</span>
                  </div>
                )}

                <div className="absolute top-3 right-3 bg-[#1d1a4a]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
                  SDE ARCHITECTURE
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
