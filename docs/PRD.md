# PRODUCT REQUIREMENTS DOCUMENT: LAWMA 360 CUSTOMER APP (`RESIDENT`)
## Sovereign Multi-Tenant Resident Interface, Dual-Key Verification & Civic Defense Engine

**Document Identifier:** LAWMA-PRD-RESIDENT-APP-V4  
**Document Version:** 4.0 (Courtroom-Grade Civic Protection Edition)  
**System Role:** Tenement Compound Citizen, Micro-Merchant & Residential Waste Management Gateway  
**Target Codebase:** `LAWMA-360-customer-app` (`src/routes/`, `src/components/`, `src/lib/`)  
**Deployment Targets:** Progressive Web App (PWA - Low-Bandwidth Optimized), Reverse-Billed USSD (`*384*LAWMA#`), Multilingual Voice IVR (5 Dialects), WhatsApp Cloud API Gateway  
**Statutory Foundation:** 2017 Lagos State Environmental Management and Protection Law (EMPL) Sections 45, 63, 88, 89, 102 & 103; Lagos State Tenancy Law 2011; Public Health Law of Lagos State (Cap P14); Nigeria Data Protection Act (NDPA 2023); Nigerian Evidence Act 2011 Section 84  
**Executive Boardroom Sponsors:**
- **Dr. Kadri Obafemi Hamzat (KOH)**, Executive Governor of Lagos State
- **Hon. Tokunbo Wahab**, Honourable Commissioner, Ministry of the Environment and Water Resources (MEWR)
- **Hon. Rasheed Shabi**, Chairman, House Committee on the Environment, Lagos State House of Assembly
- **Olajuwon Mautin Akinyemi**, Acting Managing Director / CEO, Lagos State Waste Management Authority (LAWMA)
- **Dr. Tijani Olorunwa**, Acting Director of Operations, LAWMA
- **Kunle Adebiyi**, Executive Director of Finance, LAWMA

---

## 1. Executive Context & Statutory Mandate

The municipal waste crisis in Lagos State is fundamentally determined at the domestic doorstep. Across a hyper-dense coastal metropolis of 22 million citizens—encompassing over 1.2 million registered structural parcels, sprawling informal settlements, and vibrant commercial corridors—domestic waste generation exceeds 13,000 metric tons daily. Historically, the relationship between residents, private waste operators (PSPs), and the municipal state collapsed due to deep institutional distrust, regressive billing practices, and total operational opacity.

Three systemic failures crippled domestic waste governance:
1. **The Compound Billing Civil War:** Over 68% of urban Lagosians reside in multi-tenant tenements (*"face-me-I-face-you"* compounds), where 8 to 24 individual households share a single entrance and waste bin. Historical utility administration issued a single, lump-sum monthly bill (e.g. ₦12,000) addressed to the building. When absentee landlords failed to remit collected funds, or when 3 transient tenants defaulted, private operators suspended waste collection for the entire building. The remaining compliant families, left with overflowing maggots, were forced to patronize illegal midnight cart pushers or dump refuse into gutters during rainstorms.
2. **The "Ghost Completion" Rip-Off:** Under legacy billing, private operators billed households regardless of whether a truck ever visited the street. Drivers under pressure to meet municipal quotas logged pickups as "completed" from the comfort of their cabs. Citizens were subjected to extortionate debt collection for phantom services, breeding civic resistance and non-compliance.
3. **The Gutter-Dumping Flash Flood Catalyst:** Over 70% of flash flooding across Lagos is waste-induced. Lacking predictive arrival schedules, households left garbage bags on curbs for days. When torrential storms hit, residents unpinned gutter slabs and dumped domestic waste directly into the runoff, causing downstream bridges and canals (System 6c, System 4, System 63) to form solid dams within 45 minutes, submerging surrounding neighborhoods.

Under **`MANDATE-WAH-04`**, **`MANDATE-SHB-03`**, and **`MANDATE-KOH-01`**, the Executive Boardroom mandated the complete transformation of the Resident interface into a **Civic Co-Production & Legal Protection Engine**:
> *"The citizen is not a passive revenue target; the citizen is the primary co-regulator of the street. The Resident App must permanently eliminate the collective punishment of tenement compounds. Every room must have its own fractional virtual account. Furthermore, no operator shall receive payout from the sovereign escrow until the citizen affirmatively verifies physical waste evacuation through a dual-key confirmation. If a truck fails to arrive, the citizen’s money remains protected. If rain gathers, the app must warn the neighborhood and guide residents to free emergency surge skips. We will arm every Lagosian with a digital shield against extortion, whether by rogue landlords, fake LGA revenue squads, or absentee waste contractors."*

---

## 2. Political Economy of the Lagos Tenement & Empirical Ground Truth

