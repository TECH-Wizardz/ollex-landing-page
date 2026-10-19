"use client";

import { useEffect, useState } from "react";

import { GetStartedButton } from "./get-started-button";

/**
 * A fixed "Get started" bar for phones, shown once the hero has scrolled
 * out of view (the hero carries its own CTA). Hidden from `sm` upwards.
 */
export function MobileCtaBar() {
  const [heroOut, setHeroOut] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(([entry]) =>
      setHeroOut(entry.boundingClientRect.bottom < 0)
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!heroOut) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-60 border-t border-lp-border bg-lp-surface px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-rl-3 sm:hidden">
      <GetStartedButton size="block" section="mobile_bar" />
    </div>
  );
}
