"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMusic } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";
import { ModeSwitcher } from "./mode-switcher";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "./command-menu";
import { Icons } from "./icons";
import { MUSIC_FALLBACK_AUDIO_SRC, useMusicPlayer } from "@/hooks/use-music-player";

export function SiteHeader() {
  const [time, setTime] = useState(new Date());
  const {
    fallbackAudioRef,
    loading,
    playerHostRef,
    playing,
    toggleMusic,
  } = useMusicPlayer();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = time.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent px-2 pt-2 sm:px-4 sm:pt-3 lg:px-6 lg:pt-4">
      <div className="mx-auto w-full max-w-[1600px] rounded-2xl border border-border/60 bg-background/75 px-4 shadow-[0_18px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 sm:px-5 lg:px-6">
        <div className="flex h-16 items-center">
          {/* Logo/Name - Left */}
          <MainNav />

          {/* Mobile Nav */}
          <MobileNav toggleMusic={toggleMusic} playing={playing} loading={loading} />

          {/* Desktop Nav - Right */}
          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {/* Live Clock */}
            <div className="hidden items-center gap-2 rounded-full border border-border/40 bg-muted/30 px-3 py-1.5 backdrop-blur-sm lg:flex">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <span className="text-xs font-medium tabular-nums tracking-tight text-foreground">
                {formattedTime}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1">
              {/* Music Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                onClick={toggleMusic}
                title={playing ? "Pause Music" : "Play Music"}
              >
                <FiMusic
                  className={`h-[18px] w-[18px] transition-colors ${
                    loading
                      ? "text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.45)] motion-safe:animate-[music-loading-beep_1s_linear_infinite]"
                      : playing
                        ? "text-pink-500"
                        : "text-muted-foreground"
                  }`}
                />
              </Button>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                asChild
              >
                <div>
                  <ModeSwitcher className="h-[18px] w-[18px]" />
                </div>
              </Button>

              {/* GitHub */}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                asChild
              >
                <Link 
                  href={siteConfig.links.github} 
                  target="_blank" 
                  rel="noreferrer"
                >
                  <Icons.gitHub className="h-[18px] w-[18px]" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            </div>

            {/* Command Menu - Hidden on mobile */}
            <div className="hidden md:block">
              <CommandMenu />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={playerHostRef}
        className="pointer-events-none absolute left-[-9999px] top-0 h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      />
      <audio ref={fallbackAudioRef} src={MUSIC_FALLBACK_AUDIO_SRC} loop preload="auto" />
    </header>
  );
}
