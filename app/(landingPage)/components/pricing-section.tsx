import { FaqAccordion } from "./faq-accordion";
import { LandingSection } from "./landing-section";
import { H2_CLASS } from "./section-heading";
import { PricingPlans } from "./pricing-plans";

export function PricingSection() {
  return (
    <LandingSection id="pricing">
      <div className="text-center">
        <h2 className={H2_CLASS}>Simple pricing</h2>
        <p className="mx-auto mt-4 text-lp-lead text-lp-muted">
          Flat monthly price by active clients. No per-user fees.
        </p>
      </div>

      <PricingPlans />

      <p className="mt-5 text-center text-base text-lp-muted">
        All plans include unlimited team members, reminders and requests.
      </p>

      <div className="mx-auto mt-rl-8 max-w-190 md:mt-rl-10 lg:mt-24">
        <h2 className="mb-6 text-center font-display text-lp-h2-faq font-semibold tracking-[-0.02em]">
          Questions
        </h2>
        <FaqAccordion />
      </div>
    </LandingSection>
  );
}
