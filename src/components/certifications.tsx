import type { ReactNode } from "react";
import { certifications, type IssueType, type Tone } from "@/data/site";
import { IssueKey, Lozenge, Section, TypeIcon } from "./ui";

const columns = "md:grid-cols-[minmax(0,1.7fr)_minmax(0,1.2fr)_5.5rem_8rem]";

type Row = { key: number; name: string; issuer: string; date: string; tone: Tone; status: string };

/** A list of closed tickets: name, who issued it, when, and a status pill. */
function TicketTable({
  heading,
  issuerHeading,
  type,
  rows,
}: {
  heading: string;
  issuerHeading: string;
  type: IssueType;
  rows: Row[];
}) {
  return (
    <div className="overflow-hidden rounded-[8px] border border-line">
      <div
        className={`hidden gap-6 border-b border-line bg-sunken px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-faint md:grid ${columns}`}
      >
        <span>{heading}</span>
        <span>{issuerHeading}</span>
        <span>Date</span>
        <span>Status</span>
      </div>

      <ul className="divide-y divide-line">
        {rows.map((row) => (
          <li key={row.key} className={`grid gap-x-6 gap-y-1.5 bg-card px-4 py-3.5 md:items-center ${columns}`}>
            <p className="flex items-start gap-2.5">
              <span className="mt-[3px] flex shrink-0 items-center gap-2.5">
                <TypeIcon type={type} />
                <IssueKey n={row.key} />
              </span>
              <span className="text-[15px] font-semibold leading-snug">{row.name}</span>
            </p>
            <p className="text-sm text-soft">{row.issuer}</p>
            <p className="font-mono text-xs text-faint">{row.date}</p>
            <p>
              <Lozenge tone={row.tone}>{row.status}</Lozenge>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Subheading({ children }: { children: ReactNode }) {
  return <h3 className="mb-3 mt-9 text-lg font-semibold tracking-tight">{children}</h3>;
}

/** Certifications and awards. Lapsed certificates say so instead of looking current. */
export function Certifications() {
  return (
    <Section id="certifications" title={certifications.title} intro={certifications.intro}>
      <TicketTable
        heading="Certification"
        issuerHeading="Issued by"
        type="epic"
        rows={certifications.items.map((cert) => ({
          ...cert,
          tone: cert.expired ? "todo" : "done",
          status: cert.expired ? certifications.expiredStatus : certifications.status,
        }))}
      />

      <Subheading>{certifications.awardsTitle}</Subheading>
      <TicketTable
        heading="Award"
        issuerHeading="From"
        type="story"
        rows={certifications.awards.map((award) => ({
          ...award,
          tone: "done",
          status: certifications.awardsStatus,
        }))}
      />
    </Section>
  );
}
