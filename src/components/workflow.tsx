import { workflow } from "@/data/site";
import { ArrowRight } from "./icons";
import { Lozenge, Section } from "./ui";

/** The process, drawn as the statuses a ticket moves through. */
export function Workflow() {
  return (
    <Section id="workflow" title={workflow.title} intro={workflow.intro}>
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {workflow.steps.map((step, i) => (
          <li key={step.status} className="flex lg:items-stretch">
            <div className="flex-1 rounded-[6px] border border-line bg-card p-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-faint">{i + 1}</span>
                <Lozenge tone={step.tone}>{step.status}</Lozenge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-soft">{step.body}</p>
            </div>
            {i < workflow.steps.length - 1 ? (
              <ArrowRight
                className="mt-[1.1rem] hidden h-4 w-5 shrink-0 text-faint lg:block"
                strokeWidth={2}
              />
            ) : null}
          </li>
        ))}
      </ol>
    </Section>
  );
}
