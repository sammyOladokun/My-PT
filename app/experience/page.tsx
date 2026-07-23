import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from '@/components/page-header';
import Pager from '@/components/pager';
import TimelineViewer from '@/components/timeline-viewer';
import { experiences } from '@/constants/experience';

const ExperiencePage = () => {
  return (
    <>
      <PageHeader className="mb-10">
        <PageHeaderHeading>Experience</PageHeaderHeading>
        <PageHeaderHeading className="mt-2 text-muted-foreground">
          My journey from hands-on training to real client and product work.
        </PageHeaderHeading>
        <PageHeaderDescription>
          I’ve worked on responsive interfaces, API integrations, reusable UI
          systems, and full-stack web applications using React, Next.js,
          Tailwind CSS, Node.js, Express, MongoDB, and PostgreSQL.
          Collaboration, code reviews, testing, and performance optimization
          are all part of the way I build.
        </PageHeaderDescription>
      </PageHeader>

      <TimelineViewer data={experiences} />

      <Pager
        prevHref="/skills-tools"
        nextHref="/education"
        prevTitle="Skills & Tools"
        nextTitle="Education"
      />
    </>
  );
};
export default ExperiencePage;
