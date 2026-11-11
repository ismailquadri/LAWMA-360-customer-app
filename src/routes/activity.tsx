import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Clock, Truck } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { PageTitle, Phone } from "@/components/app";
import { PartnerLogo } from "@/components/PartnerLogo";
import {
  IosBadge,
  IosButton,
  IosEmpty,
  IosRow,
  IosSection,
} from "@/components/ios";
import { money, OPEN_PICKUP } from "@/lib/customer-model";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/activity")({
  validateSearch: z.object({ new: z.coerce.number().optional() }),
  head: () => meta("Activity", "Request pickups and follow live status from your collection partner."),
  component: ActivityPage,
});

const windows = ["Tomorrow, 8–11 am", "Tomorrow, 2–5 pm", "Saturday, 9 am–noon"] as const;

function ActivityPage() {
  const { model, partner, requestPickup, cancelPickup } = useStore();
  const [win, setWin] = useState<string>(windows[0]);
  const [err, setErr] = useState<string | null>(null);
  const open = model.pickups.find((p) => OPEN_PICKUP.includes(p.status));

  return (
    <Phone>
      <PageTitle title="Activity" sub="Schedule waste pickups and track crew progress." />

      <div className="space-y-6">
        {!open && partner && (
          <IosSection
            header="Schedule a pickup"
            footer={`${partner.name} · ${money(partner.charge)} is held from your wallet until accepted.`}
          >
            <IosRow
              leading={<PartnerLogo partnerId={partner.id} name={partner.name} size="md" />}
              title={partner.name}
              subtitle={`${partner.area} · ${partner.rating}`}
              detail={money(partner.charge)}
            />
            {windows.map((w) => (
              <IosRow
                key={w}
                onClick={() => {
                  setWin(w);
                  setErr(null);
                }}
                icon={<Clock className="size-4" />}
                iconTone={win === w ? "forest" : "slate"}
                title={w}
                selected={win === w}
              />
            ))}

            {err && (
              <div role="alert" className="px-4 py-2.5 text-[14px] font-medium text-[#c92117]">
                {err}
              </div>
            )}

            <div className="p-4">
              <IosButton tone="primary" onClick={() => setErr(requestPickup(win))}>
                Confirm pickup · {money(partner.charge)}
              </IosButton>
            </div>
          </IosSection>
        )}

        <section className="space-y-2">
          <h2 className="eyebrow px-4">Pickup timeline</h2>

          {model.pickups.length === 0 ? (
            <IosEmpty icon={<Truck className="size-5" />} title="No pickups yet">
              Choose a collection window above to schedule your first truck.
            </IosEmpty>
          ) : (
            <div className="space-y-3">
              {model.pickups.map((p) => (
                <div key={p.id} className="ios-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-[10px] bg-primary/10 text-primary"
                      >
                        <Calendar className="size-4" />
                      </span>
                      <div>
                        <p className="text-[16px] font-semibold tracking-[-0.015em] text-foreground">
                          Pickup {p.id}
                        </p>
                        <p className="mt-0.5 text-[13px] text-muted-foreground tabular-nums">
                          {p.window} · {money(p.amount)}
                        </p>
                        {p.crew && (
                          <p className="mt-0.5 text-[13px] text-muted-foreground">Crew: {p.crew}</p>
                        )}
                      </div>
                    </div>
                    <IosBadge>{p.status}</IosBadge>
                  </div>

                  <ol className="mt-4 ml-4 space-y-2 border-l border-[#3c3c43]/20 pl-3.5">
                    {p.history.map((h, i) => (
                      <li key={i} className="relative text-[13px] leading-[18px]">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[18.5px] top-1.5 size-2 rounded-full bg-primary ring-2 ring-white"
                        />
                        <span className="font-semibold text-foreground">{h.status}</span>
                        <span className="text-muted-foreground"> · {h.time}</span>
                        {h.note && <span className="text-muted-foreground"> — {h.note}</span>}
                      </li>
                    ))}
                  </ol>

                  {p.status === "Requested" && (
                    <div className="mt-4">
                      <IosButton
                        tone="destructive"
                        className="min-h-[44px] text-[15px]"
                        onClick={() => cancelPickup(p.id)}
                      >
                        Cancel request
                      </IosButton>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Phone>
  );
}
