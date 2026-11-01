import { useServiceSync } from './service-sync';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Partner = { id: string; name: string; area: string; eta: string; charge: number; capacity: string; rating: string; eligible: string[] };
export type Premise = { id: string; address: string; area: string; detail: string; status: string };
export type Bin = { id: string; size: number; state: 'Requested' | 'Allocated' | 'Out for delivery' | 'Delivered' | 'Active' };
export type Pickup = { id: string; status: 'Requested' | 'Accepted' | 'Scheduled' | 'Collected' | 'Completed' | 'Declined' | 'Cancelled'; amount: number; created: string; window: string; partner: string; evidence?: string };
export type Entry = { id: string; title: string; amount: number; time: string; kind: 'credit' | 'reserved' | 'paid' | 'released' };
export type Issue = { id: string; type: string; detail: string; status: 'Open' | 'In review' | 'Resolved'; time: string; reply?: string };
export type Model = { name: string; phone: string; premiseId: string; partnerId: string; providerChangeId: string; capacityRequest: number; bins: Bin[]; balance: number; reserved: number; pickups: Pickup[]; entries: Entry[]; issues: Issue[]; notices: string[]; discoveryUntil: number; binDeliveryUntil: number; requestBinOnMove: boolean; archives: { address: string; bins: Bin[]; pickups: Pickup[]; date: string }[]; supportMessages: { id: string; role: 'assistant' | 'customer'; text: string }[] };

export const premises: Premise[] = [
  { id: 'HOME-018', address: '18 Olowu Street', area: 'Ikeja', detail: 'A four-flat building · no active smart bins', status: 'In rollout area' },
  { id: 'HOME-042', address: '4 Mainland Court', area: 'Yaba', detail: 'Shared household · two smart bins already allocated', status: 'In rollout area' },
  { id: 'HOME-071', address: '71 Ajah Gardens', area: 'Ajah', detail: 'New rollout area · partners available', status: 'In rollout area' },
];

