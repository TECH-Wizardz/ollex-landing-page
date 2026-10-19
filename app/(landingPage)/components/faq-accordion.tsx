"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";

const FAQS = [
  [
    "Do my clients need an account?",
    "No. Clients open a secure magic link from their email or text. There is no password and nothing to install.",
  ],
  [
    "Is my clients' data safe?",
    "Files are encrypted in transit and at rest. Each link is tied to one client, and every action is recorded in an activity log.",
  ],
  [
    "Can I use my own branding?",
    "Yes. Add your logo, colours and email sender name, and clients see your brand on every page and reminder.",
  ],
  [
    "What happens after the trial?",
    "Choose a plan to keep going. If you don't, your account pauses. Nothing is charged because we never ask for a card.",
  ],
  [
    "Can I import my clients?",
    "Yes. Upload a CSV or paste from a spreadsheet, and each client gets their own portal straight away.",
  ],
];

/** One question open at a time; opening a different one closes the last. */
export function FaqAccordion() {
  const [open, setOpen] = useState(-1);

  function toggle(index: number, question: string) {
    setOpen(open === index ? -1 : index);
    if (open !== index) track("faq_open", { q: question });
  }

  return (
    <div className="border-t border-lp-border">
      {FAQS.map(([question, answer], i) => {
        const isOpen = open === i;
        return (
          <div key={question} className="border-b border-lp-border">
            <h3>
              <button
                type="button"
                id={`faq-b${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-p${i}`}
                onClick={() => toggle(i, question)}
                className="flex min-h-16 w-full items-center justify-between gap-4 px-1 py-4 text-left text-md font-medium text-lp-ink"
              >
                {question}
                <span
                  className={cn(
                    "grid size-7 flex-none place-items-center rounded-full border border-lp-border transition-transform duration-200",
                    isOpen && "rotate-45"
                  )}
                >
                  <Plus size={14} strokeWidth={2} />
                </span>
              </button>
            </h3>
            {isOpen ? (
              <div
                id={`faq-p${i}`}
                role="region"
                aria-labelledby={`faq-b${i}`}
                className="px-1 pr-12 pb-5 text-rl-body text-lp-muted"
              >
                {answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
