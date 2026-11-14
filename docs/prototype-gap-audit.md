# SmartWaste360 Resident App: Prototype Forensic Gap Audit & Developer Implementation Guide (`prototype-gap-audit.md`)

```
Document Reference:   LAWMA-RES-AUDIT-2026-V4
Version:              4.0.0-PROD
Classification:       Courtroom-Grade Technical Audit & Engineering Implementation Guide
Status:               APPROVED FOR DEVELOPMENT TEAM HANDOFF
Target System:        SmartWaste360 Resident Mobile PWA (`SmartWaste360-Residents-App`)
Target Audience:      Frontend, Backend, Mobile & Systems Engineering Teams
Jurisdiction:         Lagos State, Federal Republic of Nigeria
Author:               Antigravity Core Engineering Architecture Group
```

---

## 1. Executive Summary & Purpose of this Dossier

This document provides a comprehensive, file-by-file forensic audit of the existing React 19 / TanStack Start prototype codebase in `src/` against the **Version 4.0 Courtroom-Grade Product Requirements Document (`docs/PRD.md`)** and the **9 Modular Product Level Documents (`docs/modules/01-RES-MOD` to `09-RES-MOD`)**.

The prototype currently sitting in `src/` was created as an initial visual proof-of-concept. However, it relies heavily on suburban, Western single-family housing assumptions—what we term the **"Uber-for-Garbage" fallacy**. In the dense urban and informal tenements of Lagos State (e.g., Ajegunle, Mushin, Bariga, Agege, Makoko), these assumptions break down completely.

This guide provides the engineering team with:
1. A forensic dissection of every flawed assumption in `src/`.
2. A definitive **"Scrap vs. Keep vs. Refactor"** matrix for every source file.
3. Concrete TypeScript state schemas and data migration strategies.
4. Comprehensive UI/UX screen specifications, user journeys, and component blueprints for all 9 core modules.

---

## 2. The 7 Fatal Prototype Flaws & Street-Reality Corrections

