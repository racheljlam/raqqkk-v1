import { site, summary } from "@/data/site";
import { ArrowRight, Check } from "./icons";
import {
  Avatar,
  ButtonLink,
  FieldTitle,
  IssueKey,
  LabelRow,
  Lozenge,
  PriorityHighest,
  TypeIcon,
} from "./ui";

/** The hero, laid out as a ticket: the pitch is a user story with a details panel. */
export function Summary() {
  return (
    <section id="summary" className="scroll-mt-28 py-10 sm:py-14">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-faint">
        Projects <span aria-hidden="true">/</span> {site.name} <span aria-hidden="true">/</span>
        <span className="inline-flex items-center gap-1.5">
          <TypeIcon type={summary.type} />
          <IssueKey n={summary.key} />
        </span>
      </p>

      <div className="mt-5 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div>
          <h1 className="text-[2rem] font-semibold leading-[1.15] tracking-tight sm:text-[2.6rem] lg:text-5xl lg:leading-[1.1]">
            {summary.title}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-2.5">
            <ButtonLink href="#create" large>
              {summary.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#board" variant="subtle" large>
              {summary.secondaryCta}
            </ButtonLink>
            <Lozenge tone={site.available ? "done" : "todo"}>
              {site.available ? summary.status : summary.statusWhenBooked}
            </Lozenge>
          </div>

          <div className="mt-10">
            <FieldTitle>Description</FieldTitle>
            <p className="mt-2.5 max-w-2xl text-lg leading-relaxed text-soft">{summary.description}</p>
          </div>

          <div className="mt-9 max-w-2xl">
            <div className="flex items-center justify-between gap-4">
              <FieldTitle>{summary.criteriaTitle}</FieldTitle>
              <span className="text-xs font-medium text-faint">
                {summary.criteria.length} of {summary.criteria.length} done
              </span>
            </div>
            <div aria-hidden="true" className="mt-2.5 h-1.5 rounded-full bg-story" />
            <ul className="mt-3 divide-y divide-line rounded-[6px] border border-line">
              {summary.criteria.map((item) => (
                <li key={item} className="flex items-center gap-3 px-3.5 py-2.5 text-[15px]">
                  <span className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] bg-brand text-brand-ink">
                    <Check className="h-3 w-3" strokeWidth={3.2} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside aria-label="Details" className="h-fit rounded-[6px] border border-line">
          <h2 className="border-b border-line px-4 py-3 text-sm font-semibold">Details</h2>
          <dl className="space-y-4 px-4 py-4 text-sm">
            {summary.details.map((row) => (
              <div key={row.label} className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] items-center gap-3">
                <dt className="text-faint">{row.label}</dt>
                <dd className="flex items-center gap-2 font-medium">
                  {row.who ? <Avatar who={row.who} /> : null}
                  {row.priority ? <PriorityHighest /> : null}
                  {row.value}
                </dd>
              </div>
            ))}
            <div className="grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-3">
              <dt className="pt-0.5 text-faint">Labels</dt>
              <dd>
                <LabelRow items={summary.labels} />
              </dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  );
}
