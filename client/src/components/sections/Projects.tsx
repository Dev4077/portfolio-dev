"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

export function Projects({ projects = [] }: { projects?: any[] }) {

  return (
    <section id="projects" className="py-24 px-8 lg:px-16 xl:px-24 border-t border-white/5 bg-background relative z-10">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">SHOWCASE</span>
        </div>

        <div className="mb-16 max-w-2xl">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-6">
            The Showcase
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A collection of projects showcasing infrastructure, automation, and system design. 
            Explore the applications below to see how business goals translate into technical reality.
            All links open in a new tab.
          </p>
        </div>

        {projects.length === 0 ? (
          <p className="text-muted-foreground font-mono text-sm">
            // No projects loaded
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-all duration-300 flex flex-col h-full group"
              >
                <div className="font-mono text-xs text-muted-foreground mb-4 opacity-50">
                  // {(idx + 1).toString().padStart(2, '0')}
                </div>
                
                <h4 className="text-xl font-bold text-foreground mb-4 flex items-center group-hover:text-primary transition-colors">
                  {project.liveUrl || project.githubUrl ? (
                    <a href={(project.liveUrl || project.githubUrl) || undefined} target="_blank" rel="noreferrer" className="flex items-center hover:text-primary">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h4>
                
                <p className="text-sm text-muted-foreground flex-grow mb-6 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech: string) => (
                    <span key={tech} className="font-mono text-[10px] text-muted-foreground bg-white/5 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
