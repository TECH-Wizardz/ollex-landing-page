import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

// Links to the provider are absolute and come from env (separate origins), so a
// production build without it would ship links pointing at localhost.
const REQUIRED_AT_BUILD = ["NEXT_PUBLIC_PROVIDER_URL"];

const nextConfig: NextConfig = {};

export default function config(phase: string): NextConfig {
  if (phase === PHASE_PRODUCTION_BUILD) {
    const missing = REQUIRED_AT_BUILD.filter((name) => !process.env[name]);
    if (missing.length > 0) {
      throw new Error(`ollex-landing-page: set ${missing.join(", ")} before building.`);
    }
  }
  return nextConfig;
}