export const partners: Partner[] = [
  { id: 'PAR-001', name: 'GreenLine Collection', area: 'Ikeja · Ojodu', eta: 'Tomorrow, 8–11 am', charge: 1450, capacity: 'Accepting homes', rating: '92% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-006', name: 'Mainland Clean Services', area: 'Ikeja · Yaba · Ajah', eta: 'Friday, 9 am–noon', charge: 1500, capacity: 'Accepting homes', rating: '89% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-009', name: 'Neighbourhood Waste Co.', area: 'Yaba · Ajah', eta: 'Tomorrow, 2–5 pm', charge: 1650, capacity: 'Limited capacity', rating: '94% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-014', name: 'ClearPath Environmental', area: 'Ikeja · Yaba · Ajah', eta: 'Saturday, 8–10 am', charge: 1325, capacity: 'Accepting homes', rating: '87% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-016', name: 'EkoCycle Services', area: 'Ikeja · Yaba · Ajah', eta: 'Tomorrow, 10 am–1 pm', charge: 1725, capacity: 'Accepting homes', rating: '96% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-025', name: 'Lagos City Waste Partners', area: 'Ikeja · Yaba · Ajah', eta: 'Friday, 1–4 pm', charge: 1580, capacity: 'Accepting homes', rating: '91% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-026', name: 'HarbourPoint Collections', area: 'Ikeja · Yaba · Ajah', eta: 'Saturday, 11 am–2 pm', charge: 1850, capacity: 'Limited capacity', rating: '95% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
  { id: 'PAR-024', name: 'FreshRoute Sanitation', area: 'Ikeja · Yaba · Ajah', eta: 'Tomorrow, 3–6 pm', charge: 1390, capacity: 'Accepting homes', rating: '90% on-time', eligible: ['HOME-018', 'HOME-042', 'HOME-071'] },
];

const initial: Model = { name: '', phone: '', premiseId: '', partnerId: '', providerChangeId: '', capacityRequest: 0, bins: [], balance: 0, reserved: 0, pickups: [], entries: [], issues: [], notices: [], discoveryUntil: 0, binDeliveryUntil: 0, requestBinOnMove: false, archives: [], supportMessages: [] };
const key = 'smartwaste360-customer-demo-v1';
const stamp = () => new Date().toLocaleString('en-NG', { dateStyle: 'medium', timeStyle: 'short' });
const id = (prefix: string) => `${prefix}-${Math.floor(100000 + Math.random() * 900000)}`;
const limit = (items: string[], item: string) => [item, ...items].slice(0, 20);

type Store = {
  sync: ReturnType<typeof useServiceSync>; model: Model; ready: boolean; premise?: Premise; partner?: Partner;
  start: (name: string, phone: string) => void; choosePremise: (id: string) => void; choosePartner: (id: string) => void; requestProviderChange: (id: string) => string; approveProviderChange: () => string;
  requestBins: (sizes: number[]) => string; advanceBin: () => void; requestMoreBin: () => string; approveMoreBin: () => string;
  topUp: (amount: number, method: string) => string; requestPickup: (window: string) => string; advancePickup: (step: 'accept' | 'decline' | 'schedule' | 'collect' | 'complete') => void;
  updateProfile: (name: string, phone: string) => string; moveHome: (id: string, requestBin: boolean) => string; cancelPickup: () => string; addSupportMessage: (role: 'assistant' | 'customer', text: string) => void; report: (type: string, detail: string) => string; reset: () => void;
};

const StoreContext = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [model, setModel] = useState<Model>(initial);
  const [ready, setReady] = useState(false);
  const sync = useServiceSync(model, setModel, ready);
  useEffect(() => { AsyncStorage.getItem(key).then(raw => { if (raw) { try { const saved = JSON.parse(raw) as Model; setModel({ ...initial, ...saved, discoveryUntil: saved.premiseId && !saved.partnerId ? (saved.discoveryUntil ?? Date.now() + 3000) : 0, binDeliveryUntil: saved.bins?.some(b => b.state !== 'Active') ? (saved.binDeliveryUntil || Date.now() + 3000) : 0, entries: (saved.entries || []).map(e => e.kind === 'paid' ? { ...e, amount: 0 } : e) }); } catch { /* keep fresh demo */ } } }).catch(() => undefined).finally(() => setReady(true)); }, []);
  useEffect(() => { if (ready) AsyncStorage.setItem(key, JSON.stringify(model)).catch(() => undefined); }, [model, ready]);
  useEffect(() => {
    if (!ready || !model.discoveryUntil) return;
    const deadline = model.discoveryUntil;
    const timer = setTimeout(() => setModel(s => s.discoveryUntil !== deadline ? s : ({ ...s, discoveryUntil: 0, notices: limit(s.notices, 'Collection partners are ready to choose for your address.') })), Math.max(0, deadline - Date.now()));
    return () => clearTimeout(timer);
  }, [ready, model.discoveryUntil]);
  useEffect(() => {
    if (!ready || sync.session || !model.binDeliveryUntil) return;
    const deadline = model.binDeliveryUntil;
    const timer = setTimeout(() => setModel(s => s.binDeliveryUntil !== deadline ? s : ({ ...s, binDeliveryUntil: 0, bins: s.bins.map(b => ({ ...b, state: 'Active' as const })), notices: limit(s.notices, 'Your smart bins have arrived and are active. Open Bins to explore them in 3D.') })), Math.max(0, deadline - Date.now()));
    return () => clearTimeout(timer);
  }, [ready, model.binDeliveryUntil, sync.session]);
  useEffect(() => {
    if (!ready || sync.session || !model.capacityRequest) return;
    const timer = setTimeout(() => setModel(s => !s.capacityRequest || s.bins.length >= 5 ? s : ({ ...s, capacityRequest: 0, bins: [...s.bins, { id: id('BIN'), size: s.capacityRequest, state: 'Active' as const }], notices: limit(s.notices, 'Extra-bin review and delivery completed. Your additional bin is active.') })), 3000);
    return () => clearTimeout(timer);
  }, [ready, model.capacityRequest, sync.session]);
  const premise = premises.find(p => p.id === model.premiseId);
  const partner = partners.find(p => p.id === model.partnerId);
  const store = useMemo<Store>(() => ({
    model, ready, premise, partner, sync,
    start(name, phone) { setModel(s => ({ ...s, name: name.trim(), phone: phone.trim(), notices: limit(s.notices, 'Your account is ready. Confirm a service address to continue.') })); },
    choosePremise(premiseId) { const shared = premiseId === 'HOME-042' ? [{ id: 'BIN-1042', size: 240, state: 'Active' as const }, { id: 'BIN-1043', size: 240, state: 'Active' as const }] : []; setModel(s => ({ ...s, premiseId, discoveryUntil: Date.now() + 3000, binDeliveryUntil: 0, partnerId: '', providerChangeId: '', capacityRequest: 0, bins: shared, notices: limit(s.notices, shared.length ? 'You joined the existing household bin allocation. No duplicate bin request was created.' : 'Your residence was added. You can now choose an eligible collection partner.') })); },
    choosePartner(partnerId) { const p = partners.find(x => x.id === partnerId); if (model.discoveryUntil || !p?.eligible.includes(model.premiseId)) return; setModel(s => ({ ...s, partnerId, requestBinOnMove: false, bins: s.requestBinOnMove && !s.bins.length ? [{ id: id('BIN'), size: 240, state: 'Requested' as const }] : s.bins, binDeliveryUntil: s.requestBinOnMove && !s.bins.length ? Date.now() + 3000 : s.binDeliveryUntil, notices: limit(s.notices, `${p.name} is now the selected collection partner for ${premise?.address}.`) })); },
    requestProviderChange(partnerId) { const p = partners.find(x => x.id === partnerId); if (!p?.eligible.includes(model.premiseId)) return 'This partner cannot serve your residence.'; if (model.pickups.some(x => !['Completed', 'Declined', 'Cancelled'].includes(x.status))) return 'Finish or resolve the current pickup before changing providers.'; if (model.bins.some(x => x.state !== 'Active')) return 'Finish the current bin handoff before changing providers.'; if (model.partnerId === partnerId) return 'This is already your current provider.'; setModel(s => ({ ...s, providerChangeId: partnerId, notices: limit(s.notices, `Provider change to ${p.name} requested. The existing provider remains active until review.`) })); return 'Change requested. Your existing provider remains active until approval.'; },
    approveProviderChange() { const requested = partners.find(x => x.id === model.providerChangeId); if (!requested) return 'No provider change is awaiting review.'; setModel(s => ({ ...s, partnerId: requested.id, providerChangeId: '', notices: limit(s.notices, `LAWMA review complete: ${requested.name} is now the provider for ${premise?.address}.`) })); return `${requested.name} is now selected. The approval is complete.`; },
    requestBins(sizes) { if (!model.premiseId) return 'Choose a residence first.'; if (!model.partnerId) return 'Choose a collection partner first.'; if (model.bins.length) return 'This residence already has a bin allocation or request. You can track it here.'; if (!sizes.length || sizes.length > 5 || sizes.some(size => ![120, 240].includes(size))) return 'Choose between one and five bins.'; const bins = sizes.map(size => ({ id: id('BIN'), size, state: 'Requested' as const })); setModel(s => ({ ...s, bins, binDeliveryUntil: Date.now() + 3000, notices: limit(s.notices, `${bins.length} smart bin${bins.length === 1 ? '' : 's'} requested for this residence. Your request is now with LAWMA and your collection partner.`) })); return 'Bin request submitted for this residence.'; },
    advanceBin() { setModel(s => { const pending = s.bins.find(b => b.state !== 'Active'); if (!pending) return s; const next: Record<Bin['state'], Bin['state']> = { Requested: 'Allocated', Allocated: 'Out for delivery', 'Out for delivery': 'Delivered', Delivered: 'Active', Active: 'Active' }; const state = next[pending.state]; return { ...s, bins: s.bins.map(b => b.state === 'Active' ? b : { ...b, state }), notices: limit(s.notices, state === 'Allocated' ? 'LAWMA allocated bin stock to the selected partner.' : state === 'Out for delivery' ? 'The partner collected the bin stock and scheduled delivery.' : state === 'Delivered' ? 'The partner marked the bins delivered. Activation remains pending.' : 'Bin device reporting is current. Your bins are active.') }; }); },
    requestMoreBin() { if (!model.bins.some(b => b.state === 'Active')) return 'Complete your first allocation before requesting more capacity.'; if (model.bins.length >= 5) return 'Your household allocation is at its maximum. Ask LAWMA for a manual review.'; if (model.capacityRequest) return 'Your extra-bin request is already awaiting review.'; if (model.bins.some(b => b.state !== 'Active')) return 'Finish the current delivery before requesting another bin.'; setModel(s => ({ ...s, capacityRequest: 240, notices: limit(s.notices, `Additional 240 L bin requested for ${premise?.address}. LAWMA review is pending.`) })); return 'Additional 240 L bin requested. The current allocation remains active during review.'; },
    approveMoreBin() { if (!model.capacityRequest) return 'No extra-bin request is awaiting review.'; const size = model.capacityRequest; setModel(s => ({ ...s, capacityRequest: 0, binDeliveryUntil: Date.now() + 3000, bins: [...s.bins, { id: id('BIN'), size, state: 'Requested' }], notices: limit(s.notices, `LAWMA approved: one extra ${size} L bin approved for partner fulfilment.`) })); return 'Additional bin approved. Follow its LAWMA-to-home delivery stages.'; },
    topUp(amount, method) { if (!Number.isInteger(amount) || amount < 500 || amount > 100000) return 'Enter an amount from ₦500 to ₦100,000.'; setModel(s => ({ ...s, balance: s.balance + amount, entries: [{ id: id('TOP'), title: `Wallet top-up · ${method}`, amount, time: stamp(), kind: 'credit' }, ...s.entries], notices: limit(s.notices, `₦${amount.toLocaleString('en-NG')} added to your wallet.`) })); return 'Wallet updated.'; },
    requestPickup(window) { if (!partner) return 'Choose a provider first.'; if (!model.bins.some(b => b.state === 'Active')) return 'A smart bin must be active before a pickup can be requested.'; if (model.pickups.some(p => !['Completed', 'Declined', 'Cancelled'].includes(p.status))) return 'This residence already has an active pickup. Follow its progress in Activity.'; if (model.balance < partner.charge) return 'Add enough wallet balance to cover this pickup.'; const pickup: Pickup = { id: id('PU'), status: 'Requested', amount: partner.charge, created: stamp(), window, partner: partner.name }; setModel(s => ({ ...s, balance: s.balance - partner.charge, reserved: s.reserved + partner.charge, pickups: [pickup, ...s.pickups], entries: [{ id: id('RSV'), title: `Reserved for ${pickup.id}`, amount: -partner.charge, time: stamp(), kind: 'reserved' }, ...s.entries], notices: limit(s.notices, `${pickup.id} requested. ₦${partner.charge.toLocaleString('en-NG')} is reserved until partner acceptance or decline.`) })); return pickup.id; },
    advancePickup(step) { setModel(s => { const current = s.pickups[0]; if (!current) return s; const next: Record<typeof step, Pickup['status']> = { accept: 'Accepted', decline: 'Declined', schedule: 'Scheduled', collect: 'Collected', complete: 'Completed' }; const allowed: Record<typeof step, Pickup['status'][]> = { accept: ['Requested'], decline: ['Requested'], schedule: ['Accepted'], collect: ['Scheduled'], complete: ['Collected'] }; if (!allowed[step].includes(current.status)) return s; const status = next[step], amount = current.amount; const entry = step === 'accept' ? { id: id('PAY'), title: `Partner credited ${money(amount)} · ${current.id}`, amount: 0, time: stamp(), kind: 'paid' as const } : step === 'decline' ? { id: id('REL'), title: `Reservation released · ${current.id}`, amount, time: stamp(), kind: 'released' as const } : undefined; return { ...s, pickups: [{ ...current, status, evidence: step === 'collect' ? 'CREW-EVIDENCE-01 · collection evidence recorded' : current.evidence }, ...s.pickups.slice(1)], reserved: ['accept', 'decline'].includes(step) ? Math.max(0, s.reserved - amount) : s.reserved, balance: step === 'decline' ? s.balance + amount : s.balance, entries: entry ? [entry, ...s.entries] : s.entries, notices: limit(s.notices, step === 'accept' ? `${current.partner} accepted. The reserved amount was automatically marked paid to the partner.` : step === 'decline' ? 'The partner declined. The reservation was returned to your wallet.' : `Pickup ${current.id} is now ${status.toLowerCase()}.`) }; }); },
    report(type, detail) { const issue: Issue = { id: id('CASE'), type, detail: detail.trim(), status: 'Open', time: stamp() }; setModel(s => ({ ...s, issues: [issue, ...s.issues], notices: limit(s.notices, `${issue.id} opened. It is visible in the customer and LAWMA service history.`) })); return issue.id; },
    updateProfile(name, phone) {
      if (name.trim().length < 2) return 'Enter your full name.';
      if (!/^(0\d{10}|234\d{10})$/.test(phone.replace(/\D/g, ''))) return 'Enter a valid Nigerian mobile number.';
      setModel(s => ({ ...s, name: name.trim(), phone: phone.trim() })); return 'Profile updated.';
    },
    moveHome(premiseId, requestBin) {
      const target = premises.find(p => p.id === premiseId);
      if (!target || target.id === model.premiseId) return 'Choose a different residence.';
      if (model.pickups.some(p => ['Accepted', 'Scheduled', 'Collected'].includes(p.status))) return 'A paid collection is in progress. Complete it or contact support before moving.';
      setModel(s => ({ ...s, premiseId, partnerId: '', providerChangeId: '', capacityRequest: 0, discoveryUntil: Date.now() + 3000, binDeliveryUntil: 0, requestBinOnMove: requestBin && premiseId !== 'HOME-042',
        archives: [{ address: premise?.address || s.premiseId, bins: s.bins, pickups: s.pickups.map(p=>p.status==='Requested'?{...p,status:'Cancelled' as const}:p), date: stamp() }, ...s.archives],
        bins: premiseId === 'HOME-042' ? [{ id: 'BIN-1042', size: 240, state: 'Active' }, { id: 'BIN-1043', size: 240, state: 'Active' }] : [], pickups: [], balance: s.balance + s.reserved, reserved: 0,
        entries: s.reserved ? [{ id: id('REL'), title: 'Pending collection cancelled · residence changed', amount: s.reserved, time: stamp(), kind: 'released' }, ...s.entries] : s.entries,
        notices: limit(s.notices, `Residence changed to ${target.address}. Previous bin association cancelled; history preserved. Any pending reservation was returned.`) }));
      return 'Residence updated.';
    },
    cancelPickup() {
      const pickup = model.pickups[0]; if (!pickup || pickup.status !== 'Requested') return 'This collection needs partner support to cancel.';
      setModel(s => ({ ...s, pickups: s.pickups.map(p => p.id === pickup.id ? { ...p, status: 'Cancelled' } : p), balance: s.balance + pickup.amount, reserved: Math.max(0, s.reserved - pickup.amount), entries: [{ id: id('REL'), title: 'Cancelled pickup · reservation returned', amount: pickup.amount, time: stamp(), kind: 'released' }, ...s.entries], notices: limit(s.notices, 'Pickup cancelled by customer. Funds returned to wallet.') })); return 'Pickup cancelled. Your money is back in your wallet.';
    },
    addSupportMessage(role, text) { setModel(s => ({ ...s, supportMessages: [...s.supportMessages, { id: id('MSG'), role, text }].slice(-50) })); },
    reset() { setModel(initial); AsyncStorage.removeItem(key).catch(() => undefined); },
  }), [model, ready, premise, partner, sync]);
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore() { const value = useContext(StoreContext); if (!value) throw new Error('StoreProvider missing'); return value; }
export const money = (amount: number) => `₦${amount.toLocaleString('en-NG')}`;
