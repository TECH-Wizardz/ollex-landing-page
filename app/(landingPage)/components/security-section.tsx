import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { LandingSection } from "./landing-section";

export function SecuritySection() {
  return (
    <LandingSection id="security" spacing="compact">
      <div className="flex flex-wrap items-center gap-7 rounded-rl-md border border-lp-border bg-lp-surface p-7 md:gap-12 md:p-12 lg:gap-16 lg:p-16">
        <div className="grid aspect-square w-[clamp(120px,16vw,180px)] flex-none place-items-center rounded-3xl bg-lp-tint-1 text-lp-accent">
          <ShieldCheck
            aria-hidden="true"
            strokeWidth={1.5}
            className="size-[56%]"
          />
        </div>
        <div className="min-w-0 flex-[1_1_380px]">
          <h2 className="font-display text-lp-h2-sm font-semibold tracking-[-0.03em] text-balance">
            Security you can explain to your clients
          </h2>
          <p className="mt-4 max-w-[36em] text-lp-lead text-pretty text-lp-muted">
            Files are encrypted in transit and at rest. Each magic link is tied
            to one client and opens only their portal. An activity log records
            every upload, approval and message, and you can delete a
            client&apos;s data any time.
          </p>
          <Link
            href="#security"
            className="mt-5 inline-flex items-center gap-1.5 font-medium"
          >
            Read our security overview
            <ArrowRight size={16} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </LandingSection>
  );
}
