import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { contact } from "@/data/resort";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const WATCHED = ["inicio", "acomodacoes", "experiencias", "gastronomia", "lazer", "galeria", "reservar", "contactos"];
/** Sections that already show their own call/booking buttons. */
const HIDE_ON = new Set(["reservar", "contactos"]);

const item =
  "flex h-11 min-w-0 items-center justify-center gap-1.5 rounded-full px-2 text-sm font-medium transition-colors active:scale-[0.97] [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0";

/** Floating quick actions on small screens: call, WhatsApp and booking, in three equal columns. */
export function MobileBookingBar() {
  const active = useActiveSection(WATCHED);
  const hidden = active !== null && HIDE_ON.has(active);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 px-3 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-300 md:hidden",
        hidden && "pointer-events-none translate-y-full opacity-0",
      )}
      aria-hidden={hidden}
    >
      <nav
        aria-label="Ações rápidas"
        className="mx-auto grid max-w-md grid-cols-3 gap-1.5 rounded-full border border-border bg-background/95 p-1.5 shadow-lift backdrop-blur-md"
      >
        <a href={contact.phones[0].href} className={cn(item, "text-bark hover:bg-muted")} tabIndex={hidden ? -1 : 0}>
          <Phone /> <span className="truncate">Ligar</span>
        </a>
        <a
          href={`https://wa.me/${contact.whatsapp.number}`}
          target="_blank"
          rel="noreferrer"
          className={cn(item, "bg-forest text-forest-foreground hover:bg-forest-deep")}
          tabIndex={hidden ? -1 : 0}
        >
          <MessageCircle /> <span className="truncate">WhatsApp</span>
        </a>
        <a href="#reservar" className={cn(item, "bg-clay font-semibold text-accent-foreground hover:bg-clay/90")} tabIndex={hidden ? -1 : 0}>
          <CalendarDays /> <span className="truncate">Reservar</span>
        </a>
      </nav>
    </div>
  );
}
