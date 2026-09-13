"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function Experience({ experiences = [] }: { experiences?: any[] }) {

  return (
    <section id="experience" className="py-24 px-8 lg:px-16 xl:px-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">EXPERIENCE</span>
        </div>

        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Career History
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            My professional journey in building scalable systems, leading technical teams, 
            and delivering high-impact software solutions.
          </p>
        </div>

        {experiences.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            // No experience loaded
          </p>
        ) : (
          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <div 
                key={exp.id}
                className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4 gap-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {exp.role} <span className="text-primary">@ {exp.company}</span>
                  </h3>
                  <div className="font-mono text-xs text-muted-foreground opacity-70">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate ?? ""}
                  </div>
                </div>
                
                {exp.description && (
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                    {exp.description}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-2 mt-4 pl-4 border-l border-white/10">
                    {exp.achievements.map((achievement: string, aIdx: number) => (
                      <li key={aIdx} className="text-muted-foreground text-sm leading-relaxed relative before:content-[''] before:absolute before:-left-4 before:top-2 before:w-2 before:h-[1px] before:bg-primary">
                        {achievement}
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
