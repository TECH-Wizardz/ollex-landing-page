import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const H2_CLASS =
  "font-display text-lp-h2 font-semibold tracking-[-0.03em] text-balance";

export const H3_CLASS =
  "font-display text-lp-h3 font-semibold tracking-[-0.015em]";

export const EYEBROW_CLASS =
  "text-sm font-medium tracking-widest text-lp-muted uppercase";

interface SectionHeadingProps {
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}

/** Centered section title with an optional one-line lead. */
export function SectionHeading({ title, lead, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-160 text-center", className)}>
      <h2 className={H2_CLASS}>{title}</h2>
      {lead ? (
        <p className="mx-auto mt-4 max-w-[34em] text-lp-lead text-pretty text-lp-muted">
          {lead}
        </p>
      ) : null}
    </div>
  );
}

interface SplitCopyProps {
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

/** The text half of a two-column feature section. */
export function SplitCopy({ eyebrow, title, children, className }: SplitCopyProps) {
  return (
    <div className={className}>
      {eyebrow ? <div className={EYEBROW_CLASS}>{eyebrow}</div> : null}
      <h2 className={cn(H2_CLASS, eyebrow && "mt-3.5")}>{title}</h2>
      <p className="mt-5 max-w-[30em] text-lp-lead text-pretty text-lp-muted">
        {children}
      </p>
    </div>
  );
}
