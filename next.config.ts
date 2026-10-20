import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

// The "Get started" form posts to Web3Forms from the browser, so without this
// key a production build would ship a form that always fails.
const REQUIRED_AT_BUILD = ["WEB3FORM_ACCESS_KEY"];

const nextConfig: NextConfig = {
  // Web3Forms access keys are public by design, and its free plan only accepts
  // browser submissions, so this one is inlined into the client bundle even
  // though it has no NEXT_PUBLIC_ prefix. Do not put a real secret here.
  env: { WEB3FORM_ACCESS_KEY: process.env.WEB3FORM_ACCESS_KEY ?? "" },
};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const missing = REQUIRED_AT_BUILD.filter((name) => !process.env[name]);
    if (missing.length > 0) {
      throw new Error(`ollex-landing-page: set ${missing.join(", ")} before building.`);
    }
  }
  return nextConfig;
}
