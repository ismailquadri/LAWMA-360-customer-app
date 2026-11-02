import { createFileRoute, Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Btn, Card, Empty, LinkStatus, PageTitle, Phone, Pill } from "@/components/app";
import { partners } from "@/lib/customer-model";
import type { AppName } from "@/lib/hub-contract";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/you")({
  head: () => meta("You", "Your account, support cases with LAWMA and your collection partner."),
  component: You,
});

const types: { label: string; to: AppName[] }[] = [
  { label: "Missed pickup", to: ["partner", "lawma"] },
  { label: "Billing question", to: ["partner"] },
  { label: "Illegal dumping nearby", to: ["lawma"] },
  { label: "Complaint about my partner", to: ["lawma"] },
];

function You() {
  const { model, partner, premise, report, requestProviderChange, reset, email, signOut } = useStore();
  const [type, setType] = useState(types[0]!);
  const [detail, setDetail] = useState("");
  const [sent, setSent] = useState("");
  const [change, setChange] = useState("");
  const [changeErr, setChangeErr] = useState<string | null>(null);
  const pending = partners.find((p) => p.id === model.pendingPartnerId);
  return (
    <Phone>
      <PageTitle title={model.name} sub={`${premise?.address}, ${premise?.area} · ${model.phone}`} />
      <LinkStatus />
      <p className="mt-2 break-all text-xs text-muted-foreground">Customer ID: {model.customerId}</p>

      <Card className="mt-5">
        <Link to="/report" className="mb-4 flex items-center justify-between rounded-2xl bg-pale p-3 text-sm font-semibold text-primary">Describe it in your own words — AI drafts the report <span>›</span></Link>
        <p className="font-semibold">Quick help</p>
        <p className="mt-1 text-sm text-muted-foreground">Goes to {type.to.map((t) => t === "lawma" ? "LAWMA" : "your partner").join(" and ")}.</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {types.map((t) => <button key={t.label} onClick={() => setType(t)} className={cn("rounded-full border px-3 py-1.5 text-xs font-semibold", type.label === t.label && "border-primary bg-pale text-primary")}>{t.label}</button>)}
        </div>
        <textarea value={detail} onChange={(e) => setDetail(e.target.value)} rows={3} placeholder="Tell us what happened" className="mt-3 w-full rounded-2xl border bg-card p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
        <Btn className="mt-3" disabled={detail.trim().length < 3} onClick={() => { setSent(report(type.label, detail.trim(), type.to)); setDetail(""); }}>Send</Btn>
        {sent && <p className="mt-2 text-sm text-success">Case {sent} sent.</p>}
      </Card>

      <h2 className="mb-2 mt-6 font-semibold">My cases</h2>
      <div className="space-y-3">
        {model.issues.length === 0 && <Empty>No cases yet.</Empty>}
        {model.issues.map((i) => (
          <Card key={i.id}>
            <div className="flex items-start justify-between gap-2"><div><p className="font-semibold">{i.type}</p><p className="text-xs text-muted-foreground">{i.id} · {i.time}</p></div><Pill>{i.status}</Pill></div>
            <p className="mt-2 text-sm">{i.detail}</p>
            {i.reply && <p className="mt-2 rounded-2xl bg-pale p-3 text-sm"><span className="font-semibold">{i.from === "lawma" ? "LAWMA" : "Partner"}: </span>{i.reply}</p>}
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <p className="font-semibold">Collection partner</p>
        <p className="mt-1 text-sm text-muted-foreground">Current: {partner?.name}{pending ? ` · waiting for LAWMA to approve ${pending.name}` : ""}</p>
        {!pending && (
          <>
            <select value={change} onChange={(e) => setChange(e.target.value)} className="mt-3 h-12 w-full rounded-2xl border bg-card px-3 text-sm">
              <option value="">Choose a new partner</option>
              {partners.filter((p) => p.id !== model.partnerId).map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
            {changeErr && <p className="mt-2 text-sm text-destructive">{changeErr}</p>}
            <Btn tone="ghost" className="mt-3" disabled={!change} onClick={() => setChangeErr(requestProviderChange(change))}>Ask LAWMA to change partner</Btn>
          </>
        )}
      </Card>

      <Btn className="mt-6" onClick={async () => { const { error } = await supabase.auth.registerPasskey(); alert(error ? "Couldn't set up Face ID on this device." : "Face ID is on. Next time, sign in with one tap."); }}>Turn on Face ID / passkey</Btn>
      <Btn tone="ghost" className="mt-3" onClick={() => void signOut()}>Sign out of {email}</Btn>
      <button onClick={() => { if (confirm("Start a fresh customer journey? This clears your account data.")) reset(); }} className="mt-6 w-full text-center text-sm text-muted-foreground underline">Start a fresh customer journey</button>
    </Phone>
  );
}
