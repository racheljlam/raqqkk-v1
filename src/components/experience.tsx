import { experience } from "@/data/site";
import { Check, ChevronDown } from "./icons";
import { Avatar, IssueKey, LabelRow, Lozenge, Section, TypeIcon } from "./ui";

/** Work history as a backlog: each employer is a sprint, each role a ticket in it. */
export function Experience() {
  const total = experience.sprints.length;

  return (
    <Section id="experience" title={experience.title} intro={experience.intro}>
      <ol className="space-y-4">
        {experience.sprints.map((sprint, i) => (
          <li key={sprint.company} className="overflow-hidden rounded-[8px] border border-line bg-sunken">
            <header className="flex flex-wrap items-center gap-x-2.5 gap-y-1 px-4 py-3">
              <ChevronDown className="h-4 w-4 shrink-0 text-faint" />
              <h3 className="text-sm font-semibold">
                <span className="text-faint">Sprint {total - i} · </span>
                {sprint.company}
              </h3>
              {sprint.note ? <span className="text-xs italic text-faint">({sprint.note})</span> : null}
              <span className="ml-auto text-xs text-faint">
                {sprint.roles.length} {sprint.roles.length === 1 ? "issue" : "issues"}
              </span>
            </header>

            <ul>
              {sprint.roles.map((role) => (
                <li key={role.key} className="border-t border-line bg-card px-4 py-4">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
                    <TypeIcon type="task" />
                    <IssueKey n={role.key} />
                    <h4 className="text-[15px] font-semibold">{role.title}</h4>
                    <span className="ml-auto flex items-center gap-2.5">
                      <span className="font-mono text-xs text-faint">{role.period}</span>
                      <Lozenge tone={role.current ? "progress" : "done"}>
                        {role.current ? "In progress" : "Done"}
                      </Lozenge>
                      <Avatar small />
                    </span>
                  </div>

                  <p className="mt-2.5 max-w-3xl text-[15px] leading-relaxed text-soft">{role.body}</p>

                  {role.items ? (
                    <ul className="mt-4 grid max-w-3xl gap-x-8 gap-y-2 sm:grid-cols-2">
                      {role.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                          <span className="mt-[3px] grid h-4 w-4 shrink-0 place-items-center rounded-[3px] bg-brand text-brand-ink">
                            <Check className="h-3 w-3" strokeWidth={3.2} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {role.labels ? <LabelRow items={role.labels} className="mt-4" /> : null}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Section>
  );
}
