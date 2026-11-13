# PRODUCT LEVEL DOCUMENT: MODULE 03 (`RES-MOD-03-DUAL-KEY-ESCROW`)
## Dual-Key Citizen Verification, Gated Escrow Clearing & Anti-Ghost SLA Engine

**Document Identifier:** LAWMA-PLD-RES-03-DUAL-KEY-ESCROW  
**Document Version:** 4.0 (Courtroom-Grade Civic Protection Edition)  
**System Role:** Citizen-Gated Escrow Settlement, Anti-Ghost Pickup Enforcement, Operational Dispute Adjudication & Proof-of-Attempt Photo Verification  
**Target Codebase:** `LAWMA-360-customer-app` (`src/routes/activity.tsx`, `src/routes/wallet.tsx`, `src/lib/customer-model.ts`)  
**Deployment Targets:** Progressive Web App (PWA Interactive Push), Reverse-Billed USSD Menu (`*384*22#`), WhatsApp Verification Webhook, Automated SMS Callback  
**Statutory Foundation:** 2017 Lagos State Environmental Management and Protection Law (EMPL) Sections 45, 63, 88 & 89; Public Finance Management Law (2011); Federal Competition and Consumer Protection Act (FCCPA 2018); Nigerian Evidence Act 2011 Section 84  
**Executive Boardroom Sponsors:**
- **Hon. Tokunbo Wahab**, Honourable Commissioner, Ministry of the Environment and Water Resources (MEWR)
- **Dr. Muyiwa Gbadegesin**, Managing Director / CEO, Lagos State Waste Management Authority (LAWMA)
- **Hon. Rasheed Shabi**, Chairman, House Committee on the Environment, Lagos State House of Assembly  

---

## 1. Executive Context & Statutory Authority

The fundamental cause of public tax and tariff resistance in municipal Lagos is the perception of paying for non-existent public services. Historically, municipal waste billing operated on an extractive, unverified model: private concessionaires (PSPs) submitted monthly billing schedules to LAWMA, asserting that full domestic collection had occurred. In turn, paper bills were dispatched to tenement compounds under threat of municipal sealing and court summons.

In reality, municipal service delivery suffered from widespread operational fraud:
1. **The "Ghost Completion" Epidemic:** Field telemetry audits revealed that up to **18.4% of residential pickups logged as "COMPLETED" by private operators were completely fictitious**. Compactor truck drivers, running low on diesel or facing massive gridlock on arterial corridors, skipped interior tenement cul-de-sacs, honked from distant junctions, and tapped *"Route Completed"* on their manifests.
2. **The Asymmetric Burden of Proof:** When an aggrieved citizen called a customer service hotline to dispute an uncollected bin, the burden of proof was placed entirely on the resident. Without verifiable evidence, complaints were dismissed, while the resident’s prepaid funds were paid out to the delinquent contractor.
3. **The Erosion of Civic Compliance:** When citizens are forced to pay for services they never received, they lose all faith in formal government systems. Compounded by rotting waste in their courtyards, residents naturally revert to illegal midnight cart pushers or dump garbage into open street drains during heavy downpours.

Under **`MANDATE-WAH-04`** and **`MANDATE-GBD-02`**, the Executive Boardroom mandated the deployment of the **Dual-Key Citizen Verification & Escrow Protection Engine (`RES-MOD-03`)**:
> *"We will permanently abolish the era where contractors bill for phantom services. No private waste operator in Lagos State shall receive a single Naira from the Sovereign Co-Treasury Escrow based on their own word alone. Service completion requires two keys: the Operator Proof Key (geofenced on-site photo and telematics dwell time) AND the Citizen Verification Key (affirmative confirmation via smartphone, USSD, or WhatsApp). If the truck fails to collect the bin, the citizen's money remains securely locked in escrow. If the operator attempts to cheat, the citizen holds the ultimate financial veto."*

---

## 2. Political Economy of the Streets & Escrow Gating Realities

