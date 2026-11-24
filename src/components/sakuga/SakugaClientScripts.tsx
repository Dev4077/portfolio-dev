"use client";

import { useEffect, useState } from "react";

const SAKUGA_SCRIPTS = [
  "/sakuga-vfx/core.js",
  "/sakuga-vfx/button.js",
  "/sakuga-vfx/toggle.js",
  "/sakuga-vfx/slider.js",
  "/sakuga-vfx/checkbox.js",
  "/sakuga-vfx/radio.js",
  "/sakuga-vfx/input.js",
  "/sakuga-vfx/tabs.js",
  "/sakuga-vfx/progress.js",
  "/sakuga-vfx/rating.js",
  "/sakuga-vfx/toast.js",
  "/sakuga-vfx/tooltip.js",
];

export function SakugaClientScripts() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadScripts() {
      for (const src of SAKUGA_SCRIPTS) {
        if (!document.querySelector(`script[src="${src}"]`)) {
          await new Promise<void>((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.async = false;
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
          });
        }
      }
      if (mounted) {
        setLoaded(true);
      }
    }

    loadScripts();

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}

