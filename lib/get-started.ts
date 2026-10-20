import { PRODUCT_NAME } from "@/lib/brand";

export interface GetStartedRequest {
  email: string;
  /** Web3Forms' honeypot: a real visitor never ticks the hidden checkbox. */
  botcheck?: boolean;
}

const MAX_EMAIL_LENGTH = 254;
// Deliberately loose: one @, a dot in the domain, no whitespace. The inbox that
// receives the message is the real check.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return value.length <= MAX_EMAIL_LENGTH && EMAIL_PATTERN.test(value);
}

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

/**
 * Emails the visitor's address to the site owner through Web3Forms.
 *
 * This runs in the browser on purpose: Web3Forms' free plan only accepts
 * browser submissions (server-side calls need a paid plan and IP whitelisting),
 * and its access key is meant to be public. `next.config.ts` inlines
 * `WEB3FORM_ACCESS_KEY` into the client bundle for that reason.
 *
 * Throws when the key is missing or Web3Forms rejects the request, so the modal
 * shows its error message instead of a false "Thanks".
 */
export async function submitGetStarted({
  email,
  botcheck = false,
}: GetStartedRequest): Promise<void> {
  const accessKey = process.env.WEB3FORM_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("WEB3FORM_ACCESS_KEY is not set");
  }

  const response = await fetch(WEB3FORMS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `New ${PRODUCT_NAME} get-started request`,
      from_name: `${PRODUCT_NAME} website`,
      email,
      page: window.location.href,
      botcheck,
    }),
  });

  const result: { success?: boolean; message?: string } | null = await response
    .json()
    .catch(() => null);

  if (!response.ok || !result?.success) {
    throw new Error(
      `Web3Forms rejected the request (${response.status}): ${result?.message ?? "no message"}`
    );
  }
}
