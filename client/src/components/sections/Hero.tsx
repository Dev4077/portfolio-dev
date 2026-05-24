import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useGetAbout } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Terminal, Code, Cpu, Server } from "lucide-react";

const DEFAULT_ROLES = [
  "Full-stack Developer",
  "Software Engineer",
  "Problem Solver",
  "React + Node Expert",
];

const FALLBACK_IMAGE = "/profile.png";

export function Hero() {
  const { data: about } = useGetAbout();
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = about?.tagline
    ? [about.tagline, ...DEFAULT_ROLES.filter((r) => r !== about.tagline)]
    : DEFAULT_ROLES;

  const profileImage = about?.profileImageUrl?.trim() || FALLBACK_IMAGE;
  const heroBio =
    about?.bio ||
    "I engineer elite, production-grade applications that blend meticulous design with robust architecture. Building the future of software, one pixel at a time.";

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayText.length > 0) {
        timer = setTimeout(
          () => setDisplayText(currentRole.substring(0, displayText.length - 1)),
          50,
        );
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (displayText.length < currentRole.length) {
        timer = setTimeout(
          () => setDisplayText(currentRole.substring(0, displayText.length + 1)),
          100,
        );
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 pixel-grid opacity-50 z-0" />
      <div className="absolute inset-0 scanline z-10" />

      <div className="container relative z-20 mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col space-y-6 md:space-y-8 order-2 lg:order-1"
        >
          <div className="space-y-4">
            <h2 className="text-primary font-mono text-lg md:text-xl flex items-center">
              <span className="mr-2">&gt;</span>
              Hello World, I am
            </h2>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-sans font-bold text-foreground tracking-tight">
              Dev Sakarsawala
            </h1>
            <div className="h-10 sm:h-12 flex items-center">
              <span className="text-xl sm:text-2xl md:text-3xl font-mono text-muted-foreground">
                {displayText}
                <span className="animate-pulse text-primary">_</span>
              </span>
            </div>
          </div>

          <p className="text-muted-foreground max-w-lg text-base md:text-lg leading-relaxed">{heroBio}</p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              asChild
              size="lg"
              className="neon-border bg-primary/10 hover:bg-primary/20 text-primary font-mono"
              data-testid="btn-hero-projects"
            >
              <a href="#projects" onClick={(e) => handleScroll(e, "#projects")}>
                <Code className="mr-2 h-4 w-4" /> View Projects
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/10 hover:bg-white/5 font-mono"
              data-testid="btn-hero-contact"
            >
              <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                <Terminal className="mr-2 h-4 w-4" /> Contact Me
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative order-1 lg:order-2 flex flex-col items-center gap-6"
        >
          <div className="relative w-full max-w-[280px] sm:max-w-xs md:max-w-sm mx-auto">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-primary/40 via-accent/20 to-transparent blur-md" />
            <div className="relative glass-panel rounded-2xl overflow-hidden neon-border aspect-[4/5] sm:aspect-square">
              <img
                src={profileImage}
                alt="Dev Sakarsawala"
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src !== `${window.location.origin}${FALLBACK_IMAGE}`) {
                    img.src = FALLBACK_IMAGE;
                  }
                }}
              />
            </div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-3 -right-2 sm:-right-4 glass-panel px-3 py-2 rounded-lg flex items-center gap-2 neon-border bg-card/90 text-xs sm:text-sm"
            >
              <Cpu className="h-4 w-4 text-primary shrink-0" />
              <span className="font-mono font-semibold">99.9% Uptime</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-3 -left-2 sm:-left-4 glass-panel px-3 py-2 rounded-lg flex items-center gap-2 border border-white/10 bg-card/90 text-xs sm:text-sm"
            >
              <Server className="h-4 w-4 text-accent shrink-0" />
              <span className="font-mono font-semibold">Sub-50ms</span>
            </motion.div>
          </div>

          <div className="hidden lg:block w-full glass-panel rounded-xl overflow-hidden shadow-2xl neon-border">
            <div className="bg-secondary/50 border-b border-white/5 p-3 flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-destructive/80" />
              <div className="h-3 w-3 rounded-full bg-accent/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />
              <div className="ml-4 font-mono text-xs text-muted-foreground">~/dev-sakarsawala/workstation</div>
            </div>
            <div className="p-6 font-mono text-sm space-y-2 h-[200px] overflow-hidden relative">
              <div className="text-primary">$ whoami</div>
              <div className="text-foreground">Dev Sakarsawala — Full-stack Engineer</div>
              <div className="text-primary">$ cat stack.json</div>
              <div className="text-accent">["React", "Node.js", "MongoDB", "TypeScript"]</div>
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
