"use client";

import * as React from "react";
import Link from "next/link";
import {
  BarChart3,
  BriefcaseBusiness,
  GraduationCap,
  Home,
  Mail,
  Menu,
  FolderKanban,
  Sparkles,
  Wrench,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function CommandMenu() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  const internalLinks = docsConfig.sidebarNav.flatMap((group: any) => group.items);

  const closeMenu = React.useCallback(() => setOpen(false), []);

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={menuRef} className="relative hidden md:block">
      <Button
        id="desktop-menu-button"
        variant="outline"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={open ? "desktop-menu-panel" : undefined}
        className={cn(
          "h-9 rounded-full border-border/60 bg-background/70 px-4 text-sm font-medium shadow-none transition-all hover:bg-accent"
        )}
      >
        <Menu className="size-4" />
        Menu
      </Button>

      {open ? (
        <div
          id="desktop-menu-panel"
          role="menu"
          aria-labelledby="desktop-menu-button"
          className="absolute right-0 top-full z-50 mt-2 w-[min(18rem,calc(100vw-2rem))] origin-top-right overflow-hidden rounded-2xl border border-border/60 bg-background/90 shadow-xl shadow-black/10 backdrop-blur-xl"
        >
          <div className="max-h-[70vh] overflow-y-auto p-2">
            <div className="space-y-1">
              {internalLinks.map((item: any) => (
                <MenuLink
                  key={item.href}
                  href={item.href}
                  active={pathname === item.href}
                  onNavigate={closeMenu}
                >
                  <MenuIcon href={item.href} />
                  <span className="flex-1">{item.title}</span>
                </MenuLink>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MenuIcon({ href }: { href: string }) {
  const iconClassName = "size-3.5 shrink-0";

  switch (href) {
    case "/":
      return <Home className={iconClassName} />;
    case "/about":
      return <UserRound className={iconClassName} />;
    case "/projects":
      return <FolderKanban className={iconClassName} />;
    case "/skills-tools":
      return <Wrench className={iconClassName} />;
    case "/experience":
      return <BriefcaseBusiness className={iconClassName} />;
    case "/education":
      return <GraduationCap className={iconClassName} />;
    case "/contact":
      return <Mail className={iconClassName} />;
    case "/stats":
      return <BarChart3 className={iconClassName} />;
    default:
      return <Sparkles className={iconClassName} />;
  }
}

function MenuLink({
  href,
  children,
  active,
  external,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  external?: boolean;
  onNavigate?: () => void;
}) {
  const sharedClassName = cn(
    "flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all hover:border-border hover:bg-accent/60",
    active
      ? "border-primary/30 bg-primary/10 text-foreground"
      : "border-border/40 bg-background/40 text-muted-foreground"
  );

  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={sharedClassName}
      {...(onNavigate ? { onClick: onNavigate } : {})}
    >
      {children}
    </Link>
  );
}
