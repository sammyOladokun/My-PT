import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';
import { ExternalLink, Mail } from 'lucide-react';
import Link from 'next/link';

const IntroductionPage = async () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Samuel Oladokun</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          A coder by day, problem-solver by night!
        </PageHeaderHeading>
        <PageHeaderDescription>
          I am a dedicated Software Engineer specializing in full-stack
          application development. I enjoy crafting responsive web solutions
          using modern technologies like Next.js, React, Tailwind CSS, Node.js,
          Express, and MongoDB, while also applying DevOps practices, continuously
          aiming to deliver high-quality, comprehensive, user-centric software solutions.
        </PageHeaderDescription>
        <PageActions>
          <Button
            asChild
            size="sm"
            className="rounded-full border border-primary/35 bg-background/55 px-4 py-2 text-foreground shadow-[0_0_0_1px_rgba(168,85,247,0.22),0_0_30px_rgba(168,85,247,0.42),0_18px_54px_rgba(124,58,237,0.28)] backdrop-blur-md transition-all hover:border-primary/55 hover:bg-background/70 hover:shadow-[0_0_0_1px_rgba(168,85,247,0.3),0_0_42px_rgba(168,85,247,0.58),0_20px_64px_rgba(124,58,237,0.35)]"
          >
            <Link href={siteConfig.links.email}>
              Send Email
              <Mail className="size-4 text-primary/70" />
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            variant="ghost"
            className="rounded-full border border-border/30 bg-background/45 px-4 py-2 text-foreground shadow-[0_12px_32px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all hover:border-border/60 hover:bg-background/60"
          >
            <Link href={siteConfig.links.resume} target="_blank">
              Get Resume
              <ExternalLink className="size-3 text-primary/75" strokeWidth={2} />
            </Link>
          </Button>
        </PageActions>
      </PageHeader>

      <Pager
        prevHref="/"
        nextHref="/about"
        prevTitle="Previous"
        nextTitle="About Me"
      />
    </>
  );
};
export default IntroductionPage;