Designing a balanced, incorruptible escrow clearing engine requires protecting both the vulnerable citizen from contractor neglect and the honest contractor from frivolous or malicious customer disputes.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           POLITICAL ECONOMY & ESCROW CONFLICT MATRIX                             │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│        POWER BLOC             │       OPERATIONAL REALITY        │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Tenement Residents         │ Billed for uncollected waste;    │ Dual-Key Citizen Veto;        │
│    (Household Consumers)      │ zero recourse against operators. │ funds frozen in escrow.       │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Private Concessionaires    │ High fuel costs; tight margins;  │ 24-Hour Silent Auto-Approval; │
│    (AWAMN Truck Owners)       │ fear of malicious payment delays.│ mandatory photo for dispute.  │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. Compactor Drivers          │ Under pressure to meet daily run │ Tri-Factor Proof of Service;  │
│    (Field Collection Crews)   │ quotas; prone to shortcutting.   │ 30m GPS geofence + dwell SLA. │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. LAWMA Area Inspectors      │ Subject to conflicting claims;   │ Section 84 WORM Evidence Log; │
│    (Field Dispute Arbitrators)│ paper logs easily forged.        │ contradictory photo mandate.  │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 5. State Treasury Office      │ Custodian of Sovereign Escrow;   │ Automated Oracle EBS Ledger;  │
│    (Public Co-Treasury)       │ requires legally audited payouts.│ multi-sig cryptographic release│
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 2.1 The Philosophy of Dual-Key Escrow Gating
Under Module 05 (`MOD-05-FINTECH-ESCROW`), citizen monthly waste tariffs are not paid directly into a private contractor’s commercial bank account. Instead, funds are held in the **Lagos State Sovereign Co-Treasury Escrow**. 
- The operator earns the right to withdraw funds *only after* service has been objectively rendered.
- The Dual-Key protocol balances civic protection with contractor cash-flow liquidity:
  1. **Key 1 (Operator Operational Proof $K_{\text{ops}}$):** Generated when the compactor crew scans the physical bin tag and uploads an on-site geotagged photo showing the emptied bin.
  2. **Key 2 (Citizen Verification Key $K_{\text{cit}}$):** Generated when the registered resident affirmatively confirms the pickup.

### 2.2 Forensic Street-Reality Blind Spots & Physical Attack Vectors

#### Blind Spot 1: The "Vindictive Citizen Free-Rider" Vector
- **The Vector:** If residents are granted an unconstrained "Reject" button, dishonest or quarrelsome residents will tap *"REJECT (Trash Still Present)"* even after the driver has emptied their bin, hoping to get free service, stall billing, or force the operator into a discount.
- **Engineered Solution:** **Mandatory Contradictory Photographic Evidence & Malicious Dispute Fine.**
  - A citizen cannot reject a pickup with a single tap.
  - Tapping "REJECT" requires the resident to upload a real-time, geotagged photograph showing the full bin with the compound entrance visible within 12 hours.
  - If a LAWMA Area Monitoring Officer investigates on-site and establishes that the driver properly emptied the bin and the resident filed a fraudulent rejection, the resident's wallet is assessed an automated **₦5,000 Bad-Faith Dispute Surcharge**, legally protecting contractor revenue.

#### Blind Spot 2: The "Silent Resident" Cash-Flow Freeze (Contractor Starvation)
- **The Vector:** In a busy city, many working residents do not check their phones or ignore app push notifications after returning home tired. If escrow payout requires active human confirmation every single week, billions of Naira in earned revenue would remain permanently locked in escrow, bankrupting private operators who must buy diesel daily.
- **Engineered Solution:** **The 24-Hour Silent Auto-Approval Timeout.**
  - When the driver uploads valid on-site proof ($K_{\text{ops}} == \text{VALID}$), a 24-hour countdown clock initiates on the clearinghouse bus.
  - If the resident confirms, funds release immediately.
  - If the resident fails to respond or file a dispute within **24 hours (1,440 minutes)**, the system automatically transitions to `AUTO_TIMEOUT_CONFIRMED`, releasing 100% of the reserved funds to the operator's ledger.

