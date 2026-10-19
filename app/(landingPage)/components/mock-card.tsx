import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** The white "screenshot" card every product mock-up on the page is built from. */
export function MockCard({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "rounded-xl bg-lp-surface shadow-rl-3 ring-1 ring-lp-border",
        className
      )}
      {...props}
    />
  );
}
