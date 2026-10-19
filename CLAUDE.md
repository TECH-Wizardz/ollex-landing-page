# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

# ollex-landing-page

The public marketing site for Ollex. A standalone Next.js (App Router) app, dev/start port **3001**. It used to be `apps/landing` in the Ollect monorepo; the provider dashboard (sign-in, sign-up, the product itself) is a separate app on another origin.

## Commands
pnpm 10, Node 22+.
- `pnpm install`, then `cp .env.example .env.local` (dev falls back to `http://localhost:4000` for the provider if the variable is unset; `pnpm build` does not)
- `pnpm dev` / `pnpm build` / `pnpm start` - port 3001
- `pnpm typecheck` - `next typegen && tsc --noEmit`. The typegen step matters: `LayoutProps<"/">` in `app/layout.tsx` is a generated type, and it only exists in the gitignored `.next/` output, so a bare `tsc` fails on a fresh checkout.
- `pnpm lint` - ESLint, then `check:cn`; `pnpm check:cn` runs just the token check (`scripts/check-cn.mts`, run by Node directly, no build step)
- There is **no test runner** (no unit or e2e tests, so no single-test command). `pnpm typecheck` and `pnpm lint` are the automated checks; verify UI changes in a browser.

## Notes
- Owns `app/(landingPage)` and `lib/`. It has **no auth**: no Clerk, no sign-in modal, no `/sso-callback`. Every "Sign in" / "Start free trial" is a plain link to the provider app via `loginUrl()` (`lib/links.ts`, which builds it from `NEXT_PUBLIC_PROVIDER_URL`); never hardcode `/login`.
- The page follows `Landing Page v2.dc.html` (Claude Design project `6a3c89cd-42c9-4bb5-842b-f9fc67398f38`); `docs/landing-design.md` records how it maps onto the tokens. The product is called **Ollex** (`lib/brand.ts`); all visible copy reads it from `PRODUCT_NAME`.
- Sections are server components in `app/(landingPage)/components/`; client components are only the interactive leaves (header, hero demo, use-case tabs, pricing toggle, FAQ, theme switch, mobile CTA bar, `RevealSection`). The header's "Use cases" menu and the tabs share state through `UseCaseProvider`. `page.tsx` is the whole composition: the header and `<main>` sections sit inside `DemoDialogProvider` > `UseCaseProvider`, but `SiteFooter` and `MobileCtaBar` sit outside both. A `DemoButton` or `useUseCase()` there would throw at render, so use `CtaLink` (or move the provider) in those two.
- **Hero illustration** (`hero-portal-demo.tsx`) loops through the scenes in `hero-scenarios.data.ts`. Every scene needs exactly 5 checklist items (the progress bar and the "2 → 5 of 5" timeline assume it), and the first scene is the server-rendered one. It only advances while on screen, and reduced-motion visitors see scene 1's final frame.
- **Design tokens** are vendored in `app/tokens.css` (copied from the monorepo's `@ollect/ui` package; it carries more tokens than this page uses). `cn()` is `lib/utils.ts`. Adding a `--text-*` token to `tokens.css` also means listing it in the font-size group in `lib/utils.ts`, or tailwind-merge treats `text-<token>` as a colour and a size class silently eats a text colour. `pnpm lint` runs `check:cn`, which fails if the two drift apart.
- **Fonts**: Inter + Caveat (`next/font/google`) and General Sans 600 (`next/font/local`, `app/fonts`), wired through `app/landing-theme.css`. That file also holds the light/dark colour layer (`--lp-*` → `bg-lp-*` utilities). New colour must go through it, not a hex in a component, or it will not follow the theme. The `rl-*` tokens are fixed light values, so mock-ups use the landing-local `StatusPill` and `MockCard`.
- **Theme**: `data-theme` on `<html>` beats `prefers-color-scheme`. The choice is stored in `localStorage` (`ollex-theme`) and applied by an inline `<script>` in `<head>` (`lib/theme.ts`). It must stay a plain inline script: `next/script` queues even `beforeInteractive` inline scripts behind Next's async runtime, so it flashes the wrong theme.
- `track()` (`lib/track.ts`) reports to Plausible if `window.plausible` exists and is otherwise a no-op. "Start free trial" is a `CtaLink` (fires `cta_trial_click` with a `section`); "Book a demo" is a `DemoButton` (fires `cta_demo_click`).
- **Book a demo modal**: one native `<dialog>` (`DemoDialog`) owned by `DemoDialogProvider`, so any `DemoButton` can open it. It follows the `--lp-*` theme colours. **Submitting does not send anything yet**: `submitDemoRequest()` in `lib/demo-request.ts` is a stub, so the "Request received" screen is untrue until a real backend replaces it. Do not deploy before that.
- Placeholders that need real values: the demo request itself (above), "Read our security overview" (`#security`), footer and social links (`#`), the pricing tiers and the three pilot-customer quotes.
- Keyframes used only by this app (`lp-highlight`, `lp-strike`) and the `lp-dots` / reveal rules live in `app/globals.css`.
- Lint forbids importing `@clerk/*`, react-query or firebase here; keep this app light.
- Needs `NEXT_PUBLIC_PROVIDER_URL`; a production build fails without it. See `.env.example`. The provider (and the client portal) find this site through their own `NEXT_PUBLIC_LANDING_URL`, so changing this site's origin means updating that variable there.

## Version control
When committing, do not add a co-author trailer.
