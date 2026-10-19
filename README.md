# ollex-landing-page

The public marketing site for Ollex: Next.js (App Router), React 19, Tailwind CSS v4. It has no auth of its own; "Sign in" and "Start free trial" link out to the provider app.

## Run it

Needs Node 22+ and pnpm 10.

```bash
pnpm install
cp .env.example .env.local   # then edit if the provider is not on localhost:4000
pnpm dev                     # http://localhost:3001
```

| Command | What it does |
|---|---|
| `pnpm dev` / `pnpm start` | Serve on port 3001 |
| `pnpm build` | Production build (fails without `NEXT_PUBLIC_PROVIDER_URL`) |
| `pnpm typecheck` | `next typegen && tsc --noEmit` |
| `pnpm lint` | ESLint, then `check:cn` (keeps `cn()` in step with the font-size tokens) |

## Environment

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_PROVIDER_URL` | Origin of the provider app (sign-in, sign-up, dashboard). Required for production builds. |

The provider and the client portal link back to this site through their own `NEXT_PUBLIC_LANDING_URL`.

## Before deploying

"Book a demo" does not send anything yet (`submitDemoRequest()` in `lib/demo-request.ts` is a stub), and several links, pricing tiers and quotes are placeholders. See `CLAUDE.md` for the list.

## Layout

- `app/(landingPage)/` the page and its section components
- `app/tokens.css` design tokens, `app/landing-theme.css` fonts and the light/dark layer
- `lib/` brand, links, theme, analytics, `cn()`
- `docs/landing-design.md` how the design canvas maps onto the tokens
