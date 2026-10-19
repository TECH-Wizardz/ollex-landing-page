"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Bell, Check, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/lib/brand";
import { HERO_SCENARIOS, type HeroScenario } from "./hero-scenarios.data";
import { MockCard } from "./mock-card";
import { StatusPill } from "./status-pill";

const START = 2;
const TOTAL = 5;

// The checklist ticks 2 → 5 of 5 on a timer; the chaos around it fades in step.
const STEP_START_MS = 1600;
const STEP_EVERY_MS = 1100;
// How long the finished frame stays up, and the fade between scenes.
const HOLD_MS = 3200;
const FADE_MS = 400;

const CHAOS_CARD =
  "absolute rounded-lg border border-lp-border bg-lp-surface shadow-rl-1 transition-[opacity,transform,filter] duration-900 ease-in-out";

/**
 * The hero's illustration: a pile of chase emails, texts, a misnamed file and a
 * sticky note fades away while a client's checklist fills up and the reminders
 * stop. It then fades to the next scenario in `HERO_SCENARIOS` and plays again,
 * looping. The loop only advances while the illustration is on screen, and
 * reduced-motion visitors get the first scenario's final frame and nothing else.
 */
export function HeroPortalDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fade out once the scene has finished and is actually being looked at, then
  // swap it. The swap remounts the stage (see `key`), which resets its state
  // without the 900ms transitions animating the chaos back in.
  const leaving = finished && inView;
  useEffect(() => {
    if (!leaving) return;
    const timer = setTimeout(() => {
      setIndex((i) => (i + 1) % HERO_SCENARIOS.length);
      setFinished(false);
    }, FADE_MS);
    return () => clearTimeout(timer);
  }, [leaving]);

  const onFinished = useCallback(() => setFinished(true), []);
  const scenario = HERO_SCENARIOS[index];

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Follow-up emails, a sticky note and a misnamed file fade away while a client's ${PRODUCT_NAME} checklist fills from 2 of 5 to 5 of 5 and reminders stop`}
      className="relative mx-auto aspect-[1/1.04] w-full max-w-140 text-lp-mock"
    >
      <ScenarioStage
        key={scenario.key}
        scenario={scenario}
        leaving={leaving}
        enter={index > 0}
        onFinished={onFinished}
      />
    </div>
  );
}

