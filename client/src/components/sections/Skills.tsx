import { motion } from "framer-motion";
import { useListSkills } from "@workspace/api-client-react";
import { asArray } from "@/lib/api-data";
import { Skeleton } from "@/components/ui/skeleton";
import * as SiIcons from "react-icons/si";

export function Skills() {
  const { data, isLoading } = useListSkills();
  const skills = asArray(data);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, (typeof skills)[number][]>);

  return (
    <section id="skills" className="py-24 relative z-20 bg-secondary/20 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="space-y-2 mb-12">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
            <span className="text-primary font-mono text-xl mr-2">02.</span>
            Technical Arsenal
          </h2>
          <div className="h-1 w-20 bg-primary/50 rounded-full"></div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-6 w-32 bg-secondary/50" />
                <div className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-12 w-full bg-secondary/50" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : groupedSkills ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-mono text-foreground border-b border-white/10 pb-2 inline-block">
                  {category}
                </h3>
                <div className="space-y-4 mt-4">
                  {categorySkills.sort((a, b) => (a.order || 0) - (b.order || 0)).map((skill, index) => {
                    const IconComponent = skill.icon ? (SiIcons as any)[skill.icon] : null;
                    return (
                      <div key={skill.id} className="group glass-panel p-3 rounded-lg border border-white/5 hover:border-primary/50 transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center space-x-2">
                            {IconComponent && <IconComponent className="text-muted-foreground group-hover:text-primary transition-colors h-4 w-4" />}
                            <span className="font-mono text-sm">{skill.name}</span>
                          </div>
                          <span className="font-mono text-xs text-primary">{skill.proficiency}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.proficiency}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No skills available.</p>
        )}
      </div>
    </section>
  );
}
