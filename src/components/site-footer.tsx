import { site } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-1.5 px-4 py-8 text-sm text-faint sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. {site.footer}
        </p>
        <p>{site.disclaimer}</p>
      </div>
    </footer>
  );
}
