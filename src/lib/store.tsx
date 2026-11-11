import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AppName } from "./hub-contract";
import {
  blankModel, money, newId, OPEN_PICKUP, partners, premises, stamp,
  type Model, type Notice,
} from "./customer-model";

type Link = "demo" | "connecting" | "connected" | "offline";

const MODEL_KEY = "lawma-customer-demo-v2";
const INTRO_KEY = "lawma-customer-intro-v2";

type Store = {
  introDone: boolean;
  completeIntro: () => void;
  isOnboarded: boolean;
  model: Model;
  ready: boolean;
  link: Link;
  premise?: (typeof premises)[number] | undefined;
  partner?: (typeof partners)[number] | undefined;
  start: (name: string, phone: string) => void;
  choosePremise: (id: string) => void;
  choosePartner: (id: string) => void;
  requestProviderChange: (id: string) => string | null;
  requestBins: (size: number, qty: number) => void;
  topUp: (amount: number, method: string) => void;
  requestPickup: (window: string) => string | null;
  cancelPickup: (id: string) => void;
  report: (type: string, detail: string, to: AppName[], extra?: { title?: string; urgency?: string; original?: string }) => string;
  reset: () => void;
};

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [model, setModel] = useState<Model>(() => blankModel(""));
  const [introDone, setIntroDone] = useState(false);
  const [ready, setReady] = useState(false);
  const [link, setLink] = useState<Link>("connecting");
  const latest = useRef(model);
  latest.current = model;

  // Login-free presentation mode: onboarding and all resident changes stay on this device.
  useEffect(() => {
    const initial = { ...blankModel("CUS-DEMO-LOCAL"), balance: 7500 };
    try {
      const saved = localStorage.getItem(MODEL_KEY);
      const parsed = saved ? { ...initial, ...JSON.parse(saved) } : initial;
      setModel(parsed);
      const seen = localStorage.getItem(INTRO_KEY) === "1" || Boolean(parsed.name && parsed.premiseId && parsed.partnerId);
      setIntroDone(seen);
    } catch {
      setModel(initial);
      setIntroDone(false);
    }
    setReady(true);
    setLink("demo");
  }, []);
  useEffect(() => {
    if (ready) { try { localStorage.setItem(MODEL_KEY, JSON.stringify(model)); } catch { /* Storage may be unavailable in private browsing. */ } }
  }, [model, ready]);
  const send = useCallback((_to: AppName[], _type: string, _payload: Record<string, unknown>, _ref?: string) => { setLink("demo"); }, []);

  const notice = (s: Model, text: string): Notice[] => [{ id: newId("N"), text, time: stamp(), from: "app" as const }, ...s.notices].slice(0, 30);

  const store = useMemo<Store>(() => {
    const premise = premises.find((p) => p.id === model.premiseId);
    const partner = partners.find((p) => p.id === model.partnerId);
    const isOnboarded = Boolean(introDone && model.name && model.premiseId && model.partnerId);
    return {
      introDone,
      completeIntro() {
        setIntroDone(true);
        try { localStorage.setItem(INTRO_KEY, "1"); } catch { /* ignore */ }
      },
      isOnboarded,
      model, ready, link, premise, partner,
      start(name, phone) {
        setModel((s) => ({ ...s, name: name.trim(), phone: phone.trim() }));
        setTimeout(() => send(["lawma"], "customer.registered", {}), 0);
      },
      choosePremise(id) {
        const shared = id === "HOME-042" ? [{ id: "BIN-1042", size: 240, state: "Active" as const }, { id: "BIN-1043", size: 240, state: "Active" as const }] : [];
        setModel((s) => ({ ...s, premiseId: id, partnerId: "", bins: shared, notices: notice(s, "Address confirmed. Choose a collection partner.") }));
      },
      choosePartner(id) {
        const p = partners.find((x) => x.id === id);
        if (!p) return;
        setModel((s) => ({ ...s, partnerId: id, notices: notice(s, `${p.name} is now your collection partner.`) }));
        setTimeout(() => send(["partner", "lawma"], "partner.selected", { partnerId: id, partnerName: p.name }), 0);
      },
      requestProviderChange(id) {
        const m = latest.current;
        if (m.pickups.some((x) => OPEN_PICKUP.includes(x.status))) return "Finish your current pickup before changing partners.";
        if (m.partnerId === id) return "This is already your partner.";
        if (m.pendingPartnerId) return "A change request is already with LAWMA.";
        const p = partners.find((x) => x.id === id);
        setModel((s) => ({ ...s, pendingPartnerId: id, notices: notice(s, `Change to ${p?.name} sent to LAWMA for approval.`) }));
        send(["lawma", "partner"], "provider_change.requested", { fromPartnerId: m.partnerId, toPartnerId: id, toPartnerName: p?.name });
        return null;
      },
      requestBins(size, qty) {
        const bins = Array.from({ length: qty }, () => ({ id: newId("BIN"), size, state: "Requested" as const }));
        setModel((s) => ({ ...s, bins: [...s.bins, ...bins], notices: notice(s, `${qty} × ${size}L bin request sent to your partner.`) }));
        bins.forEach((b) => send(["partner"], "bin.requested", { binId: b.id, size, kind: latest.current.bins.length ? "additional" : "new" }, b.id));
      },
      topUp(amount, method) {
        setModel((s) => ({ ...s, balance: s.balance + amount, entries: [{ id: newId("TX"), title: `Added via ${method}`, amount, time: stamp(), kind: "credit" as const }, ...s.entries], notices: notice(s, `${money(amount)} added to your wallet.`) }));
        send(["partner", "lawma"], "wallet.topup", { amount, method, balance: latest.current.balance + amount });
      },
      requestPickup(window) {
        const m = latest.current;
        const p = partners.find((x) => x.id === m.partnerId);
        if (!p) return "Choose a partner first.";
        if (m.pickups.some((x) => OPEN_PICKUP.includes(x.status))) return "You already have a pickup in progress.";
        if (m.balance < p.charge) return `Add at least ${money(p.charge - m.balance)} to your wallet first.`;
        const pickup = { id: newId("PU"), status: "Requested" as const, amount: p.charge, created: stamp(), window, partner: p.name, history: [{ status: "Requested", time: stamp() }] };
        setModel((s) => ({ ...s, balance: s.balance - p.charge, reserved: s.reserved + p.charge, pickups: [pickup, ...s.pickups],
          entries: [{ id: newId("TX"), title: `Held for pickup ${pickup.id}`, amount: p.charge, time: stamp(), kind: "reserved" as const }, ...s.entries],
          notices: notice(s, `Pickup sent to ${p.name}.`) }));
        send(["partner"], "pickup.requested", { pickupId: pickup.id, amount: p.charge, window, partnerId: p.id }, pickup.id);
        return null;
      },
      cancelPickup(id) {
        const pk = latest.current.pickups.find((x) => x.id === id);
        if (!pk || pk.status !== "Requested") return;
        setModel((s) => ({ ...s, balance: s.balance + pk.amount, reserved: Math.max(0, s.reserved - pk.amount),
          pickups: s.pickups.map((x) => x.id === id ? { ...x, status: "Cancelled" as const, history: [...x.history, { status: "Cancelled", time: stamp() }] } : x),
          entries: [{ id: newId("TX"), title: `Pickup ${id} cancelled`, amount: pk.amount, time: stamp(), kind: "released" as const }, ...s.entries] }));
        send(["partner"], "pickup.cancelled", { pickupId: id }, id);
      },
      report(type, detail, to, extra = {}) {
        const id = newId("CASE");
        setModel((s) => ({ ...s, issues: [{ id, type, detail, status: "Open" as const, time: stamp() }, ...s.issues], notices: notice(s, `Case ${id} sent.`) }));
        send(to, "issue.reported", { issueId: id, type, detail, ...extra }, id);
        return id;
      },
      reset() {
        setModel((s) => ({ ...blankModel(s.customerId), balance: 7500 }));
        setIntroDone(false);
        try {
          localStorage.removeItem(INTRO_KEY);
          localStorage.removeItem(MODEL_KEY);
        } catch { /* ignore */ }
      },
    };
  }, [introDone, model, ready, link, send]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("StoreProvider missing");
  return v;
}
