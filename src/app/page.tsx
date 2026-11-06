import { Board } from "@/components/board";
import { Certifications } from "@/components/certifications";
import { CreateIssue } from "@/components/create-issue";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { SiteFooter } from "@/components/site-footer";
import { Stack } from "@/components/stack";
import { Summary } from "@/components/summary";
import { TopBar } from "@/components/top-bar";
import { Workflow } from "@/components/workflow";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[4px] focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-brand-ink"
      >
        Skip to content
      </a>
      <TopBar />
      <main id="main" className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <Summary />
        <Board />
        <Workflow />
        <Projects />
        <Experience />
        <Stack />
        <Certifications />
        <CreateIssue />
      </main>
      <SiteFooter />
    </>
  );
}
