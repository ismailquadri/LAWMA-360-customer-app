# Project rules

- Preserve published Git history; never force push or rewrite published commits.


- This project is the LAWMA 360 customer app (web rebuild of the Expo app at github.com/ismailquadri/LAWMA-360-customer-app) and also hosts the cross-app message hub. Why: the Partner Hub and LAWMA workspace have no backend of their own.
- Apps talk only by messages in the `app_messages` table: the customer app uses server functions in `src/lib/hub.functions.ts`; Partner Hub and LAWMA call `/api/public/messages` with an `x-app-key` header matched against `PARTNER_APP_KEY` / `LAWMA_APP_KEY`. The contract lives in `src/lib/hub-contract.ts` and `docs/app-messages.md`; change both together. Why: each app keeps its own data and stays independently deployable.
- Residents sign in (email and standard Supabase OAuth); each resident's state is one JSON row in `customer_accounts` loaded/saved via `src/lib/account.functions.ts`, and the hub server functions take the customer ID from that row, never from the browser. Why: accounts work across devices and residents can only see their own messages. Inbound messages are applied by the pure `applyInbound` in `src/lib/customer-model.ts`, which owns the pickup hold/settle/return money rules and is covered by `src/test/hub-rules.test.tsx`.
- AI issue reports: `src/lib/report-ai.server.ts` calls the AI Gateway (Responses, structured output with the schema in `src/lib/report-ai.ts`) from the signed-in `draftReport` server function; the resident reviews/edits the draft before it is sent as `issue.reported`. Why: the resident stays in control of what is sent.

- Public presentation mode: the customer UI opens without authentication and persists sample data under lawma-customer-demo-v1. Keep demo actions local; server API authentication remains enforced. Do not expose service credentials to the browser.
