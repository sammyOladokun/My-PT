"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMusic } from "react-icons/fi";

import { siteConfig } from "@/config/site";
import { Button } from "./ui/button";
import { ModeSwitcher } from "./mode-switcher";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { CommandMenu } from "./command-menu";
import { Icons } from "./icons";
import {
  MUSIC_FALLBACK_AUDIO_SRC,
  useMusicPlayer,
} from "@/hooks/use-music-player";

export function SiteHeader() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);
  const {
    fallbackActive,
    fallbackAudioRef,
    playing,
    playerHostRef,
    toggleMusic,
  } = useMusicPlayer();

  // Update time every second
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time as HH:MM:SS
  const formattedTime = mounted
    ? time.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    })
    : "--:--:--";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="md:hidden border-b border-border/20 !bg-transparent backdrop-blur-sm supports-[backdrop-filter]:bg-transparent">
        <div className="container-wrapper">
          <div className="container flex h-13 items-center">
            <MobileNav toggleMusic={toggleMusic} playing={playing} />
            <div className="ml-auto flex items-center gap-2 md:gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-border/15 bg-muted/5 px-3 py-1.5 backdrop-blur-sm lg:flex">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
                <span className="text-xs font-medium tabular-nums tracking-tight text-foreground">
                  {formattedTime}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                  onClick={toggleMusic}
                  title={playing ? "Pause Music" : "Play Music"}
                >
                  <FiMusic
                    className={`h-[18px] w-[18px] transition-colors ${
                      playing
                        ? "text-pink-500"
                        : fallbackActive
                          ? "text-amber-500"
                          : "text-muted-foreground"
                    }`}
                  />
                </Button>

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
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block px-4 pt-4">
        <div className="mx-auto flex max-w-6xl items-center gap-3 rounded-full border border-border/20 !bg-transparent px-4 py-3 shadow-lg shadow-black/8 backdrop-blur-sm supports-[backdrop-filter]:bg-transparent">
          <MainNav />

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border/15 bg-muted/5 px-3 py-1.5 backdrop-blur-sm lg:flex">
              <div className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <span className="text-xs font-medium tabular-nums tracking-tight text-foreground">
                {formattedTime}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full transition-all hover:scale-105 hover:bg-muted"
                onClick={toggleMusic}
                title={playing ? "Pause Music" : "Play Music"}
              >
                <FiMusic
                  className={`h-[18px] w-[18px] transition-colors ${
                    playing
                      ? "text-pink-500"
                      : fallbackActive
                        ? "text-amber-500"
                        : "text-muted-foreground"
                  }`}
                />
              </Button>

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

              <CommandMenu />
            </div>
          </div>
        </div>
      </div>

      {/* Persistent Audio */}
      <div
        ref={playerHostRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
      />
      <audio
        ref={fallbackAudioRef}
        src={MUSIC_FALLBACK_AUDIO_SRC}
        loop
        preload="auto"
        className="hidden"
      />
    </header>
  );
}
