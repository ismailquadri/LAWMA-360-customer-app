import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Btn, Card, PageTitle, Phone, Pill } from "@/components/app";
import { meta } from "@/lib/meta";
import { REPORT_CATEGORIES, type ReportDraft } from "@/lib/report-ai";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/report")({
  head: () => meta("Report an issue", "Describe a waste problem and get a clear report drafted for your partner or LAWMA."),
  component: ReportPage,
});

function ReportPage() {
  const { premise, partner, report } = useStore();
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [draft, setDraft] = useState<ReportDraft | null>(null);
  const [sent, setSent] = useState("");

  const run = async () => {
    setBusy(true); setErr(null);
    try {
      setDraft({ category: "Other", urgency: "medium", sendTo: ["partner"], title: "Resident service report", report: text.trim() });
    } catch { setErr("Couldn't reach the assistant. Check your connection."); }
    setBusy(false);
  };

  const toggle = (who: "partner" | "lawma") => draft && setDraft({ ...draft, sendTo: draft.sendTo.includes(who) ? draft.sendTo.filter((x) => x !== who) : [...draft.sendTo, who] });

  if (sent) return (
    <Phone>
      <PageTitle title="Demo report saved" sub={`Case ${sent} has been saved in this demo.`} />
      <Link to="/you"><Btn>View my cases</Btn></Link>
    </Phone>
  );

  return (
    <Phone>
      <PageTitle title="Report an issue" sub="Tell us in your own words. Review a draft and save a sample report on this device." />
      <Card>
        <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} maxLength={2000}
          placeholder="e.g. Someone has been dumping refuse beside the canal at the end of our street for 3 days and it now blocks the drain."
          className="w-full resize-none bg-transparent text-[15px] outline-none" />
        {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
        <Btn className="mt-3 gap-2" disabled={busy || text.trim().length < 8} onClick={run}>
          <Sparkles className="size-4" />{busy ? "Drafting your report…" : draft ? "Draft again" : "Draft my report"}
        </Btn>
      </Card>

      {draft && (
        <Card className="mt-4 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <select value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value as ReportDraft["category"] })} className="h-10 rounded-xl border bg-card px-2 text-sm font-semibold">
              {REPORT_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </select>
            <Pill>{draft.urgency === "high" ? "Urgent" : draft.urgency === "medium" ? "Medium" : "Low"}</Pill>
          </div>
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} className="w-full rounded-xl border bg-card px-3 py-2 font-semibold" />
          <textarea value={draft.report} onChange={(e) => setDraft({ ...draft, report: e.target.value })} rows={6} className="w-full rounded-xl border bg-card p-3 text-sm" />
          <div>
            <p className="eyebrow">Send to</p>
            <div className="mt-2 flex gap-2">
              {(["partner", "lawma"] as const).map((w) => (
                <button key={w} onClick={() => toggle(w)} className={cn("rounded-full border px-4 py-1.5 text-sm font-semibold", draft.sendTo.includes(w) && "border-primary bg-pale text-primary")}>
                  {w === "lawma" ? "LAWMA" : partner?.name ?? "My partner"}
                </button>
              ))}
            </div>
          </div>
          <Btn tone="ember" disabled={!draft.sendTo.length || draft.report.trim().length < 5}
            onClick={() => setSent(report(draft.category, draft.report.trim(), draft.sendTo, { title: draft.title, urgency: draft.urgency, original: text.trim() }))}>
            Send report
          </Btn>
        </Card>
      )}
    </Phone>
  );
}
