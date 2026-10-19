/**
 * The scenes the hero illustration cycles through. Every scene has exactly five
 * checklist items: the first two start done and the last three are the ones
 * being chased, so the email, text, file and sticky note all point at one of
 * those three. The first scene is the one rendered on the server.
 */
export interface HeroScenario {
  key: string;
  /** The provider's name in the portal header. */
  brand: string;
  /** Full class name so Tailwind can see it. */
  brandClass: string;
  /** First name, for "Hi {client}". */
  client: string;
  title: string;
  items: [string, string, string, string, string];
  email: { to: string; chip: string; subject: string; preview: string };
  text: { from: string; message: string };
  file: { name: string; problem: string };
  note: string;
}

export const HERO_SCENARIOS: HeroScenario[] = [
  {
    key: "accountants",
    brand: "Ledgerline",
    brandClass: "bg-lp-brand-forest",
    client: "Sam",
    title: "Q2 tax records",
    items: [
      "Bank statement",
      "Payroll report",
      "Engagement letter",
      "Amex statement",
      "June receipts",
    ],
    email: {
      to: "Sam's Bakery",
      chip: "4th follow-up",
      subject: "Re: Re: Fwd: June documents",
      preview: "Just following up again on the Amex statement…",
    },
    text: { from: "Sam", message: "Sorry, which file did you need again?" },
    file: { name: "receipts_FINAL_v3 (2).pdf", problem: "Wrong month" },
    note: "Chase Sam for the Amex statement!!",
  },
  {
    key: "agencies",
    brand: "Fieldwork Studio",
    brandClass: "bg-lp-brand-gold",
    client: "Maya",
    title: "Website kickoff",
    items: [
      "Logo files",
      "Brand guidelines",
      "Homepage copy",
      "Hosting login",
      "Domain access",
    ],
    email: {
      to: "Harbor Coffee",
      chip: "3rd follow-up",
      subject: "Re: Re: Fwd: Kickoff assets",
      preview: "Just checking again on the hosting login…",
    },
    text: { from: "Maya", message: "Which login did you need again?" },
    file: { name: "logo_final_FINAL.png", problem: "Too small" },
    note: "Chase Maya for the hosting login!!",
  },
  {
    key: "law",
    brand: "Harlow Legal",
    brandClass: "bg-lp-brand-clay",
    client: "Rosa",
    title: "New matter pack",
    items: [
      "Photo ID",
      "Intake form",
      "Proof of address",
      "Engagement letter",
      "Source of funds",
    ],
    email: {
      to: "R. Alvarez",
      chip: "4th follow-up",
      subject: "Re: Re: Fwd: Your documents",
      preview: "Just following up again on the proof of address…",
    },
    text: { from: "Rosa", message: "Is a phone bill okay for the address?" },
    file: { name: "scan0042.pdf", problem: "Can't read it" },
    note: "Chase Rosa for proof of address!!",
  },
  {
    key: "recruiters",
    brand: "Kestrel Talent",
    brandClass: "bg-lp-primary",
    client: "Jordan",
    title: "Compliance pack",
    items: [
      "Right to work",
      "Signed contract",
      "References",
      "Bank details",
      "Emergency contact",
    ],
    email: {
      to: "J. Okafor",
      chip: "2nd follow-up",
      subject: "Re: Re: Fwd: Start date paperwork",
      preview: "Just following up again on the bank details…",
    },
    text: { from: "Jordan", message: "Is it the form with the blue logo?" },
    file: { name: "contract_scan (3).jpg", problem: "Page 2 missing" },
    note: "Chase Jordan for the bank details!!",
  },
];
