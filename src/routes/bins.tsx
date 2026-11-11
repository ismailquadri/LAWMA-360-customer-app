import { createFileRoute } from "@tanstack/react-router";
import { Package, Trash2 } from "lucide-react";
import { useState } from "react";
import { PageTitle, Phone } from "@/components/app";
import { PartnerLogo } from "@/components/PartnerLogo";
import {
  IosBadge,
  IosButton,
  IosEmpty,
  IosRow,
  IosSection,
  IosSegmentedControl,
  IosStepper,
} from "@/components/ios";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/bins")({
  head: () => meta("My bins", "Request smart bins and follow their delivery from your partner."),
  component: Bins,
});

const sizes = [
  { value: 120, label: "120L" },
  { value: 240, label: "240L" },
  { value: 360, label: "360L" },
] as const;

function Bins() {
  const { model, partner, requestBins } = useStore();
  const [size, setSize] = useState<number>(240);
  const [qty, setQty] = useState(1);
  const room = Math.max(0, 5 - model.bins.length);

  return (
    <Phone>
      <PageTitle
        title="My smart bins"
        sub={partner ? `Delivered and serviced by ${partner.name}.` : undefined}
      />

      {partner && (
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-card py-1 pl-1.5 pr-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06]">
          <PartnerLogo partnerId={partner.id} name={partner.name} size="xs" />
          <span className="text-[13px] font-medium text-foreground">{partner.name}</span>
        </div>
      )}

      <div className="space-y-6">
        {model.bins.length === 0 ? (
          <IosEmpty icon={<Package className="size-5" />} title="No smart bins yet">
            Request your first household bin below to start scheduled pickups.
          </IosEmpty>
        ) : (
          <IosSection header="Assigned bins">
            {model.bins.map((b) => (
              <IosRow
                key={b.id}
                icon={<Trash2 className="size-4" />}
                iconTone={b.state === "Active" ? "green" : "ember"}
                title={`${b.size}L Smart Bin`}
                subtitle={`Asset ID: ${b.id}`}
                trailing={<IosBadge>{b.state}</IosBadge>}
              />
            ))}
          </IosSection>
        )}

        {room > 0 && (
          <IosSection
            header="Request new bins"
            footer="Requests are dispatched immediately to your assigned PSP collection partner."
          >
            <div className="px-4 py-3.5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[15px] font-medium text-foreground">Bin capacity</span>
                <span className="text-[13px] text-muted-foreground">{size} litres</span>
              </div>
              <IosSegmentedControl
                label="Bin capacity"
                options={sizes}
                value={size}
                onChange={(v) => setSize(v)}
              />
            </div>

            <div className="flex min-h-[54px] items-center justify-between px-4 py-2.5">
              <div>
                <p className="text-[16px] font-medium text-foreground">Quantity</p>
                <p className="text-[13px] text-muted-foreground">Up to {room} available</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-5 text-center text-[17px] font-semibold tabular-nums">{qty}</span>
                <IosStepper value={qty} min={1} max={room} onChange={setQty} label="Bin quantity" />
              </div>
            </div>

            <div className="p-4">
              <IosButton
                tone="primary"
                onClick={() => {
                  requestBins(size, qty);
                  setQty(1);
                }}
              >
                Send request ({qty} × {size}L)
              </IosButton>
            </div>
          </IosSection>
        )}
      </div>
    </Phone>
  );
}
