import { Facebook, Instagram } from "lucide-react";
import { social } from "@/data/resort";
import { cn } from "@/lib/utils";

const icons = { facebook: Facebook, instagram: Instagram };

/** Round social buttons; only entries with a URL are shown. */
export function SocialLinks({ className }: { className?: string }) {
  const items = social.filter((s) => s.url);
  if (items.length === 0) return null;
  return (
    <ul className={cn("flex gap-3", className)}>
      {items.map((s) => {
        const Icon = icons[s.id];
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${s.label} do Rio Cuebe Lodge`}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors hover:bg-gold hover:text-bark"
            >
              <Icon className="h-5 w-5" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
