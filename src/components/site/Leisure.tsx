import { Sparkles } from "lucide-react";
import { extraFacilities, leisure } from "@/data/resort";
import { SectionHeading } from "./SectionHeading";

export function Leisure() {
  return (
    <section id="lazer" className="bg-sand-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Lazer" title="Descansar ao ritmo do rio" />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leisure.map((l) => (
            <article key={l.id}>
              <div className="overflow-hidden rounded-2xl">
                <img src={l.photo.src} alt={l.photo.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 hover:scale-105" />
              </div>
              <h3 className="mt-4 text-2xl text-bark">{l.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 rounded-2xl bg-bark p-6 text-bark-foreground md:flex-row md:items-center md:justify-between md:p-8">
          <span className="eyebrow flex items-center gap-2 text-gold">
            <Sparkles className="h-4 w-4" /> Também no resort
          </span>
          <ul className="flex flex-wrap gap-2">
            {extraFacilities.map((f) => (
              <li key={f} className="rounded-full border border-bark-foreground/25 px-4 py-2 text-sm">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
