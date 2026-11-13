import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { accommodations, accommodationsIntro, amenities } from "@/data/resort";
import { formatKwanza, selectService } from "@/lib/reservation";
import { SectionHeading } from "./SectionHeading";

export function Accommodations() {
  return (
    <section id="acomodacoes" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Acomodações" title="Dormir entre a vegetação e o rio" text={accommodationsIntro} />
      </div>

      <div className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-auto md:grid md:max-w-7xl md:grid-cols-3 md:gap-6 md:overflow-visible md:px-8">
        {accommodations.map((a) => (
          <article
            key={a.id}
            className="group flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow hover:shadow-lift md:w-auto"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img src={a.photo.src} alt={a.photo.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-5 md:p-6">
              <h3 className="text-3xl text-bark">{a.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {a.highlights.map((h) => (
                  <li key={h} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-end justify-between gap-3 pt-6">
                <div>
                  <span className="eyebrow text-[0.62rem] text-muted-foreground">Por noite</span>
                  <p className="font-display text-xl font-semibold text-clay">
                    {a.pricePerNight ? `desde ${formatKwanza(a.pricePerNight)}` : "Preço sob consulta"}
                  </p>
                </div>
                <Button asChild variant="forest" size="sm" className="h-10 px-4">
                  <a href="#reservar" onClick={() => selectService(a.id)}>Reservar</a>
                </Button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <div className="rounded-2xl border border-border bg-sand-deep p-6 md:p-8">
          <span className="eyebrow text-clay">Incluído em todas as estadias</span>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 md:grid-cols-3 lg:grid-cols-5">
            {amenities.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-bark">
                <Check className="h-4 w-4 shrink-0 text-forest" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
