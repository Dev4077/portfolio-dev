"use client";

import { Skeleton } from "@/components/ui/skeleton";
import * as SiIcons from "react-icons/si";

export function Skills({ skills = [] }: { skills?: any[] }) {

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, (typeof skills)[number][]>);

  return (
    <section id="skills" className="py-24 px-8 lg:px-16 xl:px-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">SKILLS</span>
        </div>

        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            Technical Arsenal
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Technologies and tools I use to architect and build robust applications.
          </p>
        </div>

        {skills.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            // No skills loaded
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div 
                key={category}
                className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold text-foreground mb-6 border-b border-white/10 pb-4">
                  {category}
                </h3>
                <div className="space-y-4">
                  {categorySkills.sort((a, b) => (a.order || 0) - (b.order || 0)).map((skill) => {
                    const IconComponent = skill.icon ? (SiIcons as any)[skill.icon] : null;
                    return (
                      <div key={skill.id} className="flex justify-between items-center group">
                        <div className="flex items-center space-x-3">
                          {IconComponent && <IconComponent className="text-muted-foreground group-hover:text-primary transition-colors h-5 w-5" />}
                          <span className="font-mono text-sm text-muted-foreground group-hover:text-foreground transition-colors">{skill.name}</span>
                        </div>
                        <span className="font-mono text-xs text-primary/70">{skill.proficiency}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
