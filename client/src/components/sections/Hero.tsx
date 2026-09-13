"use client";

import React from "react";
import { motion } from "framer-motion";

export function Hero({ about, skills }: { about?: any, skills?: any }) {
  const name = "Dev Sakarsawala";
  const heroBio1 = "Hi, I’m Dev. I’m a Full-Stack Developer with 2+ years of experience, building scalable products and intelligent systems with a focus on Agentic AI.";
  const heroBio2 = "I enjoy turning ideas into real-world products that make an impact. I focus on building scalable, reliable software with thoughtful design, strong engineering, and a mindset for solving complex problems.";
    
  const valueCards = [
    { title: "Full-Stack", description: "Expertise in building end-to-end applications from intuitive UIs to scalable backends." },
    { title: "Agentic AI", description: "Integrating intelligent, autonomous AI systems to automate complex workflows and problem-solving." },
    { title: "System Design", description: "Designing robust, distributed architectures that scale seamlessly with business needs." },
    { title: "Dev-ops", description: "Ensuring smooth deployments, CI/CD pipelines, and proactive infrastructure monitoring." }
  ];

  return (
    <section id="hero" className="min-h-screen pt-24 pb-12 px-8 lg:px-16 xl:px-24 flex flex-col justify-center relative">
      <div className="max-w-4xl">
        <div className="font-mono text-xs text-muted-foreground mb-12">
          ~/root <span className="text-primary mx-2">/</span> <span className="text-primary">HOME</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 mb-16"
        >
          <p className="text-xl md:text-2xl text-foreground font-sans leading-relaxed">
            {heroBio1}
          </p>
          <p className="text-lg text-muted-foreground font-sans leading-relaxed">
            {heroBio2}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-sm font-mono text-muted-foreground mb-8">How I add value:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {valueCards.map((card, idx) => (
              <div 
                key={idx} 
                className="bg-card/40 border border-white/5 p-8 rounded-lg hover:border-primary/50 transition-colors duration-300 group"
              >
                <h3 className="text-primary font-sans font-bold text-lg mb-4 group-hover:scale-105 transition-transform origin-left">{card.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
