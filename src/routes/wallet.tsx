import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone } from "@/components/app";
import { money } from "@/lib/customer-model";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => meta("Wallet", "Top up your LAWMA 360 wallet and see every pickup payment."),
  component: WalletPage,
});

const amounts = [2000, 5000, 10000, 20000];
const methods = [
  { id: "Card", icon: "💳", sub: "Visa, Mastercard, Verve" },
  { id: "Bank transfer", icon: "🏦", sub: "Instant from any Nigerian bank" },
  { id: "USSD", icon: "📱", sub: "Dial a code, no internet needed" },
];
type Filter = "all" | "in" | "out";

function WalletPage() {
  const { model, topUp, email } = useStore();
  const [sheet, setSheet] = useState<null | "amount" | "method" | "done">(null);
  const [amount, setAmount] = useState(5000);
  const [filter, setFilter] = useState<Filter>("all");

  const isIn = (k: string) => k === "credit" || k === "released";
  const entries = model.entries.filter((e) => filter === "all" || (filter === "in") === isIn(e.kind));
  const [whole, kobo] = money(model.balance).split(".");
  const addedThisMonth = model.entries.filter((e) => e.kind === "credit").reduce((s, e) => s + e.amount, 0);

  return (
    <Phone>
      <div className="-mx-5 -mt-6 bg-gradient-to-b from-primary via-primary/80 to-background px-5 pb-6 pt-6 text-primary-foreground">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium opacity-90">Wallet</span>
          <span className="max-w-[180px] truncate opacity-70">{email}</span>
        </div>
        <div className="mt-8 text-center">
          <p className="text-sm opacity-80">Available balance</p>
          <p className="mt-1 text-[46px] font-bold leading-none tracking-tight">{whole}{kobo !== undefined && <span className="opacity-50">.{kobo}</span>}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1 text-xs backdrop-blur">
            <span>⬆</span>{money(addedThisMonth)} added · {money(model.reserved)} held
          </p>
        </div>
      </div>

      <div className="rounded-[22px] border bg-card p-1.5 shadow-[0_12px_40px_-16px_color-mix(in_oklab,var(--primary)_35%,transparent)]">
        <div className="flex items-center gap-2 px-3 pt-2.5 font-semibold"><span className="text-ember">●</span>Top up before your next pickup</div>
        <div className="mt-2 rounded-2xl bg-muted/60 p-3 text-sm text-muted-foreground">
          Pickups hold money from your wallet and only charge you once the partner completes the job. Unused holds come straight back.
          <button onClick={() => setSheet("amount")} className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border bg-card text-sm font-medium text-foreground shadow-sm">Add money <span className="text-primary">→</span></button>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {([["all", "All"], ["in", "Money in"], ["out", "Money out"]] as const).map(([k, l]) => (
          <button key={k} onClick={() => setFilter(k)} className={cn("rounded-full border px-4 py-1.5 text-sm font-medium", filter === k ? "border-foreground bg-foreground text-background" : "bg-card")}>{l}</button>
        ))}
      </div>

      <div className="mt-3">
        {entries.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No transactions here yet.</p>
        ) : entries.map((e) => (
          <div key={e.id} className="flex items-center gap-3 py-3">
            <span className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm", isIn(e.kind) ? "bg-pale text-primary" : e.kind === "reserved" ? "bg-ember/10 text-ember" : "bg-muted text-foreground")}>
              {isIn(e.kind) ? "↓" : e.kind === "reserved" ? "⏳" : "↑"}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-medium">{e.title}</p>
              <p className="text-xs text-muted-foreground">{e.time}</p>
            </div>
            <p className={cn("text-[15px] font-semibold", isIn(e.kind) && "text-success")}>{isIn(e.kind) ? "+" : "−"}{money(e.amount)}</p>
          </div>
        ))}
      </div>

      <button onClick={() => setSheet("amount")} className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-dashed bg-muted/40 text-sm text-muted-foreground">＋ Add money</button>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">Demo money only — no real payment is taken.</p>

      {sheet && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          <button aria-label="Close" onClick={() => setSheet(null)} className="absolute inset-0 bg-foreground/20 backdrop-blur-md animate-in fade-in" />
          <div className="relative w-full max-w-[430px] rounded-t-[32px] bg-card p-6 pb-10 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <button onClick={() => setSheet(null)} className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-muted text-muted-foreground">✕</button>

            {sheet === "amount" && (<>
              <h2 className="mt-4 text-xl font-semibold">How much?</h2>
              <p className="mt-1 text-sm text-muted-foreground">Pick an amount to add to your wallet.</p>
              <p className="mt-6 text-center text-5xl font-bold tracking-tight">{money(amount)}</p>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {amounts.map((a) => <button key={a} onClick={() => setAmount(a)} className={cn("h-11 rounded-xl border text-sm font-medium", amount === a ? "border-primary bg-pale text-primary" : "bg-card")}>{a / 1000}k</button>)}
              </div>
              <button onClick={() => setSheet("method")} className="mt-6 h-12 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground">Continue</button>
            </>)}

            {sheet === "method" && (<>
              <h2 className="mt-4 text-xl font-semibold">Pay {money(amount)} with</h2>
              <p className="mt-1 text-sm text-muted-foreground">Choose how you'd like to add money.</p>
              <div className="mt-5 space-y-2.5">
                {methods.map((m) => (
                  <button key={m.id} onClick={() => { topUp(amount, m.id); setSheet("done"); }} className="flex w-full items-center gap-3 rounded-2xl border bg-card p-3.5 text-left">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-pale">{m.icon}</span>
                    <span className="flex-1"><b className="block text-[15px] font-medium">{m.id}</b><span className="text-xs text-muted-foreground">{m.sub}</span></span>
                    <span className="grid h-6 w-6 place-items-center rounded-full border text-xs text-muted-foreground">›</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setSheet("amount")} className="mt-4 w-full text-center text-sm text-muted-foreground">← Change amount</button>
            </>)}

            {sheet === "done" && (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-pale text-2xl text-primary animate-in zoom-in duration-500">✓</div>
                <h2 className="mt-4 text-xl font-semibold">{money(amount)} added</h2>
                <p className="mt-1 text-sm text-muted-foreground">Your new balance is {money(model.balance)}.</p>
                <button onClick={() => setSheet(null)} className="mt-6 h-12 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground">Done</button>
              </div>
            )}
          </div>
        </div>
      )}
    </Phone>
  );
}
