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
            style={
              {
                '--card-accent': project.accent,
                backgroundColor: 'transparent',
                backgroundImage: 'none',
                boxShadow: 'none',
                backdropFilter: 'none',
              } as CSSProperties
            }
            className="project-card relative w-full cursor-pointer isolate overflow-hidden border-transparent bg-transparent shadow-none backdrop-blur-0 transition-all duration-300 supports-[backdrop-filter]:bg-transparent md:hover:scale-[1.03]"
          >
            <div className="project-card__accent absolute left-6 top-0 h-1 w-16 rounded-b-full md:top-6 md:h-0.5 md:w-20" />
            <CardHeader className="md:pt-12">
              <CardTitle className="leading-6">{project.title}</CardTitle>
              <CardDescription className="flex flex-col gap-2">
                {project.tagline}
                <Link
                  href={`/projects/${project.slug}`}
                  className="project-card__cta font-medium transition-colors hover:opacity-80"
                >
                  Learn More...
                  <span className="absolute inset-0"></span>
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
