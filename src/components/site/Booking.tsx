import { useEffect, useRef, useState, type FormEvent } from "react";
import { Mail, MessageCircle, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { bookableGroups, bookableServices, contact } from "@/data/resort";
import {
  MAX_EVENT_GUESTS,
  MAX_GUESTS,
  SELECT_SERVICE_EVENT,
  buildReservationMessage,
  countNights,
  emailUrl,
  isStay,
  validateReservation,
  whatsappUrl,
} from "@/lib/reservation";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./SectionHeading";

const todayIso = () => new Date().toISOString().slice(0, 10);
const fieldClass = "h-12 rounded-xl border-input bg-card text-base";

type FormState = {
  name: string;
  serviceId: string;
  checkIn: string;
  checkOut: string;
  time: string;
  adults: number;
  children: number;
  notes: string;
};

const NOTES_PLACEHOLDER: Record<string, string> = {
  stay: "Transfer do aeroporto, ocasião especial…",
  activity: "Idades das crianças, preferências…",
  table: "Almoço ou jantar, ocasião especial…",
  event: "Tipo de evento, número aproximado de convidados…",
};

export function Booking() {
  const [form, setForm] = useState<FormState>({
    name: "",
    serviceId: bookableServices[0]?.id ?? "",
    checkIn: "",
    checkOut: "",
    time: "",
    adults: 2,
    children: 0,
    notes: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [flash, setFlash] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    let timer: number | undefined;
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (!bookableServices.some((s) => s.id === id)) return;
      setForm((f) => ({ ...f, serviceId: id }));
      setError(null);
      setFlash(true);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setFlash(false), 1800);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => {
      window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
      window.clearTimeout(timer);
    };
  }, []);

  const service = bookableServices.find((s) => s.id === form.serviceId) ?? bookableServices[0];
  const stay = isStay(service.kind);
  const maxGuests = service.kind === "event" ? MAX_EVENT_GUESTS : MAX_GUESTS;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setError(null);
  };

  const nights = stay ? countNights(form.checkIn, form.checkOut) : 0;

  const send = (channel: "whatsapp" | "email") => {
    const request = {
      name: form.name,
      service: service.name,
      kind: service.kind,
      checkIn: form.checkIn,
      checkOut: stay ? form.checkOut : "",
      time: stay ? undefined : form.time || undefined,
      adults: form.adults,
      children: form.children,
      notes: form.notes,
    };
    const problem = validateReservation(request, todayIso());
    if (problem) {
      setError(problem);
      return;
    }
    const message = buildReservationMessage(request);
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
            title="Reserve a sua estadia ou experiência"
            text="Escolha o que deseja — suíte, safari, spa, mesa no restaurante ou evento — e envie o pedido por WhatsApp ou e-mail. A nossa equipa confirma a disponibilidade e o preço."
          />
          <ul className="mt-8 space-y-3 text-sm text-bark">
            <li>• Resposta {contact.hours.toLowerCase()}</li>
            <li>• {contact.airportTransferNotice}</li>
            <li>• Pequeno-almoço buffet incluído nas estadias</li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="rounded-3xl bg-card p-5 shadow-lift md:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="r-service">O que deseja reservar?</Label>
              <select
                id="r-service"
                ref={selectRef}
                value={service.id}
                onChange={(e) => set("serviceId", e.target.value)}
                className={cn(
                  "mt-1.5 w-full border px-3 transition-shadow duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                  fieldClass,
                  flash && "ring-2 ring-clay ring-offset-2 ring-offset-card",
                )}
              >
                {bookableGroups.map((g) => (
                  <optgroup key={g.label} label={g.label}>
                    {g.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="r-name">Nome</Label>
              <Input id="r-name" autoComplete="name" className={`mt-1.5 ${fieldClass}`} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="O seu nome" />
            </div>

            {stay ? (
              <>
                <div>
                  <Label htmlFor="r-in">Entrada</Label>
                  <Input id="r-in" type="date" min={todayIso()} className={`mt-1.5 ${fieldClass}`} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="r-out">Saída</Label>
                  <Input id="r-out" type="date" min={form.checkIn || todayIso()} className={`mt-1.5 ${fieldClass}`} value={form.checkOut} onChange={(e) => set("checkOut", e.target.value)} />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="r-in">Data</Label>
                  <Input id="r-in" type="date" min={todayIso()} className={`mt-1.5 ${fieldClass}`} value={form.checkIn} onChange={(e) => set("checkIn", e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="r-time">Hora preferida (opcional)</Label>
                  <Input id="r-time" type="time" className={`mt-1.5 ${fieldClass}`} value={form.time} onChange={(e) => set("time", e.target.value)} />
                </div>
              </>
            )}

            <div>
              <Label htmlFor="r-adults">Adultos</Label>
              <Input id="r-adults" type="number" inputMode="numeric" min={1} max={maxGuests} className={`mt-1.5 ${fieldClass}`} value={form.adults} onChange={(e) => set("adults", Number(e.target.value) || 0)} />
            </div>
            <div>
              <Label htmlFor="r-children">Crianças</Label>
              <Input id="r-children" type="number" inputMode="numeric" min={0} max={maxGuests} className={`mt-1.5 ${fieldClass}`} value={form.children} onChange={(e) => set("children", Number(e.target.value) || 0)} />
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="r-notes">Observações (opcional)</Label>
              <Textarea id="r-notes" rows={3} className="mt-1.5 rounded-xl border-input bg-card text-base" value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder={NOTES_PLACEHOLDER[service.kind]} />
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
            <Button type="submit" variant="whatsapp" size="lg" className="flex-1 rounded-full">
              <MessageCircle /> Enviar por WhatsApp
            </Button>
            <Button type="button" variant="sand" size="lg" className="flex-1 rounded-full" onClick={() => send("email")}>
              <Mail /> Enviar por e-mail
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