#### Blind Spot 3: The "Recycled Proof Photo" Fraud
- **The Vector:** Rogue truck drivers take one clear photo of an emptied bin on Monday, save the image on their smartphone gallery, and re-upload the same photo for the next three weeks while skipping the compound entirely.
- **Engineered Solution:** **Cryptographic EXIF Time-Locking & Lens Liveness Verification.**
  - The driver's terminal application strictly disables file gallery selection; photos must be captured through the live camera API.
  - The photo stream captures embedded hardware gyroscope tilt angles, solar azimuth, and GPS clock timestamps.
  - Server-side image perceptual hashing (pHash) compares incoming proofs against historical uploads for that parcel. If similarity $>92\%$, the upload is flagged as a duplicate photo forgery, the driver's device is locked, and an operational fraud strike is levied against the concessionaire.

#### Blind Spot 4: Harmonization with the 48-Hour Operational Cure Window
- **The Vector:** If an operator suffers a genuine mechanical breakdown (e.g. blown hydraulic hose or cracked chassis) on Friday morning, immediately cancelling the contract or penalizing the operator destroys the waste collection fleet.
- **Engineered Solution:** **Harmonized 48-Hour Cure SLA Escalation Ladder.**
  - If a scheduled pickup is missed, the Resident App flags `OPERATOR_IN_CURE_WINDOW`.
  - The operator is granted a statutory 48-hour cure window under Module 05 to deploy a relief truck.
  - If unevacuated at 48 hours, the escrow automatically refunds the resident's wallet, levies an SLA strike penalty against the PSP's liquidity reserve, and auto-dispatches a backup municipal relief compactor.

---

## 3. Mathematical & Algorithmic Formulations

### 3.1 Dual-Key Escrow Settlement Truth Function
Let $K_{\text{ops}} \in \{0, 1\}$ represent the operational proof generated by the compactor telematic terminal, and let $K_{\text{cit}} \in \{\text{CONFIRM}, \text{REJECT}, \text{TIMEOUT}\}$ represent the resident's response.

The Escrow Financial State Transition $S_{\text{escrow}}(t)$ is governed by:

$$S_{\text{escrow}}(t) = \begin{cases}
\text{SETTLE\_TO\_OPERATOR}, & \text{if } K_{\text{ops}} = 1 \land (K_{\text{cit}} = \text{CONFIRM} \lor (K_{\text{cit}} = \text{TIMEOUT} \land t \ge t_0 + 24\text{h})) \\
\text{FREEZE\_DISPUTE\_AUDIT}, & \text{if } K_{\text{ops}} = 1 \land K_{\text{cit}} = \text{REJECT} \land \text{Photo}_{\text{dispute}} == \text{VALID} \\
\text{DISPUTE\_DISMISSED}, & \text{if } K_{\text{ops}} = 1 \land K_{\text{cit}} = \text{REJECT} \land \text{Photo}_{\text{dispute}} == \text{INVALID} \\
\text{AUTO\_REFUND\_CITIZEN}, & \text{if } K_{\text{ops}} = 0 \land t \ge t_{\text{schedule}} + 48\text{h}
\end{cases}$$

### 3.2 Image Perceptual Hashing & Duplicate Fraud Detection
To prevent drivers re-uploading identical gallery photos across weeks, incoming proof images undergo discrete cosine transform (DCT) perceptual hashing:

$$\text{pHash}(\text{Img}) = \text{Sign}\left( \text{DCT}_{8\times8}(\text{Luminance}(\text{Img})) - \text{Median}(\text{Coefficients}) \right)$$

$$\text{Hamming Distance:} \quad D_H(\text{Hash}_{\text{new}}, \text{Hash}_{\text{historical}}) = \sum_{b=1}^{64} (\text{Hash}_{\text{new}}[b] \oplus \text{Hash}_{\text{historical}}[b])$$

$$\text{Fraud Detection Rule:} \quad \text{If } D_H \le 4 \implies \text{Flag Duplicate Photo Forgery (`ERR-FORGE-PHOTO`)}$$

### 3.3 Dynamic PSP SLA Reliability Scoring
Every completed or disputed pickup updates the concessionaire's public reliability rating $R_{\text{PSP}}$:

$$R_{\text{PSP}} = \left( \frac{N_{\text{confirmed}} + 0.85 \times N_{\text{timeout}}}{N_{\text{scheduled}}} \right) \times 100\% - \left( 5.0 \times N_{\text{verified\_ghosts}} \right)$$

