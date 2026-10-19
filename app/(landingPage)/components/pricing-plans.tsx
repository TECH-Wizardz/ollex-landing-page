"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { GetStartedButton } from "./get-started-button";

const PLANS = [
  { name: "Starter", limit: "Up to 40 active clients", monthly: 59 },
  {
    name: "Growth",
    limit: "Up to 120 active clients",
    monthly: 129,
    popular: true,
  },
  { name: "Firm", limit: "Up to 300 active clients", monthly: 249 },
];

type Period = "monthly" | "yearly";

const PERIOD_BUTTON =
  "h-10 rounded-rl-full px-4.5 text-sm font-medium transition-colors";

export function PricingPlans() {
  const [period, setPeriod] = useState<Period>("monthly");
  const yearly = period === "yearly";

  function choose(next: Period) {
    setPeriod(next);
    track("pricing_toggle", { period: next });
  }

  return (
    <>
      <div className="text-center">
        <div
          role="radiogroup"
          aria-label="Billing period"
          className="mt-7 inline-flex gap-1 rounded-rl-full border border-lp-border bg-lp-surface p-1"
        >
          <button
            type="button"
            role="radio"
            aria-checked={!yearly}
            onClick={() => choose("monthly")}
            className={cn(
              PERIOD_BUTTON,
              !yearly
                ? "bg-lp-primary text-lp-on-primary"
                : "bg-transparent text-lp-muted"
            )}
          >
            Monthly
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={yearly}
            onClick={() => choose("yearly")}
            className={cn(
              PERIOD_BUTTON,
              "flex items-center gap-2",
              yearly
                ? "bg-lp-primary text-lp-on-primary"
                : "bg-transparent text-lp-muted"
            )}
          >
            Yearly
            <span className="rounded-rl-full bg-lp-b-success-bg px-2 py-0.5 text-xs text-lp-b-success-fg">
              2 months free
            </span>
          </button>
        </div>
      </div>

      <div className="-mx-1 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pt-3 pb-4">
        {PLANS.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "relative flex flex-[1_0_280px] snap-center flex-col rounded-xl bg-lp-surface p-7",
              plan.popular
                ? "border-2 border-lp-primary"
                : "border border-lp-border"
            )}
          >
            {plan.popular ? (
              <span className="absolute -top-3 left-7 rounded-rl-full bg-lp-primary px-2.5 py-1 text-xs font-medium text-lp-on-primary">
                Most popular
              </span>
            ) : null}
            <div className="font-display text-lg font-semibold">{plan.name}</div>
            <div className="mt-1.5 text-base text-lp-muted">{plan.limit}</div>
            <div className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-lp-price font-semibold tracking-[-0.03em]">
                ${yearly ? Math.round((plan.monthly * 10) / 12) : plan.monthly}
              </span>
              <span className="text-base text-lp-muted">/ month</span>
            </div>
            <div className="mt-2 min-h-5 text-sm text-lp-muted">
              {yearly
                ? `$${(plan.monthly * 10).toLocaleString("en-US")} billed yearly`
                : "Billed monthly"}
            </div>
            <GetStartedButton
              variant={plan.popular ? "primary" : "surface"}
              size="block"
              section={`pricing_${plan.name.toLowerCase()}`}
              className="mt-7"
            />
          </div>
        ))}
      </div>
    </>
  );
}
