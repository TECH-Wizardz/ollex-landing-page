"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { track } from "@/lib/track";
import { ctaClassName, type CtaSize, type CtaVariant } from "./cta-styles";

interface CtaLinkProps extends ComponentProps<typeof Link> {
  variant?: CtaVariant;
  size?: CtaSize;
  /** Marketing event to report on click; omit for plain navigation links. */
  event?: "trial";
  /** Which part of the page the link sits in, reported with the event. */
  section?: string;
}

export function CtaLink({
  variant = "primary",
  size = "md",
  event,
  section,
  className,
  onClick,
  ...props
}: CtaLinkProps) {
  return (
    <Link
      className={cn(ctaClassName(variant, size), className)}
      onClick={(e) => {
        if (event) track(`cta_${event}_click`, { section: section ?? "unknown" });
        onClick?.(e);
      }}
      {...props}
    />
  );
}
