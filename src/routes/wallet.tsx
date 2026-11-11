import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Check,
  Clock,
  CreditCard,
  Landmark,
  Plus,
  Smartphone,
  Wallet as WalletIcon,
} from "lucide-react";
import { useState } from "react";
import { PageTitle, Phone } from "@/components/app";
import {
  IosButton,
  IosEmpty,
  IosRow,
  IosSection,
  IosSegmentedControl,
  IosSheet,
} from "@/components/ios";
import { money } from "@/lib/customer-model";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/wallet")({
  head: () => meta("Wallet", "Top up your LAWMA 360 wallet and see every pickup payment."),
  component: WalletPage,
});

const amounts = [2000, 5000, 10000, 20000] as const;

const methods = [
  { id: "Card", icon: CreditCard, tone: "blue" as const, sub: "Visa, Mastercard, Verve" },
  { id: "Bank transfer", icon: Landmark, tone: "forest" as const, sub: "Instant from any Nigerian bank" },
  { id: "USSD", icon: Smartphone, tone: "ember" as const, sub: "Dial a code, no internet needed" },
] as const;

type Filter = "all" | "in" | "out";

const filterOptions = [
  { value: "all" as const, label: "All" },
  { value: "in" as const, label: "Money in" },
  { value: "out" as const, label: "Money out" },
] as const;

function WalletPage() {
  const { model, topUp } = useStore();
  const [sheet, setSheet] = useState<null | "amount" | "method" | "done">(null);
  const [amount, setAmount] = useState<number>(5000);
  const [filter, setFilter] = useState<Filter>("all");

  const isIn = (k: string) => k === "credit" || k === "released";
  const entries = model.entries.filter((e) => filter === "all" || (filter === "in") === isIn(e.kind));
  const [whole, kobo] = money(model.balance).split(".");
  const addedThisMonth = model.entries
    .filter((e) => e.kind === "credit")
    .reduce((s, e) => s + e.amount, 0);

  return (
    <Phone>
      <PageTitle title="Wallet" sub="Your prepaid pickup balance and ledger." />

      <section className="wallet-balance" aria-label="Wallet balance">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-white/75">
              Available balance
            </p>
            <p className="mt-1.5 text-[40px] font-bold leading-none tracking-tight tabular-nums">
              {whole}
              {kobo !== undefined && <span className="text-2xl text-white/60">.{kobo}</span>}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSheet("amount")}
            className="inline-flex min-h-[36px] shrink-0 items-center gap-1 rounded-full bg-white px-3.5 py-1.5 text-[14px] font-semibold text-primary shadow-sm hover:bg-white/95"
          >
            <Plus className="size-4" strokeWidth={2.5} aria-hidden="true" />
            Add
          </button>
        </div>

        <div className="wallet-summary">
          <div>
            <span className="text-[12px] text-white/75">Money added</span>
            <p className="tabular-nums">{money(addedThisMonth)}</p>
          </div>
          <div className="text-right">
            <span className="text-[12px] text-white/75">Held for pickups</span>
            <p className="tabular-nums">{money(model.reserved)}</p>
          </div>
        </div>
      </section>

      <div className="mt-6">
        <IosSegmentedControl
          label="Filter transactions"
          options={filterOptions}
          value={filter}
          onChange={setFilter}
        />
      </div>

      <div className="mt-4">
        {entries.length === 0 ? (
          <IosEmpty icon={<WalletIcon className="size-5" />} title="No transactions yet">
            Top up your wallet above to fund upcoming pickups.
          </IosEmpty>
        ) : (
          <IosSection header="Transactions" footer="Demo money only — no real payment is taken.">
            {entries.map((e) => {
              const credit = isIn(e.kind);
              const reserved = e.kind === "reserved";
              return (
                <IosRow
                  key={e.id}
                  icon={
                    credit ? (
                      <ArrowDownLeft className="size-4" />
                    ) : reserved ? (
                      <Clock className="size-4" />
                    ) : (
                      <ArrowUpRight className="size-4" />
                    )
                  }
                  iconTone={credit ? "green" : reserved ? "ember" : "slate"}
                  title={e.title}
                  subtitle={e.time}
                  trailing={
                    <span
                      className={cn(
                        "shrink-0 text-[15px] font-semibold tabular-nums",
                        credit ? "text-[#17682c]" : "text-foreground",
                      )}
                    >
                      {credit ? "+" : "−"}
                      {money(e.amount)}
                    </span>
                  }
                />
              );
            })}
          </IosSection>
        )}
      </div>

      <IosSheet
        open={sheet !== null}
        onClose={() => setSheet(null)}
        title={sheet === "amount" ? "Add money" : sheet === "method" ? `Pay ${money(amount)}` : "Top-up complete"}
      >
        {sheet === "amount" && (
          <div className="space-y-5 pt-2">
            <div className="ios-group py-6 text-center">
              <p className="text-[13px] font-medium text-muted-foreground">Amount</p>
              <p className="mt-1 text-[44px] font-bold leading-none tracking-tight text-foreground tabular-nums">
                {money(amount)}
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAmount(a)}
                  className={cn(
                    "min-h-[44px] rounded-[11px] text-[15px] font-semibold transition-all",
                    amount === a
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-foreground ring-1 ring-black/[0.06] hover:bg-white/80",
                  )}
                >
                  ₦{a / 1000}k
                </button>
              ))}
            </div>

            <IosButton tone="primary" onClick={() => setSheet("method")}>
              Continue
            </IosButton>
          </div>
        )}

        {sheet === "method" && (
          <div className="space-y-4 pt-1">
            <IosSection header="Choose payment method">
              {methods.map((m) => (
                <IosRow
                  key={m.id}
                  onClick={() => {
                    topUp(amount, m.id);
                    setSheet("done");
                  }}
                  icon={<m.icon className="size-4" />}
                  iconTone={m.tone}
                  title={m.id}
                  subtitle={m.sub}
                  disclosure
                />
              ))}
            </IosSection>

            <IosButton tone="gray" onClick={() => setSheet("amount")}>
              Change amount
            </IosButton>
          </div>
        )}

        {sheet === "done" && (
          <div className="space-y-5 pt-3 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#248a3d]/15 text-[#17682c] animate-in zoom-in duration-300">
              <Check className="size-8" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[22px] font-bold tracking-tight text-foreground">{money(amount)} added</p>
              <p className="mt-1 text-[15px] text-muted-foreground tabular-nums">
                Available balance: {money(model.balance)}
              </p>
            </div>
            <IosButton tone="primary" onClick={() => setSheet(null)}>
              Done
            </IosButton>
          </div>
        )}
      </IosSheet>
    </Phone>
  );
}