Where:
- $N_{\text{confirmed}}$ is affirmative citizen confirmations.
- $N_{\text{timeout}}$ is un-disputed 24-hour auto-settlements.
- $N_{\text{verified\_ghosts}}$ is confirmed fraudulent completions investigated by LAWMA Area Inspectors.
- Concessionaires with $R_{\text{PSP}} < 75\%$ face statutory zone revocation under EMPL Section 89.

### 3.4 Operator Fraud Strike Escalation Ladder
When ghost completions or recycled photo forgeries are verified by the Central Command Room, the clearinghouse applies an automated statutory sanction ladder:

$$\text{Sanction}(\text{Strike}_k) = \begin{cases}
₦25,000 \text{ Administrative Fine} + \text{Mandatory 12h Reclean}, & \text{for } k = 1 \\
₦100,000 \text{ Escalated Penalty} + 14\text{-Day Escrow Payout Freeze}, & \text{for } k = 2 \\
\text{Immediate Zone Concession Revocation} + \text{Criminal Prosecution Referral}, & \text{for } k \ge 3
\end{cases}$$

### 3.5 Cryptographic Citizen Verification Token (Ed25519)
Every affirmative confirmation or dispute submission is signed on-device or at the telco USSD switch with an Ed25519 signature:

$$\text{Sig}_{\text{token}} = \text{Ed25519\_Sign}\left( K_{\text{private}}, \text{PickupID} \parallel \text{Timestamp} \parallel \text{Action} \parallel \text{PhotoHash} \right)$$

This token is stored immutably in the sovereign WORM vault, permanently preventing operators from claiming that customer records were administratively tampered with by government officials.

---

## 4. Comprehensive Epics & Detailed User Stories

### Epic 3.1: Interactive Citizen Dual-Key Pickup Verification (`VERIF-PUSH-*`)
Empower residents to review and confirm physical waste collections through accessible, zero-friction dialogs.

#### User Story 3.1.1: Interactive Push & Photo Verification Dialog
- **As a** Tenement Compound Representative,
- **I want** to see the driver’s on-site photo and confirm whether our bins were properly emptied,
- **So that** our compound is not debited for an uncompleted pickup.
- **Acceptance Criteria:**
  - **GIVEN** a collection crew completing a pickup at the compound gate,
  - **WHEN** the driver uploads proof in the Operator App,
  - **THEN** display an interactive modal on the Resident App containing: the timestamped photo, driver name, truck plate number, and two buttons: [CONFIRM (Bin Cleared)] and [REJECT (Still Full)]; render a 24-hour countdown timer indicating automated settlement deadline.

#### User Story 3.1.2: Reverse-Billed USSD Dual-Key Confirmation (`*384*22#`)
- **As a** Feature phone user without internet access,
- **I want** to receive an SMS prompt and dial a short-code to confirm pickup,
- **So that** I have equal verification power regardless of device type.
- **Acceptance Criteria:**
  - **GIVEN** a resident without active mobile data,
  - **WHEN** the driver submits completion proof,
  - **THEN** dispatch an automated SMS: *"LAWMA Alert: Truck KTU-482-XA claims pickup at 14:15. Dial *384*22*1# to CONFIRM, or *384*22*2# to REJECT."*; execution of the USSD string is reverse-billed to LAWMA (100% free of charge to citizen).

---

### Epic 3.2: Contradictory Dispute Adjudication & Anti-Ghost Protection (`DISPUTE-ADJ-*`)
Provide an objective, evidence-based dispute resolution process that protects both parties.

#### User Story 3.2.1: Citizen Dispute Filing with Contradictory Photo
- **As a** Resident whose bin was skipped,
- **I want** to challenge a false completion by uploading a photo of our full bin,
- **So that** our escrow funds are protected and the operator is held accountable.
- **Acceptance Criteria:**
  - **GIVEN** a resident tapping "REJECT",
  - **WHEN** they submit the dispute,
  - **THEN** mandate the capture of a live geotagged photo showing the uncollected bin; immediately freeze escrow release; dispatch an automated alert to the LAWMA Area Inspector and the PSP dispatch manager; issue an official Dispute Reference ID (`DISP-*`).

