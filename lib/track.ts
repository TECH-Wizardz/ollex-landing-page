type TrackProps = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: TrackProps }) => void;
  }
}

/** Reports a marketing event to Plausible when it is installed; otherwise a no-op. */
export function track(name: string, props?: TrackProps) {
  if (typeof window === "undefined") return;
  window.plausible?.(name, { props });
}
