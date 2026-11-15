import { Button } from "@/components/ui/button";
import { experiences, experiencesIntro } from "@/data/resort";
import { selectService } from "@/lib/reservation";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function Experiences() {
  return (
    <section id="experiencias" className="bg-forest py-20 text-forest-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading tone="light" eyebrow="Experiências" title="Aventura na floresta e no rio" text={experiencesIntro} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((e, i) => (
            <article
              key={e.id}
              className={cn(
                "group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-5",
                i === 0 && "sm:col-span-2",
              )}
            >
              <img src={e.photo.src} alt={e.photo.alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="bg-card-overlay absolute inset-0 -z-10" aria-hidden="true" />
              <span className="font-display text-sm text-gold">0{i + 1}</span>
              <h3 className="mt-1 text-3xl">{e.name}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-forest-foreground/85">{e.description}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="eyebrow text-[0.62rem] text-gold">{e.note}</span>
                <Button asChild variant="glass" size="sm" className="h-9 shrink-0 px-4">
                  <a href="#reservar" onClick={() => selectService(e.id)} aria-label={`Reservar ${e.name}`}>
                    Reservar
                  </a>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
