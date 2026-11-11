import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resort, stats } from "@/data/resort";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-forest-foreground">
      <img
        src={resort.heroPhoto.src}
        alt={resort.heroPhoto.alt}
        className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover"
        fetchPriority="high"
      />
      <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-28 pt-28 md:px-8 md:pb-16">
        <div className="max-w-3xl animate-rise">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-forest-foreground/25 bg-forest-foreground/10 px-3 py-1.5 text-gold backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" /> {resort.location}
          </span>
          <h1 className="mt-5 text-5xl leading-[0.95] sm:text-6xl md:text-8xl">{resort.heroTitle}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-forest-foreground/85 md:text-lg">{resort.heroText}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#reservar">Pedir reserva</a>
            </Button>
            <Button asChild variant="glass" size="xl">
              <a href="#acomodacoes">Ver acomodações</a>
            </Button>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-forest-foreground/20 pt-6 md:mt-16 md:max-w-2xl">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold leading-none md:text-5xl">{s.value}</dd>
              <dd className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-forest-foreground/75 md:text-xs">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <a href="#acomodacoes" aria-label="Descer" className="absolute bottom-4 right-5 hidden h-11 w-11 items-center justify-center rounded-full border border-forest-foreground/30 md:flex md:right-8">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
