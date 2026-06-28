"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function ScrollDownHint() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const target = document.querySelector<HTMLElement>("[data-scroll-hint-target='next-page']");

    if (!target) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 sm:bottom-5 sm:right-5">
      <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-border/40 bg-background/55 px-3 py-2 shadow-[0_14px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 motion-safe:animate-[pager-bounce_1.8s_ease-in-out_infinite]">
        <ChevronDown className="h-4 w-4 text-current" />
        <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-current">
          Scroll down
        </span>
      </div>
    </div>
  );
}
