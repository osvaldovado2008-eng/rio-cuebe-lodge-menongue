import { describe, expect, it } from "vitest";
import { buildReservationMessage, countNights, validateReservation, type ReservationRequest } from "./reservation";

const base: ReservationRequest = {
  name: "Ana",
  checkIn: "2026-12-20",
  checkOut: "2026-12-23",
  adults: 2,
  children: 1,
  accommodation: "Bangalô Rio",
};

describe("reservation request", () => {
  it("counts nights between check-in and check-out", () => {
    expect(countNights("2026-12-20", "2026-12-23")).toBe(3);
    expect(countNights("2026-12-23", "2026-12-20")).toBe(0);
  });

  it("rejects a check-out that is not after check-in", () => {
    expect(validateReservation({ ...base, checkOut: "2026-12-20" }, "2026-11-11")).toMatch(/depois da entrada/);
  });

  it("rejects check-in dates in the past", () => {
    expect(validateReservation(base, "2026-12-21")).toMatch(/passado/);
  });

  it("rejects more than 10 guests", () => {
    expect(validateReservation({ ...base, adults: 8, children: 3 }, "2026-11-11")).toMatch(/10 pessoas/);
  });

  it("accepts a valid request and builds the WhatsApp message", () => {
    expect(validateReservation(base, "2026-11-11")).toBeNull();
    const msg = buildReservationMessage(base);
    expect(msg).toContain("Entrada: 20/12/2026");
    expect(msg).toContain("(3 noites)");
    expect(msg).toContain("2 adultos, 1 criança");
  });
});
