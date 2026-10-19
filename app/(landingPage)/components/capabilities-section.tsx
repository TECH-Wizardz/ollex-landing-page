import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";
import { LandingSection } from "./landing-section";
import { MockCard } from "./mock-card";

interface CapabilityProps {
  tintClass: string;
  title: string;
  text: string;
  /** Skip the white card, for mock-ups that are bare chat bubbles. */
  bare?: boolean;
  children: ReactNode;
}

function Capability({ tintClass, title, text, bare, children }: CapabilityProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "grid aspect-[1/0.8] place-items-center rounded-2xl p-5",
          tintClass
        )}
      >
        {bare ? (
          children
        ) : (
          <MockCard className="w-full p-3.5 text-xs">{children}</MockCard>
        )}
      </div>
      <div>
        <h3 className="font-display text-lp-h3 font-semibold">{title}</h3>
        <p className="mt-1.5 text-rl-body text-lp-muted">{text}</p>
      </div>
    </div>
  );
}

const FILE_ICON =
  "grid size-7 place-items-center rounded-rl-6 text-2xs font-semibold";

const BUBBLE = "max-w-[85%] rounded-xl px-3 py-2.25";

export function CapabilitiesSection() {
  return (
    <LandingSection>
      <SectionHeading
        title="Every kind of client request, in one place"
        lead="Replace scattered emails, file links and form tools."
        className="max-w-170"
      />

      <div className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-5">
        <Capability
          tintClass="bg-lp-tint-1"
          title="Collect"
          text="Files, forms and answers, item by item."
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className={cn(FILE_ICON, "bg-lp-tint-1 text-lp-accent")}>
                PDF
              </span>
              <span className="flex-1">bank-may.pdf</span>
              <span className="text-lp-success">✓</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(FILE_ICON, "bg-lp-tint-2")}>Aa</span>
              <span className="flex-1">Business address</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={cn(FILE_ICON, "bg-lp-tint-3")}>?</span>
              <span className="flex-1">Any new employees?</span>
            </div>
          </div>
        </Capability>

        <Capability
          tintClass="bg-lp-tint-2"
          title="Approve"
          text="Accept each item or send it back with a note."
        >
          <div className="font-semibold">Amex statement</div>
          <div className="mt-1 mb-3 text-lp-muted">amex-june.pdf · 2 pages</div>
          <div className="flex gap-2">
            <span className="flex-1 rounded-md bg-lp-ink py-2 text-center text-lp-on-ink">
              Approve
            </span>
            <span className="flex-1 rounded-md border border-lp-border py-2 text-center">
              Ask for fix
            </span>
          </div>
        </Capability>

        <Capability
          tintClass="bg-lp-tint-3"
          title="Talk"
          text="Chat and comments tied to each request."
          bare
        >
          <div className="flex w-full flex-col gap-2 text-xs">
            <span className={cn(BUBBLE, "self-start bg-lp-surface shadow-rl-1")}>
              Is a screenshot OK for this one?
            </span>
            <span className={cn(BUBBLE, "self-end bg-lp-ink text-lp-on-ink")}>
              Yes, that works.
            </span>
            <span className={cn(BUBBLE, "self-start bg-lp-surface shadow-rl-1")}>
              Uploaded. Thanks!
            </span>
          </div>
        </Capability>

        <Capability
          tintClass="bg-lp-tint-1"
          title="Repeat"
          text="Reuse templates or schedule requests to send themselves."
        >
          <div className="mb-2.5 font-semibold">Monthly bookkeeping</div>
          {[
            ["Template", "8 items"],
            ["Schedule", "Every 1st"],
            ["Clients", "14"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex justify-between border-t border-lp-border py-1.75"
            >
              <span className="text-lp-muted">{label}</span>
              <span>{value}</span>
            </div>
          ))}
        </Capability>
      </div>
    </LandingSection>
  );
}
