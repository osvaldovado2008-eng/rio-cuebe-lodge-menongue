import { UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dining } from "@/data/resort";
import { selectService } from "@/lib/reservation";
import { SectionHeading } from "./SectionHeading";

export function Dining() {
  return (
    <section id="gastronomia" className="bg-background py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <SectionHeading eyebrow="Gastronomia" title={dining.title} text={dining.text} />
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {dining.highlights.map((h) => (
              <div key={h.title} className="border-l-2 border-clay pl-4">
                <dt className="font-display text-xl font-semibold text-bark">{h.title}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{h.text}</dd>
              </div>
            ))}
          </dl>
          <Button asChild variant="forest" size="lg" className="mt-8 rounded-full">
            <a href="#reservar" onClick={() => selectService("mesa")}>
              <UtensilsCrossed /> Reservar mesa
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <img src={dining.hero.src} alt={dining.hero.alt} loading="lazy" className="col-span-2 aspect-[16/9] w-full rounded-2xl object-cover shadow-soft" />
          {dining.dishes.map((d) => (
            <img key={d.src} src={d.src} alt={d.alt} loading="lazy" className="aspect-square w-full rounded-2xl object-cover" />
          ))}
        </div>
      </div>
    </section>
  );
}