#### User Story 3.2.2: Malicious Dispute Detection & Investigation Surcharge
- **As a** Licensed PSP Operator,
- **I want** protection against dishonest residents who falsely claim we didn't collect their waste,
- **So that** our business is not unfairly penalized by chronic complainers.
- **Acceptance Criteria:**
  - **GIVEN** a dispute flagged for on-site inspection,
  - **WHEN** the LAWMA Area Inspector verifies that the bin was properly emptied and the resident submitted a fraudulent challenge,
  - **THEN** dismiss the dispute, release the escrow funds to the PSP, and debit an automated ₦5,000 Bad-Faith Dispute Surcharge from the resident's compound wallet.

#### User Story 3.2.3: Photographic Contradiction AI Pre-Screening
- **As the** Automated Dispute Classifier,
- **I want** to analyze the resident's contradictory dispute photo using computer vision before dispatching a human inspector,
- **So that** obvious false claims or blank camera uploads are intercepted immediately.
- **Acceptance Criteria:**
  - **GIVEN** an incoming resident dispute photograph,
  - **WHEN** the vision pipeline evaluates the image,
  - **THEN** verify that the photo contains an unemptied waste container and valid compound metadata; if the image is black, blurry, or depicts an unrelated scene, immediately prompt the resident for re-capture within 2 hours, failing which the dispute is dismissed.

---

### Epic 3.3: 48-Hour Cure Window & Automated Citizen Reimbursement (`CURE-REIMB-*`)
Enforce contractual SLA timelines and execute automatic wallet reimbursements when service fails completely.

#### User Story 3.3.1: Automated 48-Hour Failure Refund
- **As a** Resident whose collection was missed due to a truck breakdown,
- **I want** an automatic refund if the operator fails to clear our waste within 48 hours,
- **So that** our money is never tied up indefinitely.
- **Acceptance Criteria:**
  - **GIVEN** an active pickup request where the operator logged a breakdown or failed to arrive,
  - **WHEN** the 48-hour cure window expires with zero verified completion proof,
  - **THEN** release the reserved escrow funds back to the resident's compound wallet; apply an automatic ₦1,000 goodwill credit sponsored by the operator's penalty reserve; trigger an automated dispatch to the LAWMA Municipal Relief Fleet.

#### User Story 3.3.2: Automated Municipal Relief Compactor Dispatch
- **As a** Wards Sanitation Supervisor,
- **I want** the system to automatically mobilize a LAWMA backup compactor when a private operator breaches their 48-hour cure window,
- **So that** neighborhoods do not suffer health crises due to private contractor failure.
- **Acceptance Criteria:**
  - **GIVEN** an expired 48-hour cure window in any cadastral polygon,
  - **WHEN** the escrow refund executes,
  - **THEN** generate a priority emergency work order dispatched to the nearest LAWMA direct-labor depot (Simpson or Ijora); bill the emergency intervention cost (₦35,000 per compound) directly to the defaulting concessionaire's escrow balance.

---

## 5. Technical Architecture, State Machines & Database Schemas

### 5.1 Dual-Key Escrow Verification Lifecycle State Machine

```
                              ┌──────────────────────────────────────────┐
                              │            PREPAID / HELD                │
                              │     (Tariff Reserved in Sovereign Escrow)│
                              └────────────────────┬─────────────────────┘
                                                   │
                              Driver Dwells >= 45s & Uploads Valid Photo Proof
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │        DUAL-KEY CHALLENGE ACTIVE         │
                              │     (24-Hour Interactive Countdown)      │
                              └──────┬────────────────────────────┬──────┘
                                     │                            │
             Resident Taps CONFIRM   │                            │ Resident Taps REJECT
             OR 24-Hour Timeout      │                            │ (Contradictory Photo Submitted)
                                     ▼                            ▼
                 ┌───────────────────────────┐   ┌─────────────────────────────────────────┐
                 │       SETTLED TO PSP      │   │         ESCROW FROZEN_DISPUTE           │
                 │  (Funds Credited to PSP)  │   │     (LAWMA Area Inspection Dispatched)  │
                 └───────────────────────────┘   └──────┬────────────────────────────┬─────┘
                                                        │                            │
                                   Inspector Verifies   │                            │ Inspector Verifies
                                   Driver Skipped House │                            │ Resident Lied
                                                        ▼                            ▼
                                    ┌───────────────────────────┐┌───────────────────────────┐
                                    │    FULL CITIZEN REFUND    ││   MALICIOUS DISPUTE FINE  │
                                    │ (₦25k Operator SLA Strike)││ (₦5k Surcharge Debited)   │
                                    └───────────────────────────┘└───────────────────────────┘
```

