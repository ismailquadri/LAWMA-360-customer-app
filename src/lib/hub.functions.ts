import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { outgoingMessage } from "./hub-contract";
import { insertMessages, readInbox } from "./hub.server";

// The customer ID always comes from the signed-in resident's account row,
// never from the browser, so residents can only send and read their own messages.
async function myCustomerId(supabase: { from: (t: "customer_accounts") => any }, userId: string) {
  const { data, error } = await supabase.from("customer_accounts").select("customer_id").eq("user_id", userId).single();
  if (error || !data) throw new Error("Account not found");
  return data.customer_id as string;
}

export const sendCustomerMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => outgoingMessage.omit({ customerId: true }).parse(d))
  .handler(async ({ data, context }) => {
    const customerId = await myCustomerId(context.supabase, context.userId);
    const rows = await insertMessages("customer", { ...data, customerId });
    return { sent: rows.length };
  });

export const customerInbox = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ since: z.string().max(40).optional() }).parse(d))
  .handler(async ({ data, context }) => {
    const customerId = await myCustomerId(context.supabase, context.userId);
    const messages = await readInbox("customer", { customerId, since: data.since });
    return { messages };
  });
