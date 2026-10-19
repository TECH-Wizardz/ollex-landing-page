import Link from "next/link";

import { PRODUCT_NAME } from "@/lib/brand";
import { LogoMark } from "./logo-mark";
import { EYEBROW_CLASS } from "./section-heading";
import { ThemeSwitch } from "./theme-switch";

const COLUMNS = [
  {
    heading: "Product",
    links: ["Client portal", "Reminders", "Assistant", "Pricing"],
  },
  {
    heading: "Use cases",
    links: ["Accountants", "Agencies", "Consultants", "Law firms", "Recruiters"],
  },
  {
    heading: "Resources",
    links: ["Help centre", "Guides", "Security overview"],
  },
  { heading: "Company", links: ["About", "Contact", "Careers"] },
  { heading: "Legal", links: ["Privacy", "Terms", "DPA"] },
];

const SOCIAL = ["LinkedIn", "X", "YouTube"];

export function SiteFooter() {
  return (
    <footer
      id="resources"
      className="scroll-mt-20 border-t border-lp-border bg-lp-surface"
    >
      {/* Extra bottom padding below `sm` keeps the fixed mobile CTA bar off the last row. */}
      <div className="mx-auto max-w-lp-shell px-4 pt-rl-8 pb-8 max-sm:pb-24 md:px-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8">
          <div className="flex flex-col gap-3.5">
            <span className="flex items-center gap-2.5 font-display text-lg font-semibold">
              <LogoMark className="size-6" />
              {PRODUCT_NAME}
            </span>
            <span className="text-sm leading-relaxed text-lp-muted">
              Get everything you need from clients, without chasing.
            </span>
          </div>
          {COLUMNS.map((column) => (
            <div key={column.heading} className="flex flex-col gap-2.5">
              <div className={`${EYEBROW_CLASS} mb-1`}>{column.heading}</div>
              {column.links.map((label) => (
                <Link key={label} href="#" className="text-base text-lp-ink">
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-lp-border pt-6 text-sm text-lp-muted">
          <span>
            © 2026 {PRODUCT_NAME}. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex gap-4">
              {SOCIAL.map((label) => (
                <Link key={label} href="#" className="text-lp-muted">
                  {label}
                </Link>
              ))}
            </div>
            <ThemeSwitch />
          </div>
        </div>
      </div>
    </footer>
  );
}
