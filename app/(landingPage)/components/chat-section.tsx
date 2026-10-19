import { MessageCircle } from "lucide-react";

import { LandingSection } from "./landing-section";
import { MockCard } from "./mock-card";
import { SplitCopy } from "./section-heading";
import { StatusPill } from "./status-pill";

export function ChatSection() {
  return (
    <LandingSection
      spacing="compact"
      className="flex flex-wrap-reverse items-center gap-8 md:gap-12 lg:gap-20"
    >
      <SplitCopy
        className="min-w-0 flex-[1_1_400px]"
        title="Questions answered right next to the request"
      >
        Clients ask about an item in chat instead of digging through your inbox.
        Replies, files and status stay in one thread.
      </SplitCopy>

      <div
        role="img"
        aria-label="Chat thread beside a request item with a comment"
        className="relative aspect-[1/0.82] min-w-0 flex-[1_1_400px] overflow-hidden rounded-2xl bg-lp-tint-3"
      >
        <MockCard className="absolute top-[14%] left-[8%] w-1/2 p-4 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">June receipts</span>
            <StatusPill tone="neutral">Requested</StatusPill>
          </div>
          <div className="mt-3 rounded-md border border-dashed border-lp-border p-3 text-center text-lp-muted">
            Drop files or tap to upload
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-lp-muted">
            <MessageCircle size={14} strokeWidth={2} />2 comments
          </div>
        </MockCard>

        <MockCard className="absolute top-[30%] right-[7%] flex w-1/2 flex-col gap-2.5 p-3.5 text-xs">
          <div className="flex items-start gap-2">
            <span className="grid size-6 flex-none place-items-center rounded-full bg-lp-avatar-peach text-2xs font-semibold text-rl-black">
              SB
            </span>
            <span className="rounded-lg bg-lp-subtle px-2.5 py-2 leading-snug">
              Do you need the card receipts too, or only cash?
            </span>
          </div>
          <div className="flex flex-row-reverse items-start gap-2">
            <span className="grid size-6 flex-none place-items-center rounded-full bg-lp-avatar-sky text-2xs font-semibold text-rl-black">
              AL
            </span>
            <span className="rounded-lg bg-lp-ink px-2.5 py-2 leading-snug text-lp-on-ink">
              Both please. A photo of each is fine.
            </span>
          </div>
        </MockCard>
      </div>
    </LandingSection>
  );
}
