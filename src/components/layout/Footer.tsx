"use client";

import Link from "next/link";
import { SakugaButton } from "@/components/sakuga";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#f4f3fc] border-t-2 border-[#1d1a4a] py-14 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Branding & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-sakuga-title text-2xl text-[#1d1a4a]">
              DEV SAKARSAWALA
            </span>
            <span className="sfx-tag text-[10px]">ドン!</span>
          </div>
          <p className="text-sm font-semibold text-[#8580b0] max-w-md">
            Full-Stack Developer &amp; Agentic AI Engineer. Engineered with clean architecture, robust backends, and anime impact physics.
          </p>
          <div className="text-xs text-[#8580b0] mt-3">
            &copy; {new Date().getFullYear()} Dev Sakarsawala. Powered by Sakuga VFX.
          </div>
        </div>

        {/* Right: Quick Links & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-3 text-xs font-bold text-[#1d1a4a]">
            <a
              href="https://github.com/Dev4077"
              target="_blank"
              rel="noreferrer"
              className="manga-badge hover:border-[#1d1a4a]"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/dev-sakarsawala/"
              target="_blank"
              rel="noreferrer"
              className="manga-badge hover:border-[#1d1a4a]"
            >
              LinkedIn ↗
            </a>
            <Link
              href="/admin"
              className="manga-badge text-[#8580b0] hover:text-[#1d1a4a]"
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
