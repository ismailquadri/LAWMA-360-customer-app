# Citizen & Tenement Master Defense Playbook

**Target Application:** `LAWMA-360-customer-app` (Resident & Compound PWA/USSD)  
**Audience:** Customer Experience Engineers, Frontend Developers, Product Designers

Technical and policy solutions addressing citizen trust barriers:

---

### Answer 1: Unit-Level Fractional Splitting & Individual Immunity
1. **System Feature:** The customer app breaks bulk compound bills into individual unit sub-accounts (e.g. `TAG-HH-ALI-0148-U01` through `U12`).
2. **Individual Payment Proof:** Each paying tenant gets an instant SMS/WhatsApp receipt.
3. **Legal Immunity:** Under Section 63 of the 2017 EMPL, waste collection debt is individual. Paying tenants who show their digital receipt are completely immune from tenement sealing or court prosecution; default notices are served specifically on the defaulting unit.

### Answer 2: Escrow Smart-Lock & Saturday-Noon Auto-Credit
1. **Protected Escrow:** Citizen payments are deposited into a central escrow account. The PSP does not receive the funds when the customer pays.
2. **Scan-Gated Settlement:** Funds are released to the PSP only when an operator scans the compound tag during collection.
3. **Automated Refund / Rollover:** If a scheduled Friday pickup is not verified by **Saturday 12:00 WAT**, the clearinghouse auto-credits the resident's wallet for the entire cycle. The resident never pays for unrendered service.

### Answer 3: USSD (`*384*LAWMA#`) & 5-Language Voice Engine
1. **Zero Data Requirement:** Feature phone users dial `*384*LAWMA#` (free of data charges) to check balances, pay via bank USSD rails, and receive pickup alerts.
2. **Voice AI:** The smartphone web app embeds `LocalVoiceAgent.tsx`, providing full spoken guidance in Nigerian Pidgin, Yoruba, Igbo, and Hausa for low-literacy users.

### Answer 4: 5-Second QR / SMS Operator Verification
1. **Public Verification:** Residents enter the operator's code or scan their physical badge.
2. **Instant Transparency:** Within 3 seconds, the screen displays the licensed operator's photo, registered company name, authorized ward boundaries, and approved tariff band.
3. **Anti-Scam Protocol:** Payments are restricted to digital escrow channels; cash payments to street collectors are discouraged through instant app warnings.

### Answer 5: Digital Lease Liability Transfer via LASRRA / Phone ID
1. **Tenant Onboarding:** When a tenant moves in, the landlord assigns the unit code to the tenant's phone number and LASRRA ID.
2. **Debt Portability:** Waste debt attaches to the individual user profile, not the physical real estate. When a defaulting tenant vacates, arrears follow their personal identity registry, exonerating the landlord.
