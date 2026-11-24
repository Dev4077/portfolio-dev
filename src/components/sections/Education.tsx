"use client";

import React from "react";
import { GraduationCap, Award, MapPin, Calendar, BookOpen } from "lucide-react";
import { formatDateRange } from "@/lib/format-date";

const DEFAULT_EDUCATIONS = [
  {
    institution: "Sarvajanik College of Engineering & Technology (GTU)",
    degree: "B.E. in Information Technology",
    field: "Information Technology",
    location: "Surat, Gujarat",
    startDate: "Jun 2020",
    endDate: "Jun 2024",
    current: false,
    grade: "8.79 CGPA",
    description:
      "Comprehensive degree focusing on core Computer Science foundations: Data Structures & Algorithms, Distributed Systems, Database Management Systems, Cloud Computing, and Software Engineering methodologies.",
    achievements: [],
  },
  {
    institution: "Gujarat Secondary and Higher Secondary Education Board",
    degree: "HSC (12th Grade)",
    field: "Science A Group (Physics, Chemistry, Math)",
    location: "Surat, Gujarat",
    startDate: "June 2019",
    endDate: "June 2020",
    current: false,
    grade: "72%",
    description:
      "Rigorous pre-university scientific curriculum emphasizing analytical problem solving and mathematics.",
    achievements: ["Completed NCC training"],
  },
];

export function Education({ educations = [] }: { educations?: any[] }) {
  const allEdu = educations && educations.length > 0 ? educations : DEFAULT_EDUCATIONS;

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 border-b-2 border-[#1d1a4a]/10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="sfx-tag text-[10px]">FOUNDATIONS</span>
            <span className="text-xs font-bold text-[#8580b0]">CHAPTER 06</span>
          </div>
          <h2 className="font-sakuga-title text-3xl sm:text-4xl text-[#1d1a4a]">
            Academic Foundation &amp; Training
          </h2>
          <p className="text-sm text-[#8580b0] max-w-xl mt-2">
            Computer science fundamentals, software engineering coursework, and technical rigor.
          </p>
        </div>

        <div className="text-xs font-bold text-[#8580b0]">
          ACADEMIC DOSSIER
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {allEdu.map((edu, idx) => (
          <div
            key={edu.id || edu._id || idx}
            className="manga-card p-6 sm:p-8 bg-white flex flex-col justify-between hover:border-[#1d1a4a]"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold bg-[#1d1a4a] text-white px-3 py-1 rounded-full">
                  {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                </span>
                {edu.grade && (
                  <span className="manga-badge text-[11px] h-6 py-0 manga-badge-pink font-bold">
                    ★ {edu.grade}
                  </span>
                )}
              </div>

              <h3 className="font-sakuga-title text-xl sm:text-2xl text-[#1d1a4a] mb-1">
                {edu.degree}
              </h3>

              <div className="text-sm font-bold text-[#ff5fa8] mb-4 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>{edu.institution}</span>
              </div>

              {edu.description && (
                <p className="text-xs sm:text-sm text-[#8580b0] leading-relaxed mb-4">
                  {edu.description}
                </p>
              )}
            </div>

            {edu.achievements && edu.achievements.length > 0 && (
              <div className="pt-3 border-t border-[#dcdaf0] flex flex-wrap gap-2">
                {edu.achievements.map((ach: string, aIdx: number) => (
                  <span
                    key={aIdx}
                    className="px-2.5 py-1 rounded-md bg-[#f4f3fc] border border-[#dcdaf0] text-xs font-bold text-[#1d1a4a]"
                  >
                    ✓ {ach}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