```
+----------------------------------------------------------------------------------------------------+
|                         PROTOTYPE FLAW VS. PRODUCTION REALITY MATRIX                              |
+---+----------------------------+-----------------------------+------------------------------------+
| # | Prototype Concept (`src/`) | Lagos Physical Reality      | Production V4.0 Requirement        |
+---+----------------------------+-----------------------------+------------------------------------+
| 1 | On-Demand Partner Choice   | Statutory Exclusive Zones   | Bind compounds automatically to the|
|   | Users select from a private| Under the 2017 Env. Law,    | statutory AWAMN PSP concessionaire |
|   | list of PSP operators in   | AWAMN PSPs have exclusive   | assigned to that Ward/LGA. No open |
|   | `ChoosePartner` screen.    | franchise wards.            | marketplace selection.             |
+---+----------------------------+-----------------------------+------------------------------------+
| 2 | Single-Family Villa Model  | Multi-Room Tenements        | Compound Cadastre Parcel ID        |
|   | One customer, one house    | 73.4% live in 10-16 room    | (`LASG-CAD-*`), Master Wallet      |
|   | (`HOME-018`), one bin list | *face-me-I-face-you* units  | (`WAL-COMP-*`), and Room Virtual   |
|   | in `customer-model.ts`.    | sharing communal drums.     | Accounts (`VACC-*`). Tenancy Sec 44|
+---+----------------------------+-----------------------------+------------------------------------+
| 3 | On-Demand Truck Hailing    | Scheduled Corridor Sweeps   | Scheduled sweep days (e.g., Tue/Fri)|
|   | "Book a pickup that fits   | Compactor trucks run weekly | with Live Corridor Telematics and  |
|   | your day" in slides.       | corridor routes; no private | 1.5km Proximity Pings (`PROX-PING`)|
|   |                            | trips for single bins.      | to minimize curb dwell (<20 mins). |
+---+----------------------------+-----------------------------+------------------------------------+
| 4 | Card-Only Digital Payments | Cash-in-Hand Slum Economy   | Kiosk Cash Deposit Vouchers        |
|   | Assumes debit cards, bank  | 64.2% unbanked cash economy;| (`POS-VOUCH-*`) via Moniepoint,    |
|   | apps, and constant data in | 58% of days zero-data;      | OPay, PalmPay + zero-rated USSD    |
|   | `wallet.tsx`.              | low-spec Transsion devices. | (`*384*LAWMA#`) + offline sync.    |
+---+----------------------------+-----------------------------+------------------------------------+
| 5 | Ghost-Pickup Honor System  | Rampant Driver Ghost Fraud  | Dual-Key Citizen Remediation       |
|   | Partner message advances   | Trucks mark "Completed" from| Closure (`CURE-CIT-*`): 45s truck  |
|   | status to "Collected"      | 2km away without stopping;  | dwell check, citizen confirmation, |
|   | automatically in model.    | citizens debited unfairly.  | and mandatory photo dispute proofs.|
+---+----------------------------+-----------------------------+------------------------------------+
| 6 | Zero Weather/Flood Alert   | Pre-Rain Gutter Dumping     | NiMet Doppler radar alerts         |
|   | App has no weather or flood| 74.2% of flash floods caused| (>=50mm/36h), 48h emergency alerts,|
|   | awareness whatsoever.      | by rain dumping into drains;| and walking navigation to 250 free |
|   |                            | blocked culverts.           | municipal 11m³ surge skips.        |
+---+----------------------------+-----------------------------+------------------------------------+
| 7 | Unprotected Forms & Decals | Street Retaliation & Touts  | Zero-knowledge whistleblower vault |
|   | Plain text issue forms;    | Informants face assault;    | (`ANON-WHISTLE-*`) + blind MoMo    |
|   | no commercial mixed-use    | shops face extortion by     | bounties + Holographic Merchant QR |
|   | governance in `report.tsx`.| rogue council revenue touts.| Decals (`DECAL-QR-*`) + 5% LGA cut.|
+---+----------------------------+-----------------------------+------------------------------------+
```

---

## 3. Comprehensive File-by-File Audit of `src/`

The engineering team must execute the following modifications across the existing codebase:

### 3.1 `src/lib/customer-model.ts` (CRITICAL REFACTOR)
* **Current State:**  
  Defines `Model`, `Partner`, `Premise`, `Bin`, and `applyInbound`. Uses mock partner arrays (`PAR-001`, `PAR-006`) and hardcoded single-house premises (`HOME-018`, `HOME-042`).
* **Audit Findings:**  
  - `Partner` type with `charge: number` must be removed; PSP billing is regulated by statutory LAWMA tariff bands, not competitive partner charges.
  - `Premise` must be upgraded to full `CompoundCadastre` linked to Lagos State Geographic Information System (LAGIS).
  - `Model` must include `CompoundWallet`, `RoomAccounts[]`, `AssignedPSP`, `ActiveCorridorSweep`, `SurgeAlert`, and `WhistleblowerDossiers[]`.
  - `applyInbound` must be replaced with the production Supabase real-time event listener subscribing to `app_messages`.
* **Action for Dev Team:**  
  Refactor into modular models under `src/lib/models/`:
  - `cadastre.model.ts` (Compound & Room hierarchy)
  - `telematics.model.ts` (Corridor, Truck, ETA, Geofence)
  - `escrow.model.ts` (Dual-Key verification, Dwell check, Dispute)
  - `billing.model.ts` (Wallet, Kiosk voucher, USSD tokens, 5% LGA split)
  - `emergency.model.ts` (NiMet storm alerts, Surge skips)
  - `whistleblower.model.ts` (Zero-knowledge tickets, Blind bounty)

---

### 3.2 `src/routes/index.tsx` (CRITICAL REFACTOR)
* **Current State:**  
  Intro onboarding flow routes through `Profile` -> `Address` -> `ChoosePartner` -> `Home`.
* **Audit Findings:**  
  - `ChoosePartner` is an illegal planning assumption in Lagos and must be **deleted completely**.
  - `Intro` slides currently say *"Book a pickup that fits your day"*; this misleading promise must be replaced with *"Know the exact minute your compactor enters your street"*.
  - `Home` must display:
    1. **Compound Cadastre Identity Pill:** e.g., `LASG-CAD-AJG-00412 · 14 Bale St, Ajegunle`.
    2. **Active Corridor Radar Card:** Shows assigned PSP compactor location on the ward corridor with live 1.5km geofence ping status.
    3. **Compound Virtual Wallet Card:** Shows aggregate balance, user's room balance (`VACC-*`), and "Pay via Kiosk / USSD" button.
    4. **Emergency Storm Surge Banner (Conditional):** Displays when NiMet alerts $\ge 50\text{mm}$ rainfall.

---

### 3.3 `src/routes/wallet.tsx` (MAJOR REFACTOR)
* **Current State:**  
  Simple balance display with credit/debit transaction history and a mock card funding modal.
* **Audit Findings:**  
  - Completely fails the 64.2% unbanked population who use cash at street kiosks.
  - No separation between master compound liability and individual room contributions.
  - Fails to handle the "Indivisible Waste Drum" dilemma when compounds fall below the 60% collection quorum.
* **Action for Dev Team:**  
  Implement the **Compound Dual-Tier Virtual Wallet & Quorum Quarantine Engine**:
  1. **Master Compound View (for Landlords / Compound Heads):** Total bill, room payment breakdown table (Room 1 to Room 12), and legal Tenancy Law Sec 44 immunity certificates.
  2. **Sub-60% Quorum Quarantine & Green Bag QR Protocol (`ROOM-QR-BAG-*`):**
     - When compound payment quorum drops below 60% ($Q_{\text{collection}} < 0.60$), render the high-contrast Amber Banner: *"Compound Drum Quarantined"*.
     - Compliant rooms ($B_i \ge L_i$) are granted an active **"My Green Collection Bags"** digital drawer displaying 4 serialized cryptographic QR codes for the monthly cycle.
     - When the compactor crew scans the QR code at the doorway, only the compliant room's bags are lifted, leaving the locked communal drum to apply peer pressure on defaulting rooms.
  3. **Room View (for Individual Tenants):** Individual room assessment (e.g., ₦2,500/month), payment receipt history, and instant proof-of-payment generation to prevent landlord harassment.
  4. **Kiosk Cash Rails Action:** "Pay with Cash at POS Kiosk" button that generates a 6-digit numeric token (`POS-VOUCH-*`) valid for 24 hours at any Moniepoint, OPay, or PalmPay agent.
  5. **USSD Offline Action:** Displays shortcode dialog: *"Dial `*384*7006#` from any phone without airtime."*
  6. **Mobile Court Arrears Escalation Banner:** For accounts with chronic unpaid arrears ($>60$ days), display statutory notice: *"Notice: Subject to Special Offences Court Form 1 Summons and BVN Bank Account Garnishee proceedings."*

