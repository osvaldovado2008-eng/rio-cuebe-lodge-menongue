import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { accommodations, accommodationsIntro, amenities, roomFeatures, roomInterior } from "@/data/resort";
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
                <div className="min-w-0">
                  <span className="eyebrow text-[0.62rem] text-muted-foreground">Por noite</span>
                  <p className="font-display text-base font-semibold text-clay md:text-xl">
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

      <div className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <span className="eyebrow text-clay">Por dentro das suítes</span>
            <h3 className="mt-3 text-3xl text-bark md:text-4xl">Tudo o que encontra no quarto</h3>
            <ul className="mt-5 grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
              {roomFeatures.map((f) => (
                <li key={f} className="flex min-w-0 items-center gap-2 text-sm text-bark">
                  <Check className="h-4 w-4 shrink-0 text-forest" />
                  <span className="min-w-0 flex-1">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid min-w-0 grid-cols-2 gap-3 md:gap-4">
            {roomInterior.map((r) => (
              <figure key={r.photo.src} className="group relative overflow-hidden rounded-2xl shadow-soft">
                <img
                  src={r.photo.src}
                  alt={r.photo.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/80 to-transparent px-3 pb-2.5 pt-8 text-xs font-medium tracking-wide text-sand md:text-sm">
                  {r.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-5 md:px-8">
        <div className="rounded-2xl border border-border bg-sand-deep p-6 md:p-8">
          <span className="eyebrow text-clay">Incluído em todas as estadias</span>
          <ul className="mt-5 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {amenities.map((item) => (
              <li key={item} className="flex min-w-0 items-center gap-2 text-sm text-bark">
                <Check className="h-4 w-4 shrink-0 text-forest" />
                <span className="min-w-0 flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
