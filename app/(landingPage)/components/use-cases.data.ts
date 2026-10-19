export type UseCaseKey =
  | "accountants"
  | "agencies"
  | "consultants"
  | "law"
  | "recruiters";

export type ItemStatus = "Approved" | "Submitted" | "Requested" | "Needs fix";

export interface UseCase {
  label: string;
  /** Full class name so Tailwind can see it. */
  tintClass: string;
  pain: string;
  example: string;
  title: string;
  items: [name: string, status: ItemStatus][];
}

export const USE_CASE_ORDER: UseCaseKey[] = [
  "accountants",
  "agencies",
  "consultants",
  "law",
  "recruiters",
];

export const USE_CASES: Record<UseCaseKey, UseCase> = {
  accountants: {
    label: "Accountants",
    tintClass: "bg-lp-tint-1",
    pain: "Month-end stalls while you wait on bank statements and receipts.",
    example: "a monthly bookkeeping checklist that sends itself on the 1st.",
    title: "June bookkeeping · Sam's Bakery",
    items: [
      ["Business bank statement", "Approved"],
      ["Payroll summary", "Approved"],
      ["June receipts", "Submitted"],
      ["Amex statement", "Requested"],
      ["Sales tax question", "Requested"],
    ],
  },
  agencies: {
    label: "Agencies",
    tintClass: "bg-lp-tint-2",
    pain: "Projects slip because logins, brand files and approvals sit in five inboxes.",
    example: "a kickoff pack with assets, logins and sign-offs.",
    title: "Website kickoff · Northside Studio",
    items: [
      ["Logo files", "Approved"],
      ["Brand guidelines", "Submitted"],
      ["Hosting login", "Requested"],
      ["Homepage copy approval", "Needs fix"],
    ],
  },
  consultants: {
    label: "Consultants",
    tintClass: "bg-lp-tint-3",
    pain: "Kickoffs start late because intake forms come back half done.",
    example: "an intake form plus background documents before the first call.",
    title: "Onboarding · Lumen Coaching",
    items: [
      ["Signed agreement", "Approved"],
      ["Intake questionnaire", "Submitted"],
      ["Last year's plan", "Requested"],
    ],
  },
  law: {
    label: "Law firms",
    tintClass: "bg-lp-tint-1",
    pain: "Matters wait on ID checks, evidence and signed forms.",
    example: "a new-matter pack with ID, proof of address and signatures.",
    title: "New matter · R. Alvarez",
    items: [
      ["Photo ID", "Approved"],
      ["Supporting documents", "Submitted"],
      ["Proof of address", "Needs fix"],
      ["Signed engagement letter", "Requested"],
    ],
  },
  recruiters: {
    label: "Recruiters",
    tintClass: "bg-lp-tint-2",
    pain: "Placements stall on right-to-work and compliance documents.",
    example: "a compliance pack each candidate completes from their phone.",
    title: "Compliance pack · J. Okafor",
    items: [
      ["Right to work", "Approved"],
      ["Signed contract", "Submitted"],
      ["References", "Requested"],
      ["Bank details form", "Requested"],
    ],
  },
};
