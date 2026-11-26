"use client";

import Link from "next/link";
import Image from "next/image";
import { SakugaButton } from "@/components/sakuga";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#fff1f2] border-t-2 border-[#18181b] py-14 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
              <Image
                src="/logo.png"
                alt="Dev Sakarsawala Logo"
                width={32}
                height={32}
                className="object-contain w-full h-full drop-shadow-[0_2px_4px_rgba(220,38,38,0.25)]"
              />
            </div>
            <span className="font-sakuga-title text-2xl text-[#18181b]">
              DEV SAKARSAWALA
            </span>
            <span className="sfx-tag text-[10px] bg-[#dc2626]">ドン!</span>
          </div>
          <p className="text-sm font-semibold text-[#71717a] max-w-md">
            Full-Stack Developer &amp; Agentic AI Engineer. Engineered with clean architecture, robust backends, and anime impact physics.
          </p>
          <div className="text-xs text-[#71717a] mt-3">
            &copy; {new Date().getFullYear()} Dev Sakarsawala. Built with Dynamic Anime VFX &amp; High-Performance Architecture.
          </div>
        </div>

        {/* Right: Quick Links & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 text-xs font-bold text-[#18181b]">
            <Link
              href="/interactive-lab"
              className="manga-badge hover:border-[#dc2626] text-[#dc2626] bg-white border-[#fecdd3]"
            >
              Interactive Lab ⚡
            </Link>
            <a
              href="https://github.com/Dev4077"
              target="_blank"
              rel="noreferrer"
              className="manga-badge hover:border-[#18181b]"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/dev-sakarsawala/"
              target="_blank"
              rel="noreferrer"
              className="manga-badge hover:border-[#18181b]"
            >
              LinkedIn ↗
            </a>
            <Link
              href="/admin"
              className="manga-badge text-[#71717a] hover:text-[#18181b]"
              title="Admin Portal"
            >
              ⚙
            </Link>
          </div>

          <div>
            <SakugaButton variant="secondary" onClick={scrollToTop}>
              Top ↑
            </SakugaButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
