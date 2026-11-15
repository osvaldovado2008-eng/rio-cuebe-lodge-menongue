import { CalendarHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { events } from "@/data/resort";
import { selectService } from "@/lib/reservation";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Events() {
  return (
    <section id="eventos" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Eventos e negócios" title={events.title} text={events.text} />
          <Button asChild variant="hero" size="xl" className="self-start md:self-auto">
            <a href="#reservar" onClick={() => selectService("evento")}>
              <CalendarHeart /> Pedir orçamento
            </a>
          </Button>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.spaces.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <article className="group h-full overflow-hidden rounded-2xl bg-card shadow-soft">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.photo.src} alt={s.photo.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl text-bark">{s.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
