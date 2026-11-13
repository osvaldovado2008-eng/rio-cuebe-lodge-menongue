import { useState } from "react";
import { Check, Clock, Copy, Mail, MapPin, MessageCircle, Navigation, Phone, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact, mapDirectionsUrl, mapEmbedUrl, navLinks, resort } from "@/data/resort";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { SocialLinks } from "./SocialLinks";

const fullAddress = `${contact.address} – ${contact.region}`;
const whatsappHref = `https://wa.me/${contact.whatsapp.number}`;

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(`${fullAddress} · GPS ${contact.gps.label}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — ignore */
    }
  };

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
      content: <a href={whatsappHref} target="_blank" rel="noreferrer" className="hover:text-gold">{contact.whatsapp.display}</a>,
    },
    { icon: Mail, label: "E-mail", content: <a href={`mailto:${contact.email}`} className="break-all hover:text-gold">{contact.email}</a> },
    { icon: Clock, label: "Atendimento", content: contact.hours },
    {
      icon: MapPin,
      label: "Morada",
      content: (
        <span className="flex flex-col items-start gap-1.5">
          <span>{fullAddress}</span>
          <button
            type="button"
            onClick={copyAddress}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gold hover:text-bark-foreground"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Morada copiada" : "Copiar morada"}
          </button>
        </span>
      ),
    },
    { icon: Plane, label: "Transfer", content: "Avise com 72 h de antecedência" },
  ];

  return (
    <footer id="contactos" className="bg-bark text-bark-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <span className="eyebrow text-gold">Contactos</span>
          <h2 className="mt-3 text-4xl leading-[1.05] text-bark-foreground md:text-6xl">Estamos à sua espera</h2>
          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            {rows.map(({ icon: Icon, label, content }) => (
              <div key={label} className="flex gap-3">
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <div className="min-w-0">
                  <dt className="eyebrow text-[0.62rem] text-bark-foreground/60">{label}</dt>
                  <dd className="mt-1 text-sm leading-relaxed">{content}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap">
            <Button asChild variant="whatsapp" size="lg" className="rounded-full">
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <MessageCircle /> Falar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="sand" size="lg" className="rounded-full">
              <a href={`mailto:${contact.email}`}>
                <Mail /> Enviar e-mail
              </a>
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150} className="flex flex-col gap-4">
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
        </Reveal>
      </div>

      <div className="border-t border-bark-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 md:flex-row md:items-center md:justify-between md:px-8">
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
