"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function About({ about }: { about?: any }) {

  if (!about?.codingPhilosophy && !about?.projectsCompleted) return null;

  return (
    <section id="about" className="py-24 px-8 lg:px-16 xl:px-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">ABOUT</span>
        </div>
        
        <div className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-colors duration-300">
          {about.codingPhilosophy && (
            <div className="mb-8">
              <h3 className="text-primary font-sans font-bold text-lg mb-4">Philosophy</h3>
              <p className="text-muted-foreground text-sm leading-relaxed italic">
                "{about.codingPhilosophy}"
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">{about.projectsCompleted || 0}+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Projects Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-mono text-foreground">{about.technologiesUsed || 0}+</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Technologies Mastered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
