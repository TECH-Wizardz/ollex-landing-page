import { cn } from "@/lib/utils";

/** The product mark: a dark rounded square with a light dot. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid place-items-center rounded-md bg-lp-ink",
        className
      )}
    >
      <span className="size-2.5 rounded-full bg-lp-surface" />
    </span>
  );
}
