import { createOpenAI } from "@ai-sdk/openai";
import { NoObjectGeneratedError, Output, streamText } from "ai";
import { REPORT_CATEGORIES, reportDraft, type ReportDraft } from "./report-ai";


const instructions = `You help Lagos residents report waste problems to LAWMA (the Lagos State Waste Management Authority) or to their licensed private collection partner.
Read the resident's description and:
- pick exactly one category from: ${REPORT_CATEGORIES.join(", ")}.
- choose urgency: "low", "medium" or "high" (high = health/safety risk, blocked drains, fire, large illegal dump).
- decide who should receive it: "partner" for service issues at the resident's own home (missed pickup, bin damage, billing), "lawma" for public-space problems, illegal dumping, or complaints about the partner; both when it fits both.
- write a short title (max 10 words) and a clear, polite report of 2-5 sentences in plain English, written in the first person as the resident, including location and any details given. Never invent facts that were not provided.`;

export async function draftWithAI(apiKey: string, description: string, context: { address?: string | undefined; partner?: string | undefined }): Promise<ReportDraft> {
  const provider = createOpenAI({
    baseURL: process.env["OPENAI_BASE_URL"] || "https://api.openai.com/v1",
    apiKey,
  });
  const result = streamText({
    model: provider.responses(process.env["OPENAI_MODEL"]!),
    instructions,
    messages: [{
      role: "user",
      content: `Resident address: ${context.address ?? "unknown"}\nCurrent collection partner: ${context.partner ?? "none"}\n\nDescription:\n${description}`,
    }],
    output: Output.object({ schema: reportDraft }),
    providerOptions: {
      openai: { store: false, forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", include: ["reasoning.encrypted_content"] },
    },
  });
  try {
    return await result.output;
  } catch (e) {
    if (NoObjectGeneratedError.isInstance(e)) throw new Error("The assistant couldn't draft a report. Please add a bit more detail.");
    throw e;
  }
}
