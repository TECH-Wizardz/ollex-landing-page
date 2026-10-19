"use client";

import { useEffect, useRef, type ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * A `<section>` that fades and slides in the first time it scrolls into view.
 * It is rendered fully visible on the server and only hidden after mount, and
 * only when it starts below the fold, so no-JS and above-the-fold content is
 * never blank. Reduced-motion visitors never get the effect. The hidden state
 * is the `data-reveal="pending"` rule in globals.css.
 */
export function RevealSection({
  className,
  ...props
}: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    el.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        delete el.dataset.reveal;
        observer.disconnect();
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-200 ease-out",
        className
      )}
      {...props}
    />
  );
}
