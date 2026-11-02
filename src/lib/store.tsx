import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { AppName } from "./hub-contract";
import { customerInbox, sendCustomerMessage } from "./hub.functions";
import { getMyAccount, saveMyAccount } from "./account.functions";
import { supabase } from "@/integrations/supabase/client";
import {
  applyInbound, blankModel, money, newId, OPEN_PICKUP, partners, premises, stamp,
  type Model, type Notice,
} from "./customer-model";

type Link = "connecting" | "connected" | "offline";

export type Auth = "loading" | "signedOut" | "signedIn";
type Store = {
  auth: Auth;
  email: string;
  signOut: () => Promise<void>;
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
  const [ready, setReady] = useState(false);
  const [link, setLink] = useState<Link>("connecting");
  const latest = useRef(model);
  latest.current = model;

  const [auth, setAuth] = useState<Auth>("loading");
  const [email, setEmail] = useState("");
  const loadedFor = useRef("");

  // One auth listener: load the resident's account from the server on sign-in.
  useEffect(() => {
    const load = async (uid: string | undefined, mail: string | undefined) => {
      if (!uid) { loadedFor.current = ""; setReady(false); setModel(blankModel("")); setEmail(""); setAuth("signedOut"); return; }
      if (loadedFor.current === uid) return;
      loadedFor.current = uid;
      setEmail(mail ?? "");
      setAuth("signedIn");
      try {
        const acc = await getMyAccount();
        const saved = (acc.state ?? {}) as Partial<Model>;
        setModel({ ...blankModel(acc.customerId), ...saved, customerId: acc.customerId });
        setReady(true);
      } catch { loadedFor.current = ""; setLink("offline"); }
    };
    supabase.auth.getSession().then(({ data }) => load(data.session?.user.id, data.session?.user.email));
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      void load(session?.user.id, session?.user.email);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  // Save the account to the server shortly after each change.
  useEffect(() => {
    if (!ready || !model.customerId) return;
    const t = setTimeout(() => { saveMyAccount({ data: { state: model as unknown as Record<string, unknown> } }).catch(() => setLink("offline")); }, 700);
    return () => clearTimeout(t);
  }, [model, ready]);

  // Pull new messages from the Partner Hub and LAWMA every few seconds.
  useEffect(() => {
    if (!ready || !model.customerId) return;
    let active = true;
    const tick = async () => {
      try {
        const { messages } = await customerInbox({ data: latest.current.cursor ? { since: latest.current.cursor } : {} });
        if (!active) return;
        if (messages.length) setModel((s) => messages.reduce(applyInbound, s));
        setLink("connected");
      } catch { if (active) setLink("offline"); }
    };
    void tick();
    const t = setInterval(tick, 4000);
    return () => { active = false; clearInterval(t); };
  }, [ready, model.customerId]);

  const send = useCallback((to: AppName[], type: string, payload: Record<string, unknown>, ref?: string) => {
    const m = latest.current;
    const premise = premises.find((p) => p.id === m.premiseId);
    const customer = { name: m.name, phone: m.phone, address: premise?.address, area: premise?.area, premiseId: m.premiseId, partnerId: m.partnerId };
    sendCustomerMessage({ data: { to, type, ...(ref ? { ref } : {}), payload: { ...payload, customer } } })
      .then(() => setLink("connected"))
      .catch(() => setLink("offline"));
  }, []);

  const notice = (s: Model, text: string): Notice[] => [{ id: newId("N"), text, time: stamp(), from: "app" as const }, ...s.notices].slice(0, 30);

  const store = useMemo<Store>(() => {
    const premise = premises.find((p) => p.id === model.premiseId);
    const partner = partners.find((p) => p.id === model.partnerId);
    return {
      auth, email, model, ready, link, premise, partner,
      async signOut() { await supabase.auth.signOut(); },
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
        setModel((s) => blankModel(s.customerId));
      },
    };
  }, [auth, email, model, ready, link, send]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("StoreProvider missing");
  return v;
}
