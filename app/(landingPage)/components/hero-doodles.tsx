import { cn } from "@/lib/utils";

// Hand-drawn scribbles scattered behind the hero. Purely decorative.
const STROKE = {
  className: "fill-none stroke-lp-sketch-strong",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const BASE = "pointer-events-none absolute";

export function HeroDoodles() {
  return (
    <>
      <svg
        aria-hidden="true"
        width="132"
        height="44"
        viewBox="0 0 132 44"
        className={cn(BASE, "top-10 left-[2.5%] -rotate-6")}
      >
        <path
          d="M3 32 C 20 6, 36 6, 46 24 S 72 40, 86 20 S 116 4, 129 18"
          {...STROKE}
        />
      </svg>
      <svg
        aria-hidden="true"
        width="58"
        height="46"
        viewBox="0 0 58 46"
        className={cn(BASE, "bottom-18 left-[6%] -rotate-9")}
      >
        <path
          d="M4 7 C 18 5, 40 4, 54 6 C 55 18, 54 30, 53 41 C 38 42, 18 42, 5 40 C 4 28, 3 18, 4 7 Z"
          {...STROKE}
        />
        <path d="M5 8 C 18 20, 26 26, 29 26 C 33 26, 42 18, 53 7" {...STROKE} />
      </svg>
      <svg
        aria-hidden="true"
        width="54"
        height="54"
        viewBox="0 0 54 54"
        className={cn(BASE, "top-9 right-[4%]")}
      >
        <path
          d="M27 4 C 12 3, 3 14, 4 28 C 5 42, 17 51, 30 50 C 43 49, 51 38, 50 25 C 49 13, 40 5, 24 6"
          {...STROKE}
        />
        <path d="M16 27 L 24 35 L 38 18" {...STROKE} />
      </svg>
      <svg
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        className={cn(BASE, "top-7 left-[44%]")}
      >
        <path d="M14 3 V 25 M3 14 H 25 M6 6 L 22 22 M22 6 L 6 22" {...STROKE} />
      </svg>
      <svg
        aria-hidden="true"
        width="150"
        height="60"
        viewBox="0 0 150 60"
        className={cn(BASE, "bottom-7 left-[40%] rotate-3")}
      >
        <path
          d="M4 40 C 30 10, 70 54, 104 30 C 120 18, 132 18, 144 22"
          {...STROKE}
          strokeDasharray="2 7"
        />
        <path d="M134 14 L 145 22 L 133 29" {...STROKE} />
      </svg>
    </>
  );
}
