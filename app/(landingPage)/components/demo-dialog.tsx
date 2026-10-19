"use client";

import { useRef, useState, type FormEvent, type Ref } from "react";
import { Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/lib/brand";
import { TEAM_SIZES, isValidEmail, submitDemoRequest } from "@/lib/demo-request";
import { track } from "@/lib/track";
import { ctaClassName } from "./cta-styles";

type Status = "idle" | "sending" | "sent" | "error";

const LABEL = "text-sm font-medium text-lp-ink";

export function DemoDialog({ ref }: { ref: Ref<HTMLDialogElement> }) {
  const [status, setStatus] = useState<Status>("idle");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  // Whether the current click began on the backdrop, so selecting text inside
  // the modal and releasing outside it doesn't close it.
  const pressedBackdrop = useRef(false);

  function reset() {
    setStatus("idle");
    setEmailError(null);
    setSentTo("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const teamSize = TEAM_SIZES.find((size) => size === data.get("teamSize")) ?? null;

    if (!isValidEmail(email)) {
      setEmailError(
        email ? "Enter a valid email address." : "Enter your work email."
      );
      emailRef.current?.focus();
      return;
    }

    setEmailError(null);
    setStatus("sending");
    try {
      await submitDemoRequest({ email, teamSize });
      track("demo_request_submit", { team_size: teamSize ?? "not_given" });
      setSentTo(email);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="demo-title"
      aria-describedby="demo-description"
      onClose={reset}
      onMouseDown={(e) => {
        pressedBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        if (pressedBackdrop.current && e.target === e.currentTarget) {
          e.currentTarget.close();
        }
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-104 overflow-y-auto overscroll-contain rounded-2xl border border-lp-border bg-lp-surface p-0 text-lp-ink shadow-rl-4 backdrop:bg-rl-grey-100/50"
    >
      <div className="relative p-6 sm:p-8">
        <form method="dialog" className="absolute top-4 right-4">
          <button
            type="submit"
            aria-label="Close"
            className="grid size-8 place-items-center rounded-md text-lp-muted transition-colors hover:bg-lp-subtle hover:text-lp-ink"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </form>

        {status === "sent" ? (
          <div className="flex flex-col items-center py-4 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-lp-b-success-bg text-lp-b-success-fg">
              <Check size={24} strokeWidth={2.5} />
            </span>
            <h2
              id="demo-title"
              className="mt-5 font-display text-xl font-semibold tracking-[-0.02em]"
            >
              Request received
            </h2>
            <p id="demo-description" className="mt-2 text-rl-body text-lp-muted">
              We&apos;ll email a calendar link to{" "}
              <span className="font-medium break-words text-lp-ink">{sentTo}</span>{" "}
              within one business day.
            </p>
            <form method="dialog" className="mt-6 w-full">
              <button
                type="submit"
                className={ctaClassName("surface", "block")}
              >
                Done
              </button>
            </form>
          </div>
        ) : (
          <>
            <h2
              id="demo-title"
              className="pr-8 font-display text-xl font-semibold tracking-[-0.02em]"
            >
              Book a 15-minute demo
            </h2>
            <p id="demo-description" className="mt-2 text-base text-lp-muted">
              Tell us where to send the invite and we&apos;ll show you{" "}
              {PRODUCT_NAME} with your own client requests.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-5">
              <div>
                <label htmlFor="demo-email" className={LABEL}>
                  Work email
                </label>
                <input
                  ref={emailRef}
                  id="demo-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@company.com"
                  required
                  data-autofocus
                  aria-invalid={emailError ? true : undefined}
                  aria-describedby={emailError ? "demo-email-error" : undefined}
                  onChange={() => emailError && setEmailError(null)}
                  className={cn(
                    "mt-2 h-11 w-full rounded-rl-sm border bg-lp-bg px-3 text-rl-body text-lp-ink placeholder:text-lp-muted",
                    emailError ? "border-lp-danger" : "border-lp-border"
                  )}
                />
                {emailError ? (
                  <p
                    id="demo-email-error"
                    role="alert"
                    className="mt-1.5 text-sm text-lp-danger"
                  >
                    {emailError}
                  </p>
                ) : null}
              </div>

              <fieldset>
                <legend className={LABEL}>Team size</legend>
                <div className="mt-2 grid grid-cols-4 gap-2">
                  {TEAM_SIZES.map((size) => (
                    <label key={size} className="relative">
                      <input
                        type="radio"
                        name="teamSize"
                        value={size}
                        className="peer sr-only"
                      />
                      <span className="grid h-10 cursor-pointer place-items-center rounded-rl-6 border border-lp-border bg-lp-bg text-base text-lp-ink transition-colors hover:bg-lp-subtle peer-checked:border-lp-primary peer-checked:bg-lp-b-brand-bg peer-checked:text-lp-b-brand-fg peer-focus-visible:shadow-(--ring-focus)">
                        {size}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className={ctaClassName("primary", "block")}
                >
                  {status === "sending" ? "Sending…" : "Book my demo"}
                </button>
                {status === "error" ? (
                  <p role="alert" className="text-center text-sm text-lp-danger">
                    We couldn&apos;t send your request. Please try again in a
                    moment.
                  </p>
                ) : null}
                <p className="text-center text-sm text-lp-muted">
                  No sales pitch. We&apos;ll email a calendar link within one
                  business day.
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
