import { cn } from "@/lib/utils";
import { EYEBROW_CLASS } from "./section-heading";
import { LandingSection } from "./landing-section";

const QUOTES = [
  {
    text: "I used to send the same 'just checking in' email ten times a month. Now I send the request once and stop thinking about it.",
    who: "Priya N.",
    role: "Bookkeeper, pilot customer",
    initials: "PN",
    avatarClass: "bg-lp-avatar-sky",
  },
  {
    text: "Clients finish onboarding on their phone the same day. Nobody has asked me to reset a password.",
    who: "Tom R.",
    role: "Agency owner, pilot customer",
    initials: "TR",
    avatarClass: "bg-lp-avatar-lilac",
  },
  {
    text: "The dashboard tells me exactly who to call on Monday morning.",
    who: "Dana K.",
    role: "Consultant, pilot customer",
    initials: "DK",
    avatarClass: "bg-lp-avatar-mint",
  },
];

export function ProofSection() {
  return (
    <LandingSection spacing="compact">
      <div className={cn(EYEBROW_CLASS, "text-center")}>
        From our pilot customers
      </div>
      <div className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-5">
        {QUOTES.map((quote) => (
          <figure
            key={quote.who}
            className="flex flex-col justify-between gap-6 rounded-xl border border-lp-border bg-lp-surface p-7"
          >
            <blockquote className="text-md text-pretty">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3 text-sm">
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full text-xs font-semibold text-rl-black",
                  quote.avatarClass
                )}
              >
                {quote.initials}
              </span>
              <span>
                <span className="block font-medium">{quote.who}</span>
                <span className="text-lp-muted">{quote.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </LandingSection>
  );
}
