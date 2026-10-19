export const TEAM_SIZES = ["1", "2–5", "6–10", "11–25", "25+"] as const;

export type TeamSize = (typeof TEAM_SIZES)[number];

export interface DemoRequest {
  email: string;
  teamSize: TeamSize | null;
}

const MAX_EMAIL_LENGTH = 254;
// Deliberately loose: one @, a dot in the domain, no whitespace. The inbox that
// receives the request is the real check.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return value.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(value);
}

/**
 * TODO: this does not send anything yet. The "Book a demo" modal is UI-only, so
 * this only waits long enough for the button's "Sending…" state to show. Replace
 * the body with a real request (and let it throw on failure, so the modal shows
 * its error message) before this page goes live: until then the "Request
 * received" screen tells visitors something that isn't true.
 */
export async function submitDemoRequest(request: DemoRequest): Promise<void> {
  if (process.env.NODE_ENV !== "production") {
    console.debug("[demo-request] not sent, no backend yet:", request);
  }
  await new Promise((resolve) => setTimeout(resolve, 600));
}
