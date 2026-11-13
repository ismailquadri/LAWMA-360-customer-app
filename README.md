# LAWMA 360 Customer App (`Resident`)

Sovereign resident waste-service application for Lagos Waste Management Authority (LAWMA 360). Built with React 19, TanStack Start, Vite, Tailwind CSS, and Supabase; deployed independently to Vercel using Nitro server functions.

Features an ultra-accessible interface for Lagos households: multi-tenant compound fractional room wallets (`WAL-COMP-*` & `VACC-*`), live compactor proximity alerts (`PROX-PING-*`), Dual-Key Citizen Remediation Closure (`CURE-CIT-*`), zero-fee kiosk agency cash deposits (`POS-VOUCH-*`), 5-dialect local voice guidance (`LocalVoiceAgent.tsx` - EN, PCM, YO, IG, HA), NiMet pre-storm surge alerts, anonymous whistleblower protection (`ANON-WHISTLE-*`), Digital Merchant Sanitation QR Decals (`DECAL-QR-*`), and "Sort & Earn" recyclable cashback.

## Development and Validation

```sh
bun install --frozen-lockfile
bun run dev
bun run build
bun run test
```

See [deployment configuration](docs/deployment.md) and [.env.example](.env.example).

---

## 🏛️ Comprehensive Engineering & Product Documentation (Version 4.0 Suite)

Complete technical specifications, empirical field research, street political economy, and courtroom-grade defense playbooks are available in [`docs/`](docs/):

- **[Product Requirements Document (PRD)](docs/PRD.md)**: Exhaustive 660-line specification covering compound virtual wallets, 15-minute live proximity alerts, dual-key citizen verification, kiosk agency banking, pre-storm surge skip maps, anonymous whistleblower bounties, merchant QR decals, and domestic clinical sharps safety.
- **[Standalone Modular PLD Specifications (docs/modules/)](docs/modules/)**: Complete suite of 9 courtroom-grade engineering modules (4,741 total lines, all >= 500 lines per module):
  - `01-RES-MOD-COMPOUND-CADASTRE.md` (556 lines): Compound Virtual Wallets, Room Child Accounts & Tenancy Law Immunity.
  - `02-RES-MOD-TRACKING.md` (508 lines): Live Corridor Geofencing, Proximity Alerts & Curb Dwell Reduction.
  - `03-RES-MOD-DUAL-KEY-ESCROW.md` (500 lines): Dual-Key Citizen Remediation Closure & Anti-Ghost Verification.
  - `04-RES-MOD-AGENCY-CASH-RAILS.md` (578 lines): Kiosk Cash Vouchers, Zero-Rated USSD & Offline IndexedDB.
  - `05-RES-MOD-VOICE-AGENT.md` (508 lines): 5-Dialect Natural Voice Agent & Low-Literacy Guidance.
  - `06-RES-MOD-STORM-FLOOD-DEFENSE.md` (515 lines): 48-hr Doppler Surge Alerts & 11m³ Municipal Skips.
  - `07-RES-MOD-ANON-WHISTLEBLOWER.md` (517 lines): Zero-Knowledge Whistleblower Vault & Blind MoMo Bounties.
  - `08-RES-MOD-MERCHANT-DECAL.md` (519 lines): Ground-Floor Merchant Decals & 5% Conference 57 LGA Split.
  - `09-RES-MOD-RECYCLING-CASHBACK.md` (540 lines): Sort & Earn Tariff Offsets & Domestic Medical Mini-Sharps.
- **[UX & Field Research](docs/research.md)**: Empirical baselines across 14 LGAs: Transsion hardware memory budgets, 2G/3G packet loss in zinc tenements, compound micro-tariff recovery curves (84.6% vs 28.4%), curb dwell times (84 hrs down to 18 mins), and ghost completion fraud rates (18.4% down to 0.6%).
- **[Stakeholder Critiques & Defense Playbook](docs/stakeholder-critiques-and-defense.md)**: Unified legal and technical defense briefs for Landlords' Associations, Tenants' Rights coalitions, AWAMN private operators, Conference 57 LGAs, and the NDPC.
- **[Political Economy of the Streets](docs/political-economy-of-the-streets.md)**: Tenement room politics, landlord sanitation markups, corner kiosk POS agent networks (Moniepoint, OPay, PalmPay), midnight rain dumping psychology, and rogue LGA taskforce shakedowns.
- **[API & Cross-App Message Contract](docs/api-contracts.md)**: OpenAPI 3.1 endpoints and Supabase `app_messages` event schemas synchronizing Resident, Operator, Partner, and Sovereign Command Room instances.
