"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { PRODUCT_NAME } from "@/lib/brand";
import { GetStartedButton } from "./get-started-button";
import { LogoMark } from "./logo-mark";
import { useUseCase } from "./use-case-provider";
import {
  USE_CASE_ORDER,
  USE_CASES,
  type UseCaseKey,
} from "./use-cases.data";

const NAV_LINK =
  "rounded-md px-3.5 py-2.5 text-base text-lp-ink transition-colors hover:bg-lp-subtle";

const MOBILE_LINK = "px-1 py-3.5 text-rl-body text-lp-ink";

export function SiteHeader() {
  const { select } = useUseCase();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [useCasesOpen, setUseCasesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Esc closes the menu wherever focus is: a hover-opened menu has none inside it.
  useEffect(() => {
    if (!useCasesOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUseCasesOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [useCasesOpen]);

  function pickUseCase(key: UseCaseKey) {
    select(key);
    setUseCasesOpen(false);
    setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-lp-border bg-lp-surface transition-shadow duration-200",
        scrolled && "shadow-rl-3"
      )}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex h-17 max-w-lp-shell items-center gap-6 px-4 md:px-6"
      >
        <Link
          href="#top"
          className="flex items-center gap-2.5 font-display text-lg font-semibold tracking-[-0.02em] text-lp-ink"
        >
          <LogoMark className="size-6.5" />
          {PRODUCT_NAME}
        </Link>

        <div className="hidden flex-1 justify-center gap-1 lg:flex">
          <Link href="#product" className={NAV_LINK}>
            Product
          </Link>
          <div
            className="relative"
            onMouseLeave={() => setUseCasesOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={useCasesOpen}
              onClick={() => setUseCasesOpen((open) => !open)}
              onMouseEnter={() => setUseCasesOpen(true)}
              className={cn(NAV_LINK, "flex items-center gap-1")}
            >
              Use cases
              <ChevronDown size={16} strokeWidth={2} />
            </button>
            {useCasesOpen ? (
              <div
                role="menu"
                className="absolute top-full left-0 flex min-w-50 flex-col rounded-xl border border-lp-border bg-lp-surface p-2 shadow-rl-3"
              >
                {USE_CASE_ORDER.map((key) => (
                  <Link
                    key={key}
                    role="menuitem"
                    href="#use-cases"
                    onClick={() => pickUseCase(key)}
                    className="rounded-md px-3 py-2.5 text-base text-lp-ink transition-colors hover:bg-lp-subtle"
                  >
                    {USE_CASES[key].label}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          {/* Hidden while the pricing section is hidden.
          <Link href="#pricing" className={NAV_LINK}>
            Pricing
          </Link>
          */}
          <Link href="#resources" className={NAV_LINK}>
            Resources
          </Link>
        </div>

        <div className="hidden items-center lg:flex">
          <GetStartedButton size="nav" section="nav" />
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 lg:hidden">
          <GetStartedButton size="nav-compact" section="nav" />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-11 place-items-center rounded-md border border-lp-border bg-lp-surface text-lp-ink"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div className="flex flex-col border-t border-lp-border px-4 pt-2 pb-4 lg:hidden">
          <Link
            href="#product"
            onClick={() => setMenuOpen(false)}
            className={cn(MOBILE_LINK, "border-b border-lp-border")}
          >
            Product
          </Link>
          <span className="px-1 pt-3.5 pb-1.5 text-sm tracking-widest text-lp-muted uppercase">
            Use cases
          </span>
          {USE_CASE_ORDER.map((key) => (
            <Link
              key={key}
              href="#use-cases"
              onClick={() => pickUseCase(key)}
              className="px-3 py-3 text-rl-body text-lp-ink"
            >
              {USE_CASES[key].label}
            </Link>
          ))}
          {/* Hidden while the pricing section is hidden.
          <Link
            href="#pricing"
            onClick={() => setMenuOpen(false)}
            className={cn(MOBILE_LINK, "border-t border-lp-border")}
          >
            Pricing
          </Link>
          */}
          <Link
            href="#resources"
            onClick={() => setMenuOpen(false)}
            className={cn(MOBILE_LINK, "border-t border-lp-border")}
          >
            Resources
          </Link>
        </div>
      ) : null}
    </header>
  );
}