Designing a functional digital interface for Lagos demands an uncompromising confrontation with the physical, communal, and infrastructural reality of the streets.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           POLITICAL ECONOMY & POWER MATRIX OF THE TENEMENT                       │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│        POWER BLOC             │       OPERATIONAL REALITY        │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Tenement Landlords         │ Absenteeism; arbitrary levies;   │ Sovereign LAGIS Parcel Binding│
│    (Property Owners)          │ pocketing tenant sanitation fees.│ Official State Tariff Ceiling.│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Room Tenants & Lodgers     │ Low cash reserves; fear of       │ Compound Virtual Wallets;     │
│    (*Face-Me-I-Face-You*)     │ eviction; collective default.    │ Child Accounts (`VACC-*`).    │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. PSP Waste Concessionaires  │ Irregular routes; driver "ghost" │ Live Proximity Geofence Alerts│
│    (Private Truck Operators)  │ completions; cash bypass.        │ Dual-Key Citizen Verification.│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Corner Kiosk POS Agents    │ Primary financial gateway in     │ Zero-Fee POS Agency Cash      │
│    (Moniepoint / OPay / Palm) │ slums; unbanked majority.        │ Deposit Voucher Protocol.     │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 5. Rogue LGA Taskforces       │ Violent shakedowns of ground-    │ Unified Digital Merchant QR   │
│    (Parallel Ticket Thugs)    │ floor shops with fake tickets.   │ Sanitation Decal (`DECAL-QR`).│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 6. Midnight Cart-Pushers      │ Informal dumpers; intimidate     │ Cryptographic Whistle Vault;  │
│    (Organized Agbero Cartels) │ whistleblowers and tenants.      │ Blind ₦10k Airtime Bounties.  │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 2.1 The Tenement Micro-Economy & Room-Level Fractional Billing
In an 18-room compound in Agege or Bariga, household dynamics are communal yet financially fractured:
- **Tenancy Turnover:** 20% to 35% of compound rooms turn over annually. When a tenant departs, they often leave 2 to 3 months of unpaid waste dues.
- **The Landlord Mark-Up Racket:** Unscrupulous landlords historically charged tenants ₦1,500/room/month under the guise of "LAWMA and Sanitation", while paying LAWMA a subsidized domestic flat rate of ₦4,000 for the entire compound, pocketing the ₦23,000 surplus monthly. When tenants learned of this, they revolted, refusing all payments.
- **Micro-Liquidity Cycles:** Low-income gig workers and market traders do not budget on a 30-day corporate billing cycle. They earn and spend on a daily or weekly basis. Forcing an annual or monthly lump-sum bill guarantees default.

### 2.2 Forensic Street-Reality Blind Spots & Physical Attack Vectors

#### Blind Spot 1: The "Ghost Completion" Escrow Drain
- **The Vector:** In a pure status-push architecture, when a private operator claims a route is complete, the central ledger auto-debits the resident’s prepaid balance. Drivers under diesel pressure skip interior compound alleys, honk at the junction, and tap *"Completed"* on their phone. The resident returns home from work to find their bin overflowing and their wallet debited, precipitating violent arguments with waste crews and immediate reversion to cart pushers.
- **Engineered Solution:** **Dual-Key Citizen Remediation Closure (`CURE-CIT-*`).** Escrow payout is strictly gated. The driver must upload an EXIF-tagged geofenced photo. The resident receives an interactive push/USSD challenge: *"Press 1 to CONFIRM, Press 2 to REJECT (Trash Still Present)."* Payout is frozen if rejected, triggering an automated supervisory re-inspection.

#### Blind Spot 2: Domestic Worker / Child Disposal Reality (The User Mismatch)
- **The Vector:** Systems designed assuming the registered smartphone user is the person physically dumping the waste fail in Lagos. In 82% of households, sweeping and bin disposal is performed by young domestic workers ("house-helps"), older relatives, or children who do not carry the tenant's smartphone and cannot read English app prompts.
- **Engineered Solution:** **Physical Compound QR/NFC Bin Plates (`BIN-TAG-QR-*`).** A ruggedized, weather-proof outdoor QR code and passive NFC chip bonded to the compound gate or masonry bin enclosure. The collection crew scans the physical plate on arrival, instantly registering the physical visit and triggering automated local-language audio/SMS confirmations to the tenant's phone.

#### Blind Spot 3: The Kiosk Agency Banking Divide (The Unbanked Slum)
- **The Vector:** Requiring Visa, Mastercard, or mobile banking apps excludes the 58% of adult residents in informal coastal settlements (Ajegunle, Amukoko, Ilaje, Makoko) who keep cash and rely entirely on street-corner POS agents (Moniepoint, OPay, PalmPay).
- **Engineered Solution:** **Zero-Fee Agency Banking Cash Voucher Protocol (`POS-VOUCH-*`).** The resident simply gives cash to any corner POS agent, provides their Room Virtual Account Number (`*384*RoomID#`), and receives an immediate wallet top-up confirmed via SMS, requiring zero smartphone data or bank app access.

#### Blind Spot 4: Retaliatory Eviction & Landlord Intimidation
- **The Vector:** When an individual tenant reports an uncollected waste heap or refuses to pay an extortionate landlord sanitation markup, the landlord threatens immediate retaliatory eviction or locks the communal gate.
- **Engineered Solution:** **Statutory Cadastral Tariff Ceiling & Anonymous Whistleblower Vault (`ANON-WHISTLE-*`).** The app publishes the legally binding Lagos State cadastral tariff ceiling for every building based on its LAGIS parcel key (`LASG-CAD-ID`). Charging above this ceiling is flagged as a statutory offense under EMPL Section 88. Whistleblower tips are cryptographically hashed using HMAC-SHA256, shielding the tenant's identity from both landlords and corrupt officers.

#### Blind Spot 5: The "Curb-Side Rot" Arrival Uncertainty
- **The Vector:** Waste collection trucks operate in severe traffic gridlock. A truck scheduled for Friday morning may arrive at 04:30 PM or Saturday noon. To avoid missing the truck, compounds leave overflowing plastic bags on public sidewalks for days, where stray dogs tear them open and rain washes debris into storm gutters.
- **Engineered Solution:** **15-Minute Geofenced Live Proximity Alerts (`PROX-PING-*`).** Linking directly to compactor telematics in Module 02, when the assigned truck crosses a 1.5-kilometer geofence entering the neighborhood, the app emits an urgent audio alert and SMS: *"LAWMA truck is 3 streets away (approx. 15 mins). Bring out your bin now."* Curb exposure is reduced from 96 hours to under 20 minutes.

#### Blind Spot 6: Domestic Needle-Stick & Toxic Sharps Contamination
- **The Vector:** Thousands of private homes manage chronic illnesses (diabetes insulin injections, home dialysis, outpatient wound care). Unaware of specialized hazmat protocols, residents throw contaminated syringes and bloody dressings into domestic black bags. Street scavengers and municipal truck loaders suffer accidental needle-stick punctures, contracting Hepatitis B, HIV, or tetanus.
- **Engineered Solution:** **Domestic Sharps Micro-Drop Protocol (`DOM-SHARPS-*`).** In harmony with Module 08, residents can request free puncture-proof mini-sharps boxes via the app. When full, the app issues a free drop-off voucher at any accredited Primary Healthcare Center (PHC) or schedules specialized biohazard van collection.

