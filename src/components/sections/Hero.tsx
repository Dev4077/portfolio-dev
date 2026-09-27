"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Sparkles, Cloud, Layers } from "lucide-react";

export function Hero({ about, skills }: { about?: any, skills?: any }) {
  const name = "Dev.";
  const role = "Full-Stack Developer";
  const experience = "with 2+ years of experience";
  
  const valueCards = [
    { 
      number: "01",
      icon: <Code2 className="h-4 w-4" />,
      title: "Full-Stack Products", 
      description: "Modern web applications with great user experiences and solid backend systems." 
    },
    { 
      number: "02",
      icon: <Sparkles className="h-4 w-4" />,
      title: "AI & Agentic Systems", 
      description: "Building intelligent systems with Python, LangChain, LangGraph and modern AI models." 
    },
    { 
      number: "03",
      icon: <Cloud className="h-4 w-4" />,
      title: "Cloud & DevOps", 
      description: "Deploying and maintaining scalable applications using AWS, Azure and modern infrastructure." 
    },
    { 
      number: "04",
      icon: <Layers className="h-4 w-4" />,
      title: "Product Engineering", 
      description: "Turning ideas into useful products with clean architecture and real-world usability." 
    }
  ];

  return (
    <>
      <section id="hero" className="pt-32 pb-24 px-6 lg:px-8 border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            <h1 className="text-4xl md:text-5xl font-sans font-medium text-foreground leading-tight tracking-tight mb-6">
              Hi, I'm Dev.<br/>
              <span className="text-muted-foreground">{role}</span><br/>
              <span className="text-muted-foreground">{experience},</span><br/>
              building scalable products and<br/>
              AI-powered experiences.
            </h1>
            
            <div className="flex items-center space-x-4 mt-12">
              <a 
                href="#projects" 
                className="inline-flex items-center justify-center px-6 py-3 bg-foreground text-background font-sans font-medium text-sm rounded-md hover:bg-foreground/90 transition-colors"
              >
                View my work &rarr;
              </a>
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent text-foreground border border-border font-sans font-medium text-sm rounded-md hover:bg-muted transition-colors"
              >
                Let's talk
              </a>
            </div>
            
            <div className="mt-8 flex items-center text-sm font-sans text-muted-foreground">
              <span className="relative flex h-2 w-2 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Available for new opportunities
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4 pt-2 lg:pt-0 flex flex-col items-start"
          >
            <div className="mb-10">
              <div className="relative w-24 h-24 overflow-hidden rounded-md border border-border/50">
                <img 
                  src={about?.profileImageUrl?.trim() || "/profile.png"} 
                  alt="Dev Sakarsawala" 
                  className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500" 
                />
              </div>
            </div>

            <h3 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground mb-4">
              Ideas &rarr; Code &rarr; Impact
            </h3>
            <p className="text-base text-muted-foreground font-sans leading-relaxed">
              I enjoy turning ideas into real products with clean, reliable software and thoughtful user experiences.
            </p>
          </motion.div>
          
        </div>
      </section>

      <section id="what-i-do" className="py-24 px-6 lg:px-8">
        <h2 className="text-xs font-sans font-bold uppercase tracking-widest text-foreground mb-12">
          What I Do
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {valueCards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * idx }}
              className="group flex flex-col"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-muted-foreground">{card.number}</span>
                <span className="text-muted-foreground group-hover:text-accent transition-colors">
                  {card.icon}
                </span>
              </div>
              <div className="h-px w-full bg-border mb-6 group-hover:bg-accent/30 transition-colors" />
              <h3 className="text-base font-sans font-medium text-foreground mb-3">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
