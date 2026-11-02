# Customer deployment

Repository: https://github.com/ismailquadri/LAWMA-360-customer-app
Production: https://smartwaste360-mobile.vercel.app
Vercel project: smartwaste360-mobile (prj_QMVbEsPcTsIkIADH4MmiPogw1Qf4).

This export replaces the previous Expo implementation with TanStack Start.
Nitro uses its Vercel preset to deploy SSR and server functions, including
`/api/public/messages`. Install with `bun install --frozen-lockfile`, then
`bun run build`. Do not deploy this as a static SPA.

## Backend status at release

The existing export points to Supabase project `ovqndxookwyxkafdkkoq`.
Its public URL and publishable key were configured as the four production
variables listed first in `.env.example`. Read-only auth settings and zero-row
queries for `customer_accounts` and `app_messages` returned HTTP 200.
This confirms endpoint reachability, not successful sign-in or account persistence.
No user was created and no real customer data was read or changed.

The following credentials were absent from both the export and the original
Vercel production environment:

- `SUPABASE_SERVICE_ROLE_KEY`: needed by message-hub database operations.
- `PARTNER_APP_KEY`, `LAWMA_APP_KEY`: needed for incoming cross-app messages.
- `LOVABLE_API_KEY`: needed for AI report drafts.

Until those existing backend credentials are supplied, the hub and AI features
are not operational. Email confirmation/reset redirect allowlists and Lovable
OAuth support for the production domain require verification in the backend
owner's console. Signed-in account persistence has not been verified.
Do not substitute fabricated credentials or demo authentication.

Database schema/migrations are included under `drizzle/`; no migrations were
applied during this release. `.env*`, dependencies and Vercel local state are
excluded from Git. Only `.env.example` is committed.

## Checks

Production build, TypeScript check and seven existing tests pass.
Export lint has 540 errors (539 formatting errors) and eight warnings;
these are outside the deployment-only change scope.
