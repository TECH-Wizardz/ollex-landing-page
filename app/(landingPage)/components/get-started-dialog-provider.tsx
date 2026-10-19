"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";

import { track } from "@/lib/track";
import { GetStartedDialog } from "./get-started-dialog";

const GetStartedDialogContext = createContext<{
  open: (section: string) => void;
} | null>(null);

/**
 * Owns the one "Get started" modal for the page, so any button can open it
 * without the page threading a callback down to each of them. `open` takes the
 * part of the page the click came from and reports it with the click event.
 */
export function GetStartedDialogProvider({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  function open(section: string) {
    track("cta_get_started_click", { section });

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
    <GetStartedDialogContext value={{ open }}>
      {children}
      <GetStartedDialog ref={dialogRef} />
    </GetStartedDialogContext>
  );
}

export function useGetStartedDialog() {
  const ctx = useContext(GetStartedDialogContext);
  if (!ctx) {
    throw new Error(
      "useGetStartedDialog must be used inside <GetStartedDialogProvider>"
    );
  }
  return ctx;
}
