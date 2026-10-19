"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { ctaClassName, type CtaSize, type CtaVariant } from "./cta-styles";
import { useGetStartedDialog } from "./get-started-dialog-provider";

interface GetStartedButtonProps {
  variant?: CtaVariant;
  size?: CtaSize;
  /** Which part of the page the button sits in, reported with the click event. */
  section: string;
  className?: string;
  children?: ReactNode;
}

/** "Get started": opens the email modal. The page's only call to action. */
export function GetStartedButton({
  variant = "primary",
  size = "md",
  section,
  className,
  children = "Get started",
}: GetStartedButtonProps) {
  const { open } = useGetStartedDialog();

  return (
    <button
      type="button"
      className={cn(ctaClassName(variant, size), className)}
      onClick={() => open(section)}
    >
      {children}
    </button>
  );
}
