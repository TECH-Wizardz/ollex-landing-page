import { cn } from "@/lib/utils";

const VARIANT = {
  primary: "bg-lp-primary text-lp-on-primary hover:bg-lp-primary-hover",
  outline:
    "border-2 border-lp-ink bg-transparent text-lp-ink hover:bg-lp-ink hover:text-lp-on-ink",
  surface:
    "border border-lp-border bg-lp-surface text-lp-ink hover:brightness-95",
};

const SIZE = {
  nav: "h-11 rounded-rl-full px-5 text-base",
  "nav-compact": "h-11 rounded-rl-full px-4.5 text-base",
  hero: "h-13 gap-2.5 rounded-rl-lg px-6 text-rl-body",
  md: "h-12 rounded-rl-full px-6 text-rl-body",
  block: "h-12 w-full rounded-rl-full text-rl-body",
};

export type CtaVariant = keyof typeof VARIANT;
export type CtaSize = keyof typeof SIZE;

/** The page's pill/rounded call-to-action look, shared by links and buttons. */
export function ctaClassName(variant: CtaVariant, size: CtaSize) {
  return cn(
    "inline-flex items-center justify-center font-medium whitespace-nowrap transition-[background-color,color,filter,transform] duration-150 active:translate-y-px disabled:pointer-events-none disabled:opacity-60",
    VARIANT[variant],
    SIZE[size]
  );
}
