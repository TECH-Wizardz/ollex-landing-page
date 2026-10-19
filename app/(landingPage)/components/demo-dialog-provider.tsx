"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";

import { DemoDialog } from "./demo-dialog";

const DemoDialogContext = createContext<{ open: () => void } | null>(null);

/**
 * Owns the one "Book a demo" modal for the page, so any button can open it
 * without the page threading a callback down to each of them.
 */
export function DemoDialogProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();

    // Start in the email field, except on touch devices where that would
    // raise the keyboard over the modal before anyone has read it.
    if (!window.matchMedia("(pointer: coarse)").matches) {
      dialog.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    }
  }

  return (
    <DemoDialogContext value={{ open }}>
      {children}
      <DemoDialog ref={dialogRef} />
    </DemoDialogContext>
  );
}

export function useDemoDialog() {
  const ctx = useContext(DemoDialogContext);
  if (!ctx) {
    throw new Error("useDemoDialog must be used inside <DemoDialogProvider>");
  }
  return ctx;
}
