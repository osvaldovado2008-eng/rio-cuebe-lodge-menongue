import { useEffect, useState, type CSSProperties } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroSlides, resort, stats } from "@/data/resort";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6500;
/** Each photo drifts from a different corner so consecutive slides don't feel identical. */
const DRIFT = [
  { "--kb-x": "0%", "--kb-y": "0%" },
  { "--kb-x": "-0.5%", "--kb-y": "-0.5%" },
  { "--kb-x": "0.5%", "--kb-y": "-0.5%" },
  { "--kb-x": "-0.5%", "--kb-y": "0.5%" },
  { "--kb-x": "0.5%", "--kb-y": "0.5%" },
] as unknown as CSSProperties[];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [ready, setReady] = useState<Set<number>>(() => new Set());
  const [mounted, setMounted] = useState(false);
  const [paused, setPaused] = useState(false);

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
        const next = (current + 1) % heroSlides.length;
        if (!ready.has(next)) return current;
        setPrevious(current);
        return next;
      });
    }, SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [mounted, paused, index, ready]);

  return (
    <section id="inicio" className="relative isolate flex items-end overflow-hidden bg-forest-deep text-forest-foreground md:min-h-[100svh]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {heroSlides.map((slide, i) => {
          // Only the first photo is rendered on the server; the rest load after the page is interactive.
          if (i > 0 && !mounted) return null;
          const active = i === index;
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
                (active || i === previous) && "animate-ken-burns",
              )}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              onLoad={async (event) => {
                const image = event.currentTarget;
                try {
                  await image.decode();
                  setReady((current) => new Set(current).add(i));
                } catch {
                  // Keep the current photo visible if the next one cannot be decoded.
                }
              }}
            />
          );
        })}
      </div>
      <div className="bg-hero-overlay absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 pb-24 pt-[35svh] md:px-8 md:pb-16 md:pt-28">
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
              <dd className="mt-2 text-[0.62rem] uppercase tracking-[0.08em] text-forest-foreground/75 md:text-xs md:tracking-[0.16em]">{s.label}</dd>
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
