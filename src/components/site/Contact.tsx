import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, mapDirectionsUrl, mapEmbedUrl, navLinks, resort } from "@/data/resort";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";

export function Contact() {
  const rows = [
    {
      icon: Phone,
      label: "Telefone",
      content: (
        <span className="flex flex-col">
          {contact.phones.map((p) => (
            <a key={p.href} href={p.href} className="hover:text-gold">{p.display}</a>
          ))}
        </span>
      ),
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      content: <a href={`https://wa.me/${contact.whatsapp.number}`} target="_blank" rel="noreferrer" className="hover:text-gold">{contact.whatsapp.display}</a>,
    },
    { icon: Mail, label: "E-mail", content: <a href={`mailto:${contact.email}`} className="break-all hover:text-gold">{contact.email}</a> },
    { icon: Clock, label: "Atendimento", content: contact.hours },
    { icon: MapPin, label: "Morada", content: `${contact.address} — ${contact.region}` },
    { icon: Plane, label: "Transfer", content: "Avise com 72 h de antecedência" },
  ];

  return (
    <footer id="contactos" className="bg-bark text-bark-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <span className="eyebrow text-gold">Contactos</span>
          <h2 className="mt-3 text-4xl leading-[1.05] text-bark-foreground md:text-6xl">Estamos à sua espera</h2>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {rows.map(({ icon: Icon, label, content }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <dt className="eyebrow text-[0.62rem] text-bark-foreground/60">{label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed">{content}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-2xl border border-bark-foreground/15">
            <iframe title="Localização do Rio Cuebe Lodge" src={mapEmbedUrl} loading="lazy" className="h-72 w-full md:h-96" referrerPolicy="no-referrer-when-downgrade" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-bark-foreground/70">
              GPS {contact.gps.label} · Plus Code {contact.plusCode}
            </p>
            <Button asChild variant="sand" size="lg" className="rounded-full">
              <a href={mapDirectionsUrl} target="_blank" rel="noreferrer">
                <Navigation /> Como chegar
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="border-t border-bark-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 pb-24 md:flex-row md:items-center md:justify-between md:px-8 md:pb-8">
          <div>
            <Logo light />
            <p className="mt-2 max-w-sm text-xs text-bark-foreground/60">{resort.summary}</p>
            <SocialLinks className="mt-4" />
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm" aria-label="Rodapé">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-bark-foreground/80 hover:text-gold">{l.label}</a>
            ))}
          </nav>
          <p className="text-xs text-bark-foreground/60">© {new Date().getFullYear()} {resort.name}</p>
        </div>
      </div>
    </footer>
  );
}