---

## 3. Mathematical & Algorithmic Formulations

The Resident App interfaces with the sovereign clearinghouse through deterministic, legally verifiable mathematical models.

### 3.1 Compound Fractional Tariff Splitting & Dynamic Room Ledger
For any compound structure mapped to a master cadastral parcel (`LASG-CAD-ID`), the approved monthly compound tariff $T_{\text{compound}}$ is dynamically partitioned across registered units:

$$T_{\text{compound}} = T_{\text{base}} \times \Phi_{\text{density}} \times \left(1 + \sum_{k=1}^{M_{\text{commercial}}} \omega_k \right)$$

Where:
- $T_{\text{base}}$ is the statutory zonal baseline tariff set by LAWMA Executive Regulation.
- $\Phi_{\text{density}}$ is the cadastral density multiplier (Low = 1.0, Medium = 1.25, High = 1.50).
- $\omega_k$ is the surcharge weighting for any ground-floor commercial units (chemists = 0.35, bar/restaurant = 0.60).

The individual monthly fractional liability $L_i$ for tenant room $i$ is calculated as:

$$L_i = \frac{T_{\text{compound}} - \sum C_{\text{commercial}}}{N_{\text{active\_residential\_rooms}}}$$

$$\text{Active Room Balance Invariant:} \quad \text{Room } i \text{ is `COMPLIANT`} \iff B_i \ge L_i \times \left(\frac{d_{\text{elapsed}}}{30}\right)$$

> **Legal & Physical Invariants:** 
> 1. **The 60% Quorum Collective Mandate:** If $\ge 60\%$ of active residential rooms have paid, the assigned PSP is legally barred under EMPL Section 89 from withholding collection of the communal bin. The remaining deficit accumulates as a statutory landlord debt enforced via **Special Offences Court (Mobile Court) Form 1 Summons & BVN-Linked Bank Account Garnishee Orders**.
> 2. **The Sub-60% Quorum Quarantine & Room QR Bag Protocol (`ROOM-QR-BAG-*`):** If compound compliance falls below 60%, the communal front drum is sealed and marked `QUARANTINED`. However, compliant rooms (e.g. Room 4) are issued individual **Serialized Digital Green QR Bags (`ROOM-QR-BAG-*`)**. The compactor crew loader scans Room 4's bag QR at the gate/doorstep and evacuates her waste, leaving the quarantined drum intact. This makes tenement waste physically divisible and catalyzes irresistible peer social pressure on defaulting neighbors.

### 3.2 Dual-Key Citizen Remediation & Escrow Release Gating
Let $K_{\text{ops}}$ be the operational proof generated by the collection crew terminal (Module 02):

$$K_{\text{ops}} = \text{GeoDistance}(\text{GPS}_{\text{truck}}, \text{GPS}_{\text{compound}}) \le 30\text{ m} \;\land\; \text{EXIF}_{\text{photo}} == \text{VALID} \;\land\; \Delta t_{\text{dwell}} \ge 45\text{ s}$$

Let $K_{\text{cit}}$ be the citizen verification response token:

$$K_{\text{cit}} \in \{\text{CONFIRMED} = 1, \text{REJECTED} = 0, \text{TIMEOUT} = \text{NULL}\}$$

The escrow financial state transition for monthly fee $F_{\text{escrow}}$ is strictly governed by:

$$\text{Action}(K_{\text{ops}}, K_{\text{cit}}) = \begin{cases}
\text{SETTLE\_TO\_PSP}(F_{\text{escrow}}), & \text{if } K_{\text{ops}} = \text{TRUE} \land (K_{\text{cit}} = 1 \lor (K_{\text{cit}} = \text{NULL} \land \Delta t \ge 24\text{h})) \\
\text{FREEZE\_ESCROW\_INVESTIGATE}, & \text{if } K_{\text{ops}} = \text{TRUE} \land K_{\text{cit}} = 0 \\
\text{ABORT\_AND\_REFUND}, & \text{if } K_{\text{ops}} = \text{FALSE} \land \Delta t_{\text{window}} \ge 48\text{h}
\end{cases}$$

### 3.3 "Sort & Earn" Recyclable Tariff Discount Amortization
To incentivize domestic waste segregation, clean sorted recyclables (PET plastics, HDPE, aluminum cans) weighed at community hubs earn direct billing discounts credited to the Compound Virtual Wallet:

$$\Delta B_{\text{wallet}} = \sum_{m \in \{\text{PET}, \text{ALUM}, \text{HDPE}\}} M_m \times R_m \times \mu_{\text{purity}}$$

Where:
- $M_m$ is audited net mass in kilograms.
- $R_m$ is published weekly buy-back rate per kilogram (e.g., PET = ₦120/kg; Aluminum = ₦450/kg).
- $\mu_{\text{purity}} \in [0.70, 1.0]$ is visual quality score verified by the accredited recovery agent.

$$\text{Net Waste Bill Payable:} \quad T_{\text{net}} = \max\left(0, L_i - \Delta B_{\text{wallet}}\right)$$

### 3.4 Pre-Storm Basin Risk & Emergency Skip Search Vector
When NiMet Doppler radar triggers a `PRE-STORM-SURGE` alert, the app computes the Euclidean distance $D_{\text{skip}}$ to the nearest temporary $11\text{m}^3$ emergency skip:

$$D_{\text{skip}}(u) = \min_{s \in S_{\text{active\_skips}}} \sqrt{(x_u - x_s)^2 + (y_u - y_s)^2}$$

The UI triggers an urgent map navigation route if $D_{\text{skip}} \le 400\text{ meters}$, displaying walking directions and operating hours.

---

## 4. Comprehensive Epics & Detailed User Stories

