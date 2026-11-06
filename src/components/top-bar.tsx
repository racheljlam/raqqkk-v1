import { site } from "@/data/site";
import { Plus } from "./icons";
import { SectionTabs } from "./section-tabs";
import { ThemeToggle } from "./theme-toggle";
import { Avatar, buttonClass } from "./ui";

/** The app header: brand, theme switcher, the blue Create button, then the tab strip. */
export function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-page">
      <div className="mx-auto flex h-14 max-w-[1180px] items-center gap-3 px-4 sm:px-6">
        <a href="#summary" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-[5px] bg-brand text-sm font-bold text-brand-ink">
            {site.firstName[0]}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[15px] font-semibold leading-tight tracking-tight">
              {site.name}
            </span>
            <span className="hidden truncate text-xs leading-tight text-faint sm:block">
              {site.projectType}
            </span>
          </span>
        </a>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <a href="#create" className={buttonClass("primary")}>
            <Plus className="h-4 w-4" />
            Create
          </a>
          <span className="hidden sm:block">
            <Avatar />
          </span>
        </div>
      </div>

      <SectionTabs />
    </header>
  );
}
