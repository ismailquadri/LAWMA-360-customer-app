# PRD: LAWMA 360 Customer App (`Resident`)

**Document Version:** 2.0 (System-Specific Specification)  
**System Role:** Citizen, Tenement Compound & Commercial Customer Interface  
**Target Codebase:** `LAWMA-360-customer-app` (`src/routes/`, `src/components/`, `src/lib/`)  
**Deployment Target:** Progressive Web App (PWA), USSD (`*384*LAWMA#`), WhatsApp Cloud API  

---

## 1. System Vision & Purpose

`Resident` provides a transparent, fair, and accessible waste management interface for every Lagosian. It eliminates the historical friction of arbitrary bulk-billing by introducing:
1. **Multi-Tenant Compound Split-Billing:** Enables individual rooms and flats in *face-me-I-face-you* compounds to pay their exact fractional share without being held hostage by defaulting neighbors or absentee landlords.
2. **Multilingual Local Voice Guidance:** Complete voice assistance in Nigerian Pidgin, Yoruba, Igbo, Hausa, and English for low-literacy residents.
3. **Verified Licensed PSP Badge:** Instant lookup of accredited PSP name, official tariff band, and scheduled pickup days, eliminating ghost billing by fake collectors.
4. **Saturday 12:00 WAT SLA Auto-Protection:** If a scheduled Friday pickup is missed by Saturday noon, escrow is frozen and the resident receives automated billing credit for their next cycle.
5. **Community Triage & Cleanliness Reporting:** 5-way jurisdiction routing for blocked drains and illegal dumps (FHA vs. LGA vs. LASG vs. LAWMA Direct).

---

## 2. Core Functional Modules

### Module 1: Tenement Compound Split-Billing Engine
- **Compound Registration:** Landlord, estate chair, or principal tenant enters building details (e.g. "Block 41, 10 rooms").
- **Fractional Allocation:** System splits the approved monthly tariff (e.g. ₦6,000) evenly or by room count (e.g. ₦600/room/month).
- **Individual Tenancy Ledgers:** Each tenant receives a unique digital sub-account linked to their phone number. Tenants can pay via bank transfer, USSD, debit card, or local POS agent.
- **Selective Enforcement:** Paying tenants receive verified collection status; non-paying units are flagged for digital reminders without withholding service from compliant neighbors.

### Module 2: Multilingual Voice Agent (`LocalVoiceAgent.tsx`)
- **Supported Languages:** English, Nigerian Pidgin (`pcm`), Yoruba (`yo`), Igbo (`ig`), Hausa (`ha`).
- **Trigger:** Accessible via persistent floating microphone button (`StickyVoiceFab.tsx`).
- **Core Voice Capabilities:**
  - "When is my next waste collection?"
  - "How much is my compound balance?"
  - "Report a blocked drainage in my street."
  - "Verify if this PSP operator is genuine."

### Module 3: Verified Operator Badge & Tariff Directory
- **Verification Portal:** Resident scans operator QR badge or enters `PAR-*` code.
- **Verification Response:** Displays:
  - Official PSP Company Name & RC Number
  - Assigned Operational Ward & Boundary Map
  - Approved Monthly Tariff Band (Low, Medium, High Density)
  - Emergency Supervisor Phone Number

### Module 4: Saturday-Noon Escrow SLA Auto-Protection
- **Escrow Invariant:** When a resident pays their monthly fee, funds are held in escrow.
- **Verification Rule:** The PSP must confirm collection via an operator scan (`pickup.scanned`) during their designated weekly window (e.g. Friday).
- **Auto-Credit Trigger:** If no verified scan occurs by **Saturday 12:00 WAT**:
  - Resident's account receives full credit applied to their next cycle.
  - A missed-service complaint (`INC-MISS-*`) is auto-logged against the PSP's SLA score in LAWMA Workspace.

### Module 5: 5-Way Jurisdiction Citizen Care Desk (`/report`)
- When residents report illegal dumps, flooded drains, or abandoned skips:
  - App captures GPS coordinate and optional photo.
  - Auto-triages jurisdiction:
    1. **FHA:** Federal Housing Authority Estates (e.g., Gowon Estate)
    2. **LGA:** Local Government Council drains & inner street sweepers
    3. **LASG:** State Highways & Ministry of the Environment primary drainage
    4. **LAWMA Direct:** Central market bins and commercial skips
    5. **PSP Ward:** Domestic household missed pickups

---

## 3. Supported Channels & Accessibility

1. **Lightweight PWA (< 5MB initial bundle):**
   - High performance on low-end Android devices (Transsion/Tecno/Infinix with 2GB RAM).
   - Offline-capable service worker displaying cached balance, last pickup proof photo, and emergency contacts.
2. **USSD Gateway (`*384*LAWMA#`):**
   - 100% text-based, zero-data capability for feature phone users:
     - `1. Check Balance / Pay Flat Share`
     - `2. Verify PSP Operator`
     - `3. Report Missed Pickup`
     - `4. Change Language`
3. **WhatsApp Cloud API:**
   - Interactive conversational bot supporting photo uploads of blocked drains and automated pickup receipts.
