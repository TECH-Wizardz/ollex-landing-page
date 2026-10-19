import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { LandingSection } from "./landing-section";

interface AssistantCardProps {
  tintClass: string;
  title: string;
  text: string;
  children: ReactNode;
}

function AssistantCard({ tintClass, title, text, children }: AssistantCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-lp-border bg-lp-surface p-3">
      <div
        className={cn(
          "flex aspect-square flex-col justify-center gap-2.5 rounded-xl p-5 text-xs",
          tintClass
        )}
      >
        {children}
      </div>
      <div className="px-3 pt-5 pb-3">
        <h3 className="font-display text-lp-h3 font-semibold">{title}</h3>
        <p className="mt-2 text-rl-body text-lp-muted">{text}</p>
      </div>
    </div>
  );
}

const FLOAT = "bg-lp-surface shadow-rl-3 ring-1 ring-lp-border";

export function AssistantSection() {
  return (
    <LandingSection>
      <SectionHeading
        title="Your assistant does the busywork"
        lead="It builds, sends and follows up. You make the judgment calls."
      />

      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
        <AssistantCard
          tintClass="bg-lp-tint-2"
          title="Request builder"
          text="Describe what you need in a sentence and get a ready-made form and checklist."
        >
          <div className="rounded-lg bg-lp-surface p-3 leading-snug ring-1 ring-lp-border">
            &ldquo;I need last year&apos;s tax return, payroll for Q2 and their new
            business address.&rdquo;
          </div>
          <div className={cn("flex flex-col gap-1.75 rounded-lg p-3", FLOAT)}>
            <div className="text-2xs text-lp-muted">Checklist · 3 items</div>
            {[
              "2025 tax return (file)",
              "Q2 payroll report (file)",
              "Business address (form)",
            ].map((item) => (
              <div key={item} className="flex gap-2">
                <span className="size-3.5 rounded-xs border-[1.5px] border-lp-border" />
                {item}
              </div>
            ))}
          </div>
        </AssistantCard>

        <AssistantCard
          tintClass="bg-lp-tint-1"
          title="Follow-up assistant"
          text="Sends one clear reminder listing only what's missing, by email, text or push, and stops when it's done."
        >
          <div className="flex gap-1.5">
            {["Email", "Text", "Push"].map((channel) => (
              <span
                key={channel}
                className="rounded-rl-full bg-lp-surface px-2.5 py-1 ring-1 ring-lp-border"
              >
                {channel}
              </span>
            ))}
          </div>
          <div className={cn("rounded-lg p-3.5 leading-normal", FLOAT)}>
            <div className="mb-1.5 font-semibold">
              Hi Sam, two things left for June:
            </div>
            <div>· Amex statement</div>
            <div>· June receipts</div>
            <div className="mt-2.5 inline-block rounded-rl-full bg-lp-ink px-3 py-1.5 text-lp-on-ink">
              Send them now
            </div>
          </div>
        </AssistantCard>

        <AssistantCard
          tintClass="bg-lp-tint-3"
          title="Status helper"
          text="Answers 'what do you still need from me?' for your clients, any time."
        >
          <span className="max-w-[85%] self-end rounded-xl bg-lp-ink px-3 py-2.5 text-lp-on-ink">
            What do you still need from me?
          </span>
          <div
            className={cn(
              "max-w-[90%] self-start rounded-xl p-3 leading-normal",
              FLOAT
            )}
          >
            Just your signed engagement letter. Everything else is in and
            approved.
          </div>
        </AssistantCard>
      </div>
    </LandingSection>
  );
}
