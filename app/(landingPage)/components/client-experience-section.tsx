import { LandingSection } from "./landing-section";
import { MockCard } from "./mock-card";
import { SplitCopy } from "./section-heading";

const PHONE_ROW =
  "flex justify-between rounded-md bg-lp-surface p-2";

export function ClientExperienceSection() {
  return (
    <LandingSection
      spacing="compact"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-8 md:gap-12 lg:gap-20"
    >
      <div
        role="img"
        aria-label="Magic-link email next to the client's phone view of their requests"
        className="relative aspect-[1/0.82] overflow-hidden rounded-2xl bg-lp-tint-2"
      >
        <MockCard className="absolute top-[12%] left-[8%] w-[58%] p-4.5 text-sm">
          <div className="text-xs text-lp-muted">From: Northside Studio</div>
          <div className="mt-1.5 mb-2.5 font-semibold">
            3 things we need for your website
          </div>
          <div className="mb-3.5 leading-normal text-lp-muted">
            Hi Maya, tap below to send them. No login needed.
          </div>
          <span className="inline-block rounded-rl-full bg-lp-brand-forest px-4 py-2.25 font-medium text-rl-white">
            Open my requests
          </span>
        </MockCard>

        <div className="absolute top-[22%] right-[8%] aspect-[9/17] w-[38%] rounded-3xl bg-lp-surface p-2 shadow-rl-3 ring-1 ring-lp-border">
          <div className="flex h-full flex-col gap-1.5 rounded-2xl bg-lp-subtle px-2.5 py-3.5 text-xs">
            <div className="mb-1.5 flex items-center gap-1.5">
              <span className="size-4.5 rounded-rl-6 bg-lp-brand-forest" />
              <span className="font-semibold">Northside</span>
            </div>
            <div className="text-sm font-semibold">Hi Maya</div>
            <div className="mb-1 text-lp-muted">1 of 3 done</div>
            <div className={PHONE_ROW}>
              <span>Logo files</span>
              <span className="text-lp-success">Done</span>
            </div>
            <div className={PHONE_ROW}>
              <span>Hosting login</span>
              <span className="text-lp-muted">Add</span>
            </div>
            <div className={PHONE_ROW}>
              <span>Homepage copy</span>
              <span className="text-lp-muted">Add</span>
            </div>
          </div>
        </div>
      </div>

      <SplitCopy
        eyebrow="The client experience"
        title="Clients open one link. That's it."
      >
        No account, no password, no app to download. Clients upload, answer and
        sign off from any phone or laptop, and can add the portal to their home
        screen.
      </SplitCopy>
    </LandingSection>
  );
}
