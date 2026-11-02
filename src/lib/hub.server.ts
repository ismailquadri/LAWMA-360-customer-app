import { recipientsFor, type AppName, type HubMessage, type OutgoingMessage } from "./hub-contract";

export async function insertMessages(from: AppName, msg: OutgoingMessage) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const rows = recipientsFor(from, msg.to).map((to) => ({
    from_app: from,
    to_app: to,
    type: msg.type,
    customer_id: msg.customerId ?? null,
    ref: msg.ref ?? null,
    payload: msg.payload as never,
  }));
  if (!rows.length) return [] as HubMessage[];
  const { data, error } = await supabaseAdmin.from("app_messages").insert(rows).select();
  if (error) throw new Error(error.message);
  return data as unknown as HubMessage[];
}

export async function readInbox(app: AppName, opts: { since?: string | undefined; customerId?: string | undefined }) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  let q = supabaseAdmin
    .from("app_messages")
    .select("*")
    .eq("to_app", app)
    .order("created_at", { ascending: true })
    .limit(200);
  if (opts.since) q = q.gt("created_at", opts.since);
  if (opts.customerId) q = q.eq("customer_id", opts.customerId);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return data as unknown as HubMessage[];
}
