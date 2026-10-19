import { LandingSection } from "./landing-section";
import { MockCard } from "./mock-card";
import { SplitCopy } from "./section-heading";
import { StatusPill, toneOf } from "./status-pill";

const CLIENTS = [
  {
    name: "Sam's Bakery",
    initials: "SB",
    avatarClass: "bg-lp-avatar-peach",
    status: "Complete",
    missing: "Nothing missing",
  },
  {
    name: "Northside Studio",
    initials: "NS",
    avatarClass: "bg-lp-avatar-mint",
    status: "Waiting",
    missing: "Amex statement, June receipts",
  },
  {
    name: "Harbor Dental",
    initials: "HD",
    avatarClass: "bg-lp-avatar-sky",
    status: "Overdue",
    missing: "3 items · due Jun 28",
  },
  {
    name: "Pine & Co. Legal",
    initials: "PC",
    avatarClass: "bg-lp-avatar-lilac",
    status: "Waiting",
    missing: "Signed engagement letter",
  },
  {
    name: "Lumen Coaching",
    initials: "LC",
    avatarClass: "bg-lp-avatar-butter",
    status: "Complete",
    missing: "Nothing missing",
  },
];

export function ProviderSection() {
  return (
    <LandingSection
      spacing="compact"
      className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-8 md:gap-12 lg:gap-20"
    >
      <div
        role="img"
        aria-label="Dashboard with client rows marked Complete, Waiting or Overdue"
        className="rounded-2xl bg-lp-tint-3 p-5 md:p-8 lg:p-10"
      >
        <MockCard className="px-4 py-2">
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="flex items-center gap-3 border-b border-lp-border py-3 text-sm last:border-b-0"
            >
              <span
                className={`grid size-7 flex-none place-items-center rounded-full text-2xs font-semibold text-rl-black ${client.avatarClass}`}
              >
                {client.initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{client.name}</div>
                <div className="text-xs text-lp-muted">{client.missing}</div>
              </div>
              <StatusPill tone={toneOf(client.status)} dot>
                {client.status}
              </StatusPill>
            </div>
          ))}
        </MockCard>
      </div>

      <SplitCopy
        eyebrow="Your side of the portal"
        title="See who's blocking what, at a glance"
      >
        One screen shows every client, every missing item and every due date, so
        you know who needs a call and who&apos;s done.
      </SplitCopy>
    </LandingSection>
  );
}
