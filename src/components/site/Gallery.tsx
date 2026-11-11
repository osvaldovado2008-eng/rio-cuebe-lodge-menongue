import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { gallery } from "@/data/resort";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const current = index !== null ? gallery[index] : undefined;
  const open = current !== undefined;
  const go = (step: number) => setIndex((i) => (i === null ? i : (i + step + gallery.length) % gallery.length));

  return (
    <section id="galeria" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading eyebrow="Galeria" title="O Rio Cuebe em imagens" />

        <div className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 md:auto-rows-[13rem] md:grid-cols-4 md:gap-4">
          {gallery.map((p, i) => (
            <button
              key={p.src + i}
              onClick={() => setIndex(i)}
              className={cn(
                "group overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                i === 0 && "col-span-2 row-span-2",
                i === 3 && "col-span-2",
              )}
              aria-label={`Ampliar: ${p.alt}`}
            >
              <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none [&>button]:hidden">
          {current && index !== null && (
            <figure className="relative">
              <DialogTitle className="sr-only">{current.alt}</DialogTitle>
              <img src={current.src} alt={current.alt} className="max-h-[80vh] w-full rounded-xl object-contain" />
              <figcaption className="mt-3 text-center text-sm text-forest-foreground">
                {current.alt} · {index + 1}/{gallery.length}
              </figcaption>
              <div className="mt-3 flex justify-center gap-3">
                <button onClick={() => go(-1)} aria-label="Anterior" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-bark">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button onClick={() => setIndex(null)} aria-label="Fechar" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-bark">
                  <X className="h-5 w-5" />
                </button>
                <button onClick={() => go(1)} aria-label="Seguinte" className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-background text-bark">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
