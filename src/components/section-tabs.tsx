"use client";

import { useEffect, useRef, useState } from "react";
import { tabs } from "@/data/site";

/** The project tab strip. The underline follows whichever section is on screen. */
export function SectionTabs() {
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((el): el is HTMLElement => el !== null);

    // Watch a thin band just below the sticky header: whichever section crosses
    // it is the current one. The band starts a little under the header so that
    // jumping to a tab does not leave the previous section still touching it.
    const inBand = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) inBand.add(entry.target.id);
          else inBand.delete(entry.target.id);
        }
        const current = tabs.find((tab) => inBand.has(tab.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-130px 0px -60% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // On phones the strip scrolls sideways: keep the current tab in view.
  const strip = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = strip.current;
    const link = nav?.querySelector<HTMLElement>(`a[href="#${active}"]`);
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    nav.scrollTo({
      left: link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <nav
      ref={strip}
      aria-label="Sections"
      className="no-scrollbar relative mx-auto max-w-[1180px] overflow-x-auto px-4 sm:px-6"
    >
      <ul className="flex gap-1">
        {tabs.map((tab) => {
          const current = tab.id === active;
          return (
            <li key={tab.id}>
              <a
                href={`#${tab.id}`}
                aria-current={current ? "true" : undefined}
                className={`relative block whitespace-nowrap px-2.5 pb-2.5 pt-2 text-sm font-medium transition-colors ${
                  current ? "text-brand" : "text-soft hover:text-ink"
                }`}
              >
                {tab.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-1 bottom-0 h-[3px] rounded-t-full ${
                    current ? "bg-brand" : "bg-transparent"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
