"use client";

import type { KeyboardEvent } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { EYEBROW_CLASS, H2_CLASS } from "./section-heading";
import { useGetStartedDialog } from "./get-started-dialog-provider";
import { LandingSection } from "./landing-section";
import { MockCard } from "./mock-card";
import { StatusPill, toneOf } from "./status-pill";
import { useUseCase } from "./use-case-provider";
import { USE_CASE_ORDER, USE_CASES, type UseCaseKey } from "./use-cases.data";

export function UseCasesSection() {
  const { active, select } = useUseCase();
  const { open } = useGetStartedDialog();
  const useCase = USE_CASES[active];
  const approved = useCase.items.filter(([, status]) => status === "Approved");
  const pct = Math.round((approved.length / useCase.items.length) * 100);

  function onTabKeyDown(e: KeyboardEvent) {
    const index = USE_CASE_ORDER.indexOf(active);
    let next: number | null = null;
    if (e.key === "ArrowRight") next = (index + 1) % USE_CASE_ORDER.length;
    else if (e.key === "ArrowLeft")
      next = (index - 1 + USE_CASE_ORDER.length) % USE_CASE_ORDER.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = USE_CASE_ORDER.length - 1;
    if (next === null) return;

    e.preventDefault();
    const key: UseCaseKey = USE_CASE_ORDER[next];
    select(key);
    // The newly selected tab is the only one in the tab order, so move focus to it.
    setTimeout(() => document.getElementById(`tab-${key}`)?.focus(), 0);
  }

  return (
    <LandingSection id="use-cases">
      <h2 className={cn(H2_CLASS, "mx-auto max-w-180 text-center")}>
        Built for businesses that run on client information
      </h2>

      <div
        role="tablist"
        aria-label="Use cases"
        onKeyDown={onTabKeyDown}
        className="mx-auto mt-10 flex flex-wrap justify-center gap-2"
      >
        {USE_CASE_ORDER.map((key) => {
          const selected = key === active;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              id={`tab-${key}`}
              aria-selected={selected}
              aria-controls="uc-panel"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(key)}
              className={cn(
                "h-11 rounded-rl-full border px-4.5 text-base font-medium transition-colors",
                selected
                  ? "border-lp-primary bg-lp-primary text-lp-on-primary"
                  : "border-lp-border bg-lp-surface text-lp-ink"
              )}
            >
              {USE_CASES[key].label}
            </button>
          );
        })}
      </div>

      <div
        id="uc-panel"
        role="tabpanel"
        aria-labelledby={`tab-${active}`}
        className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-6 rounded-rl-md border border-lp-border bg-lp-surface p-5 md:gap-12 md:p-8 lg:gap-16 lg:p-12"
      >
        <div>
          <div className={EYEBROW_CLASS}>{useCase.label}</div>
          <p className="mt-3.5 font-display text-lp-pain font-semibold tracking-[-0.02em] text-pretty">
            {useCase.pain}
          </p>
          <p className="mt-4 text-rl-body text-lp-muted">
            Example request:{" "}
            <span className="text-lp-ink">{useCase.example}</span>
          </p>
          <button
            type="button"
            onClick={() => open("use_cases")}
            className="mt-6 inline-flex items-center gap-1.5 font-medium"
          >
            Try it with your clients
            <ArrowRight size={16} strokeWidth={2} />
          </button>
        </div>

        <div
          role="img"
          aria-label={`${useCase.title} request with item statuses`}
          className={cn("rounded-2xl p-5 md:p-8 lg:p-10", useCase.tintClass)}
        >
          <MockCard className="p-4.5 text-sm">
            <div className="flex items-baseline justify-between gap-3">
              <span className="font-semibold">{useCase.title}</span>
              <span className="whitespace-nowrap text-lp-muted">
                {approved.length} of {useCase.items.length} done
              </span>
            </div>
            <div className="mt-3 mb-1.5 h-2 overflow-hidden rounded-rl-full bg-lp-border">
              <div
                className="h-full rounded-rl-full bg-lp-success transition-[width] duration-400"
                style={{ width: `${pct}%` }}
              />
            </div>
            {useCase.items.map(([name, status]) => (
              <div
                key={name}
                className="flex items-center justify-between gap-3 border-t border-lp-border py-2.5"
              >
                <span>{name}</span>
                <StatusPill tone={toneOf(status)}>{status}</StatusPill>
              </div>
            ))}
          </MockCard>
        </div>
      </div>
    </LandingSection>
  );
}
