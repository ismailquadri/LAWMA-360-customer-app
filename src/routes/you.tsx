import { createFileRoute } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  Headphones,
  MessageSquarePlus,
  RotateCcw,
} from "lucide-react";
import { useId, useState } from "react";
import { LinkStatus, PageTitle, Phone } from "@/components/app";
import {
  IosActionSheet,
  IosBadge,
  IosButton,
  IosEmpty,
  IosRow,
  IosSection,
} from "@/components/ios";
import { partners } from "@/lib/customer-model";
import type { AppName } from "@/lib/hub-contract";
import { meta } from "@/lib/meta";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/you")({
  head: () => meta("You", "Your resident profile, support cases and collection partner."),
  component: You,
});

const types: { label: string; to: AppName[] }[] = [
  { label: "Missed pickup", to: ["partner", "lawma"] },
  { label: "Billing question", to: ["partner"] },
  { label: "Illegal dumping nearby", to: ["lawma"] },
  { label: "Complaint about my partner", to: ["lawma"] },
];

function You() {
  const { model, partner, premise, report, requestProviderChange, reset } = useStore();
  const [type, setType] = useState(types[0]!);
  const [detail, setDetail] = useState("");
  const [sent, setSent] = useState("");
  const [change, setChange] = useState("");
  const [changeErr, setChangeErr] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const noteId = useId();
  const selectId = useId();
  const pending = partners.find((p) => p.id === model.pendingPartnerId);

  const initials = model.name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase() ?? "")
    .join("") || "R";

  return (
    <Phone>
      <PageTitle title="You" />

      <div className="space-y-6">
        {/* Apple Account Profile Card */}
        <section className="ios-group p-4" aria-label="Resident profile">
          <div className="flex items-center gap-3.5">
            <div
              aria-hidden="true"
              className="grid size-14 shrink-0 place-items-center rounded-full bg-primary text-[19px] font-bold text-white shadow-sm"
            >
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-[19px] font-semibold tracking-[-0.02em] text-foreground">
                  {model.name}
                </p>
                <LinkStatus />
              </div>
              <p className="mt-0.5 truncate text-[14px] text-muted-foreground">
                {premise?.address}, {premise?.area}
              </p>
              <p className="text-[13px] text-muted-foreground">
                {model.phone} · ID {model.customerId}
              </p>
            </div>
          </div>
        </section>

        <IosSection header="Environmental reporting">
          <IosRow
            to="/report"
            icon={<AlertTriangle className="size-4" />}
            iconTone="ember"
            title="Report an issue"
            subtitle="Draft and send a problem in seconds"
            disclosure
          />
        </IosSection>

        <IosSection
          header="Quick help"
          footer={`Routed directly to ${type.to.map((t) => (t === "lawma" ? "LAWMA" : "your partner")).join(" and ")}.`}
        >
          {types.map((t) => (
            <IosRow
              key={t.label}
              onClick={() => setType(t)}
              icon={<Headphones className="size-4" />}
              iconTone={type.label === t.label ? "forest" : "slate"}
              title={t.label}
              selected={type.label === t.label}
            />
          ))}

          <div className="px-4 py-3">
            <label htmlFor={noteId} className="block text-[13px] font-medium text-muted-foreground">
              Details
            </label>
            <textarea
              id={noteId}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              rows={3}
              placeholder="Tell us what happened…"
              className="mt-1.5 w-full resize-none bg-transparent text-[16px] leading-[22px] text-foreground placeholder:text-[#3c3c43]/40 focus:outline-none"
            />
          </div>

          <div className="p-4">
            <IosButton
              tone="primary"
              disabled={detail.trim().length < 3}
              onClick={() => {
                setSent(report(type.label, detail.trim(), type.to));
                setDetail("");
              }}
            >
              Send case
            </IosButton>
            {sent && (
              <p role="status" className="mt-2.5 text-center text-[13px] font-medium text-[#17682c]">
                Case {sent} sent.
              </p>
            )}
          </div>
        </IosSection>

        <section className="space-y-2">
          <h2 className="eyebrow px-4">My cases</h2>
          {model.issues.length === 0 ? (
            <IosEmpty icon={<MessageSquarePlus className="size-5" />} title="No open cases">
              Support questions and issue reports will appear here.
            </IosEmpty>
          ) : (
            <div className="space-y-3">
              {model.issues.map((i) => (
                <div key={i.id} className="ios-card p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[16px] font-semibold tracking-[-0.015em] text-foreground">{i.type}</p>
                      <p className="text-[12px] text-muted-foreground">
                        {i.id} · {i.time}
                      </p>
                    </div>
                    <IosBadge>{i.status}</IosBadge>
                  </div>
                  <p className="mt-2 text-[14px] leading-[20px] text-foreground/90">{i.detail}</p>
                  {i.reply && (
                    <div className="mt-3 rounded-[10px] bg-pale px-3.5 py-2.5 text-[14px] text-foreground">
                      <span className="font-semibold">{i.from === "lawma" ? "LAWMA" : "Partner"}: </span>
                      {i.reply}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        <IosSection header="Collection partner">
          <IosRow
            icon={<Building2 className="size-4" />}
            iconTone="blue"
            title={partner?.name ?? "None selected"}
            subtitle={pending ? `Change to ${pending.name} awaiting LAWMA approval` : partner?.area}
            trailing={pending ? <IosBadge>Pending</IosBadge> : undefined}
          />

          {!pending && (
            <div className="space-y-3 p-4">
              <div>
                <label htmlFor={selectId} className="block text-[13px] font-medium text-muted-foreground">
                  Request partner transfer
                </label>
                <select
                  id={selectId}
                  value={change}
                  onChange={(e) => {
                    setChange(e.target.value);
                    setChangeErr(null);
                  }}
                  className="mt-1.5 flex min-h-[44px] w-full rounded-[10px] bg-[#767680]/[0.1] px-3 text-[16px] text-foreground focus:outline-none"
                >
                  <option value="">Choose a new partner</option>
                  {partners
                    .filter((p) => p.id !== model.partnerId)
                    .map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                </select>
              </div>
              {changeErr && (
                <p role="alert" className="text-[13px] font-medium text-[#c92117]">
                  {changeErr}
                </p>
              )}
              <IosButton
                tone="tinted"
                className="min-h-[44px]"
                disabled={!change}
                onClick={() => setChangeErr(requestProviderChange(change))}
              >
                Ask LAWMA to change partner
              </IosButton>
            </div>
          )}
        </IosSection>

        <IosSection footer="Resets all local device data back to the start of onboarding.">
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 px-4 py-2.5 text-[16px] font-medium text-[#d92d20] transition-colors active:bg-black/[0.04]"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Start a fresh customer journey
          </button>
        </IosSection>
      </div>

      <IosActionSheet
        open={confirmReset}
        onClose={() => setConfirmReset(false)}
        title="Reset Resident Onboarding?"
        message="This clears your local demo profile, bins, wallet activity, and returns to the welcome intro."
        confirmLabel="Start Fresh Journey"
        onConfirm={reset}
        destructive
      />
    </Phone>
  );
}
