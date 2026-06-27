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
        <PageActions className="pl-1 sm:pl-2 md:pl-0">
          <Button
            asChild
            size="sm"
            className="resume-cta rounded-full border border-white/20 bg-white/10 text-foreground backdrop-blur-xl hover:border-white/30 hover:bg-white/15 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
          >
            <Link href={siteConfig.links.email}>
              Send Email
              <Mail className="size-4 text-primary/70" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="ghost" className="rounded-md">
            <Link href={siteConfig.links.resume} target="_blank">
              Get Resume
              <ExternalLink className="size-3 text-primary/70" strokeWidth={2} />
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
