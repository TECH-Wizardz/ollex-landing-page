const DEV_PROVIDER_URL = "http://localhost:4000";

// Keep the `process.env.NEXT_PUBLIC_*` read literal: the bundler only inlines
// it in that exact form.
function providerOrigin(): string {
  const value = process.env.NEXT_PUBLIC_PROVIDER_URL;
  if (value) return value.replace(/\/+$/, "");
  // A missing URL in production would silently point links at localhost.
  // next.config.ts also fails the build for this; this is the backstop.
  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_PROVIDER_URL is not set; it is required in production.");
  }
  return DEV_PROVIDER_URL;
}

/**
 * Where every "Sign in" / "Start free trial" goes. The landing page has no
 * auth of its own: the provider app's login sends signed-in users straight to
 * their dashboard.
 */
export function loginUrl() {
  return `${providerOrigin()}/login`;
}
