# API & CROSS-APP MESSAGE CONTRACT: LAWMA 360 RESIDENT APP

**Document Identifier:** LAWMA-API-RESIDENT-APP-V4  
**Document Version:** 4.0 (Enterprise Cross-App Synchronization Edition)  
**System Scope:** RESTful Endpoints, Webhook Integrations & Supabase Cross-App Message Bus Schemas  
**Target Codebase:** `LAWMA-360-customer-app` (`src/lib/hub.functions.ts`, `src/lib/hub-contract.ts`)  
**Companion Architecture:** `LAWMA-PRD-RESIDENT-APP-V4`  

---

## 1. Architectural Overview & Inter-App Topology

The **LAWMA 360 Resident Mobile Application** operates within a distributed multi-app municipal mesh comprising:
1. **The Resident App (`customer`):** The citizen-facing interface managing fractional room wallets, dual-key verification, pre-storm alerts, and anonymous reporting.
2. **The Operator Crew App (`operator`):** The rugged handheld terminal used by compactor truck crews for geofenced on-site proof capture and proximity beaconing.
3. **The Partner Hub (`partner`):** The private concessionaire operations console managing commercial routes, vehicle maintenance, and driver assignments.
4. **The Regulatory Command Room (`lawma`):** The sovereign government workspace managing the Co-Treasury Escrow, Section 102 LGA allocations, and KAI enforcement.

Cross-app state transitions are synchronized asynchronously via the **Sovereign Message Hub (`app_messages`)** backed by Supabase PostgreSQL with Webhooks and Server-Sent Events (SSE).

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                            CROSS-APP MESSAGE TOPOLOGY & DATA BUS                                 │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│          PRODUCER             │          MESSAGE TYPE            │           CONSUMER            │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Operator (Crew App)           │ `pickup.proximity_alert`         │ Customer (Resident App)       │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Operator (Crew App)           │ `pickup.onsite_proof`            │ Customer & Sovereign Hub      │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Customer (Resident App)       │ `pickup.dual_key_response`       │ Sovereign Hub & Partner Hub   │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Sovereign Hub (Workspace)     │ `nimet.storm_warning`            │ Customer (Affected Basins)    │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Sovereign Hub (Workspace)     │ `whistleblower.bounty_disbursed` │ Customer (Hashed Line)        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ Partner (Recovery Agent)      │ `recycling.credit_applied`       │ Customer (Compound Wallet)    │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

---

## 2. OpenAPI 3.1 REST Specifications

```yaml
openapi: 3.1.0
info:
  title: LAWMA Resident Mobile Gateway API
  version: 4.0.0
  description: Sovereign REST API supporting multi-tenant compounds, dual-key pickup confirmation, pre-storm alerts, and anonymous civic whistleblowing.
paths:
  /v4/resident/compounds/{compound_id}:
    get:
      summary: Retrieve Compound Roster and Master Tariff Band
      parameters:
        - name: compound_id
          in: path
          required: true
          schema:
            type: string
            example: "CMP-AGEGE-0482"
      responses:
        '200':
          description: Compound profile retrieved successfully.
          content:
            application/json:
              schema:
                type: object
                required: [compound_id, cadastre_parcel_id, address, master_tariff_naira, active_rooms]
                properties:
                  compound_id: { type: string }
                  cadastre_parcel_id: { type: string, example: "LASG-CAD-AGE-98124" }
                  address: { type: string, example: "14 Olowu Street, Agege, Lagos" }
                  master_tariff_naira: { type: number, example: 9600.00 }
                  active_rooms:
                    type: array
                    items:
                      type: object
                      properties:
                        room_id: { type: string }
                        room_label: { type: string, example: "Room 4" }
                        fractional_share_naira: { type: number, example: 600.00 }
                        compliance_status: { type: string, enum: [COMPLIANT_PAID, PENDING_TOPUP, IN_ARREARS] }

  /v4/resident/pickups/{pickup_id}/dual-key-verify:
    post:
      summary: Submit Citizen Dual-Key Pickup Confirmation
      parameters:
        - name: pickup_id
          in: path
          required: true
          schema:
            type: string
            example: "PCK-20261113-8831"
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
                  enum: [TRUCK_NEVER_ARRIVED, BIN_HALF_EMPTIED, GATE_LOCKED_DISPUTE, LITTER_LEFT_ON_GROUND]
                dispute_photo_uri:
                  type: string
                  format: uri
      responses:
        '200':
          description: Verification recorded. Escrow release executed or frozen.
          content:
            application/json:
              schema:
                type: object
                properties:
                  pickup_id: { type: string }
                  escrow_state: { type: string, enum: [SETTLED_TO_PSP, FROZEN_DISPUTE, AUTO_REFUNDED] }

  /v4/resident/whistleblower/submit-anonymous:
    post:
      summary: Submit Cryptographically Masked Civic Infraction Tip
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [raw_phone_number, infraction_category, description, coordinates]
              properties:
                raw_phone_number:
                  type: string
                  example: "+2348030001122"
                infraction_category:
                  type: string
                  enum: [ILLEGAL_CART_PUSHER, GUTTER_RAIN_DUMPING, LANDLORD_SEWAGE_DUMP, CLINICAL_SHARPS_IN_DOMESTIC, ROGUE_LGA_EXTORTION]
                description:
                  type: string
                  example: "Cart pushers dumping 10 bags of rotting offal into the canal bridge at 01:30 AM."
                evidence_photo_uri:
                  type: string
                  format: uri
                coordinates:
                  type: object
                  required: [latitude, longitude]
                  properties:
                    latitude: { type: number, example: 6.5244 }
                    longitude: { type: number, example: 3.3792 }
      responses:
        '201':
          description: Anonymous tip ingested. Phone number hashed with HMAC-SHA256. Bounties linked.

  /v4/resident/pre-storm/emergency-skips:
    get:
      summary: Query Nearest Active Emergency Skips During Pre-Storm Surge
      parameters:
        - name: latitude
          in: query
          required: true
          schema: { type: number, example: 6.5244 }
        - name: longitude
          in: query
          required: true
          schema: { type: number, example: 3.3792 }
        - name: radius_meters
          in: query
          schema: { type: integer, default: 800 }
      responses:
        '200':
          description: Active emergency skips within basin.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    skip_id: { type: string }
                    location_name: { type: string }
                    distance_meters: { type: number }
                    capacity_cubic_meters: { type: number }
                    operating_status: { type: string, enum: [READY_FOR_USE, FULL_EVACUATION_QUEUED] }
```

