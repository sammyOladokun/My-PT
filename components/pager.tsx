"use client";

import { ChevronRight } from "lucide-react";

import { ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <div className="flex flex-row items-center justify-between w-full mt-8">
      {prevHref !== pathname && (
        <Button variant="ghost" asChild>
          <Link href={prevHref}>
            <ChevronLeft />
            {prevTitle}
          </Link>
        </Button>
      )}

      <Button variant="ghost" className="ml-auto" asChild>
        <Link
          href={nextHref}
          data-scroll-hint-target="next-page"
          className="group relative overflow-hidden"
        >
          <span className="relative z-10">{nextTitle}</span>
          <ChevronRight className="relative z-10" />
          <span className="pointer-events-none absolute inset-y-0 left-[-45%] w-1/3 translate-x-0 bg-gradient-to-r from-transparent via-white/70 to-transparent opacity-80 blur-md animate-[pager-shimmer_2.8s_linear_infinite]" />
        </Link>
      </Button>
    </div>
  );
};
export default Pager;
