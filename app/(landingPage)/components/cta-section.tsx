import { GetStartedButton } from "./get-started-button";
import { LandingSection } from "./landing-section";

export function CtaSection() {
  return (
    <LandingSection spacing="bottom">
      <div className="flex flex-col items-center rounded-rl-md bg-lp-tint-1 bg-[radial-gradient(120%_140%_at_0%_0%,var(--lp-tint-2)_0%,transparent_55%),radial-gradient(120%_140%_at_100%_100%,var(--lp-tint-3)_0%,transparent_55%)] px-5 py-rl-8 text-center md:px-12 md:py-rl-10 lg:py-28">
        <h2 className="max-w-180 font-display text-lp-h2-cta font-semibold tracking-[-0.035em] text-balance">
          Give your clients a portal they&apos;ll actually finish
        </h2>
        <div className="mt-8 flex justify-center">
          <GetStartedButton section="final" />
        </div>
      </div>
    </LandingSection>
  );
}
