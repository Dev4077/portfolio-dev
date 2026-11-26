"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { SakugaButton, SakugaToggle } from "@/components/sakuga";

export function Sidebar({ about }: { about?: any }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [vfxMode, setVfxMode] = useState(true);
  const pathname = usePathname();
  const isHome = pathname === "/";

  const navItems = [
    { href: isHome ? "#about" : "/#about", label: "About" },
    { href: isHome ? "#skills" : "/#skills", label: "Skills" },
    { href: isHome ? "#projects" : "/#projects", label: "Selected Work" },
    { href: isHome ? "#experience" : "/#experience", label: "Experience" },
    { href: isHome ? "#education" : "/#education", label: "Education" },
    { href: isHome ? "#contact" : "/#contact", label: "Contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: { href: string }) => {
    if (!isHome) {
      // Allow standard Next.js navigation
      setIsMobileMenuOpen(false);
      return;
    }

    if (item.href.startsWith("#")) {
      e.preventDefault();
      const id = item.href.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  return (
    <>
      <header className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo: Real "D" logo with clean "Dev." typography */}
        <Link href="/" className="flex items-center gap-2.5 group whitespace-nowrap shrink-0">
          <div className="relative w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Dev Sakarsawala Logo"
              width={40}
              height={40}
              className="object-contain w-full h-full drop-shadow-[0_2px_4px_rgba(220,38,38,0.25)]"
              priority
            />
          </div>
          <span className="font-sakuga-title text-2xl sm:text-3xl text-[#18181b] leading-none tracking-tight">
            Dev<span className="text-[#dc2626]">.</span>
          </span>
          <span className="sfx-tag ml-0.5 text-[9px] bg-[#dc2626]">カチッ</span>
        </Link>

        {/* Desktop Nav: Inline items, no wordbreak */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 whitespace-nowrap overflow-x-auto no-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item)}
              className="px-3 py-1.5 rounded-full text-[13.5px] font-bold text-[#18181b] hover:bg-[#fff1f2] hover:text-[#dc2626] transition-all whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Header Right Actions: VFX toggle with label displayed BELOW (no hover tooltip) */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <div className="flex flex-col items-center justify-center pr-3 border-r border-[#fee2e2] leading-none">
            <div className="scale-65 -my-2.5 origin-center">
              <SakugaToggle
                label="Anime VFX Mode"
                checked={vfxMode}
                onChange={(val) => setVfxMode(val)}
              />
            </div>
            <span className="text-[9.5px] font-bold uppercase tracking-wider text-[#71717a] mt-0.5 whitespace-nowrap">
              VFX {vfxMode ? "ON" : "OFF"}
            </span>
          </div>

          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={(e) => handleNavClick(e, { href: isHome ? "#contact" : "/#contact" })}
            className="whitespace-nowrap"
          >
            <SakugaButton variant="secondary">
              Let&apos;s Talk 💬
            </SakugaButton>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-[#18181b] p-2 rounded-xl border-2 border-[#18181b] bg-[#fff1f2] shadow-[2px_2px_0px_#18181b] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 text-[#dc2626]" /> : <Menu className="h-5 w-5" />}
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
            className="lg:hidden bg-white border-b-2 border-[#18181b] px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className="font-sakuga-title text-lg py-1 border-b border-[#fff1f2] flex items-center justify-between text-[#18181b] hover:text-[#dc2626]"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-sans font-bold text-[#71717a]">&rarr;</span>
                </Link>
              ))}
              <div className="pt-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#71717a]">VFX Mode:</span>
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