### 5.2 PostgreSQL / Supabase Schema (DDL)

```sql
-- Module 03: Dual-Key Citizen Verification & Gated Escrow Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Dual-Key Pickup Verifications Master Ledger
CREATE TABLE customer_pickup_verifications (
    verification_id VARCHAR(64) PRIMARY KEY, -- E.g., 'VERIF-20261113-08812'
    pickup_manifest_id VARCHAR(64) NOT NULL UNIQUE,
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    assigned_psp_id VARCHAR(32) NOT NULL,
    reserved_escrow_amount_naira NUMERIC(10, 2) NOT NULL,
    driver_onsite_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    driver_photo_uri VARCHAR(256) NOT NULL,
    driver_photo_phash VARCHAR(64) NOT NULL,
    driver_coordinates GEOMETRY(Point, 4326) NOT NULL,
    driver_dwell_seconds INTEGER NOT NULL,
    challenge_sent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    auto_settlement_deadline TIMESTAMP WITH TIME ZONE NOT NULL, -- challenge_sent + 24 hours
    citizen_response_state VARCHAR(32) NOT NULL DEFAULT 'PENDING_CITIZEN_REPLY' 
        CHECK (citizen_response_state IN ('PENDING_CITIZEN_REPLY', 'CONFIRMED_CLEARED', 'REJECTED_STILL_DIRTY', 'AUTO_TIMEOUT_CONFIRMED')),
    citizen_response_timestamp TIMESTAMP WITH TIME ZONE,
    citizen_response_channel VARCHAR(16) CHECK (citizen_response_channel IN ('PWA_PUSH', 'USSD', 'WHATSAPP', 'SMS')),
    escrow_clearance_state VARCHAR(32) NOT NULL DEFAULT 'HELD_IN_ESCROW' 
        CHECK (escrow_clearance_state IN ('HELD_IN_ESCROW', 'SETTLED_TO_PSP', 'FROZEN_DISPUTE', 'REFUNDED_TO_CITIZEN')),
    settled_at TIMESTAMP WITH TIME ZONE,
    oracle_ebs_journal_ref VARCHAR(64)
);

-- 2. Contradictory Dispute Cases
CREATE TABLE customer_pickup_disputes (
    dispute_id VARCHAR(64) PRIMARY KEY, -- E.g., 'DISP-20261113-0042'
    verification_id VARCHAR(64) NOT NULL UNIQUE REFERENCES customer_pickup_verifications(verification_id),
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    dispute_category VARCHAR(32) NOT NULL 
        CHECK (dispute_category IN ('TRUCK_NEVER_ARRIVED', 'BIN_HALF_EMPTIED', 'GATE_LOCKED_CONTESTED', 'SPILLAGE_ON_GROUND')),
    resident_dispute_notes TEXT NOT NULL,
    resident_photo_proof_uri VARCHAR(256) NOT NULL,
    resident_photo_coordinates GEOMETRY(Point, 4326) NOT NULL,
    filed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    assigned_inspector_id VARCHAR(32),
    inspection_findings VARCHAR(32) DEFAULT 'PENDING_INVESTIGATION' 
        CHECK (inspection_findings IN ('PENDING_INVESTIGATION', 'OPERATOR_DEFAULT_CONFIRMED', 'RESIDENT_MALICIOUS_DISPUTE', 'INCONCLUSIVE_MUTUAL_FAULT')),
    adjudicated_at TIMESTAMP WITH TIME ZONE,
    penalty_levied_amount_naira NUMERIC(10, 2) DEFAULT 0.00
);

-- Indices for Fast Clearing and Dispute Audits
CREATE INDEX idx_verif_deadline ON customer_pickup_verifications(auto_settlement_deadline, citizen_response_state);
CREATE INDEX idx_verif_compound ON customer_pickup_verifications(compound_id, challenge_sent_timestamp DESC);
CREATE INDEX idx_dispute_findings ON customer_pickup_disputes(inspection_findings, filed_at);
```