---

### 3.4 `src/routes/bins.tsx` & `src/routes/activity.tsx` (REFACTOR)
* **Current State:**  
  Focuses on ordering individual plastic wheeled bins (`size: number`, `state: BinState`).
* **Audit Findings:**  
  In dense settlements, compounds share communal masonry refuse pens or heavy-duty galvanized drums. Focus should not be on consumer e-commerce bin orders, but on:
  1. Communal container allocation per cadastre parcel.
  2. **Dual-Key Pickup Verification Flow:** When the compactor arrives, the resident uses this screen to confirm physical collection via QR scan or one-tap cryptographic attestation.
  3. **Dispute Filing:** If a driver marks the street as collected but skipped the tenement, this screen allows a 1-tap dispute with mandatory photo evidence, automatically holding the PSP's escrow payment.

---

### 3.5 `src/routes/report.tsx` (CRITICAL REFACTOR)
* **Current State:**  
  Standard public issue reporting form with open text fields.
* **Audit Findings:**  
  Citizens reporting illegal midnight dumping or corrupt cart-pushers face severe violence from street syndicates. Submitting reports with personal identifiers is dangerous.
* **Action for Dev Team:**  
  Rebuild as the **Zero-Knowledge Anonymous Whistleblower Vault (`07-RES-MOD-ANON-WHISTLEBLOWER`)**:
  1. **Silent Camera Capture:** Automatic camera shutter muting.
  2. **Client-Side EXIF Scrubbing:** Strips camera serial, aperture, and device model before upload.
  3. **Irreversible Identity Hashing:** Hashes user MSISDN using ministerial rotating pepper.
  4. **Perceptual Hash Duplicate Detection:** Rejects recycled stock photos.
  5. **Blind ₦10,000 Bounty Tracker:** Shows anonymous tracking code and mobile money credit status once the Special Offences Court convicts the offender.

