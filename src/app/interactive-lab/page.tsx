import type { Metadata } from "next";
import Link from "next/link";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { InteractiveLabClient } from "./InteractiveLabClient";

export const metadata: Metadata = {
  title: "Interactive Lab | Dev Sakarsawala",
  description:
    "Explore 12 interactive UI controls engineered with keyframe anime physics, squash & overshoot springs, particle bursts, and drawn manga sound effects.",
};

export default function InteractiveLabPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#ffffff] text-[#18181b]" suppressHydrationWarning>
      {/* Top Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-[#18181b]/10" suppressHydrationWarning>
        <Sidebar />
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" suppressHydrationWarning>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#fee2e2]" suppressHydrationWarning>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#18181b] hover:text-[#dc2626] transition-colors"
          >
            <span>&larr;</span>
            <span>Back to Portfolio</span>
          </Link>

          <span className="sfx-tag text-[10px] bg-[#dc2626]">RED EDITION</span>
        </div>

        {/* Interactive Lab Client Component (ssr: false, zero hydration mismatch) */}
        <InteractiveLabClient />
      </main>

      <Footer />
    </div>
  );
}
