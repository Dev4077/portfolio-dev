"use client";

export function Experience({ experiences = [] }: { experiences?: any[] }) {
  return (
    <section id="experience" className="py-24 px-6 lg:px-8 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-16">
        <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground">
          Experience
        </h2>
        <span className="hidden md:inline-block text-xs font-sans text-muted-foreground">
          2+ years of professional experience
        </span>
      </div>

      {experiences.length === 0 ? (
        <p className="text-muted-foreground font-sans text-sm">
          No experience loaded
        </p>
      ) : (
        <div className="max-w-3xl">
          <div className="relative border-l border-border/60 ml-3 md:ml-4 space-y-12 pb-4">
            {experiences.map((exp, idx) => (
              <div key={exp.id || idx} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-border border-2 border-background" />
                
                <div className="flex flex-col md:flex-row md:items-baseline mb-2">
                  <div className="text-sm font-mono text-muted-foreground mb-1 md:mb-0 md:w-40 shrink-0">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate ?? ""}
                  </div>
                  <div>
                    <h3 className="text-lg font-sans font-medium text-foreground">
                      {exp.company}
                    </h3>
                    <div className="text-sm font-sans text-muted-foreground mt-0.5">
                      {exp.role}
                    </div>
                  </div>
                </div>

                {exp.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed mt-4 md:ml-40 max-w-xl">
                    {exp.description}
                  </p>
                )}

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="mt-4 md:ml-40 space-y-2 max-w-xl">
                    {exp.achievements.map((achievement: string, aIdx: number) => (
                      <li key={aIdx} className="text-sm text-muted-foreground leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-[1px] before:bg-muted-foreground/50">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
