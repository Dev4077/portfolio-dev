"use client";

import * as SiIcons from "react-icons/si";

export function Skills({ skills = [] }: { skills?: any[] }) {

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, (typeof skills)[number][]>);

  if (skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 px-6 lg:px-8 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-16">
        <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground">
          Core Technologies
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {Object.entries(groupedSkills).map(([category, categorySkills]: [string, any[]]) => (
          <div key={category} className="flex flex-col">
            <h3 className="text-sm font-sans font-medium text-foreground mb-4 pb-2 border-b border-border/50">
              {category}
            </h3>
            <ul className="space-y-3">
              {categorySkills.sort((a, b) => (a.order || 0) - (b.order || 0)).map((skill) => {
                const IconComponent = skill.icon ? (SiIcons as any)[skill.icon] : null;
                return (
                  <li key={skill.id} className="flex items-center text-sm font-sans text-muted-foreground group">
                    {IconComponent && <IconComponent className="mr-3 h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-accent transition-colors" />}
                    <span className="group-hover:text-foreground transition-colors">{skill.name}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