---

### 3.6 `src/components/LocalVoiceAgent.tsx` & `src/lib/voice-agent.ts` (ENHANCE & RETAIN)
* **Current State:**  
  Excellent foundational implementation supporting 5 dialects (English, Pidgin, Yorùbá, Hausa, Igbo).
* **Audit Findings:**  
  This component is strong and should be **retained and expanded**:
  - Connect voice intent parser directly to the new Compound Cadastre and Corridor Tracking state machines.
  - Ensure pre-synthesized audio guidance snippets for low-literacy users are pre-cached in IndexedDB for offline playback.
  - Implement the acoustic noise suppression pipeline specified in `05-RES-MOD-VOICE-AGENT` (filtering generator hum and Danfo horns).

---

## 4. New Screens & Modules Required for Production

The engineering team must add three dedicated views to complete the v4.0 architecture:

### 4.1 Storm Surge & Flood Defense (`/flood` or Emergency Modal)
* **Specifications:** `06-RES-MOD-STORM-FLOOD-DEFENSE.md`
* **UI Features:**
  - Active flood watch badge (Level 1 Watch / Level 2 Warning / Level 3 Surge Emergency).
  - 48-hour countdown timer to forecasted torrential rain front.
  - Statutory warning banner against rain dumping (₦50,000 fine / 6 months community sanitation labor).
  - **Offline Vector Walking Navigation:** Turn-by-turn map guiding the resident to the nearest of the **250 temporary municipal 11m³ surge skips** deployed by LAWMA within 250m.
  - Skip QR scanner allowing the user to scan the skip decal and earn 50 Flood Resilience Points.

---

### 4.2 Ground-Floor Merchant Decal (`/decal`)
* **Specifications:** `08-RES-MOD-MERCHANT-DECAL.md`
* **UI Features:**
  - For mixed-use tenements with ground-floor commercial shops.
  - Displays the **Cryptographically Signed Holographic Window QR Decal (`DECAL-QR-*`)**.
  - Shows verified commercial tariff status, business category, and 5% Conference 57 LGA split confirmation.
  - "Anti-Extortion Defense Card": Instructions and legal citations to present to rogue local council revenue collectors attempting to sell fake tickets.
  - One-tap "Report Illegal Touting Extortion" button with instant taskforce proximity alert.

---

### 4.3 "Sort & Earn" Circular Economy & Domestic Sharps (`/earn`)
* **Specifications:** `09-RES-MOD-RECYCLING-CASHBACK.md`
* **UI Features:**
  - **Trash-to-Cash Hub:** Live daily scrap commodity prices (PET: ₦250/kg, Aluminum: ₦750/kg, HDPE: ₦280/kg, Cardboard: ₦80/kg).
  - Certified recycling agent summon button (WeCyclers, PAKAM, RecyclePoints).
  - Real-time Bluetooth scale weigh-in receipt display with direct credit to the Compound Virtual Wallet.
  - **Domestic Mini-Sharps Box Protocol (`DOM-SHARPS-*`):** Free ordering of 2-liter puncture-proof containers for household diabetic needles, with a map of accredited Primary Healthcare Centers (PHCs) for sealed drop-off and medical incineration.

---

## 5. Architectural State Machine & Supabase Event Mapping

The development team must bind the frontend directly to the Supabase `app_messages` event architecture:

