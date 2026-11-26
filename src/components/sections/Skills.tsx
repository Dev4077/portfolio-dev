"use client";

import React, { useState } from "react";
import Link from "next/link";
import * as SiIcons from "react-icons/si";
import { Terminal, Cpu, Database, Cloud, Code, Wrench, Sparkles, CheckCircle2 } from "lucide-react";
import { SakugaButton, SakugaTabs, SakugaTooltip } from "@/components/sakuga";

const DEFAULT_SKILLS = [
  // Frontend
  { name: "React", category: "Frontend", icon: "SiReact", level: "Advanced" },
  { name: "Next.js", category: "Frontend", icon: "SiNextdotjs", level: "Advanced" },
  { name: "TypeScript", category: "Frontend", icon: "SiTypescript", level: "Advanced" },
  { name: "Tailwind CSS", category: "Frontend", icon: "SiTailwindcss", level: "Expert" },
  { name: "Redux / Toolkit", category: "Frontend", icon: "SiRedux", level: "Proficient" },
  { name: "HTML5 & CSS3", category: "Frontend", icon: "SiHtml5", level: "Expert" },

  // Backend
  { name: "Node.js", category: "Backend", icon: "SiNodedotjs", level: "Advanced" },
  { name: "Express.js", category: "Backend", icon: "SiExpress", level: "Advanced" },
  { name: "Python", category: "Backend", icon: "SiPython", level: "Advanced" },
  { name: "RESTful APIs", category: "Backend", icon: "SiFastapi", level: "Advanced" },
  { name: "Microservices", category: "Backend", icon: "SiKubernetes", level: "Proficient" },

  // Database
  { name: "MongoDB & Mongoose", category: "Database", icon: "SiMongodb", level: "Advanced" },
  { name: "PostgreSQL", category: "Database", icon: "SiPostgresql", level: "Proficient" },
  { name: "Redis Caching", category: "Database", icon: "SiRedis", level: "Advanced" },

  // AI & Agentic
  { name: "LangChain", category: "AI", icon: "SiLangchain", level: "Advanced" },
  { name: "LangGraph", category: "AI", icon: "SiOpenai", level: "Advanced" },
  { name: "Gemini API", category: "AI", icon: "SiGoogle", level: "Advanced" },
  { name: "Agent Architectures", category: "AI", icon: "SiAnthropic", level: "Advanced" },

  // DevOps & Cloud
  { name: "Docker", category: "DevOps", icon: "SiDocker", level: "Advanced" },
  { name: "AWS Cloud", category: "DevOps", icon: "SiAmazonwebservices", level: "Proficient" },
  { name: "CI/CD & GitHub Actions", category: "DevOps", icon: "SiGithubactions", level: "Advanced" },

  // Tools & Languages
  { name: "Git & GitHub", category: "Tools", icon: "SiGit", level: "Expert" },
  { name: "Postman", category: "Tools", icon: "SiPostman", level: "Advanced" },
  { name: "Linux / Bash", category: "Tools", icon: "SiLinux", level: "Advanced" },
];

export function Skills({ skills = [] }: { skills?: any[] }) {
  const allSkills = skills && skills.length > 0 ? skills : DEFAULT_SKILLS;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = [
    "ALL",
    ...Array.from(new Set(allSkills.map((s) => s.category).filter(Boolean))),
  ];

  const filteredSkills =
    selectedCategory === "ALL"
      ? allSkills
      : allSkills.filter((s) => s.category === selectedCategory);

  const getCategoryIcon = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "frontend":
        return <Code className="w-4 h-4 text-[#dc2626]" />;
      case "backend":
        return <Terminal className="w-4 h-4 text-[#ef4444]" />;
      case "database":
        return <Database className="w-4 h-4 text-[#18181b]" />;
      case "devops":
        return <Cloud className="w-4 h-4 text-[#dc2626]" />;
      case "ai":
        return <Sparkles className="w-4 h-4 text-[#dc2626]" />;
      default:
        return <Wrench className="w-4 h-4 text-[#71717a]" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sfx-tag text-[10px]">ARSENAL</span>
            <span className="text-xs font-bold text-[#71717a]">CHAPTER 03</span>
          </div>
          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#18181b]">
            Core Technologies &amp; Arsenal
          </h2>
          <p className="text-sm text-[#71717a] max-w-xl mt-2">
            Battle-tested frameworks, cloud infrastructure, and AI engineering libraries deployed across real-world systems.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/interactive-lab">
            <SakugaButton variant="primary">
              Interactive Lab ⚡
            </SakugaButton>
          </Link>
        </div>
      </div>

      {/* Category Filter Badges */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === cat
                ? "bg-[#18181b] text-white shadow-[3px_3px_0px_#dc2626] -translate-y-0.5"
                : "bg-[#fff1f2] text-[#18181b] border border-[#fee2e2] hover:border-[#18181b]"
            }`}
          >
            {cat !== "ALL" && getCategoryIcon(cat)}
            <span>{cat}</span>
          </button>
        ))}
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill, idx) => {
          const IconComp = skill.icon ? (SiIcons as any)[skill.icon] : null;

          return (
            <div
              key={skill.id || skill.name || idx}
              className="manga-card p-4 bg-white flex flex-col justify-between hover:border-[#18181b] group relative"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#fff1f2] border border-[#fee2e2] flex items-center justify-center text-[#18181b] group-hover:border-[#dc2626] group-hover:text-[#dc2626] transition-colors">
                    {IconComp ? (
                      <IconComp className="w-4 h-4" />
                    ) : (
                      <Terminal className="w-4 h-4" />
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717a]">
                    {skill.category}
                  </span>
                </div>

                <h3 className="font-sakuga-title text-sm text-[#18181b] group-hover:text-[#dc2626] transition-colors line-clamp-1">
                  {skill.name}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-[#fff1f2] flex items-center justify-between text-[11px] text-[#71717a]">
                <span>{skill.level || "Proficient"}</span>
                <span className="text-[10px] font-mono text-[#dc2626] opacity-0 group-hover:opacity-100 transition-opacity">
                  ★
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Lab Callout in Skills */}
      <div className="mt-8 manga-card p-5 bg-[#fff1f2] border-2 border-[#18181b] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[4px_4px_0px_#18181b]">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <span className="sfx-tag text-[10px] bg-[#dc2626]">INTERACTIVE</span>
          <div>
            <h4 className="font-sakuga-title text-base text-[#18181b]">
              Dynamic Anime UI Physics &amp; VFX Controls
            </h4>
            <p className="text-xs text-[#71717a] mt-0.5">
              Experience all 12 keyframe controls with real-time springs, spark bursts, and sound effects.
            </p>
          </div>
        </div>

        <Link href="/interactive-lab" className="shrink-0">
          <SakugaButton variant="secondary">
            Explore Interactive Lab ⚡
          </SakugaButton>
        </Link>
      </div>
    </section>
  );
}
