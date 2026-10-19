import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { H3_CLASS, SectionHeading } from "./section-heading";
import { LandingSection } from "./landing-section";
import { MockCard } from "./mock-card";
import { StatusPill } from "./status-pill";

interface FeatureProps {
  tintClass: string;
  title: string;
  text: string;
  children: ReactNode;
}

function Feature({ tintClass, title, text, children }: FeatureProps) {
  return (
    <div className="flex flex-col gap-5">
      <div
        className={cn(
          "grid aspect-[4/3.2] place-items-center rounded-2xl p-6",
          tintClass
        )}
      >
        <MockCard className="w-full max-w-70 p-4 text-sm">{children}</MockCard>
      </div>
      <div>
        <h3 className={H3_CLASS}>{title}</h3>
        <p className="mt-2 text-rl-body text-lp-muted">{text}</p>
      </div>
    </div>
  );
}

const ROW = "flex justify-between border-t border-lp-border py-2.5";

export function FeaturesSection() {
  return (
    <LandingSection id="product">
      <SectionHeading
        title="One portal for every client"
        lead="Each client gets their own branded space with only the requests meant for them."
        className="max-w-160"
      />

      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6">
        <Feature
          tintClass="bg-lp-tint-1"
          title="Requests that repeat"
          text="Monthly or quarterly checklists that create themselves."
        >
          <div className="mb-3 font-semibold">Repeat this request</div>
          <div className="mb-3.5 flex gap-1.5">
            <span className="flex-1 rounded-md border border-lp-border py-1.75 text-center text-lp-muted">
              Once
            </span>
            <span className="flex-1 rounded-md bg-lp-ink py-1.75 text-center text-lp-on-ink">
              Monthly
            </span>
            <span className="flex-1 rounded-md border border-lp-border py-1.75 text-center text-lp-muted">
              Quarterly
            </span>
          </div>
          <div className={ROW}>
            <span className="text-lp-muted">Sends on</span>
            <span>1st of the month</span>
          </div>
          <div className={ROW}>
            <span className="text-lp-muted">Next</span>
            <span>Jul 1 · 14 clients</span>
          </div>
        </Feature>

        <Feature
          tintClass="bg-lp-tint-2"
          title="Your brand, not ours"
          text="Your logo, colours and email name on every page and reminder."
        >
          <div className="mb-3 font-semibold">Branding</div>
          <div className="mb-3 flex items-center gap-3 rounded-md border border-dashed border-lp-border p-2.5">
            <span className="grid size-9 place-items-center rounded-md bg-lp-brand-forest font-semibold text-rl-white">
              N
            </span>
            <span>northside-logo.png</span>
          </div>
          <div className="flex items-center justify-between border-t border-lp-border py-2.5">
            <span className="text-lp-muted">Colour</span>
            <span className="flex gap-1.5">
              <span className="size-4.5 rounded-full bg-lp-brand-forest ring-2 ring-lp-surface outline outline-lp-ink" />
              <span className="size-4.5 rounded-full bg-lp-brand-gold" />
              <span className="size-4.5 rounded-full bg-lp-brand-clay" />
            </span>
          </div>
          <div className={ROW}>
            <span className="text-lp-muted">Email from</span>
            <span>Northside Studio</span>
          </div>
        </Feature>

        <Feature
          tintClass="bg-lp-tint-3"
          title="Work that moves forward"
          text="Every request shows what's done, what's missing and what's next."
        >
          <div className="mb-2.5 flex justify-between">
            <span className="font-semibold">Q2 tax records</span>
            <span className="text-lp-muted">3 of 5</span>
          </div>
          <div className="mb-3 h-2 overflow-hidden rounded-rl-full bg-lp-border">
            <div className="h-full w-3/5 bg-lp-success" />
          </div>
          {(
            [
              ["Bank statement", "success", "Approved"],
              ["Payroll report", "violet", "Submitted"],
              ["Amex statement", "warn", "Needs fix"],
            ] as const
          ).map(([name, tone, status]) => (
            <div
              key={name}
              className="flex items-center justify-between border-t border-lp-border py-2"
            >
              <span>{name}</span>
              <StatusPill tone={tone}>{status}</StatusPill>
            </div>
          ))}
        </Feature>
      </div>
    </LandingSection>
  );
}
