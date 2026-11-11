import { MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/resort";

/** Sticky quick actions on small screens. */
export function MobileBookingBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md md:hidden">
      <div className="flex gap-2">
        <Button asChild variant="outline" size="xl" className="h-12 w-12 shrink-0 rounded-full bg-card p-0" aria-label="Ligar">
          <a href={contact.phones[0].href}><Phone /></a>
        </Button>
        <Button asChild variant="outline" size="xl" className="h-12 w-12 shrink-0 rounded-full bg-card p-0" aria-label="WhatsApp">
          <a href={`https://wa.me/${contact.whatsapp.number}`} target="_blank" rel="noreferrer"><MessageCircle /></a>
        </Button>
        <Button asChild variant="hero" size="xl" className="flex-1">
          <a href="#reservar">Pedir reserva</a>
        </Button>
      </div>
    </div>
  );
}
