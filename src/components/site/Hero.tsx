import { useEffect, useState, type CSSProperties } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides, resort, stats } from "@/data/resort";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6500;
/** Each photo drifts from a different corner so consecutive slides don't feel identical. */
const DRIFT = [
  { "--kb-x": "0%", "--kb-y": "0%" },
  { "--kb-x": "-3%", "--kb-y": "-2%" },
  { "--kb-x": "3%", "--kb-y": "-1%" },
  { "--kb-x": "-2%", "--kb-y": "2%" },
  { "--kb-x": "2%", "--kb-y": "2%" },
] as unknown as CSSProperties[];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

  const goTo = (next: number) => {
    setIndex((current) => {
      if (next === current) return current;
      setPrev(current);
      return next;
    });
  };

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPaused(reduce.matches);
  }, []);

  useEffect(() => {
    if (!mounted || paused) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setIndex((current) => {
        setPrev(current);
        return (current + 1) % heroSlides.length;
      });
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [mounted, paused, index]);

  return (
    <section id="inicio" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-deep text-forest-foreground">
      <div className="absolute inset-0 -z-10">
        {heroSlides.map((slide, i) => {
          // Only the first photo is rendered on the server; the rest load after the page is interactive.
          if (i > 0 && !mounted) return null;
          const active = i === index;
          const animating = active || i === prev;
          return (
            <img
              key={slide.src}
              src={slide.src}
              alt={active ? slide.alt : ""}
              aria-hidden={!active}
              style={DRIFT[i % DRIFT.length]}
              className={cn(
                "absolute inset-0 h-full w-full object-cover object-[60%_50%] transition-opacity duration-[1600ms] ease-in-out will-change-transform md:object-center",
                active ? "opacity-100" : "opacity-0",
                animating && "animate-ken-burns",
              )}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
            />
          );
        })}
      </div>
      <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-24 md:px-8 md:pb-16 md:pt-28">
        <div className="max-w-3xl animate-rise">
          <span className="eyebrow inline-flex items-center gap-2 rounded-full border border-forest-foreground/25 bg-forest-foreground/10 px-3 py-1.5 text-gold backdrop-blur-sm">
            <MapPin className="h-3.5 w-3.5" /> {resort.location}
          </span>
          <h1 className="mt-4 text-[2.6rem] leading-[0.95] sm:text-6xl md:mt-5 md:text-8xl">{resort.heroTitle}</h1>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-forest-foreground/85 md:mt-5 md:text-lg">{resort.heroText}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex md:mt-8">
            <Button asChild variant="hero" size="xl" className="px-3 text-sm sm:px-7 sm:text-base">
              <a href="#reservar">Pedir reserva</a>
            </Button>
            <Button asChild variant="glass" size="xl" className="px-3 text-sm sm:px-7 sm:text-base">
              <a href="#acomodacoes">Acomodações</a>
            </Button>
          </div>
        </div>

        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-forest-foreground/20 pt-5 md:mt-16 md:max-w-2xl md:pt-6">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-3xl font-semibold leading-none md:text-5xl">{s.value}</dd>
              <dd className="mt-2 text-[0.68rem] uppercase tracking-[0.16em] text-forest-foreground/75 md:text-xs">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Slide indicators */}
      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:right-8" role="group" aria-label="Fotografias">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ver foto ${i + 1}: ${slide.alt}`}
            aria-current={i === index ? "true" : undefined}
            className="flex h-7 w-7 items-center justify-center"
          >
            <span
              className={cn(
                "block w-1.5 rounded-full bg-forest-foreground/45 transition-all duration-500",
                i === index ? "h-6 bg-gold" : "h-1.5 hover:bg-forest-foreground/80",
              )}
            />
          </button>
        ))}
      </div>

      <a href="#acomodacoes" aria-label="Descer" className="absolute bottom-4 right-5 hidden h-11 w-11 items-center justify-center rounded-full border border-forest-foreground/30 md:flex md:right-8">
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
