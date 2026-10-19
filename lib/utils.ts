import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// `text-*` is ambiguous: it is both the font-size and the text-color utility.
// tailwind-merge resolves that by recognising the built-in size scale and
// treating everything else as a color -- so our custom sizes (`text-rl-body`,
// `text-rl-caption`, ...) were classed as colors and put in the same conflict
// group as real colors (`text-rl-text-inverse`). Whichever came last won, and
// since cva emits `size` after `variant`, every button variant's text color
// was silently dropped. Listing the project's font-size tokens -- every
// `--text-*` in ../app/tokens.css that Tailwind doesn't ship itself -- puts
// them back in the font-size group, so a size and a color no longer collide.
// `scripts/check-cn.mts` fails the lint if the two drift apart.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            // legacy scale
            "2xs",
            "md",
            // rl-* scale
            "rl-display",
            "rl-h2",
            "rl-h3",
            "rl-h4",
            "rl-h5",
            "rl-h6",
            "rl-body-lg",
            "rl-body",
            "rl-caption",
            "rl-caption-xs",
            // layout-scoped measurement tokens
            "rl-step-title",
            "rl-step-label",
            "rl-rail-title",
            "rl-rail-label",
            // landing page v2 fluid sizes
            "lp-display",
            "lp-h2",
            "lp-h2-sm",
            "lp-h2-cta",
            "lp-h2-faq",
            "lp-h3",
            "lp-pain",
            "lp-lead",
            "lp-price",
            "lp-note",
            "lp-annot",
            "lp-mock",
          ],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
