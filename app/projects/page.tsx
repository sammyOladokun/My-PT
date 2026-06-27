import { PageHeader, PageHeaderHeading } from '@/components/page-header';
import Pager from '@/components/pager';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { projects } from '@/constants/projects';
import Link from 'next/link';
import type { CSSProperties } from 'react';

const ProjectsPage = () => {
  type CardAccentStyle = CSSProperties & Record<`--${string}`, string>;

  const accentBars = [
    {
      color: "#22d3ee",
      border: "rgba(34, 211, 238, 0.32)",
      glow: "rgba(34, 211, 238, 0.45)",
    },
    {
      color: "#f59e0b",
      border: "rgba(245, 158, 11, 0.32)",
      glow: "rgba(245, 158, 11, 0.45)",
    },
    {
      color: "#a78bfa",
      border: "rgba(167, 139, 250, 0.32)",
      glow: "rgba(167, 139, 250, 0.45)",
    },
    {
      color: "#34d399",
      border: "rgba(52, 211, 153, 0.32)",
      glow: "rgba(52, 211, 153, 0.45)",
    },
    {
      color: "#e879f9",
      border: "rgba(232, 121, 249, 0.32)",
      glow: "rgba(232, 121, 249, 0.45)",
    },
  ];

  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Projects</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          A lot of ideas, but some are still under construction!
        </PageHeaderHeading>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 card-container">
        {projects.map((project, index) => (
          <Card
            title={project.overview}
            key={index}
            className="group relative w-full overflow-hidden !border-white/10 !bg-transparent !shadow-none ring-1 ring-inset ring-white/10 backdrop-blur-[1px] transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.05] hover:shadow-none focus-within:border-[var(--card-accent-border)] focus-within:ring-[var(--card-accent-border)] focus-within:bg-white/[0.06] focus-within:shadow-[0_0_0_1px_var(--card-accent-border),0_0_18px_var(--card-accent-glow),0_12px_30px_rgba(0,0,0,0.08)] dark:!border-white/10 dark:!bg-transparent"
          style={{
            "--card-accent-color": accentBars[index % accentBars.length].color,
            "--card-accent-border": accentBars[index % accentBars.length].border,
            "--card-accent-glow": accentBars[index % accentBars.length].glow,
          } as CardAccentStyle}
        >
            <CardHeader className="relative pt-8">
              <span
                aria-hidden="true"
                className="absolute left-6 top-4 h-0.5 w-10 rounded-full"
                style={{
                  backgroundColor: accentBars[index % accentBars.length].color,
                  boxShadow: `0 0 14px ${accentBars[index % accentBars.length].glow}`,
                }}
              />
              <CardTitle className="leading-6 text-foreground">
                {project.title}
              </CardTitle>
              <CardDescription className="flex flex-col gap-2 text-muted-foreground/90">
                <span className="leading-6">{project.tagline}</span>
                <Link
                  href={`/projects/${project.slug}`}
                  className="relative z-10 inline-flex w-fit items-center text-sm font-medium transition-colors hover:opacity-100 focus-visible:outline-none"
                  style={{
                    color: accentBars[index % accentBars.length].color,
                  }}
                >
                  Learn More...
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <Pager
        prevHref="/about"
        nextHref="/skills-tools"
        prevTitle="About"
        nextTitle="Skills & Tools"
      />
    </>
  );
};
export default ProjectsPage;
