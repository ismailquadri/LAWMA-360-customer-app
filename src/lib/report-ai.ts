import { z } from "zod";

export const REPORT_CATEGORIES = [
  "Missed pickup",
  "Overflowing bin",
  "Damaged or missing bin",
  "Illegal dumping",
  "Blocked drain",
  "Burning waste",
  "Billing question",
  "Complaint about my partner",
  "Other",
] as const;

export const reportDraft = z.object({
  category: z.enum(REPORT_CATEGORIES),
  urgency: z.enum(["low", "medium", "high"]),
  sendTo: z.array(z.enum(["partner", "lawma"])).min(1).max(2),
  title: z.string(),
  report: z.string(),
});
export type ReportDraft = z.infer<typeof reportDraft>;