### Epic 4.1: Compound Fractional Virtual Wallets & Dynamic Tenancy Roster (`WAL-COMP-*`)
Eliminate the collective non-payment trap by enabling room-level micro-payments, transient room vacancy management, and landlord billing ceilings.

#### User Story 4.1.1: Individual Room USSD / Mobile Top-Up
- **As a** Tenant living in Room 4 of a 16-room compound in Agege,
- **I want** to pay my exact ₦600 monthly waste share via USSD or mobile wallet,
- **So that** I receive an individual payment receipt and my waste is collected even if my neighbors default.
- **Acceptance Criteria:**
  - **GIVEN** a registered compound `WAL-COMP-*` bound to parcel `LASG-CAD-ID`,
  - **WHEN** the tenant dials `*384*41*4#` or pays online to their unique Child Virtual Account,
  - **THEN** exactly ₦600 credits the room’s ledger; an instant SMS receipt with cryptographic token is generated; the compound dashboard displays Room 4 as `COMPLIANT_PAID`.

#### User Story 4.1.2: Landlord Cadastral Tariff Ceiling Enforcement
- **As a** Tenant suspicious of landlord overcharging,
- **I want** to view the official government-approved waste tariff for my building,
- **So that** my landlord cannot extort excess sanitation fees.
- **Acceptance Criteria:**
  - **GIVEN** an address search or parcel scan,
  - **WHEN** the resident views the compound profile,
  - **THEN** the app renders the official LAWMA Cadastral Certificate displaying: Maximum Approved Tariff, Room Split Calculation, and Statutory Notice: *"Charging above this amount violates Lagos State Tenancy Law and EMPL Section 88."*

---

### Epic 4.2: Live Truck Proximity Alerts & Dual-Key Citizen Verification (`CURE-CIT-*`)
Prevent curb-side garbage rot and eradicate "ghost completion" fraud through live compactor tracking and citizen-gated escrow releases.

#### User Story 4.2.1: 15-Minute Geofenced Arrival Alert
- **As a** Working resident getting ready for work,
- **I want** to receive a push notification and SMS 15 minutes before the waste truck enters my street,
- **So that** I only bring my bin out when the truck is physically near, keeping our street clean from scavengers.
- **Acceptance Criteria:**
  - **GIVEN** an active collection route in Module 02,
  - **WHEN** the compactor crosses the 1.5km geofence of the resident's compound,
  - **THEN** emit an urgent multi-lingual chime and push notification: *"LAWMA truck is 3 streets away (approx. 15 mins). Bring out your bin now."*

#### User Story 4.2.2: Dual-Key Pickup Confirmation & Anti-Ghost SLA
- **As a** Resident whose waste was supposedly collected,
- **I want** to confirm or reject the driver's pickup claim before my money is released to the operator,
- **So that** drivers cannot claim fake pickups while my bin remains full.
- **Acceptance Criteria:**
  - **GIVEN** a driver submitting an on-site photo completion,
  - **WHEN** the event publishes to the customer app,
  - **THEN** prompt the resident with an interactive dialog displaying driver arrival time and photo:
    - *Press 1:* "CONFIRM (Bin Cleared)" $\to$ Escrow funds settle to PSP.
    - *Press 2:* "REJECT (Still Full)" $\to$ Funds freeze in escrow; incident escalates to LAWMA Area Inspector for mandatory 24-hr re-audit.

---

### Epic 4.3: Kiosk Agency Banking & Cash Deposit Voucher Protocol (`POS-VOUCH-*`)
Provide 100% financial inclusion for unbanked and cash-reliant residents living in informal settlements.

#### User Story 4.3.1: Zero-Fee POS Kiosk Cash Deposit
- **As an** Informal settlement dweller in Ajegunle without a smartphone or bank card,
- **I want** to hand ₦500 cash to a local Moniepoint/OPay POS agent to pay my waste share,
- **So that** my payment is recognized immediately by the state waste system without extra bank charges.
- **Acceptance Criteria:**
  - **GIVEN** any accredited street POS agent terminal,
  - **WHEN** the agent enters the resident's phone number and Room Virtual Account (`VACC-*`),
  - **THEN** the transaction completes with zero service fee deduction; the resident receives an instant SMS confirmation; the room status turns `PAID` on the physical compound ledger.

---

### Epic 4.4: NiMet Pre-Storm Surge Early Warning & Emergency Skip Locator
Mobilize residents before torrential downpours to eliminate the rain-gutter dumping habit and prevent flash flooding.

#### User Story 4.4.1: Pre-Storm Neighborhood Emergency Alert & Skip Map
- **As a** Resident living in a flood-prone coastal basin (Surulere / Kosofe),
- **I want** to receive an alert before heavy storms with a map of free emergency skips,
- **So that** our compound dumps domestic waste safely before drains overflow.
- **Acceptance Criteria:**
  - **GIVEN** a NiMet forecast predicting $\ge 50\text{ mm}$ rain within 36 hours,
  - **WHEN** the emergency protocol activates,
  - **THEN** the app displays an unmissable red weather banner: *"Storm Warning: Do not dump in gutters. 4 Free Emergency Skips deployed within 350m of your house [Tap for Walking Directions]."*

---

### Epic 4.5: Anonymous Whistleblower Vault & Automated Civic Bounties (`ANON-WHISTLE-*`)
Shield citizens from cartel intimidation and landlord retaliatory eviction when reporting illegal dumping, while incentivizing public vigilance.

#### User Story 4.5.1: Cryptographic One-Tap Anonymous Reporting
- **As a** Tenant witnessing illegal midnight cart-pusher dumping,
- **I want** to submit photographic evidence anonymously,
- **So that** cartels or my landlord cannot identify me or attack my family.
- **Acceptance Criteria:**
  - **GIVEN** a resident filing an issue on `/report`,
  - **WHEN** they toggle *"Report Anonymously"*,
  - **THEN** the client-side code strips EXIF device metadata; hashes the reporter's phone number using HMAC-SHA256 with rotating ministerial pepper; logs the record to the WORM vault under a pseudonym (e.g. `WHISTLE-ANON-7821`).

