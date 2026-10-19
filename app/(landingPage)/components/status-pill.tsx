import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "success" | "brand" | "violet" | "warn" | "danger" | "neutral";

const TONE_CLASS: Record<Tone, string> = {
  success: "bg-lp-b-success-bg text-lp-b-success-fg",
  brand: "bg-lp-b-brand-bg text-lp-b-brand-fg",
  violet: "bg-lp-b-violet-bg text-lp-b-violet-fg",
  warn: "bg-lp-b-warn-bg text-lp-b-warn-fg",
  danger: "bg-lp-b-danger-bg text-lp-b-danger-fg",
  neutral: "bg-lp-b-neutral-bg text-lp-b-neutral-fg",
};

const STATUS_TONE: Record<string, Tone> = {
  Complete: "success",
  Approved: "success",
  Done: "success",
  Waiting: "brand",
  Submitted: "violet",
  "Needs fix": "warn",
  Missing: "warn",
  Overdue: "danger",
};

/** Maps a request/client status label onto a badge tone; unknown ones are neutral. */
export function toneOf(status: string): Tone {
  return STATUS_TONE[status] ?? "neutral";
}

interface StatusPillProps {
  tone: Tone;
  /** `pill` is fully round; `chip` is the tighter 4px-radius tag. */
  shape?: "pill" | "chip";
  /** Leading dot, as used in the client list. */
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

export function StatusPill({
  tone,
  shape = "pill",
  dot,
  className,
  children,
}: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium whitespace-nowrap",
        shape === "pill"
          ? "rounded-rl-full px-2.5 py-0.75 text-xs"
          : "rounded-rl-4 px-2 py-0.5 text-xs",
        TONE_CLASS[tone],
        className
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}
