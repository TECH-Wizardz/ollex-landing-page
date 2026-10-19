"use client";

import { useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";
import { THEME_STORAGE_KEY, type ThemePreference } from "@/lib/theme";

const OPTIONS: [ThemePreference, string][] = [
  ["system", "Auto"],
  ["light", "Light"],
  ["dark", "Dark"],
];

const THEME_CHANGE_EVENT = "ollex-theme-change";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(THEME_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(THEME_CHANGE_EVENT, onChange);
  };
}

function getSnapshot(): ThemePreference {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : "system";
  } catch {
    return "system";
  }
}

function getServerSnapshot(): ThemePreference {
  return "system";
}

function applyTheme(next: ThemePreference) {
  const root = document.documentElement;
  if (next === "system") delete root.dataset.theme;
  else root.dataset.theme = next;

  try {
    if (next === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // Storage can be blocked; the choice then lasts until the page reloads.
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

/** Auto / Light / Dark. "Auto" follows the visitor's system setting through CSS. */
export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className="inline-flex gap-0.5 rounded-rl-full border border-lp-border p-0.75"
    >
      {OPTIONS.map(([value, label]) => {
        const selected = theme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => applyTheme(value)}
            className={cn(
              "h-8 rounded-rl-full px-3 text-sm font-medium transition-colors",
              selected
                ? "bg-lp-primary text-lp-on-primary"
                : "bg-transparent text-lp-muted"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
