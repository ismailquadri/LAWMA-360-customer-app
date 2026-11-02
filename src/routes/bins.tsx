import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Btn, Card, Empty, PageTitle, Phone, Pill } from "@/components/app";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/bins")({
  head: () => meta("My bins", "Request smart bins and follow their delivery from your partner."),
  component: Bins,
});

const sizes = [120, 240, 360];

function Bins() {
  const { model, partner, requestBins } = useStore();
  const [size, setSize] = useState(240);
  const [qty, setQty] = useState(1);
  const room = Math.max(0, 5 - model.bins.length);
  return (
    <Phone>
      <PageTitle title="My smart bins" sub={partner ? `Delivered and serviced by ${partner.name}.` : undefined} />
      <div className="space-y-3">
        {model.bins.length === 0 && <Empty>No bins yet. Request your first one below.</Empty>}
        {model.bins.map((b) => (
          <Card key={b.id} className="flex items-center justify-between">
            <div><p className="font-semibold">{b.size}L smart bin</p><p className="text-sm text-muted-foreground">{b.id}</p></div>
            <Pill>{b.state}</Pill>
          </Card>
        ))}
      </div>
      {room > 0 && (
        <Card className="mt-6">
          <p className="font-semibold">Request bins</p>
          <p className="mt-1 text-sm text-muted-foreground">Your partner gets the request straight away.</p>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={cn("rounded-2xl border py-3 text-sm font-semibold", size === s && "border-primary bg-pale text-primary")}>{s}L</button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm">Quantity</span>
            <div className="flex items-center gap-3">
              <button aria-label="Fewer" onClick={() => setQty(Math.max(1, qty - 1))} className="size-9 rounded-full border">−</button>
              <span className="w-4 text-center font-semibold">{qty}</span>
              <button aria-label="More" onClick={() => setQty(Math.min(room, qty + 1))} className="size-9 rounded-full border">+</button>
            </div>
          </div>
          <Btn className="mt-4" onClick={() => { requestBins(size, qty); setQty(1); }}>Send request</Btn>
        </Card>
      )}
    </Phone>
  );
}
