"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export function MainNav() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 rounded-full border border-transparent px-3 py-2 transition-all hover:border-border/60 hover:bg-accent/40"
    >
      <Icons.logo className="h-6 w-6" />
      <span className="hidden font-semibold tracking-tight lg:inline-block">
        {siteConfig.name}
      </span>
    </Link>
  );
}
