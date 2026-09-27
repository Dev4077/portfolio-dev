"use client";

import { ExternalLink, ArrowRight } from "lucide-react";

export function Projects({ projects = [] }: { projects?: any[] }) {
  return (
    <section id="projects" className="py-24 px-6 lg:px-8 border-b border-border">
      <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-16">
        <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground">
          Selected Work
        </h2>
        <a href="#" className="hidden md:inline-flex items-center text-xs font-sans font-medium text-muted-foreground hover:text-foreground transition-colors group">
          View all projects <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground font-sans text-sm">
          No projects loaded
        </p>
      ) : (
        <div className="flex flex-col border-t border-border">
          {projects.map((project, idx) => (
            <div
              key={project.id || idx}
              className="group flex flex-col md:flex-row md:items-center py-8 border-b border-border hover:bg-muted/20 transition-all duration-200 relative"
            >
              {/* Left: Number */}
              <div className="md:w-16 shrink-0 mb-4 md:mb-0">
                <span className="text-sm font-mono text-muted-foreground">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
              </div>
              
              {/* Middle: Info */}
              <div className="flex-1 md:pr-12 mb-6 md:mb-0">
                <h3 className="text-xl font-sans font-medium text-foreground mb-2 flex items-center group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  {project.description}
                </p>
                <div className="text-xs font-sans text-muted-foreground mt-3">
                  Role: Full-Stack Developer
                </div>
              </div>
              
              {/* Right: Tech & Links */}
              <div className="md:w-64 shrink-0 flex flex-col justify-between">
                <div className="mb-4">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted-foreground mb-2">
                    Tech Stack
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1">
                    {project.techStack?.map((tech: string) => (
                      <span key={tech} className="text-sm font-sans text-foreground">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-sans font-medium text-muted-foreground hover:text-foreground transition-colors group/link">
                      Live Demo <ExternalLink className="ml-1 h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center text-xs font-sans font-medium text-muted-foreground hover:text-foreground transition-colors group/link">
                      GitHub <ExternalLink className="ml-1 h-3 w-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                  
                  {project.year && (
                    <span className="ml-auto text-sm font-mono text-muted-foreground">
                      {project.year}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 md:hidden">
        <a href="#" className="inline-flex items-center text-xs font-sans font-medium text-muted-foreground hover:text-foreground transition-colors group">
          View all projects <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </section>
  );
}
