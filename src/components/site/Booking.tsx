import { useEffect, useState, type FormEvent } from "react";
import { Mail, MessageCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { accommodations, contact } from "@/data/resort";
import {
  MAX_GUESTS,
  SELECT_ACCOMMODATION_EVENT,
  buildReservationMessage,
  countNights,
  emailUrl,
  validateReservation,
  whatsappUrl,
  type ReservationRequest,
} from "@/lib/reservation";
import { SectionHeading } from "./SectionHeading";

const todayIso = () => new Date().toISOString().slice(0, 10);
const fieldClass = "h-12 rounded-xl border-input bg-card text-base";

export function Booking() {
  const [form, setForm] = useState<ReservationRequest>({
    name: "",
    checkIn: "",
    checkOut: "",
    adults: 2,
    children: 0,
    accommodation: accommodations[0]?.name ?? "",
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const match = accommodations.find((a) => a.id === id);
      if (match) setForm((f) => ({ ...f, accommodation: match.name }));
    };
    window.addEventListener(SELECT_ACCOMMODATION_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_ACCOMMODATION_EVENT, onSelect);
  }, []);

  const set = <K extends keyof ReservationRequest>(key: K, value: ReservationRequest[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  };

  const nights = countNights(form.checkIn, form.checkOut);

  const send = (channel: "whatsapp" | "email") => {
    const problem = validateReservation(form, todayIso());
    if (problem) {
      setError(problem);
      return;
    }
    const message = buildReservationMessage(form);
    window.open(channel === "whatsapp" ? whatsappUrl(message) : emailUrl(message), "_blank", "noopener");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send("whatsapp");
  };

  return (
    <section id="reservar" className="bg-sand-deep py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Reservas"
            title="Planeie a sua estadia"
            text="Preencha os dados e envie o pedido por WhatsApp ou e-mail. A nossa equipa confirma a disponibilidade e o preço."
          />
          <ul className="mt-8 space-y-3 text-sm text-bark">
            <li>• Resposta {contact.hours.toLowerCase()}</li>
            <li>• {contact.airportTransferNotice}</li>
            <li>• Pequeno-almoço buffet incluído</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-card p-5 shadow-lift md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="r-name">Nome</Label>
              <Input id="r-name" autoComplete="name" className={`mt-1.5 ${fieldClass}`} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="O seu nome" />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="r-acc">Acomodação</Label>
              <select
                id="r-acc"
                value={form.accommodation}
                onChange={(e) => set("accommodation", e.target.value)}
                className={`mt-1.5 w-full border px-3 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${fieldClass}`}
              >
                {accommodations.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="r-in">Entrada</Label>
              <Input id="r-in" type="date" min={todayIso()} className={`mt-1.5 ${fieldClass}`} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="r-out">Saída</Label>
              <Input id="r-out" type="date" min={form.checkIn || todayIso()} className={`mt-1.5 ${fieldClass}`} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} />
            </div>

            <div>
              <Label htmlFor="r-adults">Adultos</Label>
              <Input id="r-adults" type="number" inputMode="numeric" min={1} max={MAX_GUESTS} className={`mt-1.5 ${fieldClass}`} value={form.adults} onChange={(e) => set("adults", Number(e.target.value) || 0)} />
            </div>
            <div>
              <Label htmlFor="r-children">Crianças</Label>
              <Input id="r-children" type="number" inputMode="numeric" min={0} max={MAX_GUESTS} className={`mt-1.5 ${fieldClass}`} value={form.children} onChange={(e) => set("children", Number(e.target.value) || 0)} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="r-notes">Observações (opcional)</Label>
              <Textarea id="r-notes" rows={3} className="mt-1.5 rounded-xl border-input bg-card text-base" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Transfer do aeroporto, ocasião especial…" />
            </div>
          </div>

          {nights > 0 && (
            <p className="mt-4 flex items-center gap-2 text-sm text-forest">
              <CalendarDays className="h-4 w-4" /> {nights} {nights === 1 ? "noite" : "noites"}
            </p>
          )}
          {error && (
            <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button type="submit" variant="forest" size="xl" className="flex-1">
              <MessageCircle /> Enviar por WhatsApp
            </Button>
            <Button type="button" variant="outline" size="xl" className="flex-1 rounded-full bg-card" onClick={() => send("email")}>
              <Mail /> Enviar por e-mail
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
