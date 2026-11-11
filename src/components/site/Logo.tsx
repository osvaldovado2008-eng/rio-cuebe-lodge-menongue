import { cn } from "@/lib/utils";

export function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return (
    <a href="#inicio" className={cn("flex items-center gap-2.5", className)} aria-label="Rio Cuebe Lodge — início">
      <svg width="30" height="30" viewBox="0 0 34 34" fill="none" aria-hidden="true" className={light ? "text-gold" : "text-forest"}>
        <path d="M17 3C9 8 6 15 8 24c4 3 11 3 15-1 4-5 3-13-6-20z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M17 8v22M17 16l-5-3M17 21l6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className={cn("font-display text-2xl font-bold leading-none", light ? "text-forest-foreground" : "text-forest")}>
        Rio Cuebe
        <span className={cn("eyebrow ml-2 align-middle text-[0.62rem]", light ? "text-gold" : "text-clay")}>Lodge</span>
      </span>
    </a>
  );
}
