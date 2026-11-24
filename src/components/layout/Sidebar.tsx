"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SakugaButton, SakugaToggle } from "@/components/sakuga";

export function Sidebar({ about }: { about?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [vfxMode, setVfxMode] = useState(true);

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#vfx-station", label: "VFX Lab ⚡" },
    { href: "#projects", label: "Selected Work" },
    { href: "#experience", label: "Experience" },
    { href: "#education", label: "Education" },
    { href: "#contact", label: "Contact" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo: Clean "Dev." with comic sound effect tag - No "D" box, No "Sakuga Edition" subtitle */}
        <Link href="/" className="flex items-center gap-1 group whitespace-nowrap shrink-0">
          <span className="font-sakuga-title text-2xl sm:text-3xl text-[#1d1a4a] leading-none tracking-tight">
            Dev<span className="text-[#ff5fa8]">.</span>
          </span>
          <span className="sfx-tag ml-1.5 text-[9px]">カチッ</span>
        </Link>

        {/* Desktop Nav: Inline items, no wordbreak */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 whitespace-nowrap overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              className="px-3 py-1.5 rounded-full text-[13.5px] font-bold text-[#1d1a4a] hover:bg-[#f4f3fc] hover:text-[#ff5fa8] transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions: VFX toggle with label displayed BELOW (no hover tooltip) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-center justify-center pr-3 border-r border-[#dcdaf0] leading-none">
            <div className="scale-65 -my-2.5 origin-center">
              <SakugaToggle
                label="Sakuga VFX Mode"
                checked={vfxMode}
                onChange={(val) => setVfxMode(val)}
              />
            </div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#8580b0] mt-0.5 whitespace-nowrap">
              VFX {vfxMode ? "ON" : "OFF"}
            </span>
          </div>

          <a href="#contact" onClick={(e) => scrollTo(e, "#contact")} className="whitespace-nowrap">
            <SakugaButton variant="secondary">
              Let&apos;s Talk 💬
            </SakugaButton>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#1d1a4a] p-2 rounded-xl border-2 border-[#1d1a4a] bg-[#f4f3fc] shadow-[2px_2px_0px_#1d1a4a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-b-2 border-[#1d1a4a] px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => scrollTo(e, item.href)}
                  className="font-sakuga-title text-lg text-[#1d1a4a] hover:text-[#ff5fa8] py-1 border-b border-[#f4f3fc] flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-sans font-bold text-[#8580b0]">&rarr;</span>
                </a>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#8580b0]">VFX Mode:</span>
                <div className="scale-75 origin-right">
                  <SakugaToggle label="Mobile VFX Mode" checked={vfxMode} onChange={setVfxMode} />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
