"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  Menu,
  Sparkles,
  Wrench,
} from "lucide-react";

import { docsConfig } from "@/config/docs";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Home: House,
  Introduction: House,
  About: BookOpen,
  "About Me": BookOpen,
  Projects: FolderKanban,
  "Skills & Tools": Wrench,
  Experience: BriefcaseBusiness,
  Education: GraduationCap,
  Contact: Mail,
  Stats: BarChart3,
  Testimonials: Sparkles,
};

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const mainNav = docsConfig?.mainNav ?? [];
  const sidebarNav = docsConfig?.sidebarNav ?? [];
  const pathname = usePathname();

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        rootRef.current &&
        event.target instanceof Node &&
        !rootRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const items = React.useMemo(() => {
    const combined = [
      ...mainNav.map((item: any) => ({
        title: item.title,
        href: item.href,
        Icon: ICONS[item.title] ?? House,
      })),
      ...sidebarNav.flatMap((group: any) =>
        (group.items ?? []).map((item: any) => ({
          title: item.title,
          href: item.href,
          Icon: ICONS[item.title] ?? House,
        }))
      ),
    ];

    const uniqueByHref = new Map<string, (typeof combined)[number]>();
    combined.forEach((item) => {
      if (item.href && !uniqueByHref.has(item.href)) {
        uniqueByHref.set(item.href, item);
      }
    });

    return Array.from(uniqueByHref.values());
  }, [mainNav, sidebarNav]);

  return (
    <div ref={rootRef} className="relative hidden md:block">
      <Button
        variant="ghost"
        className="h-9 rounded-full border border-border/35 bg-background/45 px-4 text-sm font-medium text-foreground shadow-[0_10px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all hover:border-border/60 hover:bg-background/60"
        onClick={() => setOpen((value) => !value)}
      >
        <Menu className="mr-2 h-4 w-4" />
        Menu
      </Button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-border/40 bg-background/80 p-2 shadow-[0_24px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
          <div className="mb-2 px-3 pt-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Navigation
          </div>
          <div className="space-y-1">
            {items.map(({ title, href, Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="font-medium">{title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
