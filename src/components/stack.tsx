import { site, stack } from "@/data/site";
import { Avatar, LabelRow, Section } from "./ui";

/** The stack as a "components" table: every component has the same lead. */
export function Stack() {
  return (
    <Section id="stack" title={stack.title} intro={stack.intro}>
      <div className="overflow-hidden rounded-[8px] border border-line">
        <div className="hidden grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_8rem] gap-6 border-b border-line bg-sunken px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-faint md:grid">
          <span>Component</span>
          <span>Labels</span>
          <span>Lead</span>
        </div>

        <dl className="divide-y divide-line">
          {stack.groups.map((group) => (
            <div
              key={group.name}
              className="grid gap-x-6 gap-y-2.5 bg-card px-4 py-4 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)_8rem] md:items-center"
            >
              <dt>
                <span className="block text-[15px] font-semibold">{group.name}</span>
                <span className="block text-[13px] text-faint">{group.aka}</span>
              </dt>
              <dd>
                <LabelRow items={group.items} className="gap-1.5" />
              </dd>
              <dd className="hidden items-center gap-2 text-sm text-soft md:flex">
                <Avatar small />
                {site.firstName}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