#### User Story 4.5.2: Automated Blind Airtime / Momo Bounty Payout
- **As an** Anonymous Whistleblower whose report led to an arrest,
- **I want** to receive my ₦10,000 civic reward without revealing my identity to police officers,
- **So that** my physical safety is permanently preserved.
- **Acceptance Criteria:**
  - **GIVEN** a verified conviction or impoundment in Module 06 stemming from an anonymous report,
  - **WHEN** the court judgment logs to the sovereign bus,
  - **THEN** trigger an automated blind airtime top-up or mobile money voucher directly to the hashed phone line via telco API, requiring zero manual human handling.

---

### Epic 4.6: Digital Merchant Sanitation QR Decal for Ground-Floor Retail (`DECAL-QR-*`)
Protect mixed-use residential shopkeepers from aggressive double-taxation and extortion by rogue Local Government taskforces.

#### User Story 4.6.1: Merchant Window Decal Real-Time Verification
- **As a** Ground-floor Chemist or Provision Shopkeeper,
- **I want** a digital QR compliance badge on my phone,
- **So that** visiting LGA health inspectors (*Wole-Wole*) cannot extort cash or claim my shop is unlicensed.
- **Acceptance Criteria:**
  - **GIVEN** a commercial tenement in good standing,
  - **WHEN** the shopkeeper opens `/you/decal`,
  - **THEN** the app generates an authenticated, cryptographically signed QR badge bearing: Business Name, Cadastral Parcel ID, and Statutory Legal Seal: *"Verified Compliant under EMPL Section 102. Demanding parallel cash tickets is a felony under Lagos State Law."*

---

### Epic 4.7: "Sort & Earn" Waste Cashback & Domestic Sharps Micro-Drop (`TRASH-TO-CASH-*` & `DOM-SHARPS-*`)
Incentivize household segregation of recyclables through direct bill credits and eliminate clinical sharps contamination in domestic bins.

#### User Story 4.7.1: Recyclable Weigh-In Bill Discount
- **As a** Waste-sorting household,
- **I want** my separated plastic bottles and aluminum cans to discount my monthly waste bill,
- **So that** our family saves money while keeping Lagos clean.
- **Acceptance Criteria:**
  - **GIVEN** sorted PET bottles weighed at an accredited community drop-off station,
  - **WHEN** the recovery agent scans the resident's app barcode,
  - **THEN** calculate the Naira value ($M_{\text{kg}} \times ₦120$); credit the amount instantly to the Compound Virtual Wallet; reduce the upcoming monthly waste bill by the credited amount.

#### User Story 4.7.2: Free Domestic Medical Sharps Container Request
- **As a** Resident managing home insulin injections,
- **I want** to request a free puncture-proof sharps box,
- **So that** used needles are disposed of safely without endangering municipal waste loaders.
- **Acceptance Criteria:**
  - **GIVEN** a resident in need of medical sharps containment,
  - **WHEN** they request a mini-sharps box in `/bins`,
  - **THEN** the system generates an instant collection voucher redeemable at any local Primary Healthcare Center (PHC) or schedules delivery via the assigned PSP operator.

---

## 5. Technical Architecture, State Machines & Database Schemas

### 5.1 Resident Pickup & Dual-Key Escrow State Machine

```
                              ┌──────────────────────────────────────────┐
                              │            PREPAID / HELD                │
                              │     (₦600/Room Reserved in Escrow)       │
                              └────────────────────┬─────────────────────┘
                                                   │
                              Truck Crosses 1.5km Neighborhood Geofence
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │       PROXIMITY ALERT (T-15 Mins)        │
                              │      ("Truck is Approaching Street")     │
                              └────────────────────┬─────────────────────┘
                                                   │
                              Driver Scans Compound QR & Submits On-Site Photo
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │        DUAL-KEY VERIFICATION PUSH        │
                              │       ("Confirm Bin Emptied: 1 or 2")    │
                              └──────┬────────────────────────────┬──────┘
                                     │                            │
                     Citizen Confirms (Press 1)                   │ Citizen Rejects (Press 2)
                     OR 24-Hour Timeout No Dispute                │ ("Trash Still Full")
                                     ▼                            ▼
                 ┌───────────────────────────┐   ┌─────────────────────────────────────────┐
                 │       SETTLED TO PSP      │   │        ESCROW FROZEN / AUDIT            │
                 │   (Funds Released to Escrow)  │   │  (₦500k Operator Fine; 24h Re-Audit)    │
                 └───────────────────────────┘   └─────────────────────────────────────────┘
```

### 5.2 PostgreSQL / Supabase Client & Server Schema (DDL)

