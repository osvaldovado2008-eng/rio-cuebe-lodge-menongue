import { experiences, experiencesIntro } from "@/data/resort";
import { SectionHeading } from "./SectionHeading";

export function Experiences() {
  return (
    <section id="experiencias" className="bg-forest py-20 text-forest-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading tone="light" eyebrow="Experiências" title="Aventura na floresta e no rio" text={experiencesIntro} />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((e, i) => (
            <article key={e.id} className="group relative isolate flex min-h-[22rem] flex-col justify-end overflow-hidden rounded-2xl p-5">
              <img src={e.photo.src} alt={e.photo.alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="bg-card-overlay absolute inset-0 -z-10" aria-hidden="true" />
              <span className="font-display text-sm text-gold">0{i + 1}</span>
              <h3 className="mt-1 text-3xl">{e.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-forest-foreground/85">{e.description}</p>
              <span className="eyebrow mt-4 text-[0.62rem] text-gold">{e.note}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
