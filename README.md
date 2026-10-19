# ollex-landing-page

The public marketing site for Ollex: Next.js (App Router), React 19, Tailwind CSS v4. It has no auth and no link to the provider app: the one call to action is "Get started", which opens an email modal.

## Run it

Needs Node 22+ and pnpm 10.

```bash
pnpm install
pnpm dev     # http://localhost:3001
```

| Command | What it does |
|---|---|
| `pnpm dev` / `pnpm start` | Serve on port 3001 |
| `pnpm build` | Production build |
| `pnpm typecheck` | `next typegen && tsc --noEmit` |
| `pnpm lint` | ESLint, then `check:cn` (keeps `cn()` in step with the font-size tokens) |

## Environment

The site reads no environment variables. The provider and the client portal link back to this site through their own `NEXT_PUBLIC_LANDING_URL`.

## Before deploying

"Get started" does not send anything yet (`submitGetStarted()` in `lib/get-started.ts` is a stub), and several links, pricing tiers and quotes are placeholders. See `CLAUDE.md` for the list.

## Layout

- `app/(landingPage)/` the page and its section components
- `app/tokens.css` design tokens, `app/landing-theme.css` fonts and the light/dark layer
- `lib/` brand, theme, analytics, the get-started stub, `cn()`
- `docs/landing-design.md` how the design canvas maps onto the tokens
