import { useState } from "react";
import { motion } from "framer-motion";
import { useListProjects } from "@workspace/api-client-react";
import { asArray } from "@/lib/api-data";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Folder } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const { data, isLoading } = useListProjects();
  const projects = asArray(data);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects
    .filter((p) => filter === "All" || p.category === filter)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const featuredProjects = filteredProjects?.filter(p => p.featured) || [];
  const standardProjects = filteredProjects?.filter(p => !p.featured) || [];

  return (
    <section id="projects" className="py-24 relative z-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-sans font-bold text-foreground">
              <span className="text-primary font-mono text-xl mr-2">03.</span>
              Featured Work
            </h2>
            <div className="h-1 w-20 bg-primary/50 rounded-full"></div>
          </div>

          {!isLoading && categories.length > 1 && (
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <Button 
                  key={cat} 
                  variant={filter === cat ? "default" : "outline"} 
                  size="sm"
                  onClick={() => setFilter(cat)}
                  className={filter === cat ? "bg-primary/20 text-primary border-primary/50" : "border-white/10 hover:border-primary/30 text-muted-foreground"}
                >
                  {cat}
                </Button>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="space-y-12">
            <Skeleton className="h-96 w-full bg-secondary/50 rounded-xl" />
            <Skeleton className="h-96 w-full bg-secondary/50 rounded-xl" />
          </div>
        ) : (
          <div className="space-y-24">
            {/* Featured Projects */}
            <div className="space-y-24">
              {featuredProjects.map((project, idx) => (
                <motion.div 
                  key={project.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 items-center relative`}
                >
                  {/* Image */}
                  <div className="w-full md:w-3/5 relative group">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500 rounded-xl z-10"></div>
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full aspect-video object-cover rounded-xl neon-border" />
                    ) : (
                      <div className="w-full aspect-video bg-secondary/80 rounded-xl neon-border flex items-center justify-center">
                        <Folder className="h-16 w-16 text-muted-foreground/30" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className={`w-full md:w-2/5 flex flex-col ${idx % 2 !== 0 ? 'md:items-start md:text-left' : 'md:items-end md:text-right'} relative z-20`}>
                    <p className="font-mono text-primary text-sm mb-2">Featured Project</p>
                    <h3 className="text-2xl font-bold text-foreground mb-6 hover:text-primary transition-colors">
                      {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">{project.title}</a> : project.title}
                    </h3>
                    
                    <div className="glass-panel p-6 rounded-lg text-muted-foreground text-sm leading-relaxed md:-ml-8 md:w-[calc(100%+2rem)] mb-6 shadow-2xl backdrop-blur-xl border-white/10 relative z-30">
                      {project.description}
                    </div>

                    <ul className={`flex flex-wrap gap-3 font-mono text-xs text-muted-foreground mb-6 ${idx % 2 !== 0 ? 'justify-start' : 'md:justify-end'}`}>
                      {project.techStack.map(tech => (
                        <li key={tech} className="bg-secondary/50 px-2 py-1 rounded">{tech}</li>
                      ))}
                    </ul>

                    <div className="flex items-center space-x-4 text-foreground">
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Standard Projects Grid */}
            {standardProjects.length > 0 && (
              <div className="pt-12">
                <h3 className="text-2xl font-sans font-bold text-center mb-12">Other Noteworthy Projects</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {standardProjects.map((project, idx) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="glass-panel p-6 rounded-xl border border-white/5 hover:-translate-y-2 hover:border-primary/50 transition-all duration-300 flex flex-col h-full group"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <Folder className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
                        <div className="flex items-center space-x-3">
                          {project.githubUrl && (
                            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                              <Github className="h-5 w-5" />
                            </a>
                          )}
                          {project.liveUrl && (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          )}
                        </div>
                      </div>
                      
                      <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-sm text-muted-foreground flex-grow mb-6">
                        {project.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {project.techStack.map(tech => (
                          <Badge key={tech} variant="outline" className="font-mono text-[10px] bg-secondary/30 border-white/10 text-muted-foreground group-hover:text-primary/80">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
