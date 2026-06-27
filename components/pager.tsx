"use client";

import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

const Pager = ({
  prevHref,
  nextHref,
  prevTitle,
  nextTitle,
}: {
  prevHref: string;
  nextHref: string;
  prevTitle: string;
  nextTitle: string;
}) => {
  const pathname = usePathname();
  const nextButtonRef = useRef<HTMLDivElement>(null);
  const [isNextVisible, setIsNextVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const nextButton = nextButtonRef.current;

    if (!nextButton || typeof IntersectionObserver === "undefined") {
      setIsNextVisible(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNextVisible(entry.isIntersecting);
      },
      {
        threshold: 0.4,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(nextButton);

    return () => {
      observer.disconnect();
    };
  }, [nextHref]);

  return (
    <div className="relative mt-8 flex w-full flex-row items-center justify-between">
      {prevHref !== pathname && (
        <Button variant="ghost" asChild>
          <Link href={prevHref}>
            <ChevronLeft />
            {prevTitle}
          </Link>
        </Button>
      )}

      <div ref={nextButtonRef} className="ml-auto">
        <Button variant="ghost" className="pager-next-cta" asChild>
          <Link href={nextHref}>
            {nextTitle}
            <ChevronRight />
          </Link>
        </Button>
      </div>

      {isMounted &&
        createPortal(
          <div
            aria-hidden={isNextVisible}
            className={cn(
              "pointer-events-none fixed bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-[calc(env(safe-area-inset-right)+1rem)] z-[60] w-fit max-w-[calc(100vw-1rem)] transition-all duration-300 ease-out sm:bottom-[calc(env(safe-area-inset-bottom)+1.25rem)] sm:right-[calc(env(safe-area-inset-right)+1.25rem)] md:bottom-[calc(env(safe-area-inset-bottom)+1.5rem)] md:right-[calc(env(safe-area-inset-right)+1.5rem)]",
              isNextVisible
                ? "translate-x-4 translate-y-4 opacity-0"
                : "translate-x-0 translate-y-0 opacity-100"
            )}
          >
            <div className="pager-scroll-hint relative inline-flex items-center overflow-hidden rounded-full border border-white/20 bg-white/10 px-2.5 py-2 shadow-2xl shadow-black/10 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 pager-scroll-hint__shine" />
              <div className="relative flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white shadow-inner shadow-white/10 dark:border-white/10 dark:bg-white/5">
              <ChevronDown className="size-3" />
            </span>
                <div className="min-w-0 leading-none">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-[7px]">
                    Scroll down
                  </p>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
};
export default Pager;
