"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function Education({ educations = [] }: { educations?: any[] }) {
  const sorted = educations.sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="education" className="py-24 px-8 lg:px-16 xl:px-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">EDUCATION</span>
        </div>

        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Academic Background
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Formal education and certifications that laid the foundation for my engineering career.
          </p>
        </div>

        {sorted.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            // No education loaded
          </p>
        ) : (
          <div className="space-y-6">
            {sorted.map((edu, idx) => (
              <div
                key={edu.id}
                className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {edu.degree} <span className="text-primary">@ {edu.institution}</span>
                  </h3>
                  <div className="font-mono text-xs text-muted-foreground opacity-70">
                    {edu.startDate} — {edu.current ? "Present" : edu.endDate ?? ""}
                  </div>
                </div>

                <div className="text-sm font-mono text-primary mb-4">{edu.field}</div>
                
                {edu.description && (
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {edu.description}
                  </p>
                )}

                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="space-y-2 mt-4 pl-4 border-l border-white/10">
                    {edu.achievements.map((item, aIdx) => (
                      <li key={aIdx} className="text-muted-foreground text-sm leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-2 before:h-[1px] before:bg-primary">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
