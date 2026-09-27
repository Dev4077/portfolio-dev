"use client";

export function Education({ educations = [] }: { educations?: any[] }) {
  const sorted = educations.sort((a, b) => (a.order || 0) - (b.order || 0));

  if (sorted.length === 0) return null;

  return (
    <section id="education" className="py-24 px-6 lg:px-8 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-16">
        <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground">
          Education
        </h2>
      </div>

      <div className="max-w-3xl">
        <div className="relative border-l border-border/60 ml-3 md:ml-4 space-y-12 pb-4">
          {sorted.map((edu, idx) => (
            <div key={edu.id || idx} className="relative pl-8 md:pl-12">
              {/* Timeline Dot */}
              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-border border-2 border-background" />
              
              <div className="flex flex-col md:flex-row md:items-baseline mb-2">
                <div className="text-sm font-mono text-muted-foreground mb-1 md:mb-0 md:w-40 shrink-0">
                  {edu.startDate} — {edu.current ? "Present" : edu.endDate ?? ""}
                </div>
                <div>
                  <h3 className="text-lg font-sans font-medium text-foreground">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-sans text-muted-foreground mt-0.5">
                    {edu.institution}
                  </div>
                </div>
              </div>

              {edu.field && (
                <div className="text-xs font-sans font-medium text-accent mt-2 md:ml-40">
                  {edu.field}
                </div>
              )}
              
              {edu.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mt-3 md:ml-40 max-w-xl">
                  {edu.description}
                </p>
              )}

              {edu.achievements && edu.achievements.length > 0 && (
                <ul className="mt-4 md:ml-40 space-y-2 max-w-xl">
                  {edu.achievements.map((item: string, aIdx: number) => (
                    <li key={aIdx} className="text-sm text-muted-foreground leading-relaxed relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-[1px] before:bg-muted-foreground/50">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
