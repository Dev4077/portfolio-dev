"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle, TrendingUp, Sparkles } from "lucide-react";
import { formatDateRange } from "@/lib/format-date";

const DEFAULT_EXPERIENCES = [
  {
    company: "Constantsys",
    role: "Full-stack Developer (SDE)",
    location: "Surat, India",
    startDate: "2024-01-22T00:00:00.000Z",
    endDate: null,
    current: true,
    description:
      "Architecting scalable web applications and internal engineering tooling for enterprise clients across fintech and healthtech verticals.",
    achievements: [
      "Reduced API response time by 40% through query optimization and a distributed Redis caching layer",
      "Led migration of monolithic backend to Dockerized microservices, boosting deployment frequency by 3x",
      "Implemented automated CI/CD pipelines with GitHub Actions reducing deployment incidents to zero",
      "Mentored junior developers and established code review and engineering standards across the team",
    ],
  },
];

export function Experience({ experiences = [] }: { experiences?: any[] }) {
  const allExp = experiences && experiences.length > 0 ? experiences : DEFAULT_EXPERIENCES;

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#18181b]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sfx-tag text-[10px]">CHRONOLOGY</span>
            <span className="text-xs font-bold text-[#71717a]">CHAPTER 05</span>
          </div>
          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#18181b]">
            Professional Experience &amp; Battle Record
          </h2>
          <p className="text-sm text-[#71717a] max-w-xl mt-2">
            Engineering journey solving complex latency, scalability, and system architecture problems in production.
          </p>
        </div>

        <div className="text-xs font-bold text-[#71717a]">
          INDUSTRY TRACK RECORD
        </div>
      </div>

      {/* Experience Timeline */}
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {allExp.map((exp, idx) => (
          <div
            key={exp.id || exp._id || idx}
            className="manga-panel p-6 sm:p-8 bg-white relative"
          >
            {/* Top Row: Date Pill & Status */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold bg-[#18181b] text-white px-3 py-1 rounded-full">
                  {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                </span>
                {exp.current && (
                  <span className="manga-badge text-[11px] h-6 py-0 manga-badge-pink">
                    ● Current Role
                  </span>
                )}
              </div>

              {exp.location && (
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#71717a]">
                  <MapPin className="w-3.5 h-3.5 text-[#dc2626]" />
                  <span>{exp.location}</span>
                </div>
              )}
            </div>

            {/* Role & Company */}
            <div className="mb-4">
              <h3 className="font-sakuga-title text-2xl text-[#18181b]">
                {exp.role}
              </h3>
              <div className="text-base font-bold text-[#dc2626] mt-1 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                <span>{exp.company}</span>
              </div>
            </div>

            {/* Overview Description */}
            {exp.description && (
              <p className="text-sm text-[#18181b]/85 leading-relaxed mb-6 font-medium">
                {exp.description}
              </p>
            )}

            {/* Achievements Bullet List in Manga Style */}
            {exp.achievements && exp.achievements.length > 0 && (
              <div className="pt-4 border-t border-[#fee2e2]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717a] mb-3 flex items-center gap-1.5">
                  <TrendingUp className="w-3 h-3 text-[#dc2626]" /> Key Milestones &amp; Architecture Wins
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {exp.achievements.map((achievement: string, aIdx: number) => (
                    <div
                      key={aIdx}
                      className="p-3 rounded-xl bg-[#fff1f2] border border-[#fee2e2] flex items-start gap-2.5 text-xs font-bold text-[#18181b] leading-relaxed"
                    >
                      <span className="text-[#dc2626] text-sm shrink-0 mt-[-2px]">
                        ★
                      </span>
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
