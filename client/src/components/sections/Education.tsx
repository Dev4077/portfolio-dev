import { motion } from "framer-motion";
import { useListEducation } from "@workspace/api-client-react";
import { asArray } from "@/lib/api-data";
import { Skeleton } from "@/components/ui/skeleton";
import { GraduationCap, MapPin, Award, Calendar } from "lucide-react";

export function Education() {
  const { data, isLoading } = useListEducation();
  const educationList = asArray(data);

  const sorted = [...educationList].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section id="education" className="py-24 relative z-20">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section header */}
        <div className="space-y-2 mb-16">
          <p className="font-mono text-primary text-sm tracking-widest uppercase">
            &gt; load education.json
          </p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
            <span className="text-primary font-mono text-xl mr-2">05.</span>
            Academic Background
          </h2>
          <div className="h-px w-full bg-gradient-to-r from-primary/40 via-primary/10 to-transparent mt-4" />
        </div>

        {isLoading ? (
          <div className="space-y-8 pl-8 border-l border-secondary">
            {[1, 2].map((i) => (
              <div key={i} className="relative pl-8 space-y-4">
                <div className="absolute w-4 h-4 bg-secondary rounded-full -left-[42px] top-1" />
                <Skeleton className="h-6 w-64 bg-secondary/50" />
                <Skeleton className="h-4 w-40 bg-secondary/50" />
                <Skeleton className="h-20 w-full bg-secondary/50" />
              </div>
            ))}
          </div>
        ) : sorted.length > 0 ? (
          <div className="relative border-l-2 border-secondary/50 ml-4 md:ml-8"
            style={{ boxShadow: "-1px 0 0 0 rgba(0,255,255,0.08)" }}>
            {sorted.map((edu, idx) => (
              <motion.div
                key={edu.id}
                data-testid={`education-entry-${edu.id}`}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="mb-12 relative pl-8 md:pl-12 last:mb-0"
              >
                {/* Glowing dot */}
                <div className="absolute w-4 h-4 bg-background border-2 border-primary rounded-full -left-[9px] top-1.5"
                  style={{ boxShadow: "0 0 12px rgba(0,255,255,0.5)" }} />

                {/* Card */}
                <div className="rounded-lg border border-white/8 bg-card/60 backdrop-blur-sm p-5 md:p-6 hover:border-primary/30 transition-colors duration-300"
                  style={{ boxShadow: "0 0 0 1px rgba(0,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)" }}>

                  {/* Top row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 w-8 h-8 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {edu.degree}
                        </h3>
                        <p className="text-primary font-mono text-sm mt-0.5">
                          {edu.field}
                        </p>
                      </div>
                    </div>

                    {/* Date badge */}
                    <div className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground whitespace-nowrap bg-secondary/60 px-3 py-1.5 rounded-md border border-white/5 self-start">
                      <Calendar className="w-3 h-3" />
                      {edu.startDate} — {edu.current ? "Present" : edu.endDate ?? ""}
                    </div>
                  </div>

                  {/* Institution row */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mb-3 pl-11">
                    <span className="font-semibold text-foreground/80">{edu.institution}</span>
                    {edu.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    )}
                    {edu.grade && (
                      <span className="flex items-center gap-1 text-accent font-mono">
                        <Award className="w-3 h-3" />
                        {edu.grade}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  {edu.description && (
                    <p className="text-muted-foreground text-sm leading-relaxed pl-11 mb-3">
                      {edu.description}
                    </p>
                  )}

                  {/* Achievements */}
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="space-y-1.5 pl-11">
                      {edu.achievements.map((item, aIdx) => (
                        <li key={aIdx} className="flex items-start text-muted-foreground text-sm">
                          <span className="text-primary mr-3 mt-1 font-mono text-xs flex-shrink-0">▹</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground font-mono text-sm pl-4 border-l-2 border-secondary/50">
            // No education records yet
          </p>
        )}
      </div>
    </section>
  );
}
