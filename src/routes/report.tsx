import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Check, Landmark, Sparkles } from "lucide-react";
import { useId, useState } from "react";
import { PageTitle, Phone } from "@/components/app";
import {
  IosBadge,
  IosButton,
  IosRow,
  IosSection,
} from "@/components/ios";
import { meta } from "@/lib/meta";
import { REPORT_CATEGORIES, type ReportDraft } from "@/lib/report-ai";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/report")({
  head: () => meta("Report an issue", "Describe a waste problem and get a clear report drafted for your partner or LAWMA."),
  component: ReportPage,
});

function ReportPage() {
  const { partner, report } = useStore();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [draft, setDraft] = useState<ReportDraft | null>(null);
  const [sent, setSent] = useState("");

  const descId = useId();
  const catId = useId();
  const titleId = useId();
  const bodyId = useId();

  const run = async () => {
    setBusy(true);
    setErr(null);
    try {
      setDraft({
        category: "Other",
        urgency: "medium",
        sendTo: ["partner"],
        title: "Resident service report",
        report: text.trim(),
      });
    } catch {
      setErr("Couldn't reach the assistant. Check your connection.");
    }
    setBusy(false);
  };

  const toggle = (who: "partner" | "lawma") =>
    draft &&
    setDraft({
      ...draft,
      sendTo: draft.sendTo.includes(who) ? draft.sendTo.filter((x) => x !== who) : [...draft.sendTo, who],
    });

  if (sent) {
    return (
      <Phone>
        <div className="flex flex-col items-center py-10 text-center">
          <div className="grid size-16 place-items-center rounded-full bg-[#248a3d]/15 text-[#17682c] animate-in zoom-in duration-300">
            <Check className="size-8" strokeWidth={2.5} />
          </div>
          <h1 className="mt-5 text-[28px] font-bold tracking-[-0.025em] text-foreground">Report saved</h1>
          <p className="mt-2 max-w-[280px] text-[15px] text-muted-foreground">
            Case <span className="font-semibold text-foreground">{sent}</span> has been recorded on this device.
          </p>
          <Link to="/you" className="mt-8 block w-full">
            <IosButton tone="primary">View my cases</IosButton>
          </Link>
        </div>
      </Phone>
    );
  }

  return (
    <Phone>
      <PageTitle
        title="Report an issue"
        sub="Describe the problem in your own words to draft a report."
      />

      <div className="space-y-6">
        <IosSection header="What happened?">
          <div className="px-4 py-3">
            <label htmlFor={descId} className="sr-only">
              Describe the waste issue
            </label>
            <textarea
              id={descId}
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="e.g. Someone has been dumping refuse beside the canal at the end of our street for 3 days…"
              className="w-full resize-none bg-transparent text-[16px] leading-[22px] text-foreground placeholder:text-[#3c3c43]/40 focus:outline-none"
            />
          </div>
          {err && (
            <p role="alert" className="px-4 py-2 text-[14px] font-medium text-[#c92117]">
              {err}
            </p>
          )}
          <div className="p-4">
            <IosButton
              tone="primary"
              disabled={busy || text.trim().length < 8}
              onClick={run}
            >
              <Sparkles className="size-4" aria-hidden="true" />
              {busy ? "Drafting report…" : draft ? "Draft again" : "Draft my report"}
            </IosButton>
          </div>
        </IosSection>

        {draft && (
          <>
            <IosSection header="Review report details">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <label htmlFor={catId} className="block text-[13px] font-medium text-muted-foreground">
                    Category
                  </label>
                  <select
                    id={catId}
                    value={draft.category}
                    onChange={(e) => setDraft({ ...draft, category: e.target.value as ReportDraft["category"] })}
                    className="mt-1 w-full bg-transparent text-[16px] font-semibold text-foreground focus:outline-none"
                  >
                    {REPORT_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <IosBadge>{draft.urgency === "high" ? "Urgent" : draft.urgency === "medium" ? "Medium" : "Low"}</IosBadge>
              </div>

              <div className="px-4 py-3">
                <label htmlFor={titleId} className="block text-[13px] font-medium text-muted-foreground">
                  Subject
                </label>
                <input
                  id={titleId}
                  value={draft.title}
                  onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                  className="mt-1 w-full bg-transparent text-[16px] font-semibold text-foreground focus:outline-none"
                />
              </div>

              <div className="px-4 py-3">
                <label htmlFor={bodyId} className="block text-[13px] font-medium text-muted-foreground">
                  Report statement
                </label>
                <textarea
                  id={bodyId}
                  value={draft.report}
                  onChange={(e) => setDraft({ ...draft, report: e.target.value })}
                  rows={5}
                  className="mt-1 w-full resize-none bg-transparent text-[15px] leading-[21px] text-foreground focus:outline-none"
                />
              </div>
            </IosSection>

            <IosSection header="Send to">
              <IosRow
                onClick={() => toggle("partner")}
                icon={<Building2 className="size-4" />}
                iconTone="forest"
                title={partner?.name ?? "My collection partner"}
                subtitle="Handles missed pickups and bin issues"
                selected={draft.sendTo.includes("partner")}
              />
              <IosRow
                onClick={() => toggle("lawma")}
                icon={<Landmark className="size-4" />}
                iconTone="blue"
                title="LAWMA Compliance"
                subtitle="Handles illegal dumping and oversight"
                selected={draft.sendTo.includes("lawma")}
              />
            </IosSection>

            <IosButton
              tone="ember"
              disabled={!draft.sendTo.length || draft.report.trim().length < 5}
              onClick={() =>
                setSent(
                  report(draft.category, draft.report.trim(), draft.sendTo, {
                    title: draft.title,
                    urgency: draft.urgency,
                    original: text.trim(),
                  }),
                )
              }
            >
              Send report
            </IosButton>
          </>
        )}
      </div>
    </Phone>
  );
}