function ScenarioStage({
  scenario,
  leaving,
  enter,
  onFinished,
}: {
  scenario: HeroScenario;
  leaving: boolean;
  enter: boolean;
  onFinished: () => void;
}) {
  const [done, setDone] = useState(START);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const timer = setTimeout(() => setDone(TOTAL), 0);
      return () => clearTimeout(timer);
    }
    const lastTickAt = STEP_START_MS + (TOTAL - START - 1) * STEP_EVERY_MS;
    const timers = [
      ...[3, 4, 5].map((n, i) =>
        setTimeout(() => setDone(n), STEP_START_MS + i * STEP_EVERY_MS)
      ),
      setTimeout(onFinished, lastTickAt + HOLD_MS),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onFinished]);

  const { items } = scenario;
  const missing = items.slice(done);
  const allDone = missing.length === 0;
  const step = done - START;
  const fade = step / (TOTAL - START);

  const chaos = (transform: string) => ({
    transform,
    opacity: +(1 - fade * 0.8).toFixed(2),
    filter: `grayscale(${fade}) blur(${(fade * 0.8).toFixed(2)}px)`,
  });

  return (
    <div
      className={cn(
        "absolute inset-0 transition-opacity duration-400 ease-in-out",
        leaving && "opacity-0",
        enter && "animate-in fade-in"
      )}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 560 582"
        className="absolute inset-0 size-full overflow-visible transition-opacity duration-900 ease-in-out"
        style={{ opacity: +(1 - fade * 0.8).toFixed(2) }}
      >
        {[
          "M150 168 C 150 210, 170 236, 196 250",
          "M452 150 C 452 190, 420 214, 382 228",
          "M120 456 C 140 430, 160 418, 192 410",
          "M452 446 C 430 430, 410 424, 380 420",
        ].map((d) => (
          <path
            key={d}
            d={d}
            fill="none"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="3 7"
            className="stroke-rl-path-tan"
          />
        ))}
      </svg>

      <div
        className={cn(CHAOS_CARD, "top-[3%] left-0 w-[52%] px-3.5 py-3")}
        style={chaos(`translate(${-step * 6}px,${-step * 5}px) rotate(-5deg)`)}
      >
        <div className="flex items-center justify-between gap-2 text-[0.9em] text-lp-muted">
          <span>To: {scenario.email.to}</span>
          <StatusPill tone="warn" shape="chip">
            {scenario.email.chip}
          </StatusPill>
        </div>
        <div className="mt-1.5 truncate font-semibold text-lp-ink">
          {scenario.email.subject}
        </div>
        <div className="mt-0.75 leading-snug text-lp-muted">
          {scenario.email.preview}
        </div>
      </div>

      <div
        className={cn(CHAOS_CARD, "top-0 right-0 w-[42%] px-3 py-2.5")}
        style={chaos(`translate(${step * 6}px,${-step * 6}px) rotate(4deg)`)}
      >
        <div className="mb-1.5 text-[0.9em] text-lp-muted">
          Text · {scenario.text.from}
        </div>
        <div className="rounded-xl rounded-bl-rl-4 bg-lp-subtle px-2.5 py-2 leading-snug text-lp-ink">
          {scenario.text.message}
        </div>
      </div>

      <div
        className={cn(
          CHAOS_CARD,
          "bottom-[9%] left-[1%] flex w-[48%] items-center gap-2.5 px-3 py-2.5"
        )}
        style={chaos(`translate(${-step * 6}px,${step * 5}px) rotate(3deg)`)}
      >
        <span className="grid h-8.5 w-7.5 flex-none place-items-center rounded-rl-4 bg-lp-b-danger-bg text-[0.75em] font-semibold text-lp-b-danger-fg">
          PDF
        </span>
        <div className="min-w-0">
          <div className="truncate font-medium text-lp-ink">
            {scenario.file.name}
          </div>
          <div className="text-[0.9em] text-lp-b-danger-fg">
            {scenario.file.problem}
          </div>
        </div>
      </div>

      <div
        className="absolute right-[1%] bottom-[4%] aspect-[1/0.92] w-[33%] rounded-xs bg-rl-note-yellow px-3.5 py-3 font-hand text-lp-note font-semibold text-rl-black shadow-rl-2 transition-[opacity,transform,filter] duration-900 ease-in-out"
        style={chaos(`translate(${step * 6}px,${step * 6}px) rotate(-7deg)`)}
      >
        {scenario.note}
        <span className="mt-1 block text-[0.8em] text-rl-grey-70">(again)</span>
      </div>

      <MockCard className="absolute top-[52%] left-1/2 z-[3] w-[clamp(232px,62%,350px)] -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-rl-4">
        <div className="flex items-center justify-between gap-2 border-b border-lp-border px-4 py-3">
          <span className="flex items-center gap-2 text-[1.05em] font-semibold text-lp-ink">
            <span className={cn("size-5 rounded-rl-6", scenario.brandClass)} />
            {scenario.brand}
          </span>
          <span className="inline-flex items-center gap-1 text-[0.9em] font-medium text-lp-success">
            <Lock size={12} strokeWidth={2.4} />
            Secure link
          </span>
        </div>

        <div className="px-4 pt-3.5 pb-1.5">
          <div className="text-[0.92em] text-lp-muted">
            Hi {scenario.client}, here&apos;s what we need
          </div>
          <div className="mt-0.5 font-display text-[1.35em] leading-tight font-semibold tracking-[-0.01em] text-lp-ink">
            {scenario.title}
          </div>
          <div className="mt-2.5 flex items-center gap-2.5">
            <div className="h-2 flex-1 overflow-hidden rounded-rl-full bg-lp-subtle">
              <div
                className="h-full rounded-rl-full bg-lp-success transition-[width] duration-600 ease-in-out"
                style={{ width: `${done * 20}%` }}
              />
            </div>
            <span className="font-semibold whitespace-nowrap text-lp-ink">
              {done} of {TOTAL} done
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-0.5 px-2.5 pt-1 pb-2.5">
          {items.map((name, i) => {
            const isDone = i < done;
            return (
              <li
                key={name}
                className="flex items-center gap-2.5 rounded-rl-6 px-1.5 py-1.75"
              >
                <span
                  className={cn(
                    "grid size-4.5 flex-none place-items-center rounded-full text-rl-white transition-colors duration-300",
                    isDone
                      ? "bg-lp-success"
                      : "border-[1.5px] border-lp-border bg-transparent"
                  )}
                >
                  <Check
                    size={11}
                    strokeWidth={3.5}
                    className={isDone ? undefined : "opacity-0"}
                  />
                </span>
                <span
                  className={cn(
                    "min-w-0 flex-1 truncate",
                    isDone ? "text-lp-muted" : "text-lp-ink"
                  )}
                >
                  {name}
                </span>
                <StatusPill
                  tone={isDone ? "success" : "warn"}
                  shape="chip"
                  className="text-[0.88em] transition-colors duration-300"
                >
                  {isDone ? "Done" : "Missing"}
                </StatusPill>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-lp-border bg-lp-subtle px-4 py-2.75 text-[0.95em]">
          {allDone ? (
            <span className="flex items-center gap-2 font-medium text-lp-success">
              <Check size={14} strokeWidth={2.6} className="flex-none" />
              All done. Reminders stopped.
            </span>
          ) : (
            <span className="flex items-center gap-2 text-lp-ink">
              <Bell
                size={14}
                strokeWidth={2}
                className="flex-none text-rl-orange"
              />
              {missing.length === 1
                ? "Reminder sent for the 1 missing item"
                : `Reminder sent for the ${missing.length} missing items`}
            </span>
          )}
        </div>
      </MockCard>

      <div
        aria-hidden="true"
        className={cn(
          "absolute -bottom-[2%] left-[4%] z-[4] flex items-end gap-1.5 font-hand text-lp-annot font-semibold text-lp-primary transition-[opacity,transform] delay-300 duration-600 ease-in-out",
          allDone ? "opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <span className="inline-block -rotate-4">no chase emails sent</span>
        <svg width="44" height="34" viewBox="0 0 44 34" className="mb-2.5">
          <path
            d="M3 30 C 14 30, 30 24, 38 8"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
          <path
            d="M30 10 L 39 6 L 41 16"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
