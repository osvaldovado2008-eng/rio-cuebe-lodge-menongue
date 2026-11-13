import { describe, expect, it } from "vitest";
import { accommodations, bookableServices, experiences } from "@/data/resort";
import { buildReservationMessage, countNights, validateReservation, type ReservationRequest } from "./reservation";

const base: ReservationRequest = {
  name: "Ana",
  service: "Bangalô Rio",
  kind: "stay",
  checkIn: "2026-12-20",
  checkOut: "2026-12-23",
  adults: 2,
  children: 1,
};

const safari: ReservationRequest = { ...base, service: "Safari na reserva", kind: "activity", checkOut: "", time: "09:00" };

describe("reservation request", () => {
  it("counts nights between check-in and check-out", () => {
    expect(countNights("2026-12-20", "2026-12-23")).toBe(3);
    expect(countNights("2026-12-23", "2026-12-20")).toBe(0);
  });

  it("rejects a check-out that is not after check-in", () => {
    expect(validateReservation({ ...base, checkOut: "2026-12-20" }, "2026-11-11")).toMatch(/depois da entrada/);
  });

  it("rejects dates in the past", () => {
    expect(validateReservation(base, "2026-12-21")).toMatch(/passado/);
    expect(validateReservation(safari, "2026-12-21")).toMatch(/passado/);
  });

  it("rejects more than 10 guests for a stay", () => {
    expect(validateReservation({ ...base, adults: 8, children: 3 }, "2026-11-11")).toMatch(/10 pessoas/);
  });

  it("accepts a valid stay and builds the WhatsApp message", () => {
    expect(validateReservation(base, "2026-11-11")).toBeNull();
    const msg = buildReservationMessage(base);
    expect(msg).toContain("Acomodação: Bangalô Rio");
    expect(msg).toContain("Entrada: 20/12/2026");
    expect(msg).toContain("(3 noites)");
    expect(msg).toContain("2 adultos, 1 criança");
  });

  it("an experience needs only one date, not a check-out", () => {
    expect(validateReservation(safari, "2026-11-11")).toBeNull();
    expect(validateReservation({ ...safari, checkIn: "" }, "2026-11-11")).toMatch(/Escolha a data/);
    const msg = buildReservationMessage(safari);
    expect(msg).toContain("Serviço: Safari na reserva");
    expect(msg).toContain("Data: 20/12/2026 às 09:00");
    expect(msg).not.toContain("Saída");
  });

  it("every room and experience can be booked from its own button", () => {
    const ids = bookableServices.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const item of [...accommodations, ...experiences]) expect(ids).toContain(item.id);
    expect(ids).toEqual(expect.arrayContaining(["mesa", "evento"]));
  });
});