---

## 6. RESTful Service & Enterprise Event Bus Specifications

### 6.1 OpenAPI 3.1 REST Endpoints

```yaml
openapi: 3.1.0
info:
  title: LAWMA Dual-Key Verification & Escrow Clearing API
  version: 4.0.0
  description: Sovereign endpoints for citizen confirmation, dispute filing, and automated escrow settlement.
paths:
  /v4/resident/pickups/{pickup_id}/verify:
    post:
      summary: Submit Citizen Dual-Key Confirmation or Challenge
      parameters:
        - name: pickup_id
          in: path
          required: true
          schema: { type: string, example: "PCK-20261113-8831" }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [verification_action]
              properties:
                verification_action:
                  type: string
                  enum: [CONFIRM_CLEARED, CHALLENGE_DISPUTE]
                dispute_reason:
                  type: string
                  enum: [TRUCK_NEVER_ARRIVED, BIN_HALF_EMPTIED, GATE_LOCKED_CONTESTED, SPILLAGE_ON_GROUND]
                dispute_photo_uri:
                  type: string
                  format: uri
      responses:
        '200':
          description: Verification processed. Escrow released or frozen.
          content:
            application/json:
              schema:
                type: object
                properties:
                  verification_id: { type: string }
                  escrow_status: { type: string, enum: [SETTLED_TO_PSP, FROZEN_DISPUTE] }

  /v4/resident/escrow/auto-timeout-batch:
    post:
      summary: Execute 24-Hour Silent Auto-Settlement Batch (Cron Engine)
      security:
        - SovereignCronKey: []
      responses:
        '200':
          description: Eligible pickups auto-settled to PSP ledgers.
```

### 6.2 Enterprise Kafka Event Schemas

#### Event: `escrow.citizen_verification.confirmed`
```json
{
  "event_id": "EVT-VKEY-20261113-1015",
  "event_type": "escrow.citizen_verification.confirmed",
  "timestamp": "2026-11-13T10:15:00Z",
  "data": {
    "verification_id": "VERIF-20261113-08812",
    "compound_id": "CMP-AGEGE-0482",
    "psp_id": "PAR-006",
    "amount_naira": 600.00,
    "confirmation_source": "CITIZEN_PWA_PUSH",
    "oracle_ebs_ref": "GL-20261113-98124"
  }
}
```

#### Event: `escrow.dispute.flagged`
```json
{
  "event_id": "EVT-DISP-20261113-1022",
  "event_type": "escrow.dispute.flagged",
  "timestamp": "2026-11-13T10:22:00Z",
  "data": {
    "dispute_id": "DISP-20261113-0042",
    "verification_id": "VERIF-20261113-08812",
    "compound_id": "CMP-AGEGE-0482",
    "psp_id": "PAR-006",
    "dispute_category": "TRUCK_NEVER_ARRIVED",
    "inspector_ticket_id": "INSP-AGEGE-7842"
  }
}
```

---

## 7. Field Defense Playbooks & Resident Legal Protections

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   FIELD DEFENSE PLAYBOOK: DUAL-KEY & ESCROW DISPUTE PROTOCOLS                    │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│       CHALLENGE VECTOR        │       OPERATIONAL VULNERABILITY  │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. "Ghost Completion" Fraud   │ Driver marks "Done" without      │ Tri-Factor Proof of Service;  │
│    (Skipped Interior Alleys)  │ collecting waste from compound.  │ Mandatory Citizen Veto Key.   │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Dishonest Citizen Dispute  │ Resident lies to get free waste  │ Mandatory Contradictory Photo;│
│    (Malicious Rejection)      │ collection service.              │ ₦5k bad-faith surcharge.      │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. Recycled Photo Forgery     │ Driver re-uploads old gallery    │ Cryptographic Perceptual pHash│
│    (Fake Driver Proof)        │ image from previous week.        │ live camera hardware lock.    │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Operator Cash Flow Freeze  │ Citizens ignore app push alerts; │ 24-Hour Silent Auto-Settlement│
│    (Working Capital Starved)  │ funds sit locked in escrow.      │ timeout to operator ledger.   │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 7.1 Area Inspector Dispute Adjudication Standard Operating Procedure
1. Upon issuance of an automated `escrow.dispute.flagged` event, the assigned LAWMA Area Monitoring Officer must inspect the compound within 24 hours.
2. The officer evaluates the contradictory evidence:
   - Does the driver's upload match the compound's physical gate and bin tag?
   - Does the resident's photo show full bins containing household waste?
