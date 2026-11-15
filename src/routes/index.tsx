import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Accommodations } from "@/components/site/Accommodations";
import { Experiences } from "@/components/site/Experiences";
import { Dining } from "@/components/site/Dining";
import { Leisure } from "@/components/site/Leisure";
import { Events } from "@/components/site/Events";
import { VideoTour } from "@/components/site/VideoTour";
import { Gallery } from "@/components/site/Gallery";
import { Booking } from "@/components/site/Booking";
import { Contact } from "@/components/site/Contact";
import { MobileBookingBar } from "@/components/site/MobileBookingBar";

const title = "Rio Cuebe Lodge — Resort de ecoturismo em Menongue, Angola";
const description =
  "37 suítes de palha à beira do Rio Cuebe, a 11 km de Menongue. Passeios de buggy, spa, pesca, piscina e restaurante com vista para o rio. Peça já a sua reserva.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Accommodations />
        <Experiences />
        <Dining />
        <Leisure />
        <Events />
        <VideoTour />
        <Gallery />
        <Booking />
      </main>
      <Contact />
      <MobileBookingBar />
    </>
  );
}
