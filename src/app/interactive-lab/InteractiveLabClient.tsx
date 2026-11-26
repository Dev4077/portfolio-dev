"use client";

import dynamic from "next/dynamic";

const SakugaStation = dynamic(
  () => import("@/components/sections/SakugaStation").then((mod) => mod.SakugaStation),
  {
    ssr: false,
    loading: () => (
      <div className="py-24 px-4 min-h-[450px] flex flex-col items-center justify-center gap-3">
        <div className="relative flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dc2626] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-[#dc2626]"></span>
        </div>
        <span className="text-sm font-bold text-[#18181b]">
          Initializing Anime VFX Controls...
        </span>
      </div>
    ),
  }
);

export function InteractiveLabClient() {
  return (
    <div suppressHydrationWarning>
      <SakugaStation />
    </div>
  );
}
