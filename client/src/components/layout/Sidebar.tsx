"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Menu, X, Code2, Activity } from "lucide-react";

export function Sidebar({ about }: { about: any }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#hero", label: "HOME" },
    { href: "#about", label: "ABOUT" },
    { href: "#skills", label: "SKILLS" },
    { href: "#projects", label: "SHOWCASE" },
    { href: "#experience", label: "EXPERIENCE" },
    { href: "#education", label: "EDUCATION" },
    { href: "#contact", label: "CONTACT" },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Find the one that's most visible or just take the first one
          const mostVisible = visibleSections.reduce((prev, current) => 
            (prev.intersectionRatio > current.intersectionRatio) ? prev : current
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0, 0.2, 0.5, 0.8, 1.0],
      }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [navItems]);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const name = "Dev Sakarsawala";
  const tagline = about?.tagline || "Senior Full Stack Software Engineer";
  const profileImage = about?.profileImageUrl?.trim() || "/profile.png";

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-12 px-8 lg:px-12">
      <Link href="/" className="text-primary font-mono font-bold text-sm mb-12 block group">
        <span className="group-hover:text-foreground transition-colors">{name.split(" ")[0].toLowerCase()}.dev</span>
      </Link>

      <div className="mb-12">
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden mb-6 border-2 border-white/10 group hover:border-primary/50 transition-colors">
          <img src={profileImage} alt={name} className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500" />
        </div>
        <h1 className="text-2xl font-bold font-sans text-foreground mb-2">{name}</h1>
        <p className="text-sm font-mono text-primary leading-relaxed uppercase tracking-wider">{tagline}</p>
      </div>

      <nav className="flex-1 flex flex-col justify-center space-y-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className={`group flex items-center text-xs font-mono uppercase tracking-widest transition-all duration-300 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span 
                className={`h-[1px] bg-current transition-all duration-300 mr-4 ${
                  isActive ? "w-12" : "w-6 group-hover:w-12"
                }`} 
              />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-12 flex items-center space-x-6 text-muted-foreground">
        {about?.githubUrl && (
          <a href={about.githubUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </a>
        )}
        {about?.linkedinUrl && (
          <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
        )}
        <a href="#" className="hover:text-primary transition-colors">
          <Code2 className="h-5 w-5" />
        </a>
        <a href="#" className="hover:text-primary transition-colors">
          <Activity className="h-5 w-5" />
        </a>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full">
        <SidebarContent />
      </div>

      {/* Mobile Header & Animated Menu */}
      <div className="md:hidden">
        <div className="fixed top-0 left-0 right-0 h-16 bg-background/90 backdrop-blur-md border-b border-white/5 z-50 px-6 flex items-center justify-between">
          <Link href="/" className="text-primary font-mono font-bold text-sm">
            {name.split(" ")[0].toLowerCase()}.dev
          </Link>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-foreground p-2 -mr-2"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-24 px-6 pb-12 overflow-y-auto"
            >
              <nav className="flex flex-col space-y-8 mt-8">
                {navItems.map((item, idx) => (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={item.href}
                    href={item.href}
                    onClick={(e) => scrollTo(e, item.href)}
                    className="text-2xl font-sans font-bold text-foreground hover:text-primary transition-colors flex items-center"
                  >
                    <span className="text-primary font-mono text-sm mr-4">{String(idx + 1).padStart(2, '0')}.</span>
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-16 flex items-center justify-center space-x-8"
              >
                {about?.githubUrl && (
                  <a href={about.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                )}
                {about?.linkedinUrl && (
                  <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