```sql
-- Sovereign Resident Mobile Application Database Schema
-- Compatible with Supabase Postgres & Local Offline SQLite Replication

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Compound Master & Multi-Tenant Registry
CREATE TABLE customer_compounds (
    compound_id VARCHAR(32) PRIMARY KEY, -- E.g., 'CMP-AGEGE-0482'
    cadastre_parcel_id VARCHAR(32) NOT NULL, -- LASG-CAD-ID
    street_address TEXT NOT NULL,
    lga_id VARCHAR(32) NOT NULL,
    ward_id VARCHAR(32) NOT NULL,
    location_coordinates GEOMETRY(Point, 4326) NOT NULL,
    compound_type VARCHAR(32) NOT NULL DEFAULT 'FACE_ME_I_FACE_YOU' 
        CHECK (compound_type IN ('SINGLE_FAMILY', 'MULTI_FLAT_APARTMENT', 'FACE_ME_I_FACE_YOU', 'MIXED_COMMERCIAL_RESIDENTIAL')),
    total_residential_rooms INTEGER NOT NULL DEFAULT 1,
    active_residential_rooms INTEGER NOT NULL DEFAULT 1,
    official_statutory_tariff_naira NUMERIC(10, 2) NOT NULL,
    master_wallet_balance_naira NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    compound_qr_code_hash VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Individual Room Child Virtual Accounts
CREATE TABLE customer_rooms (
    room_id VARCHAR(48) PRIMARY KEY, -- E.g., 'CMP-AGEGE-0482-RM-04'
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id) ON DELETE CASCADE,
    room_label VARCHAR(32) NOT NULL, -- E.g., 'Room 4', 'Flat 2B', 'Ground Chemist'
    tenant_name VARCHAR(128),
    tenant_phone VARCHAR(16),
    tenant_nin_hash VARCHAR(64),
    is_commercial_shop BOOLEAN NOT NULL DEFAULT FALSE,
    room_occupancy_state VARCHAR(16) NOT NULL DEFAULT 'OCCUPIED' 
        CHECK (room_occupancy_state IN ('OCCUPIED', 'VACANT', 'EXEMPT')),
    monthly_fractional_liability NUMERIC(10, 2) NOT NULL,
    child_virtual_account_no VARCHAR(16) NOT NULL UNIQUE, -- For NIBSS / POS / USSD deposits
    current_wallet_balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    compliance_status VARCHAR(16) NOT NULL DEFAULT 'COMPLIANT_PAID' 
        CHECK (compliance_status IN ('COMPLIANT_PAID', 'PENDING_TOPUP', 'IN_ARREARS')),
    last_payment_timestamp TIMESTAMP WITH TIME ZONE
);

-- 3. Pickup Requests & Dual-Key Gated Escrow
CREATE TABLE customer_pickups (
    pickup_id VARCHAR(64) PRIMARY KEY, -- E.g., 'PCK-20261113-8831'
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    assigned_psp_id VARCHAR(32) NOT NULL,
    scheduled_date DATE NOT NULL,
    service_window VARCHAR(32) NOT NULL, -- E.g., 'FRIDAY_08_12'
    reserved_escrow_amount NUMERIC(10, 2) NOT NULL,
    proximity_alert_sent_at TIMESTAMP WITH TIME ZONE,
    driver_onsite_timestamp TIMESTAMP WITH TIME ZONE,
    driver_proof_photo_uri VARCHAR(256),
    driver_proof_coordinates GEOMETRY(Point, 4326),
    citizen_verification_response VARCHAR(16) NOT NULL DEFAULT 'PENDING' 
        CHECK (citizen_verification_response IN ('PENDING', 'CONFIRMED_CLEARED', 'REJECTED_STILL_DIRTY', 'AUTO_TIMEOUT_CONFIRMED')),
    citizen_verified_at TIMESTAMP WITH TIME ZONE,
    escrow_payout_state VARCHAR(32) NOT NULL DEFAULT 'HELD_IN_ESCROW' 
        CHECK (escrow_payout_state IN ('HELD_IN_ESCROW', 'SETTLED_TO_PSP', 'FROZEN_DISPUTE', 'REFUNDED_TO_CITIZEN')),
    remediation_audit_ref VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Anonymous Whistleblower WORM Vault
CREATE TABLE customer_whistleblower_tips (
    tip_id VARCHAR(64) PRIMARY KEY, -- E.g., 'WHISTLE-ANON-20261113-0941'
    hashed_reporter_phone VARCHAR(64) NOT NULL, -- HMAC-SHA256 with rotating ministerial pepper
    infraction_category VARCHAR(32) NOT NULL 
        CHECK (infraction_category IN ('ILLEGAL_CART_PUSHER', 'GUTTER_RAIN_DUMPING', 'LANDLORD_SEWAGE_DUMP', 'CLINICAL_SHARPS_IN_DOMESTIC', 'ROGUE_LGA_EXTORTION')),
    incident_description TEXT NOT NULL,
    incident_evidence_uri VARCHAR(256),
    incident_coordinates GEOMETRY(Point, 4326) NOT NULL,
    kai_interdiction_ticket_id VARCHAR(64),
    conviction_verified BOOLEAN NOT NULL DEFAULT FALSE,
    bounty_amount_naira NUMERIC(10, 2) NOT NULL DEFAULT 10000.00,
    bounty_disbursement_status VARCHAR(16) NOT NULL DEFAULT 'PENDING' 
        CHECK (bounty_disbursement_status IN ('PENDING', 'DISBURSED_AIRTIME_BLIND', 'DISBURSED_MOMO_BLIND', 'REJECTED')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. "Sort & Earn" Recyclable Cashback Credits
CREATE TABLE customer_recycling_credits (
    credit_id VARCHAR(64) PRIMARY KEY, -- E.g., 'REC-CRED-20261113-0042'
    room_id VARCHAR(48) NOT NULL REFERENCES customer_rooms(room_id),
    material_type VARCHAR(16) NOT NULL CHECK (material_type IN ('PET_PLASTIC', 'ALUMINUM_CANS', 'HDPE_RIGID', 'CORRUGATED_CARTON')),
    audited_weight_kg NUMERIC(6, 2) NOT NULL,
    unit_rate_naira_per_kg NUMERIC(8, 2) NOT NULL,
    total_credit_earned_naira NUMERIC(10, 2) GENERATED ALWAYS AS (audited_weight_kg * unit_rate_naira_per_kg) STORED,
    credited_to_wallet_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    recovery_agent_id VARCHAR(32) NOT NULL
);

-- 6. Merchant Digital QR Sanitation Decals
CREATE TABLE customer_merchant_decals (
    decal_id VARCHAR(48) PRIMARY KEY, -- E.g., 'DECAL-MRCH-2026-0812'
    room_id VARCHAR(48) NOT NULL UNIQUE REFERENCES customer_rooms(room_id),
    business_trade_name VARCHAR(128) NOT NULL,
    trade_category VARCHAR(32) NOT NULL CHECK (trade_category IN ('PROVISION_STORE', 'PHARMACY_CHEMIST', 'HAIR_SALON_BARBER', 'RESTAURANT_EATERY', 'TAILOR_TEXTILE')),
    empl_section_102_compliant BOOLEAN NOT NULL DEFAULT TRUE,
    qr_verification_token VARCHAR(64) NOT NULL UNIQUE,
    valid_until TIMESTAMP WITH TIME ZONE NOT NULL,
    anti_extortion_warning_text TEXT NOT NULL 
        DEFAULT 'Verified under EMPL Section 102. Demanding parallel cash tickets is a criminal offense.'
);

-- Spatial and Performance Indices
CREATE INDEX idx_compound_cadastre ON customer_compounds(cadastre_parcel_id);
CREATE INDEX idx_compound_geom ON customer_compounds USING GIST(location_coordinates);
CREATE INDEX idx_rooms_virtual ON customer_rooms(child_virtual_account_no);
CREATE INDEX idx_rooms_compliance ON customer_rooms(compound_id, compliance_status);
CREATE INDEX idx_pickups_status ON customer_pickups(compound_id, citizen_verification_response);
CREATE INDEX idx_whistle_geom ON customer_whistleblower_tips USING GIST(incident_coordinates);
```

