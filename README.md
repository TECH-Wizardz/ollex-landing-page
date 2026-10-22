# ollex-landing-page

The public marketing site for Ollex: Next.js (App Router), React 19, Tailwind CSS v4. It has no auth and no link to the provider app: the one call to action is "Get started", which opens an email modal.

## Run it

Needs Node 22+ and pnpm 10.

```bash
pnpm install
cp .env.example .env.local   # then set WEB3FORM_ACCESS_KEY
pnpm dev                     # http://localhost:3001
```

| Command | What it does |
|---|---|
| `pnpm dev` / `pnpm start` | Serve on port 3001 |
| `pnpm build` | Production build (fails without `WEB3FORM_ACCESS_KEY`) |
| `pnpm typecheck` | `next typegen && tsc --noEmit` |
| `pnpm lint` | ESLint, then `check:cn` (keeps `cn()` in step with the font-size tokens) |

## Environment

| Variable | Purpose |
|---|---|
| `WEB3FORM_ACCESS_KEY` | [Web3Forms](https://web3forms.com) access key for the "Get started" email form. Required for production builds. It is public by design and is inlined into the browser bundle, because Web3Forms' free plan only accepts browser submissions. |
| `GOOGLE_ANALYTICS_ID` | Google Analytics 4 measurement ID (`G-XXXXXXXXXX`). Optional: when empty, no analytics script is loaded. Read at build time, so set it before `pnpm build`. |

The provider and the client portal link back to this site through their own `NEXT_PUBLIC_LANDING_URL`.

## Before deploying

Several links, the pricing tiers and the pilot-customer quotes are placeholders, and the pricing section (with the FAQ) is hidden for now. Send one real email through the form first (Web3Forms may ask you to verify the destination address). See `CLAUDE.md` for the list.

## Layout

- `app/(landingPage)/` the page and its section components
- `app/tokens.css` design tokens, `app/landing-theme.css` fonts and the light/dark layer
- `lib/` brand, theme, analytics, the Web3Forms get-started submit, `cn()`
- `docs/landing-design.md` how the design canvas maps onto the tokens