3. If the inspector confirms the operator skipped the compound:
   - Escrow funds are refunded to the resident.
   - The operator is debited a ₦25,000 operational failure penalty and given 12 hours to evacuate the waste.
4. If the inspector confirms the resident filed a false dispute:
   - The dispute is dismissed with prejudice.
   - The resident's compound wallet is debited ₦5,000 for administrative investigation costs.

---

## 8. Statutory Verification, Evidence Act Section 84 & Executive Sign-off Matrix

All on-site photographic evidence, perceptual hash digests, and citizen verification events are strictly formatted to meet the admissibility standards of **Section 84 of the Nigerian Evidence Act 2011**.

### 8.1 Courtroom Evidentiary Certificate Template

```
IN THE SPECIAL OFFENCES COURT OF LAGOS STATE
HOLDEN AT IKEJA / OSHODI, LAGOS
BEFORE HIS WORSHIP: [MAGISTRATE NAME]

CHARGE NO: MEWR/ENV/2026/[NUMBER]
BETWEEN:
LAGOS STATE MINISTRY OF THE ENVIRONMENT & WATER RESOURCES ...... COMPLAINANT
AND
[CONCESSIONAIRE NAME / DEFENDANT NAME] ......................... DEFENDANT

CERTIFICATE OF AUTHENTICITY OF DUAL-KEY ELECTRONIC RECORDS
(PURSUANT TO SECTION 84 OF THE NIGERIAN EVIDENCE ACT, 2011)

I, [OFFICER NAME], Senior Escrow Systems Auditor, 
LAWMA Regulatory Command Room, do hereby solemnly declare and certify as follows:

1. That I am the designated systems custodian of the Dual-Key Citizen Verification 
   and Sovereign Escrow Clearing Engine (Module RES-03).
2. That on the [DATE], at [TIME], the automated clearinghouse generated Verification 
   Record [VERIF_ID], recording that Driver Asset [VEHICLE_ID] uploaded Proof Image 
   [PHOTO_URI] with Perceptual Hash Digest [PHASH].
3. That on the [DATE], at [TIME], Resident User [USER_ID] logged a verified Electronic 
   Rejection under Dispute Ref [DISP_ID], disproving contractor completion claims.
4. That the database servers, perceptual hashing engines, and cryptographic escrow 
   ledgers were operating properly and under continuous administrative integrity control, 
   without unauthorized alteration or data corruption.

DATED THIS ______ DAY OF ________________ 2026.

_______________________________________
DEPONENT / ESCROW AUDITOR SIGNATURE
```

### 8.2 Executive Sign-off & Inter-Agency Governance Matrix

| Verification Pillar | Legal / Regulatory Benchmark | Acceptance Threshold | Auditing Authority |
| :--- | :--- | :--- | :--- |
| **Escrow Fiduciary Duty**| Public Finance Management Law (2011) | 0% premature payouts without verified Dual-Key confirmation or 24-hr timeout. | State Treasury Office (STO) |
| **Consumer Protection** | FCCPA 2018 / EMPL 2017 Section 45 | 100% of resident disputes adjudicated within 24 hours by on-site inspectors. | Customer Advocacy Directorate |
| **Fraud Prevention** | Cybercrimes Act 2015 | Duplicate photo forgery detection accuracy $\ge 99.8\%$ via perceptual pHash. | Ministry of Science and Technology |
| **Operator Liquidity** | Sovereign Concession Agreement SLA | Automated 24-hr timeout release executed for $>90\%$ of uncontested runs. | AWAMN Executive Committee |
| **Sovereign Quorum** | Ministerial Sovereign Sign-Off | Signed off by Hon. Tokunbo Wahab & MD Dr. Muyiwa Gbadegesin. | Lagos State Executive Council |