---

## 4. Cross-App Message Hub Schemas (`app_messages`)

The `app_messages` table provides an immutable, append-only synchronization fabric across all four operational applications:

```sql
CREATE TABLE app_messages (
    id VARCHAR(64) PRIMARY KEY, -- E.g., 'MSG-20261113-094122'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    from_app VARCHAR(16) NOT NULL CHECK (from_app IN ('customer', 'operator', 'partner', 'lawma')),
    to_app VARCHAR(16) NOT NULL CHECK (to_app IN ('customer', 'operator', 'partner', 'lawma', 'broadcast')),
    type VARCHAR(48) NOT NULL,
    ref VARCHAR(64), -- E.g., Pickup ID, Incident ID, or Compound ID
    payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

CREATE INDEX idx_msg_routing ON app_messages(to_app, created_at DESC);
CREATE INDEX idx_msg_ref ON app_messages(ref);
```

### 4.1 Event Definitions

#### 1. `pickup.proximity_alert` (Operator $\to$ Customer)
Emitted by the compactor truck telematic edge when crossing a 1.5km geofence of an active pickup corridor:
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

#### 2. `pickup.onsite_proof` (Operator $\to$ Customer & Hub)
Emitted when the truck driver completes bin evacuation at the gate, initiating the citizen confirmation window:
```json
{
  "id": "MSG-PROOF-20261113-1002",
  "from_app": "operator",
  "to_app": "customer",
  "type": "pickup.onsite_proof",
  "ref": "PCK-20261113-8831",
  "payload": {
    "pickup_id": "PCK-20261113-8831",
    "compound_id": "CMP-AGEGE-0482",
    "proof_photo_uri": "https://storage.lawma.gov.ng/proofs/20261113/pck-8831.jpg",
    "driver_onsite_time": "2026-11-13T10:01:42Z",
    "gps_accuracy_meters": 4.2,
    "bins_serviced_count": 2
  }
}
```

#### 3. `pickup.dual_key_response` (Customer $\to$ Hub & Partner)
Emitted when the resident confirms or challenges the pickup:
```json
{
  "id": "MSG-VKEY-20261113-1015",
  "from_app": "customer",
  "to_app": "lawma",
  "type": "pickup.dual_key_response",
  "ref": "PCK-20261113-8831",
  "payload": {
    "pickup_id": "PCK-20261113-8831",
    "compound_id": "CMP-AGEGE-0482",
    "citizen_status": "CONFIRMED_CLEARED",
    "response_channel": "PWA_PUSH",
    "settlement_action": "RELEASE_ESCROW_TO_PSP"
  }
}
```

#### 4. `nimet.storm_warning` (Workspace $\to$ Customer Broadcast)
Emitted to all registered customer lines in high-risk coastal drainage catchments upon NiMet radar alert:
```json
{
  "id": "MSG-STORM-20261113-1200",
  "from_app": "lawma",
  "to_app": "customer",
  "type": "nimet.storm_warning",
  "ref": "BASIN-SYS-63-SUR",
  "payload": {
    "basin_name": "System 63 Surulere Catchment",
    "predicted_rainfall_mm": 58.4,
    "storm_window_start": "2026-11-14T06:00:00Z",
    "warning_text_pidgin": "Heavy rain dey come tomorrow morning. No dump dirt inside gutter! We don drop free big skips near your junction.",
    "emergency_skip_coordinates": [
      { "name": "Idi-Araba Junction Skip", "lat": 6.5182, "lng": 3.3541 },
      { "name": "Lawanson Roundabout Skip", "lat": 6.5124, "lng": 3.3589 }
    ]
  }
}
```

#### 5. `whistleblower.bounty_disbursed` (Workspace $\to$ Customer)
Emitted to trigger an automated blind airtime/mobile money voucher to an anonymous civic whistleblower:
```json
{
  "id": "MSG-BOUNTY-20261113-1440",
  "from_app": "lawma",
  "to_app": "customer",
  "type": "whistleblower.bounty_disbursed",
  "ref": "WHISTLE-ANON-20261113-0941",
  "payload": {
    "hashed_reporter_phone": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "bounty_amount_naira": 10000.00,
    "disbursement_channel": "AIRTIME_DIRECT_RECHARGE",
    "telco_switch_reference": "NIBSS-AIR-981249-KW"
  }
}
```

---

## 5. Security, Cryptographic Protocols & Privacy Guardrails

1. **Section 84 Evidence Act 2011 Compliance:** Every API transaction generates an immutable cryptographic event log incorporating server timestamp, device IP, and SHA-256 payload digest.
2. **NDPA 2023 Identity Masking:** PII is encrypted at rest using AES-256. Public verification endpoints (e.g. looking up a compound status) return masked names (`Babatunde A.`, `Room 4`).
3. **Whistleblower Non-Repudiation:** Informant telephone lines are protected by one-way HMAC-SHA256 hashing salted with an offline ministerial pepper key rotated quarterly.
