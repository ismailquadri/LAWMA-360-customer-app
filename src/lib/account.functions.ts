import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Json } from "@/integrations/supabase/types";

/** Load (or create on first sign-in) the resident's account record. */
export const getMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const found = await supabase.from("customer_accounts").select("customer_id, state").eq("user_id", userId).maybeSingle();
    if (found.error) throw new Error("Could not load your account");
    if (found.data) return { customerId: found.data.customer_id, state: found.data.state as Json };
    const made = await supabase.from("customer_accounts").insert({ user_id: userId }).select("customer_id, state").single();
    if (made.error) throw new Error("Could not create your account");
    return { customerId: made.data.customer_id, state: made.data.state as Json };
  });

export const saveMyAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ state: z.record(z.unknown()) }).parse(d))
  .handler(async ({ data, context }) => {
    const size = JSON.stringify(data.state).length;
    if (size > 200_000) throw new Error("Account data too large");
    const { error } = await context.supabase
      .from("customer_accounts")
      .update({ state: data.state as Json, updated_at: new Date().toISOString() })
      .eq("user_id", context.userId);
    if (error) throw new Error("Could not save your account");
    return { ok: true };
  });
