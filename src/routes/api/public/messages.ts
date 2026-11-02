import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { appForKey, outgoingMessage } from "@/lib/hub-contract";
import { insertMessages, readInbox } from "@/lib/hub.server";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, x-app-key",
  "Cache-Control": "no-store",
};

function caller(request: Request) {
  return appForKey(request.headers.get("x-app-key"), {
    partner: process.env["PARTNER_APP_KEY"],
    lawma: process.env["LAWMA_APP_KEY"],
  });
}

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: cors });

export const Route = createFileRoute("/api/public/messages")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: cors }),
      GET: async ({ request }) => {
        const app = caller(request);
        if (!app) return json({ error: "Unknown app key" }, 401);
        const url = new URL(request.url);
        const q = z
          .object({ since: z.string().max(40).optional(), customerId: z.string().max(80).optional() })
          .safeParse(Object.fromEntries(url.searchParams));
        if (!q.success) return json({ error: "Invalid query" }, 400);
        try {
          return json({ app, messages: await readInbox(app, q.data) });
        } catch (e) {
          console.error(e);
          return json({ error: "Could not read messages" }, 500);
        }
      },
      POST: async ({ request }) => {
        const app = caller(request);
        if (!app) return json({ error: "Unknown app key" }, 401);
        const body = outgoingMessage.safeParse(await request.json().catch(() => null));
        if (!body.success) return json({ error: "Invalid message", issues: body.error.issues }, 400);
        try {
          const rows = await insertMessages(app, body.data);
          return json({ sent: rows.length, messages: rows });
        } catch (e) {
          console.error(e);
          return json({ error: "Could not send message" }, 500);
        }
      },
    },
  },
});
