import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { resort, stats } from "@/data/resort";

export function Hero() {
  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-forest-foreground">
      <img
        src={resort.heroPhoto.src}
        alt={resort.heroPhoto.alt}
        className="absolute inset-0 -z-10 h-full w-full animate-slow-zoom object-cover object-[60%_50%] md:object-center"
        fetchPriority="high"
        decoding="async"
      />
      <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-24 md:px-8 md:pb-16 md:pt-28">
        <div className="max-w-3xl animate-rise">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-forest-foreground/25 bg-forest-foreground/10 px-3 py-1.5 text-gold backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" /> {resort.location}
          </span>
          <h1 className="mt-4 text-[2.6rem] leading-[0.95] sm:text-6xl md:mt-5 md:text-8xl">{resort.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed md:mt-5 md:text-base text-forest-foreground/85 md:text-lg">{resort.heroText}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex md:mt-8">
            <Button asChild variant="hero" size="xl" className="px-3 text-sm sm:px-7 sm:text-base">
              <a href="#reservar">Pedir reserva</a>
            </Button>
            <Button asChild variant="glass" size="xl" className="px-3 text-sm sm:px-7 sm:text-base">
              <a href="#acomodacoes">Acomodações</a>
            </Button>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-forest-foreground/20 pt-5 md:mt-16 md:pt-6 md:max-w-2xl">
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
