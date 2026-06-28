"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Icons } from "./icons";

export function MainNav() {
  return (
    <div className="hidden md:flex items-center">
      <Link href="/" className="flex items-center gap-2.5">
        <Icons.logo className="h-6 w-6 shrink-0" />
        <span className="hidden font-semibold tracking-tight lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
    </div>
  );
}
