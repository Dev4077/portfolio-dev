import { motion } from "framer-motion";
import { useListExperience } from "@workspace/api-client-react";
import { asArray } from "@/lib/api-data";
import { Skeleton } from "@/components/ui/skeleton";

export function Experience() {
  const { data, isLoading } = useListExperience();
  const experiences = asArray(data);

  const sortedExperiences = [...experiences].sort((a, b) => {
    if (a.order !== b.order) return (a.order || 0) - (b.order || 0);
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  return (
    <section id="experience" className="py-24 relative z-20 bg-secondary/10 border-y border-white/5">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-2 mb-16">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
            <span className="text-primary font-mono text-xl mr-2">04.</span>
            Where I've Built
          </h2>
          <div className="h-1 w-20 bg-primary/50 rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="space-y-8 pl-8 border-l border-secondary">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative pl-8 space-y-4">
                <div className="absolute w-4 h-4 bg-secondary rounded-full -left-[42px] top-1" />
                <Skeleton className="h-6 w-48 bg-secondary/50" />
                <Skeleton className="h-4 w-32 bg-secondary/50" />
                <Skeleton className="h-24 w-full bg-secondary/50" />
              </div>
            ))}
          </div>
        ) : sortedExperiences && sortedExperiences.length > 0 ? (
          <div className="relative border-l-2 border-secondary/50 timeline-glow ml-4 md:ml-8">
            {sortedExperiences.map((exp, idx) => {
              const startDate = exp.startDate;
              const endDate = exp.current ? "Present" : exp.endDate ?? "";

              return (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="mb-12 relative pl-8 md:pl-12 last:mb-0"
                >
                  {/* Timeline dot */}
                  <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[9px] top-1.5 shadow-[0_0_10px_rgba(0,255,255,0.5)]"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2 gap-2">
                    <h3 className="text-xl font-bold text-foreground">
                      {exp.role} <span className="text-primary">@ {exp.company}</span>
                    </h3>
                    <div className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                      {startDate} — {endDate}
                    </div>
                  </div>
                  
                  {exp.location && (
                    <div className="font-mono text-xs text-muted-foreground/70 mb-4">
                      {exp.location}
                    </div>
                  )}

                  {exp.description && (
                    <p className="text-muted-foreground text-sm mb-4">
                      {exp.description}
                    </p>
                  )}

                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {exp.achievements.map((achievement, aIdx) => (
                        <li key={aIdx} className="flex items-start text-muted-foreground text-sm">
                          <span className="text-primary mr-3 mt-1 font-mono text-xs">▹</span>
                          <span className="leading-relaxed">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No experience records found.</p>
        )}
      </div>
    </section>
  );
}
