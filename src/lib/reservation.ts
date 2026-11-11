import { contact } from "@/data/resort";

export type ReservationRequest = {
  name: string;
  checkIn: string; // yyyy-mm-dd
  checkOut: string; // yyyy-mm-dd
  adults: number;
  children: number;
  accommodation: string;
  notes?: string;
};

export const MAX_GUESTS = 10;

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
  if (!r.checkIn || !r.checkOut) return "Escolha as datas de entrada e saída.";
  if (r.checkIn < today) return "A data de entrada não pode ser no passado.";
  if (countNights(r.checkIn, r.checkOut) < 1) return "A saída tem de ser depois da entrada.";
  if (r.adults < 1) return "Indique pelo menos 1 adulto.";
  if (r.adults + r.children > MAX_GUESTS)
    return `Para mais de ${MAX_GUESTS} pessoas, contacte-nos diretamente.`;
  return null;
}

const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
};

export function buildReservationMessage(r: ReservationRequest): string {
  const nights = countNights(r.checkIn, r.checkOut);
  const lines = [
    "Olá, Rio Cuebe Lodge! Gostaria de pedir uma reserva:",
    `• Nome: ${r.name.trim()}`,
    `• Acomodação: ${r.accommodation}`,
    `• Entrada: ${formatDate(r.checkIn)}`,
    `• Saída: ${formatDate(r.checkOut)} (${nights} ${nights === 1 ? "noite" : "noites"})`,
    `• Hóspedes: ${r.adults} ${r.adults === 1 ? "adulto" : "adultos"}${
      r.children > 0 ? `, ${r.children} ${r.children === 1 ? "criança" : "crianças"}` : ""
    }`,
  ];
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

/** Lets an accommodation card preselect its option in the booking form. */
export const SELECT_ACCOMMODATION_EVENT = "rio-cuebe:select-accommodation";

export function selectAccommodation(id: string) {
  window.dispatchEvent(new CustomEvent(SELECT_ACCOMMODATION_EVENT, { detail: id }));
}
