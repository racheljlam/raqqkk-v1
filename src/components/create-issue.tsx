"use client";

import { useState, type FormEvent } from "react";
import { createIssue, site } from "@/data/site";
import { GitHubMark, LinkedInMark, Mail } from "./icons";
import { Avatar, buttonClass, TypeIcon } from "./ui";

const fieldLabel = "block text-xs font-semibold text-soft";
const fieldBox =
  "mt-1.5 w-full rounded-[4px] border border-line bg-sunken px-3 py-2 text-[15px] text-ink placeholder:text-faint focus:border-brand focus:bg-card focus:outline-none focus:ring-1 focus:ring-brand";
const readOnlyBox =
  "mt-1.5 flex items-center gap-2 rounded-[4px] border border-line bg-sunken px-3 py-2 text-[15px]";

/**
 * The contact form, dressed as a "Create issue" dialog. Submitting builds a
 * mailto: link from the two fields and opens the visitor's own email app;
 * nothing is sent to any server.
 */
export function CreateIssue() {
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const subject = encodeURIComponent(summary.trim() || createIssue.fallbackSubject);
    const body = encodeURIComponent(description.trim());
    window.location.href = `mailto:${site.email}?subject=${subject}${body ? `&body=${body}` : ""}`;
  }

  return (
    <section id="create" className="scroll-mt-28 border-t border-line py-12 sm:py-16">
      <div className="mx-auto max-w-2xl overflow-hidden rounded-[8px] border border-line bg-card shadow-raised">
        <header className="border-b border-line px-5 py-4 sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight">{createIssue.title}</h2>
          <p className="mt-0.5 text-[15px] text-soft">{createIssue.intro}</p>
        </header>

        <form onSubmit={onSubmit} className="space-y-5 px-5 py-5 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className={fieldLabel}>Project</span>
              <p className={readOnlyBox}>
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-[4px] bg-brand text-[10px] font-bold text-brand-ink">
                  {site.firstName[0]}
                </span>
                <span className="truncate">
                  {site.name} ({site.key})
                </span>
              </p>
            </div>
            <div>
              <span className={fieldLabel}>Issue type</span>
              <p className={readOnlyBox}>
                <TypeIcon type="bug" />
                <span className="truncate">{createIssue.issueType}</span>
              </p>
            </div>
          </div>

          <div>
            <label htmlFor="issue-summary" className={fieldLabel}>
              Summary
            </label>
            <input
              id="issue-summary"
              type="text"
              value={summary}
              onChange={(event) => setSummary(event.target.value)}
              placeholder={createIssue.summaryPlaceholder}
              className={fieldBox}
            />
          </div>

          <div>
            <label htmlFor="issue-description" className={fieldLabel}>
              Description
            </label>
            <textarea
              id="issue-description"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder={createIssue.descriptionPlaceholder}
              className={`${fieldBox} resize-y leading-relaxed`}
            />
          </div>

          <div>
            <span className={fieldLabel}>Assignee</span>
            <p className={readOnlyBox}>
              <Avatar small />
              {site.name}
              <span className="text-faint">(automatic)</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-5">
            <button type="submit" className={buttonClass("primary", true)}>
              {createIssue.submit}
            </button>
            <p className="min-w-0 flex-1 basis-56 text-[13px] leading-snug text-faint">{createIssue.hint}</p>
          </div>
        </form>

        <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-sunken px-5 py-3.5 text-sm sm:px-6">
          {site.email ? (
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline">
              <Mail className="h-4 w-4" />
              {site.email}
            </a>
          ) : null}
          {site.linkedin ? (
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
            >
              <LinkedInMark className="h-4 w-4" />
              LinkedIn
            </a>
          ) : null}
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-brand hover:underline"
          >
            <GitHubMark className="h-4 w-4" />
            GitHub
          </a>
        </footer>
      </div>

      <p className="mx-auto mt-5 max-w-2xl text-center text-sm text-faint">{createIssue.note}</p>
    </section>
  );
}
