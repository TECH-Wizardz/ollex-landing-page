"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { ctaClassName, type CtaSize, type CtaVariant } from "./cta-styles";
import { useDemoDialog } from "./demo-dialog-provider";

interface DemoButtonProps {
  variant?: CtaVariant;
  size?: CtaSize;
  /** Which part of the page the button sits in, reported with the click event. */
  section: string;
  className?: string;
  children: ReactNode;
}

/** "Book a demo": opens the demo modal. */
export function DemoButton({
  variant = "primary",
  size = "md",
  section,
  className,
  children,
}: DemoButtonProps) {
  const { open } = useDemoDialog();

  return (
    <button
      type="button"
      className={cn(ctaClassName(variant, size), className)}
      onClick={() => {
        track("cta_demo_click", { section });
        open();
      }}
    >
      {children}
    </button>
  );
}
