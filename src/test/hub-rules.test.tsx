import { describe, expect, it } from "vitest";
import { applyInbound, blankModel, type Model } from "@/lib/customer-model";
import { appForKey, recipientsFor, type HubMessage, type Json } from "@/lib/hub-contract";

const msg = (type: string, payload: { [k: string]: Json }, from: "partner" | "lawma" = "partner", id = type + Math.random()): HubMessage => ({
  id, from_app: from, to_app: "customer", type, customer_id: "CUS-1", ref: null, payload, created_at: new Date().toISOString(),
});

const withPickup = (): Model => ({
  ...blankModel("CUS-1"), balance: 3550, reserved: 1450,
  pickups: [{ id: "PU-1", status: "Requested", amount: 1450, created: "", window: "", partner: "GreenLine", history: [] }],
});

describe("pickup money rules", () => {
  it("partner acceptance settles the held charge once, without a second debit", () => {
    const m = applyInbound(withPickup(), msg("pickup.status", { pickupId: "PU-1", status: "Accepted" }));
    expect(m.reserved).toBe(0);
    expect(m.balance).toBe(3550);
    const again = applyInbound(m, msg("pickup.status", { pickupId: "PU-1", status: "Scheduled" }));
    expect(again.balance).toBe(3550);
    expect(again.entries.filter((e) => e.kind === "paid")).toHaveLength(1);
  });
  it("partner decline returns the held charge to the wallet", () => {
    const m = applyInbound(withPickup(), msg("pickup.status", { pickupId: "PU-1", status: "Declined" }));
    expect(m.reserved).toBe(0);
    expect(m.balance).toBe(5000);
  });
  it("the same message is never applied twice", () => {
    const one = msg("pickup.status", { pickupId: "PU-1", status: "Declined" }, "partner", "fixed");
    const m = applyInbound(applyInbound(withPickup(), one), one);
    expect(m.balance).toBe(5000);
  });
});

describe("provider change", () => {
  it("only switches partner when LAWMA approves", () => {
    const base = { ...blankModel("CUS-1"), partnerId: "PAR-001", pendingPartnerId: "PAR-006" };
    expect(applyInbound(base, msg("provider_change.decision", { approved: false }, "lawma")).partnerId).toBe("PAR-001");
    expect(applyInbound(base, msg("provider_change.decision", { approved: true }, "lawma")).partnerId).toBe("PAR-006");
  });
});

describe("app keys", () => {
  it("maps each key to its app and rejects unknown keys", () => {
    const keys = { partner: "partner-key-123", lawma: "lawma-key-456" };
    expect(appForKey("partner-key-123", keys)).toBe("partner");
    expect(appForKey("lawma-key-456", keys)).toBe("lawma");
    expect(appForKey("wrong-key-000", keys)).toBeNull();
    expect(appForKey(null, keys)).toBeNull();
  });
  it("an app cannot message itself", () => {
    expect(recipientsFor("partner", ["partner", "customer"])).toEqual(["customer"]);
  });
});
