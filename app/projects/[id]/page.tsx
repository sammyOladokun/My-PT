import { Icons } from '@/components/icons';
import { projects } from '@/constants/projects';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Badge } from '@/components/ui/badge';

import { siteConfig } from '@/config/site';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

const techIconMap: Record<string, keyof typeof Icons> = {
  'react.js': 'react',
  react: 'react',
  'tailwind css': 'tailwind',
  vite: 'vite',
  'framer motion': 'FramerMotionIcon',
  vercel: 'vercel',
  'next.js': 'nextjs',
  nextjs: 'nextjs',
  'sadcn/ui': 'shadcnui',
  'shadcn/ui': 'shadcnui',
  'shadcn-ui': 'shadcnui',
  mongodb: 'mongodb',
  'radix ui': 'radixui',
  typescript: 'typescript',
  redux: 'ReduxIcon',
  html: 'html',
  css: 'css',
  javascript: 'javascript',
  'github api': 'gitHub',
};

function getTechIcon(tech: string) {
  const normalized = tech.toLowerCase().trim();

  return techIconMap[normalized];
}

const getProject = async (slug: string) => {
  return projects.find((project) => project.slug === slug);
};

const ProjectDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const project = await getProject(id);

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!project) {
    return (
      <>
        <h2 className="text-destructive">Project not found</h2>
        <Link
          href="/projects"
          className="text-muted-foreground flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to projects
        </Link>
      </>
    );
  }

  return (
    <div>
      <div className="navigation">
        <Link
          href="/projects"
          className="flex items-center gap-2 mb-4 text-muted-foreground cursor-pointer w-fit"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back to projects
        </Link>
      </div>

      <PageHeader>
        <PageHeaderHeading>{project.title}</PageHeaderHeading>
        <PageHeaderDescription>{project.tagline}</PageHeaderDescription>
        <PageHeaderDescription>{project.overview}</PageHeaderDescription>
      </PageHeader>

      <div id="badges" className="my-4">
        <h2 className="text-lg font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap items-center gap-2">
          {project.techStack?.map((tech) => (
            <Badge
              variant="outline"
              className="inline-flex items-center gap-2 rounded-full border-border/50 bg-background/60 px-3.5 py-1.5 text-sm font-medium shadow-sm backdrop-blur-sm transition-colors hover:bg-background/80"
              key={tech}
            >
              {getTechIcon(tech) ? (
                <>
                  {Icons[getTechIcon(tech)!]?.({
                    className: 'size-4 shrink-0 text-current',
                    'aria-hidden': 'true',
                  })}
                  <span>{tech}</span>
                </>
              ) : (
                <span>{tech}</span>
              )}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 font-light">
        <div id="features" className="my-4">
          <h2 className="text-lg font-semibold">Features</h2>
          <ul className="list-disc list-outside">
            {project.features?.map((feature) => (
              <li className="ml-4 pl-2" key={feature}>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div id="challenges" className="my-4">
          <h2 className="text-lg font-semibold">Challenges</h2>
          <ul className="list-disc list-outside">
            {project.challenges?.map((challenge) => (
              <li className="ml-4 pl-2" key={challenge}>
                {challenge}
              </li>
            ))}
          </ul>
        </div>

        <div id="learnings" className="my-4">
          <h2 className="text-lg font-semibold">Learnings</h2>
          <ul className="list-disc list-outside ">
            {project.learnings?.map((learning) => (
              <li className="ml-4 pl-2" key={learning}>
                {learning}
              </li>
            ))}
          </ul>
        </div>

        {project.feedback && (
          <div id="feedback" className="my-4">
            <h2 className="text-lg font-semibold">Feedback</h2>
            <p>
              For feedback or suggestions, contact me at:{' '}
              <Link href={siteConfig.links.email}>
                <span className="text-primary">
                  {siteConfig.links.email.replace('mailto:', '')}
                </span>
              </Link>
            </p>
          </div>
        )}

        {project.links && (
          <div id="links" className="my-4">
            <h2 className="text-lg font-semibold">
              {project.links.live && project.links.github ? 'Links' : 'Link'}
            </h2>

            <div className="flex flex-wrap items-center gap-2">
              {project.links.live && (
                <Link href={project.links.live} target="_blank">
                  <Badge variant="default" className="px-4 text-base">
                    Live <ExternalLinkIcon className="w-4 h-4 -mt-2" />
                  </Badge>
                </Link>
              )}

              {project.links.github && (
                <Link href={project.links.github} target="_blank">
                  <Badge variant="outline" className="px-4 text-base">
                    Github <ExternalLinkIcon className="w-4 h-4 -mt-2" />
                  </Badge>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;
