import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  // The landing page stays light (no react-query or firebase) and has no auth
  // of its own: sign-in and sign-up live in the provider app.
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["@clerk/*"],
              message: "The landing page has no auth; sign-in and sign-up live in the provider app.",
            },
            {
              group: ["@tanstack/react-query", "@tanstack/react-query/*", "firebase", "firebase/*"],
              message: "The landing page must stay light: no react-query or firebase.",
            },
          ],
        },
      ],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);
