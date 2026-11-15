import { useState } from "react";
import { Play } from "lucide-react";
import { video } from "@/data/resort";
import { Reveal } from "./Reveal";

/** Shows a poster first; the YouTube player only loads when the visitor presses play. */
export function VideoTour() {
  const [playing, setPlaying] = useState(false);

  return (
    <section id="video" className="bg-forest-deep py-20 text-forest-foreground md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:items-center lg:gap-14">
        <Reveal>
          <span className="eyebrow text-gold">Vídeo · {video.duration}</span>
          <h2 className="mt-3 text-4xl leading-[1.05] md:text-6xl">{video.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-forest-foreground/80 md:text-lg">{video.text}</p>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lift">
            {playing ? (
              <iframe
                title={video.title}
                src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex items-center justify-center"
                aria-label={`Ver vídeo: ${video.title}`}
              >
                <img src={video.poster.src} alt={video.poster.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <span className="bg-card-overlay absolute inset-0" aria-hidden="true" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold text-bark shadow-lift transition-transform group-hover:scale-110">
                  <Play className="ml-1 h-8 w-8 fill-current" />
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
