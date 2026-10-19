"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

import { track } from "@/lib/track";
import { USE_CASE_ORDER, type UseCaseKey } from "./use-cases.data";

interface UseCaseContextValue {
  active: UseCaseKey;
  select: (key: UseCaseKey) => void;
}

const UseCaseContext = createContext<UseCaseContextValue | null>(null);

/**
 * The selected use-case tab, shared so the header's "Use cases" menu and the
 * tabs section drive the same state without either owning the other.
 */
export function UseCaseProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<UseCaseKey>(USE_CASE_ORDER[0]);

  function select(key: UseCaseKey) {
    setActive(key);
    track("usecase_tab_open", { tab: key });
  }

  return (
    <UseCaseContext value={{ active, select }}>{children}</UseCaseContext>
  );
}

export function useUseCase() {
  const ctx = useContext(UseCaseContext);
  if (!ctx) throw new Error("useUseCase must be used inside <UseCaseProvider>");
  return ctx;
}