---

## 6. RESTful Service & Cross-App Messaging Contracts

### 6.1 OpenAPI 3.1 REST Endpoints

```yaml
openapi: 3.1.0
info:
  title: LAWMA Resident Mobile Gateway & Dual-Key Clearing API
  version: 4.0.0
  description: Citizen-facing API supporting room-level fractional wallets, dual-key pickup confirmation, NiMet pre-storm alerts, and anonymous whistleblowing.
paths:
  /v4/resident/compounds/{compound_id}/rooms:
    get:
      summary: Retrieve Compound Roster and Fractional Room Ledgers
      parameters:
        - name: compound_id
          in: path
          required: true
          schema: { type: string, example: "CMP-AGEGE-0482" }
      responses:
        '200':
          description: Returns compound master wallet balance and individual room statuses.

  /v4/resident/pickups/{pickup_id}/dual-key-verify:
    post:
      summary: Submit Citizen Dual-Key Pickup Confirmation
      parameters:
        - name: pickup_id
          in: path
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [verification_status]
              properties:
                verification_status:
                  type: string
                  enum: [CONFIRMED_CLEARED, REJECTED_STILL_DIRTY]
                rejection_reason:
                  type: string
                  enum: [CREW_NEVER_ARRIVED, BIN_HALF_EMPTIED, GATE_LOCKED_DISPUTE, LITTER_LEFT_ON_GROUND]
                dispute_photo_uri:
                  type: string
                  format: uri
      responses:
        '200':
          description: Verification processed. Escrow released or frozen.

  /v4/resident/whistleblower/submit-anonymous:
    post:
      summary: Submit Cryptographically Hashed Anonymous Infraction Tip
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [raw_phone_number, infraction_category, description, coordinates]
              properties:
                raw_phone_number: { type: string, example: "+2348023456789" }
                infraction_category:
                  type: string
                  enum: [ILLEGAL_CART_PUSHER, GUTTER_RAIN_DUMPING, LANDLORD_SEWAGE_DUMP, CLINICAL_SHARPS_IN_DOMESTIC, ROGUE_LGA_EXTORTION]
                description: { type: string }
                evidence_photo_uri: { type: string, format: uri }
                coordinates:
                  type: object
                  required: [latitude, longitude]
                  properties:
                    latitude: { type: number, example: 6.5244 }
                    longitude: { type: number, example: 3.3792 }
      responses:
        '201':
          description: Tip encrypted. HMAC-SHA256 hash stored. Bounties linked.
```

### 6.2 Cross-App Hub Event Schemas (`app_messages`)

#### Event: `pickup.proximity_alert` (From Fleet Logistics $\to$ Resident)
```json
{
  "id": "MSG-PROX-20261113-0941",
  "from_app": "operator",
  "to_app": "customer",
  "type": "pickup.proximity_alert",
  "ref": "PCK-20261113-8831",
  "payload": {
    "compound_id": "CMP-AGEGE-0482",
    "truck_plate": "KTU-482-XA",
    "distance_meters": 1250,
    "eta_minutes": 14,
    "call_to_action": "BRING_OUT_BIN_NOW"
  }
}
```

#### Event: `pickup.dual_key_challenge` (From Hub $\to$ Resident)
```json
{
  "id": "MSG-CHAL-20261113-1002",
  "from_app": "lawma",
  "to_app": "customer",
  "type": "pickup.dual_key_challenge",
  "ref": "PCK-20261113-8831",
  "payload": {
    "pickup_id": "PCK-20261113-8831",
    "driver_photo_uri": "https://storage.lawma.gov.ng/proofs/20261113/pck-8831.jpg",
    "driver_timestamp": "2026-11-13T10:01:42Z",
    "escrow_amount_naira": 600.00,
    "sla_window_expires": "2026-11-14T10:01:42Z"
  }
}
```

---

## 7. Field Defense Playbooks & Resident Legal Protections

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   FIELD DEFENSE PLAYBOOK: RESIDENT LEGAL PROTECTIONS                             │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│       CHALLENGE VECTOR        │       OPERATIONAL VULNERABILITY  │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Landlord Retaliatory Rent  │ Landlord evicts tenant for       │ Official State Cadastral      │
│    Hikes / Eviction Threats   │ paying LAWMA directly.           │ Tariff Certificate & Lien Shield│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Rogue LGA Taskforce Raids  │ Thugs demand cash for fake       │ Digital Merchant QR Sanitation│
│    (Parallel Double Tax)      │ "Local Health Tickets".          │ Decal (`DECAL-QR-*`).         │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. PSP Driver "Gate Locked"   │ Driver honks and leaves without  │ Geofenced Photographic Proof  │
│    False Claims               │ collecting waste.                │ of Attempt (`PO-ATTEMPT-*`).  │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Cartel Physical Reprisals  │ Informants beaten for reporting  │ Cryptographic WORM Vault;     │
│    (Cart-Pusher Intimidation) │ midnight canal dumping.          │ blind automated telco bounties│
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 7.1 Landlord Overcharge & Eviction Defense Protocol
1. Under the **Lagos State Tenancy Law 2011** and **EMPL 2017 Section 88**, a landlord cannot charge tenants sanitation fees exceeding the official LAWMA cadastral tariff band.
2. If a landlord demands excessive cash or threatens eviction:
   - The tenant taps *"Generate Cadastral Tariff Defense Certificate"* in `/wallet`.
   - The app outputs a signed, state-sealed PDF displaying the property’s official approved bill and legal text: *"Any landlord who demands sums above this statutory rate or attempts eviction commits an offense punishable under Section 44 of the Tenancy Law."*
   - Compliant tenants are registered in the state's Tenancy Protection Register, preventing summary eviction for sanitation disputes.

