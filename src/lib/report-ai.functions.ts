import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { draftWithAI } from "./report-ai.server";

export const draftReport = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      description: z.string().trim().min(8).max(2000),
      address: z.string().max(200).optional(),
      partner: z.string().max(120).optional(),
    }).parse(d),
  )
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { error: "The report assistant isn't set up yet." as string, draft: null };
    try {
      const draft = await draftWithAI(key, data.description, { address: data.address, partner: data.partner });
      return { error: null, draft };
    } catch (e) {
      const status = (e as { statusCode?: number }).statusCode;
      console.error("draftReport failed", status, e);
      const msg = status === 429 ? "The assistant is busy. Please try again in a minute."
        : status === 402 ? "The assistant is paused because AI credits have run out."
        : e instanceof Error && e.message.startsWith("The assistant") ? e.message
        : "The assistant couldn't draft a report right now. You can still write one yourself.";
      return { error: msg, draft: null };
    }
  });
