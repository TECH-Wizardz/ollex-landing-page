import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { RevealSection } from "./reveal-section";

const SPACING = {
  roomy: "py-rl-8 md:py-rl-10 lg:py-24",
  compact: "py-rl-6 md:py-rl-8 lg:py-18",
  /** Bottom padding only, for a section that sits flush under the previous one. */
  bottom: "pb-rl-8 md:pb-rl-10 lg:pb-24",
};

interface LandingSectionProps {
  id?: string;
  spacing?: keyof typeof SPACING;
  className?: string;
  children: ReactNode;
}

/** The page's standard content column: shell width, gutters, rhythm, reveal. */
export function LandingSection({
  id,
  spacing = "roomy",
  className,
  children,
}: LandingSectionProps) {
  return (
    <RevealSection
      id={id}
      className={cn(
        "mx-auto w-full max-w-lp-shell scroll-mt-20 px-4 md:px-6",
        SPACING[spacing],
        className
      )}
    >
      {children}
    </RevealSection>
  );
}
