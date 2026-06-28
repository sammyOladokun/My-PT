import { projects } from '@/constants/projects';
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import type { ComponentType } from 'react';

import { siteConfig } from '@/config/site';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';

const TECH_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  'Next.js': Icons.nextjs,
  React: Icons.react,
  'React.js': Icons.react,
  'Tailwind CSS': Icons.tailwind,
  TypeScript: Icons.typescript,
  JavaScript: Icons.javascript,
  HTML: Icons.html,
  CSS: Icons.css,
  MongoDB: Icons.mongodb,
  Redux: Icons.ReduxIcon,
  'shadcn-ui': Icons.shadcn,
  'SadCn/UI': Icons.shadcn,
  'Radix UI': Icons.MaterialUIIcon,
  Vite: Icons.vercel,
  Vercel: Icons.vercel,
  Node: Icons.nodejs,
  'Node.js': Icons.nodejs,
  Express: Icons.express,
  Docker: Icons.docker,
  FastAPI: Icons.spinner,
  'GitHub API': Icons.gitHub,
  'GitHub': Icons.gitHub,
};

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
          {project.techStack?.map((tech) => {
            const TechIcon = TECH_ICONS[tech];
            return (
              <Badge
                variant="outline"
                className="flex items-center gap-1.5 px-4 text-base shadow-md"
                key={tech}
              >
                {TechIcon ? <TechIcon className="h-3.5 w-3.5" /> : null}
                {tech}
              </Badge>
            );
          })}
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
