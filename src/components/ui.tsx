import type { ReactNode } from "react";
import { site, type IssueType, type Tone } from "@/data/site";

/* ---------- Buttons ---------- */

const buttonBase =
  "inline-flex items-center justify-center gap-1.5 rounded-[4px] px-3 py-1.5 text-sm font-medium transition-colors";

const buttonVariants = {
  primary: "bg-brand text-brand-ink hover:bg-brand-hover",
  subtle: "bg-chip text-ink hover:bg-todo",
};

export const buttonClass = (variant: keyof typeof buttonVariants = "primary", large = false) =>
  `${buttonBase} ${buttonVariants[variant]} ${large ? "px-4 py-2.5 text-[15px]" : ""}`;

export function ButtonLink({
  href,
  variant = "primary",
  large = false,
  children,
}: {
  href: string;
  variant?: keyof typeof buttonVariants;
  large?: boolean;
  children: ReactNode;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={buttonClass(variant, large)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/* ---------- Ticket furniture ---------- */

const toneClass: Record<Tone, string> = {
  todo: "bg-todo text-todo-ink",
  progress: "bg-prog text-prog-ink",
  done: "bg-done text-done-ink",
};

/** The small uppercase status pill. */
export function Lozenge({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-[3px] px-1.5 py-0.5 text-[11px] font-bold uppercase leading-4 tracking-wide ${toneClass[tone]}`}
    >
      {children}
    </span>
  );
}

const typeStyle: Record<IssueType, { bg: string; label: string; glyph: ReactNode }> = {
  story: { bg: "bg-story", label: "Story", glyph: <path d="M5 3.5h6v9l-3-2.2-3 2.2z" fill="#fff" /> },
  task: {
    bg: "bg-task",
    label: "Task",
    glyph: <path d="M4.5 8.2l2.3 2.3 4.7-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />,
  },
  bug: { bg: "bg-bug", label: "Bug", glyph: <circle cx="8" cy="8" r="3" fill="#fff" /> },
  epic: { bg: "bg-epic", label: "Epic", glyph: <path d="M9 2.5L4.5 9H8l-1 4.5L11.5 7H8z" fill="#fff" /> },
};

/** The colored square that says what kind of ticket this is. */
export function TypeIcon({ type }: { type: IssueType }) {
  const { bg, label, glyph } = typeStyle[type];
  return (
    <span className={`inline-grid h-4 w-4 shrink-0 place-items-center rounded-[3px] ${bg}`} title={label}>
      <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
        {glyph}
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** A ticket number, like RJL-42. */
export function IssueKey({ n }: { n: number }) {
  return (
    <span className="shrink-0 text-xs font-medium text-faint">
      {site.key}-{n}
    </span>
  );
}

/** "me" is Rachel; "you" is the visitor. */
export function Avatar({ who = "me", small = false }: { who?: "me" | "you"; small?: boolean }) {
  const size = small ? "h-5 w-5 text-[9px]" : "h-6 w-6 text-[10px]";
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-full font-bold ${size} ${
        who === "me" ? "bg-brand text-brand-ink" : "bg-todo text-todo-ink"
      }`}
    >
      {who === "me" ? site.initials : "?"}
    </span>
  );
}

export function LabelChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-[3px] bg-chip px-1.5 py-0.5 text-xs leading-4 text-soft">
      {children}
    </span>
  );
}

export function LabelRow({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-1 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <LabelChip>{item}</LabelChip>
        </li>
      ))}
    </ul>
  );
}

/** The orange double chevron that marks "Highest" priority. */
export function PriorityHighest() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-bug" aria-hidden="true">
      <path
        d="M3.5 8.5L8 4l4.5 4.5M3.5 12.5L8 8l4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ---------- Page furniture ---------- */

/** One page section: an anchor target with a heading and a one-line intro. */
export function Section({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-12 sm:py-14">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      {intro ? <p className="mt-1.5 max-w-2xl text-[15px] leading-relaxed text-soft">{intro}</p> : null}
      <div className="mt-7">{children}</div>
    </section>
  );
}

/** A small uppercase heading inside a ticket, like "Description". */
export function FieldTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-xs font-semibold uppercase tracking-wide text-faint">{children}</h3>;
}
