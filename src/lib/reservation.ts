import { contact, type ServiceKind } from "@/data/resort";

export type ReservationRequest = {
  name: string;
  /** Name of the room, experience or service being requested. */
  service: string;
  kind: ServiceKind;
  checkIn: string; // yyyy-mm-dd — the only date for activities, tables and events
  checkOut: string; // yyyy-mm-dd — stays only
  /** Preferred time (hh:mm), optional, for anything that is not a stay. */
  time?: string | undefined;
  adults: number;
  children: number;
  notes?: string;
};

export const MAX_GUESTS = 10;
/** Events and meetings can be much larger than a room booking. */
export const MAX_EVENT_GUESTS = 500;

export const isStay = (kind: ServiceKind) => kind === "stay";

/** Number of nights between two yyyy-mm-dd dates (0 if invalid or not after check-in). */
export function countNights(checkIn: string, checkOut: string): number {
  const a = Date.parse(`${checkIn}T00:00:00Z`);
  const b = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b)) return 0;
  const diff = Math.round((b - a) / 86_400_000);
  return diff > 0 ? diff : 0;
}

/** Returns a Portuguese error message, or null when the request is valid. */
export function validateReservation(r: ReservationRequest, today: string): string | null {
  if (!r.name.trim()) return "Indique o seu nome.";
  if (!r.service) return "Escolha o que deseja reservar.";
  const stay = isStay(r.kind);
  if (stay) {
    if (!r.checkIn || !r.checkOut) return "Escolha as datas de entrada e saída.";
  } else if (!r.checkIn) {
    return "Escolha a data.";
  }
  if (r.checkIn < today) return "A data não pode ser no passado.";
  if (stay && countNights(r.checkIn, r.checkOut) < 1) return "A saída tem de ser depois da entrada.";
  if (r.adults < 1) return "Indique pelo menos 1 adulto.";
  const max = r.kind === "event" ? MAX_EVENT_GUESTS : MAX_GUESTS;
  if (r.adults + r.children > max) return `Para mais de ${max} pessoas, contacte-nos diretamente.`;
  return null;
}

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

const people = (r: ReservationRequest, adultWord: [string, string]) =>
  `${r.adults} ${r.adults === 1 ? adultWord[0] : adultWord[1]}${
    r.children > 0 ? `, ${r.children} ${r.children === 1 ? "criança" : "crianças"}` : ""
  }`;

export function buildReservationMessage(r: ReservationRequest): string {
  const lines = ["Olá, Rio Cuebe Lodge! Gostaria de pedir uma reserva:", `• Nome: ${r.name.trim()}`];
  if (isStay(r.kind)) {
    const nights = countNights(r.checkIn, r.checkOut);
    lines.push(
      `• Acomodação: ${r.service}`,
      `• Entrada: ${formatDate(r.checkIn)}`,
      `• Saída: ${formatDate(r.checkOut)} (${nights} ${nights === 1 ? "noite" : "noites"})`,
      `• Hóspedes: ${people(r, ["adulto", "adultos"])}`,
    );
  } else {
    lines.push(`• Serviço: ${r.service}`, `• Data: ${formatDate(r.checkIn)}${r.time ? ` às ${r.time}` : ""}`);
    lines.push(`• Pessoas: ${people(r, ["adulto", "adultos"])}`);
  }
  if (r.notes?.trim()) lines.push(`• Observações: ${r.notes.trim()}`);
  return lines.join("\n");
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function emailUrl(message: string): string {
  return `mailto:${contact.email}?subject=${encodeURIComponent(
    "Pedido de reserva — Rio Cuebe Lodge",
  )}&body=${encodeURIComponent(message)}`;
}

export function formatKwanza(value: number): string {
  return `${new Intl.NumberFormat("pt-AO").format(value)} Kz`;
}

/** Lets any "Reservar" button preselect its service (by id from bookableServices) in the booking form. */
export const SELECT_SERVICE_EVENT = "rio-cuebe:select-service";

export function selectService(id: string) {
  window.dispatchEvent(new CustomEvent(SELECT_SERVICE_EVENT, { detail: id }));
}
