import { photobooth, projects, trackr } from "@/data/site";
import { ArrowUpRight, Check, GitHubMark, Paperclip } from "./icons";
import { PhotoStrip } from "./photo-strip";
import { Avatar, FieldTitle, IssueKey, LabelRow, Lozenge, Section, TypeIcon } from "./ui";

const textLink =
  "group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-brand hover:underline";

/** The photo booth, opened up as a full ticket with an attachment. */
function PhotoboothIssue() {
  return (
    <article className="overflow-hidden rounded-[8px] border border-line bg-card shadow-card">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-5 py-3">
        <TypeIcon type="story" />
        <IssueKey n={photobooth.key} />
        <Lozenge tone="done">{photobooth.status}</Lozenge>
        <span className="ml-auto">
          <Avatar />
        </span>
      </header>

      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="p-5 sm:p-7">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{photobooth.name}</h3>
          <p className="mt-1.5 text-[17px] text-soft">{photobooth.tagline}</p>

          <div className="mt-7 space-y-6">
            <div>
              <FieldTitle>The problem</FieldTitle>
              <p className="mt-2 leading-relaxed">{photobooth.problem}</p>
            </div>
            <div>
              <FieldTitle>What I built</FieldTitle>
              <p className="mt-2 leading-relaxed">{photobooth.solution}</p>
            </div>
            <div>
              <FieldTitle>Acceptance criteria</FieldTitle>
              <ul className="mt-2.5 space-y-2.5">
                {photobooth.highlights.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-soft">
                    <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-[3px] bg-brand text-brand-ink">
                      <Check className="h-3 w-3" strokeWidth={3.2} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <FieldTitle>Labels</FieldTitle>
              <LabelRow items={photobooth.stack} className="mt-2.5" />
            </div>
          </div>

          <a href={photobooth.repo} target="_blank" rel="noreferrer" className={`${textLink} mt-7`}>
            <GitHubMark className="h-4 w-4" />
            View the code on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="order-first border-b border-line p-5 sm:p-7 lg:order-last lg:border-b-0 lg:border-l">
          <p className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-faint">
            <Paperclip className="h-3.5 w-3.5" />
            Attachments (1)
          </p>
          {/* The booth's own midnight palette, in both themes. */}
          <div className="relative mt-3 flex min-h-[24rem] items-center justify-center overflow-hidden rounded-[6px] bg-[#17123a] px-6 py-10">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#fff4da]/[0.07]" />
            <div aria-hidden="true" className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#e63946]/[0.12] blur-2xl" />
            <div className="relative">
              <PhotoStrip className="w-40 -rotate-[4deg] shadow-2xl shadow-black/50 sm:w-44" />
              <div className="absolute -right-14 bottom-16 rotate-[7deg] rounded-[8px] bg-[#fff4da] px-3.5 py-2.5 font-mono text-[#17123a] shadow-xl shadow-black/40 sm:-right-20">
                <p className="text-[9px] uppercase tracking-[0.25em] opacity-70">Pickup code</p>
                <p className="mt-0.5 text-xl font-bold tracking-[0.18em]">K7MQ2X</p>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-faint">strip-preview.png · an illustration, not a real guest</p>
        </div>
      </div>
    </article>
  );
}

function TrackrIssue() {
  return (
    <article className="rounded-[8px] border border-line bg-card shadow-card">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-5 py-3">
        <TypeIcon type="story" />
        <IssueKey n={trackr.key} />
        <Lozenge tone="progress">{trackr.status}</Lozenge>
        <span className="ml-auto">
          <Avatar />
        </span>
      </header>
      <div className="p-5 sm:p-7">
        <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{trackr.name}</h3>
        <p className="mt-1.5 text-[17px] text-soft">{trackr.tagline}</p>

        <div className="mt-7 grid gap-x-12 gap-y-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div>
              <FieldTitle>What I built</FieldTitle>
              <p className="mt-2 leading-relaxed">{trackr.solution}</p>
            </div>
            <div>
              <FieldTitle>Labels</FieldTitle>
              <LabelRow items={trackr.stack} className="mt-2.5" />
            </div>
          </div>

          <div>
            <FieldTitle>Acceptance criteria</FieldTitle>
            <ul className="mt-2.5 space-y-2.5">
              {trackr.highlights.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-soft">
                  <span className="mt-1 grid h-4 w-4 shrink-0 place-items-center rounded-[3px] bg-brand text-brand-ink">
                    <Check className="h-3 w-3" strokeWidth={3.2} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {trackr.link ? (
          <a href={trackr.link} target="_blank" rel="noreferrer" className={`${textLink} mt-7`}>
            View project
            <ArrowUpRight className="h-4 w-4" />
          </a>
        ) : (
          <p className="mt-7 text-sm text-faint">{trackr.note}</p>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <Section id="projects" title={projects.title} intro={projects.intro}>
      <div className="space-y-4">
        <PhotoboothIssue />
        <TrackrIssue />
      </div>
    </Section>
  );
}
