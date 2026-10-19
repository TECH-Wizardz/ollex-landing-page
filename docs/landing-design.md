# Landing page design notes

Moved here from section 2.12 of the Ollect monorepo's `packages/ui/design-system.md`. The `rl-*` and `lp-*` tokens it mentions are defined in `app/tokens.css`; the theme layer is `app/landing-theme.css`.

The landing page follows `Landing Page v2.dc.html` in the *Landing Page build progress* Claude
Design project (`6a3c89cd-42c9-4bb5-842b-f9fc67398f38`). The canvas is the source of truth for
the page; it replaces the earlier prompt-box landing. Unlike the provider and portal apps
it ships **two themes** and **three typefaces**, both approved for the landing page only.
The provider and portal stay light-only SF Pro.

## Typefaces

| Role | Family | Where it comes from |
|---|---|---|
| Body, UI | Inter | `next/font/google`, `--font-inter` |
| Headings, prices | General Sans 600 | `next/font/local` (`app/fonts`, Fontshare free licence), `--font-general-sans` |
| Hand-drawn accents (sticky note, hero annotation) | Caveat 500/600 | `next/font/google`, `--font-caveat` |

`app/landing-theme.css` overrides `--font-sans` and adds `--font-display` and
`--font-hand`. It is imported after `tokens.css` and is compiled only into the landing app, so
the shared `--font-sans` (SF Pro) is untouched elsewhere.

## Fluid type (`tokens.css`, namespaced `lp`)

The page uses viewport-fluid sizes that fall between the base scale's steps. They are named once
and registered in `cn()`'s font-size group like every other custom `--text-*` token.

| Token | Value | Use |
|---|---|---|
| `--text-lp-display` | `clamp(40px, 5.6vw, 72px)` / 1.06 | Hero H1 (tracking `-0.04em`) |
| `--text-lp-h2` | `clamp(30px, 4.2vw, 44px)` / 1.2 | Section title (`-0.03em`) |
| `--text-lp-h2-sm` | `clamp(28px, 3.6vw, 40px)` / 1.2 | Security title |
| `--text-lp-h2-cta` | `clamp(30px, 4.6vw, 52px)` / 1.12 | Closing CTA title (`-0.035em`) |
| `--text-lp-h2-faq` | `clamp(26px, 3vw, 32px)` / 1.2 | FAQ title |
| `--text-lp-h3` | `clamp(19px, 2vw, 22px)` / 1.2 | Card title |
| `--text-lp-pain` | `clamp(22px, 2.6vw, 30px)` / 1.25 | Use-case pain statement |
| `--text-lp-lead` | `clamp(16px, 1.4vw, 18px)` / 1.6 | Section lead paragraph |
| `--text-lp-price` | 44px / 1 | Plan price |
| `--text-lp-note`, `--text-lp-annot` | `clamp(17px, 1.8vw, 22px)`, `clamp(20px, 2vw, 26px)` | Hand font: sticky note, hero annotation |
| `--text-lp-mock` | `clamp(11px, 1.05vw, 13px)` / 1.4 | Hero mock-up base; its children are sized in `em` |

`--spacing-lp-shell` is the content max width, **1248px**.

## Theme layer (`landing-theme.css`)

Shared `rl-*` colours are fixed light values, so the landing page reads colour through runtime
variables `--lp-*` that flip between themes, exposed to Tailwind as `bg-lp-surface`,
`text-lp-ink`, `border-lp-border`, `bg-lp-b-success-bg` and so on (`@theme inline`).

Light values **reference `rl-*` tokens**. In dark, a value reuses an `rl-*` token wherever the
canvas matches one, and is new only where none does:

| `--lp-*` | Light | Dark |
|---|---|---|
| `bg` / `surface` / `subtle` | `rl-white` / `rl-white` / `rl-grey` | `rl-grey-95` / `rl-black` / `rl-grey-90` |
| `ink` / `on-ink` / `muted` | `rl-black` / `rl-white` / `rl-grey-70` | `rl-white` / `rl-grey-95` / `rl-grey-50` |
| `border` | `rl-grey-30` | `rgba(255,255,255,.16)` *(new)* |
| `accent` / `primary` | `rl-blue` | `rl-blue-hover` / `rl-blue` |
| `tint-1` / `tint-2` / `tint-3` | `rl-blue-lightest` / `rl-violet-surface` / `rl-success-surface` | `rl-blue-darkest` / `rl-purple-dark` / `#0d3a1c` *(new)* |
| `success` / `danger` | `rl-success` / `rl-error` | `#42be65` / `#ff8389` *(new)* |
| `cream` / `hl` | `rl-cream` / `rl-blue-lighter` | `rl-black` / `rgba(15,98,254,.38)` *(new)* |
| `sketch` / `sketch-strong` | `rgba(29,29,31,.10 / .26)` | `rgba(255,255,255,.07 / .22)` *(new)* |
| `b-*-bg` / `b-*-fg` (success, brand, violet, warn, danger, neutral) | the matching `rl-*` surface / base pair | translucent fills with light text, as in the canvas *(new)* |

Selection order: `data-theme="light"|"dark"` on `<html>` wins; with none set, the page follows
`prefers-color-scheme`. The footer's Auto / Light / Dark switch stores an explicit choice in
`localStorage` (`ollex-theme`), and an inline `<script>` in `<head>` applies it before first
paint. "Auto" removes the attribute and the key. The dark block appears twice in the CSS (media
query and attribute selector) because CSS cannot share a rule between them; keep both in sync.

**Illustration palette** — fictional client brands and avatars drawn inside product mock-ups.
Identical in both themes, like the sticky note: `--color-lp-brand-forest #2f4b3a`,
`-gold #c9a86a`, `-clay #8a4b3b`, and `--color-lp-avatar-peach`, `-mint`, `-sky`, `-lilac`,
`-butter`. Use them only for mock-up content, never for UI chrome.

## Snapped to the existing scale (no new values)

| Canvas | Token |
|---|---|
| Card / mock-up radius 12px | `rounded-xl` (14px) |
| 20px · 24px · 10px · 8px · 40px · pill | `rounded-2xl` · `rounded-rl-md` · `rounded-lg` · `rounded-md` · `rounded-rl-lg` · `rounded-rl-full` |
| Mock-up text 11–12.5px, 13px | `text-2xs` / `text-xs`, `text-sm` |
| 14px meta text | `text-sm` (13px) |
| 15 · 16 · 17 · 18px | `text-base` · `text-rl-body` · `text-md` · `text-rl-body-lg` |
| Mock-up card shadow `0 16px 40px -16px` + 1px ring | `shadow-rl-3 ring-1 ring-lp-border` (the hero's central card uses `shadow-rl-4`) |
| Section padding `clamp(64px, 8vw, 96px)` | `py-rl-8 md:py-rl-10 lg:py-24` |

## Behaviour

- Reveal-on-scroll (200ms fade + 16px rise, once) applies only to sections that start below the fold, and never to reduced-motion visitors; the page renders fully visible without JavaScript.
- The hero's highlighter swipe and strike-through draw once on load (CSS keyframes `lp-highlight`, `lp-strike`). The mock portal ticks 2 → 5 of 5 on a timer; reduced motion renders the finished state.
- Below `sm`, a fixed "Get started" bar appears once the hero has scrolled out of view.

