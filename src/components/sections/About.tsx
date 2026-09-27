"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

export function About({ about }: { about?: any }) {
  return (
    <section id="about" className="py-24 px-6 lg:px-8 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-8">
          <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground mb-8">
            About
          </h2>
          <div className="text-xl md:text-2xl font-sans text-foreground leading-relaxed font-medium">
            <p className="mb-6">
              I'm Dev — a builder, not just a coder.
            </p>
            <p className="text-muted-foreground">
              {about?.codingPhilosophy || "I enjoy solving real-world problems with technology. I'm curious about new ideas, AI, scalable systems, and building useful products."}
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 lg:pt-12">
          <div className="bg-muted/30 p-6 rounded-md border border-border/50">
            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground flex items-center mb-4">
              Currently Building
            </h3>
            
            <div className="flex items-start">
              <div className="mt-1 mr-3 text-accent bg-accent/10 p-1.5 rounded-sm">
                <Hammer className="h-4 w-4" />
              </div>
              <div>
                <h4 className="text-sm font-sans font-medium text-foreground mb-1">
                  Agentic Workflows
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Exploring autonomous agents that can plan and execute complex tasks using LangChain.
                </p>
                <a href="#projects" className="text-xs font-sans font-medium text-foreground hover:text-accent transition-colors">
                  View details &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
