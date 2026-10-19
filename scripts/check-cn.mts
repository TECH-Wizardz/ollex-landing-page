// Guards the invariant documented in lib/utils.ts: every custom `--text-*`
// font-size token in tokens.css must be registered in cn()'s tailwind-merge
// font-size group. If one is missing, tailwind-merge classifies `text-<token>`
// as a *color*, so it and a real text color silently override each other.
//
// Run with: pnpm check:cn   (Node strips the types itself; also part of `pnpm lint`)
import { readFileSync } from "node:fs";
import path from "node:path";

import { cn } from "../lib/utils.ts";

const tokensPath = path.join(import.meta.dirname, "../app/tokens.css");
const css = readFileSync(tokensPath, "utf8");

// Sizes tailwind-merge already knows about, so they need no registration.
const BUILT_IN = new Set(["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl", "8xl", "9xl"]);

const tokens = [...css.matchAll(/--text-([a-z0-9-]+?)\s*:/g)]
  .map((m) => m[1])
  .filter((name) => !name.endsWith("-line-height") && !name.includes("--"))
  .filter((name) => !BUILT_IN.has(name));

const unique = [...new Set(tokens)];
const failures: string[] = [];

for (const token of unique) {
  const size = `text-${token}`;
  const color = "text-rl-text-inverse";
  const merged = cn(size, color).split(" ").sort().join(" ");
  const expected = [size, color].sort().join(" ");
  if (merged !== expected) {
    failures.push(`${size}: cn("${size}", "${color}") -> "${merged}" (expected both kept)`);
  }
}

// Two sizes must still conflict, otherwise registering them proves nothing.
const sizes = cn("text-rl-body", "text-rl-caption");
if (sizes !== "text-rl-caption") {
  failures.push(`cn("text-rl-body", "text-rl-caption") -> "${sizes}" (expected the later size to win)`);
}

if (unique.length === 0) {
  failures.push(`found no custom --text-* tokens in ${tokensPath}; the parser is out of date`);
}

if (failures.length > 0) {
  console.error("cn() font-size registration is out of sync with tokens.css:\n");
  for (const f of failures) console.error(`  ${f}`);
  console.error("\nAdd the missing token(s) to the font-size group in lib/utils.ts.");
  process.exit(1);
}

console.log(`check:cn ok — ${unique.length} custom font-size tokens are registered`);
