import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Btn, Card, Empty, PageTitle, Phone, Pill } from "@/components/app";
import { money, OPEN_PICKUP } from "@/lib/customer-model";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/activity")({
  validateSearch: z.object({ new: z.coerce.number().optional() }),
  head: () => meta("Activity", "Request pickups and follow live status from your collection partner."),
  component: ActivityPage,
});

const windows = ["Tomorrow, 8–11 am", "Tomorrow, 2–5 pm", "Saturday, 9 am–noon"];

function ActivityPage() {
  const { model, partner, requestPickup, cancelPickup } = useStore();
  const [win, setWin] = useState<string>(windows[0]!);
  const [err, setErr] = useState<string | null>(null);
  const open = model.pickups.find((p) => OPEN_PICKUP.includes(p.status));
  return (
    <Phone>
      <PageTitle title="Activity" sub="Pickups update live as your partner works." />
      {!open && partner && (
        <Card>
          <p className="font-semibold">Request a pickup</p>
          <p className="mt-1 text-sm text-muted-foreground">{partner.name} · {money(partner.charge)} held from your wallet until accepted.</p>
          <div className="mt-3 space-y-2">
            {windows.map((w) => <button key={w} onClick={() => setWin(w)} className={cn("w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium", win === w && "border-primary bg-pale text-primary")}>{w}</button>)}
          </div>
          {err && <p className="mt-3 text-sm text-destructive">{err}</p>}
          <Btn className="mt-4" onClick={() => setErr(requestPickup(win))}>Confirm {money(partner.charge)}</Btn>
        </Card>
      )}
      <div className="mt-5 space-y-3">
        {model.pickups.length === 0 && <Empty>No pickups yet.</Empty>}
        {model.pickups.map((p) => (
          <Card key={p.id}>
            <div className="flex items-start justify-between">
              <div><p className="font-semibold">Pickup {p.id}</p><p className="text-sm text-muted-foreground">{p.window} · {money(p.amount)}</p>{p.crew && <p className="text-sm text-muted-foreground">Crew: {p.crew}</p>}</div>
              <Pill>{p.status}</Pill>
            </div>
            <ol className="mt-3 space-y-1.5 border-l-2 border-pale pl-3">
              {p.history.map((h, i) => <li key={i} className="text-xs"><span className="font-semibold">{h.status}</span> · {h.time}{h.note ? ` — ${h.note}` : ""}</li>)}
            </ol>
            {p.status === "Requested" && <Btn tone="ghost" className="mt-3 min-h-10 text-sm" onClick={() => cancelPickup(p.id)}>Cancel request</Btn>}
          </Card>
        ))}
      </div>
    </Phone>
  );
}