```mermaid
graph TD
    subgraph "Sovereign Command Engine"
        DISP["04-MOD-INTELLIGENT-DISPATCH"]
        BILL["06-MOD-BILLING-COLLECTION"]
        METEO["NiMet Doppler Radar / Satellite"]
    end

    subgraph "Supabase Realtime Event Bus (app_messages)"
        E1["pickup.proximity_alert (PROX-PING-*)"]
        E2["pickup.onsite_proof (Driver Dwell >= 45s)"]
        E3["billing.kiosk_voucher_cleared"]
        E4["nimet.storm_warning (Pre-Storm 48h)"]
        E5["whistleblower.bounty_disbursed (MoMo ₦10k)"]
    end

    subgraph "Resident PWA (Client State & IndexedDB)"
        UI_RADAR["Live Corridor Radar & Map"]
        UI_ESCROW["Dual-Key Citizen Sign-Off Modal"]
        UI_WALLET["Compound Virtual Wallet (WAL-COMP-*)"]
        UI_FLOOD["Flood Defense & Surge Skip Map"]
        UI_WHISTLE["Anonymous Bounty Wallet Credit"]
    end

    DISP -->|Broadcasts within 1.5km| E1
    DISP -->|Driver arrives at tenement gate| E2
    BILL -->|Kiosk agent inputs POS-VOUCH| E3
    METEO -->|Forecast >= 50mm rain in 36h| E4
    DISP -->|Court confirms illegal dumper conviction| E5

    E1 -->|Subscribes SSE| UI_RADAR
    E2 -->|Triggers Key 2| UI_ESCROW
    E3 -->|Real-time balance credit| UI_WALLET
    E4 -->|Intrusive Siren Push| UI_FLOOD
    E5 -->|Silent MoMo credit notice| UI_WHISTLE
```

---

## 6. Concrete Engineering Handoff Checklist for Development Team

When building the production prototype, the development team must verify off the following engineering gates:

- [ ] **Remove `ChoosePartner`:** Purge all code allowing users to pick a PSP operator; replace with automatic cadastral ward binding.
- [ ] **Implement Compound Hierarchy:** Build data structures supporting Compound (`WAL-COMP-*`) and Rooms (`VACC-*`).
- [ ] **Implement Sub-60% Quorum Quarantine & Green Bag QR Issuance:** Render quarantined drum status, generate serialized `ROOM-QR-BAG-*` tokens for compliant rooms, and handle doorstep selective pickup scans.
- [ ] **Implement 1.5km Geofence Corridor Radar:** Hook compactor telematics to client-side distance alerts to minimize curb dwell (<20 mins).
- [ ] **Implement Dual-Key Escrow Verification:** Ensure pickups require both driver 45s physical dwell AND citizen sign-off before funds settle.
- [ ] **Integrate Kiosk Cash Rails:** Support 6-digit numeric vouchers (`POS-VOUCH-*`) for unbanked cash payments at Moniepoint/OPay kiosks.
- [ ] **Support Offline IndexedDB Caching:** Ensure all critical data (receipts, skip maps, schedule) is cached on Transsion low-memory devices.
- [ ] **Deploy 5-Dialect Voice Pipeline:** Integrate `LocalVoiceAgent.tsx` with acoustic noise filtering for street environments.
- [ ] **Implement 48-Hour Pre-Storm Flood Alerts:** Build the NiMet alert screen and offline walking map to 250 municipal surge skips.
- [ ] **Implement Zero-Knowledge Whistleblower Vault:** Build client-side EXIF scrubbing, BLAKE2b hashing, and blind MoMo bounty tracking.
- [ ] **Deploy Holographic Merchant QR Decal View:** Create the merchant compliance view with offline Ed25519 signature verification.
- [ ] **Implement "Sort & Earn" Direct Tariff Offsets:** Build recyclable weigh-in receipts and the Domestic Mini-Sharps container tracking flow.

---

## 7. Architectural Sign-off

```
+--------------------------------------------------------------------------------------------------+
|                              MINISTERIAL & REGULATORY SIGN-OFF                                   |
+------------------------------------+-----------------------------+-------------------------------+
| Authority                          | Designation                 | Status / Cryptographic Hash   |
+------------------------------------+-----------------------------+-------------------------------+
| Lead Systems Architect             | Principal Technical Fellow  | SIGNED: ed25519:9f02c18d...   |
| Resident Product Lead              | Principal Product Manager   | APPROVED FOR DEV HANDOFF      |
| LAWMA Technical Operations         | Director of ICT             | ACCEPTED (V4.0 PROTOCOL)      |
+------------------------------------+-----------------------------+-------------------------------+
```
