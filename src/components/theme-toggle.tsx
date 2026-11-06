"use client";

import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "./icons";

type Theme = "system" | "light" | "dark";

/** Must match the inline script in layout.tsx that applies the theme before first paint. */
const STORAGE_KEY = "theme";
const CHANGE_EVENT = "themechange";

const options: { value: Theme; label: string; Icon: typeof Sun }[] = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

function readTheme(): Theme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

/** "system" means no attribute, so the prefers-color-scheme media query decides. */
function paint(theme: Theme) {
  const root = document.documentElement;
  if (theme === "system") delete root.dataset.theme;
  else root.dataset.theme = theme;
}

function setTheme(theme: Theme) {
  try {
    if (theme === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode): the choice still applies for this visit.
  }
  paint(theme);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onChange: () => void) {
  // Another tab changed the theme: follow it here too.
  const onStorage = () => {
    paint(readTheme());
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function ThemeToggle() {
  // The server cannot know the stored choice, so it renders "system" and React
  // swaps in the real value right after hydration.
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "system");
  const current = options.find((option) => option.value === theme) ?? options[0];
  const next = options[(options.indexOf(current) + 1) % options.length];

  return (
    <>
      {/* Phones: one button that cycles System, Light, Dark. */}
      <button
        type="button"
        onClick={() => setTheme(next.value)}
        aria-label={`Theme: ${current.label}. Switch to ${next.label}.`}
        title={`Theme: ${current.label}`}
        className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] text-soft transition-colors hover:bg-hover sm:hidden"
      >
        <current.Icon className="h-4 w-4" />
      </button>

      {/* Wider screens: all three choices side by side. */}
      <div
        role="radiogroup"
        aria-label="Theme"
        className="hidden shrink-0 items-center gap-0.5 rounded-[5px] bg-chip p-0.5 sm:flex"
      >
        {options.map(({ value, label, Icon }) => {
          const active = value === theme;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              title={label}
              onClick={() => setTheme(value)}
              className={`flex h-7 items-center gap-1.5 rounded-[3px] px-2 text-xs font-medium transition-colors ${
                active ? "bg-card text-ink shadow-card" : "text-soft hover:text-ink"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">{label}</span>
              <span className="sr-only xl:hidden">{label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
