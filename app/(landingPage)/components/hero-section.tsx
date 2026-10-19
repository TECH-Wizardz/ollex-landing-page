import { ArrowRight, Check } from "lucide-react";

import { PRODUCT_NAME } from "@/lib/brand";
import { loginUrl } from "@/lib/links";
import { CtaLink } from "./cta-link";
import { DemoButton } from "./demo-button";
import { HeroDoodles } from "./hero-doodles";
import { HeroPortalDemo } from "./hero-portal-demo";

const REASSURANCES = [
  "Free 14-day trial",
  "No credit card",
  "Set up in 10 minutes",
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-lp-border bg-linear-to-b from-lp-cream to-lp-bg to-92%"
    >
      <div aria-hidden="true" className="lp-dots pointer-events-none absolute inset-0" />
      <HeroDoodles />

      <div className="relative mx-auto flex max-w-lp-shell flex-wrap items-center gap-10 px-4 pt-rl-6 pb-rl-8 md:gap-14 md:px-6 md:pt-rl-10 md:pb-rl-14 lg:gap-18 lg:pt-24">
        <div className="min-w-0 flex-[11_1_520px]">
          <div className="inline-flex items-center gap-2.5 rounded-rl-full border border-lp-border bg-lp-surface py-1.5 pr-3.5 pl-1.5 text-sm text-lp-ink">
            <span className="inline-flex shrink-0 items-center rounded-rl-full bg-lp-b-brand-bg px-2.5 py-0.75 text-sm font-medium whitespace-nowrap text-lp-b-brand-fg">
              Client portal
            </span>
            <span>with reminders that run themselves</span>
          </div>

          <h1 className="mt-6 font-display text-lp-display font-semibold tracking-[-0.04em] text-balance text-lp-ink">
            <span className="block">
              Get <span className="lp-highlight">everything you need</span> from
              clients.
            </span>
            <span className="mt-[0.1em] block">
              Without{" "}
              <span className="relative inline-block whitespace-nowrap text-lp-muted">
                the chasing
                <svg
                  aria-hidden="true"
                  viewBox="0 0 240 44"
                  preserveAspectRatio="none"
                  className="absolute top-1/2 -left-[3%] h-[0.62em] w-[106%] -translate-y-[42%] overflow-visible"
                >
                  <path
                    pathLength={1}
                    d="M3 24 C 40 14, 84 30, 124 19 S 200 12, 237 21 M10 31 C 64 24, 150 33, 230 25"
                    className="lp-strike"
                  />
                </svg>
              </span>
              .
            </span>
          </h1>

          <p className="mt-6 max-w-130 text-lp-lead text-pretty text-lp-muted">
            One secure link where clients answer forms, send files and chat with
            you, while{" "}
            <span className="font-medium text-lp-ink">
              {PRODUCT_NAME} follows up on whatever is still missing.
            </span>
          </p>

          {/* Stacked on a phone, the two CTAs stretch to the same full width; side by
              side from `sm` up, each as wide as its label. */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CtaLink
              href={loginUrl()}
              size="hero"
              event="trial"
              section="hero"
              className="pl-7 shadow-rl-3"
            >
              Start free trial
              <ArrowRight size={18} strokeWidth={2} />
            </CtaLink>
            <DemoButton variant="outline" size="hero" section="hero">
              Book a demo
            </DemoButton>
          </div>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-lp-muted">
            {REASSURANCES.map((text) => (
              <li key={text} className="inline-flex items-center gap-1.5">
                <Check size={16} strokeWidth={2.4} className="text-lp-success" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 flex-[9_1_420px]">
          <HeroPortalDemo />
        </div>
      </div>
    </section>
  );
}