### 7.2 Ground-Floor Merchant Anti-Extortion Protocol
1. When rogue youth taskforces invade a ground-floor shop demanding "Local Government Environmental Dues":
   - The merchant presents the active **Merchant Sanitation QR Decal (`DECAL-QR-*`)** mounted in their window or on their phone screen.
   - When scanned, the token validates directly against the Section 102 Clearinghouse: *"This business is compliant. 5% of its waste fee has been remitted directly to the Local Government Council Treasury. Demanding cash is illegal."*
   - If the agents persist, the merchant taps the emergency alert button (`*384*911#`); an automated KAI rapid interception motorcycle unit is dispatched to arrest the perpetrators.

### 7.3 PSP "Gate Locked" False Claim Defense Protocol
1. If an operator reports *"Premises Inaccessible / Gate Locked"*:
   - The driver must upload a high-resolution photo showing the closed gate with the building's street number clearly visible within 30 meters of the geo-coordinates.
   - The app instantly alerts the tenant: *"Your driver reported your gate locked at 07:12 AM [Photo Attached]. Tap 'Re-Open Gate' within 10 minutes to notify driver, or schedule re-attempt on next zone cycle."*
   - If the photo does not match the building's cadastral facade, the driver's claim is rejected for fraud, and the PSP incurs an SLA penalty.

---

## 8. Statutory Verification, Evidence Act Section 84 & Executive Sign-off Matrix

All digital artifacts generated by the Resident App—including SMS USSD delivery receipts, geofenced pickup confirmation pushes, encrypted whistleblower tips, and merchant QR decals—are formatted to fulfill the evidentiary conditions of **Section 84 of the Nigerian Evidence Act 2011**.

### 8.1 Courtroom Evidentiary Certificate Template

```
IN THE SPECIAL OFFENCES COURT OF LAGOS STATE
HOLDEN AT IKEJA / OSHODI, LAGOS
BEFORE HIS WORSHIP: [MAGISTRATE NAME]

CHARGE NO: MEWR/ENV/2026/[NUMBER]
BETWEEN:
LAGOS STATE MINISTRY OF THE ENVIRONMENT & WATER RESOURCES ...... COMPLAINANT
AND
[DEFENDANT NAME / LANDLORD / ROGUE REVENUE AGENT] ............. DEFENDANT

CERTIFICATE OF ELECTRONIC EVIDENCE AUTHENTICITY
(PURSUANT TO SECTION 84 OF THE NIGERIAN EVIDENCE ACT, 2011)

I, [OFFICER NAME], Director of Citizen Systems & Digital Architecture, 
LAWMA Regulatory Command Room, do hereby solemnly declare and certify as follows:

1. That I am the designated technical custodian of the LAWMA 360 Resident Mobile 
   Gateway, USSD Subsystem (*384*LAWMA#), and Compound Virtual Ledger.
2. That on the [DATE], at [TIME], the cryptographic database recorded Transaction ID 
   [TX_ID], confirming that Tenant Room ID [ROOM_ID] in Compound [COMPOUND_ID] 
   remitted statutory waste tariffs via Child Account [ACCOUNT_NO], as evidenced by 
   NIBSS Settlement Log Exhibit 'A'.
3. That an on-site Dual-Key Rejection was logged by the resident under Ticket [TICKET_ID], 
   disproving the PSP Operator's claim of physical waste evacuation.
4. That throughout the material operational window, the resident gateway servers, 
   telco USSD links, and cryptographic message hubs were operating properly and under 
   continuous administrative integrity control, without unauthorized data corruption.

DATED THIS ______ DAY OF ________________ 2026.

_______________________________________
DEPONENT / SYSTEMS CUSTODIAN SIGNATURE
```

### 8.2 Executive Sign-off & Inter-Agency Governance Matrix

| Verification Pillar | Legal / Regulatory Benchmark | Acceptance Threshold | Auditing Authority |
| :--- | :--- | :--- | :--- |
| **Tenancy Inclusivity** | Lagos State Tenancy Law 2011 | 100% of rooms assigned unique Child Virtual Accounts; zero collective compound service suspension. | Ministry of Housing / Judiciary |
| **Escrow Integrity** | Public Finance Management Law (2011) | 0% premature escrow releases without Dual-Key citizen confirmation or 24-hr verified timeout. | State Treasury Office (STO) |
| **Whistleblower Shield** | NDPA 2023 / Cybercrimes Act 2015 | 100% of reporter identities hashed with HMAC-SHA256; zero plaintext data leaks. | NDPC / State Data Protection Officer |
| **Flood Defense Alerting**| State Disaster Management SLA | Pre-storm emergency skip map delivered to 100% of basin subscribers $\ge 24\text{ hours}$ before heavy rain. | EFAG / LASEMA |
| **Merchant Protection** | EMPL 2017 Section 102 | Digital Merchant QR Decals verified by both LAWMA and LGA; zero parallel ticket extortion tolerated. | Conference 57 / Ministry of Justice |
| **Sovereign Quorum** | Gubernatorial Sovereign Mandate | Approved by Gov. Dr. Kadri Obafemi Hamzat, Comm. Wahab & Acting MD Olajuwon Mautin Akinyemi. | Lagos State Executive Council |
