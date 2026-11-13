# PRODUCT LEVEL DOCUMENT: MODULE 02 (`RES-MOD-02-TRACKING`)
## Compactor Live Tracking, Proximity Geofence Alerts & Arrival Telemetry Engine

**Document Identifier:** LAWMA-PLD-RES-02-TRACKING  
**Document Version:** 4.0 (Courtroom-Grade Civic Protection Edition)  
**System Role:** Real-Time Compactor Telematics Ingestion, Corridor Geofencing, Proximity Alerting & Curb-Side Dwell-Time Minimization  
**Target Codebase:** `LAWMA-360-customer-app` (`src/routes/activity.tsx`, `src/routes/index.tsx`, `src/lib/customer-model.ts`)  
**Deployment Targets:** Progressive Web App (Low-Bandwidth SSE Map), Reverse-Billed SMS Broadcast Gateway, WhatsApp Cloud Webhook, USSD Status Query  
**Statutory Foundation:** 2017 Lagos State Environmental Management and Protection Law (EMPL) Sections 45, 63 & 88; Lagos State Transport Sector Reform Law 2018; Cybercrimes (Prohibition, Prevention, etc.) Act 2015; Nigerian Evidence Act 2011 Section 84  
**Executive Boardroom Sponsors:**
- **Hon. Tokunbo Wahab**, Honourable Commissioner, Ministry of the Environment and Water Resources (MEWR)
- **Dr. Muyiwa Gbadegesin**, Managing Director / CEO, Lagos State Waste Management Authority (LAWMA)
- **Engr. Olufemi Daramola**, Special Adviser to the Governor on Infrastructure  

---

## 1. Executive Context & Statutory Authority

The physical presence of uncollected solid waste on urban road verges represents the most visible symptom of municipal operational failure in Lagos State. Across high-density arterial corridors—such as Ikorodu Road, Oshodi-Apapa Expressway, LASU-Iba Road, and Old Abeokuta Motor Road—hundreds of metric tons of domestic refuse sit exposed in ripped polyethylene bags for days at a time.

Historically, this failure was driven by severe **Arrival Information Asymmetry**:
1. **The Static Schedule Fiction:** Municipal timetables promised that a private waste compactor truck would service a street on a fixed window (e.g., *"Tuesdays between 08:00 and 12:00"*). However, due to notorious Lagos traffic congestion, fuel queues, mechanical breakdowns, and landfill turnaround delays, compactor trucks frequently arrived 10 hours late, in the middle of the night, or on a completely different day.
2. **The 96-Hour Curb-Side Rot:** Because residents could not predict when the truck would arrive, and terrified of missing collection, households deposited their waste bags on public road verges an average of **72 to 96 hours in advance**. During this dwell time, stray dogs, rodents, and informal scavengers ripped bags open, scattering rotting food scraps and faecal matter into open roadside gutters.
3. **The "Honk and Run" Driver Evasion:** Compactor drivers, operating under intense pressure to complete exhausting collection runs, would drive past narrow compound alleys at 06:15 AM, tap their horn once from 100 meters away, and drive off without stopping, logging the building as *"Gate Locked / Resident Unavailable"*.

Under **`MANDATE-WAH-04`** and **`MANDATE-GBD-02`**, the Executive Boardroom mandated the deployment of the **Compactor Live Tracking & Proximity Geofence Engine (`RES-MOD-02`)**:
> *"We must bridge the information chasm between the waste truck cab and the tenement doorstep. No citizen should be forced to leave decomposing garbage on a public sidewalk for four days because they do not know when the truck will arrive. We will integrate the Resident App directly with the telematic retrofits on all 850 licensed compactor trucks. The system must establish a dynamic 1.5-kilometer corridor geofence. When a compactor enters a neighborhood, the platform must emit an automated 15-minute multi-lingual proximity alert via push notification, SMS, and voice chime, instructing residents: 'Bring your bin out now.' We will collapse curb-side garbage exposure from 96 hours to under 20 minutes across the state."*

---

## 2. Political Economy of the Streets & Telematics Realities

Deploying real-time mobile tracking in the rugged logistics environment of Lagos requires addressing severe physical, telecommunications, and behavioral challenges.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           POLITICAL ECONOMY & LOGISTICS REALITY MATRIX                           │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│        POWER BLOC             │       OPERATIONAL REALITY        │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Working Residents          │ Gone to work by 07:00 AM; gates  │ Live Proximity Geofence Alert;│
│    (Household Heads)          │ padlocked during the day.        │ domestic assistant delegation.│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Compactor Drivers          │ Severe traffic fatigue; diesel   │ Mandatory 45-Second Dwell Time│
│    (Private Concessionaires)  │ incentives; "honk and run" bias. │ Telematics Speed/GPS Logging. │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. Informal Scavengers        │ Slash bags for plastics; dump    │ Curb Dwell Reduction (<20 min)│
│    (Street Bottle Collectors) │ organic waste into gutters.      │ enclosed compound bin mandate.│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Domestic Workers & Kids    │ Actually carry bins to curb; lack│ Audible Multi-Lingual Chime;  │
│    (The Physical Disposers)   │ smartphones or data plans.       │ physical bin NFC/QR plates.   │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 5. Telco Network Ingress      │ Data connections drop in rain;   │ Dual-Path SSE + Reverse-Billed│
│    (MTN, Airtel, Glo, 9mobile)│ 2G/3G signal in zinc tenements.  │ SMS Fallback Broadcast.       │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 2.1 The 15-Minute Domestic Mobilization Window
Empirical field trials in Alimosho and Surulere established that in high-density tenement compounds, the physical process of moving two 240-liter wheeled bins from an interior backyard courtyard through narrow corridors to the front street curb requires between **8 and 12 minutes**. 
- Providing a **15-minute advance proximity notification** provides the optimal window: sufficient time for domestic workers or residents to unlock the gate and wheel the bin out, but brief enough that waste is never left unattended on the public sidewalk.

### 2.2 Forensic Street-Reality Blind Spots & Physical Attack Vectors

#### Blind Spot 1: The "Expressway Flyover False Alarm" (Radial Geofence Failure)
- **The Vector:** Traditional geolocation software draws a simple circular radius (e.g. $R = 1.5\text{ km}$) around a user’s home. In Lagos, a compactor truck traveling at 60 km/h along the elevated flyover of the Third Mainland Bridge, Ikorodu Road Expressway, or Lekki-Epe Expressway passes within 800 meters of thousands of dense residential tenements (e.g., in Oworonshoki, Bariga, or Onipanu). If a raw radius alert triggers, thousands of residents receive false alerts, wheel their bins out to the curb in the rain, and wait for hours for a truck that was merely passing on the highway to a dumpsite.
- **Engineered Solution:** **Corridor-Bound Route Schedule Filtering (`ROUTE-FILTER-*`).**
  - Proximity alerts do *not* fire on spatial radius alone.
  - The compactor's real-time telematic GPS coordinates are matched against its active **Dispatched Route Manifest (`DISPATCH-MANIFEST-*`)** from Module 02.
  - Proximity alerts *only* trigger when:
    1. The truck's active route polygon matches the resident's cadastral ward; AND
    2. The truck transitions from an arterial highway onto a designated local feeder road serving that specific residential street.

#### Blind Spot 2: Severe Battery & Data Drain on Low-End Smartphones
- **The Vector:** Standard consumer ride-hailing maps (e.g., Uber or Bolt) maintain open WebSockets, stream continuous vector map tiles, and render 60 FPS WebGL animations. On low-end Transsion (Tecno/itel) Android Go smartphones with 1GB of RAM, this causes severe processor overheating, thermal throttling, rapid battery depletion, and browser crashes within 3 minutes.
- **Engineered Solution:** **Low-Power Server-Sent Events (SSE) & Static Canvas Rendering.**
  - The live tracking map does not stream continuous raw GPS coordinates.
  - The backend aggregates truck positions into discrete 15-second waypoints transmitted over an ultra-lightweight **Server-Sent Events (SSE)** channel ($<2\text{ KB/min}$).
  - Map rendering uses a static CSS/SVG coordinate canvas rather than heavy WebGL libraries, maintaining sub-5% CPU utilization on 1GB RAM devices.

#### Blind Spot 3: The "Honk and Run" Evasion Fraud
- **The Vector:** A driver arrives at a compound, taps their horn once from 50 meters away, and accelerates away without stopping, falsely claiming on their terminal that the resident was absent or the gate was locked.
- **Engineered Solution:** **Mandatory 45-Second Dwell-Time Enforcement (`DWELL-SLA-*`).**
  - The compactor’s telematics unit continuously streams speed and GPS accuracy.
  - The system will *not* allow a driver to log a valid collection attempt or submit a "Gate Locked" notice unless the truck’s GPS confirms:
    - Distance to compound entrance $\le 30\text{ meters}$; AND
    - Vehicle speed $< 2\text{ km/h}$ continuously for $\ge 45\text{ seconds}$.
  - Any driver attempting to log an attempt without satisfying the dwell-time threshold has their claim automatically rejected for fraud.

#### Blind Spot 4: Rainstorm Cellular Data Blackouts
- **The Vector:** During heavy tropical downpours, 4G cellular data connections frequently collapse into 2G (EDGE) or drop completely inside concrete tenement rooms. If a resident's smartphone is offline, they miss the app's push notification, leaving their bin unemptied.
- **Engineered Solution:** **Dual-Path Multi-Channel Notification Ingress (Push + SMS + Audio Chime).**
  - When the geofence proximity trigger fires, the system dispatches a PWA push notification.
  - Simultaneously, if the client app does not acknowledge receipt within 45 seconds, the server automatically routes an automated **Reverse-Billed SMS Alert** over national telco SS7 signaling channels, guaranteeing delivery on any $5 feature phone even during total mobile internet blackouts.

---

## 3. Mathematical & Algorithmic Formulations

### 3.1 Corridor-Bound Geofence Proximity Trigger Model
Let $P_{\text{truck}}(t) = (\text{lat}_t, \text{lon}_t)$ be the real-time GPS position of the compactor at time $t$, and let $P_{\text{compound}} = (\text{lat}_c, \text{lon}_c)$ be the centroid coordinates of the registered tenement compound.

The dynamic proximity alert trigger $A(t) \in \{0, 1\}$ is formulated as:

$$A(t) = \mathbb{I}\left( D_{\text{haversine}}(P_{\text{truck}}(t), P_{\text{compound}}) \le R_{\text{geofence}} \right) \;\land\; \mathbb{I}\left( \text{RoadClass}(P_{\text{truck}}(t)) \in \{\text{Tertiary}, \text{Residential}\} \right) \;\land\; \mathbb{I}\left( \text{RouteID}_{\text{truck}} == \text{RouteID}_{\text{compound}} \right)$$

Where:
- $R_{\text{geofence}} = 1,500\text{ meters}$ (calibrated neighborhood perimeter).
- $D_{\text{haversine}}$ is the great-circle surface distance.
- $\text{RoadClass}$ filters out expressway and arterial transit corridors, permanently eliminating false alarms from highway flyovers.
- $\text{RouteID}$ verifies that the compactor is currently executing the specific cadastral collection manifest for that ward.

### 3.2 Dynamic Estimated Time of Arrival (ETA) Algorithm
The predicted arrival time $\tau_{\text{ETA}}$ in minutes is computed dynamically using real-time road segment speeds:

$$\tau_{\text{ETA}}(t) = \sum_{s \in \text{PathSegments}} \left( \frac{L_s}{\bar{v}_s(t)} \right) + \sum_{w \in \text{PrecedingStops}} T_{\text{dwell}}(w)$$

Where:
- $L_s$ is the physical length of road segment $s$ in kilometers.
- $\bar{v}_s(t)$ is the current moving average speed of the compactor along segment $s$ ($\text{km/h}$).
- $T_{\text{dwell}}(w)$ is the historical average collection dwell time per compound stop (nominally $2.2\text{ minutes}$ for residential tenements).

### 3.3 Curb-Side Exposure Minimization Index ($\text{EMI}$)
To quantify municipal public health impact, the app calculates the compound's **Curb-Side Exposure Reduction Score**:

$$\text{EMI} = \left( 1 - \frac{T_{\text{actual\_curb\_dwell}}}{T_{\text{baseline\_dwell}}} \right) \times 100\%$$

Where:
- $T_{\text{baseline\_dwell}} = 4,320\text{ minutes}$ ($72\text{ hours}$).
- $T_{\text{actual\_curb\_dwell}}$ is the measured duration between the resident's "Bin Brought Out" tap and the driver's verified completion scan.
- Target Benchmark: $T_{\text{actual\_curb\_dwell}} \le 25\text{ minutes} \implies \text{EMI} \ge 99.4\%$.

### 3.4 Multi-Channel Network Retry & Telco Failover Exponential Backoff
To guarantee delivery across unstable 2G/3G cellular networks during storm events, the multi-channel notification engine executes a deterministic failover progression:

$$t_{\text{retry}}(k) = \min\left(t_{\text{max}}, t_{\text{base}} \times 2^{k-1}\right) + \text{Uniform}(-\delta, +\delta)$$

Where:
- $t_{\text{base}} = 5\text{ seconds}$, $t_{\text{max}} = 30\text{ seconds}$, and $\delta = 1.5\text{ seconds}$ (randomized jitter to prevent telco gateway thundering herds).
- **Channel Cascade Progression:**
  - $k=1$ ($t=0\text{s}$): Lightweight PWA WebPush payload.
  - $k=2$ ($t=15\text{s}$): In-app Server-Sent Event (SSE) socket poke.
  - $k=3$ ($t=45\text{s}$): Reverse-Billed SMS notification dispatched via direct SMPP bind to the carrier switch (MTN, Airtel, Glo, 9mobile).
  - $k=4$ ($t=90\text{s}$): Interactive Voice Response (IVR) flash call for feature phone / landline subscribers.

---

## 4. Comprehensive Epics & Detailed User Stories

### Epic 2.1: Real-Time Compactor Telematics Ingestion & Map Visualization (`TRK-INGEST-*`)
Stream compactor positions to the resident interface with zero battery or data overhead.

#### User Story 2.1.1: Battery-Efficient Live Truck Approach View
- **As a** Resident on collection morning,
- **I want** to see an accessible map showing my assigned waste truck approaching my street,
- **So that** I know exactly when to prepare my waste bins without wasting battery or data.
- **Acceptance Criteria:**
  - **GIVEN** an active pickup scheduled for today,
  - **WHEN** the resident opens `/activity`,
  - **THEN** render a lightweight static SVG map displaying: the resident's compound pin, the assigned truck's current position, current moving speed, and dynamic ETA in minutes; network bandwidth must remain $<3\text{ KB/minute}$.

---

### Epic 2.2: 1.5km Neighborhood Geofenced Proximity Alerting (`PROX-ALERT-*`)
Emit automated multi-channel alerts 15 minutes before the truck reaches the compound gate.

#### User Story 2.2.1: Automated 15-Minute Proximity Push & Voice Chime
- **As a** Working parent inside the house preparing breakfast,
- **I want** to hear an audible voice chime and receive a push alert when the truck is 15 minutes away,
- **So that** I can instruct my domestic assistant to wheel the bins to the front gate.
- **Acceptance Criteria:**
  - **GIVEN** the assigned compactor entering the 1.5km residential feeder corridor,
  - **WHEN** the geofence engine validates route manifest alignment,
  - **THEN** emit an urgent multi-lingual chime (in the resident's selected language) and push alert: *"LAWMA Alert: Truck KTU-482-XA is 3 streets away (approx 15 mins). Bring out your bin now."*

#### User Story 2.2.2: Reverse-Billed SMS Fallback during Data Disconnection
- **As an** Informal settlement dweller with an empty mobile data bundle,
- **I want** to receive a free SMS when the truck is near,
- **So that** I never miss waste collection even when I have zero mobile internet access.
- **Acceptance Criteria:**
  - **GIVEN** a resident without active mobile data or an app session,
  - **WHEN** the proximity geofence triggers,
  - **THEN** if client PWA push receipt is unacknowledged after 45 seconds, the server automatically fires an automated SMS over telco SS7 channels with zero charge to the recipient.

---

### Epic 2.3: Anti-Evasion Dwell-Time Enforcement & Proof of Attempt (`DWELL-PROOF-*`)
Eliminate fraudulent "Gate Locked" driver claims through automated telematics verification.

#### User Story 2.3.1: Mandatory Telematics Dwell-Time Verification
- **As a** LAWMA Route Operations Inspector,
- **I want** the system to verify that a truck remained stationary at a compound before allowing a driver to log a service failure,
- **So that** drivers cannot honk from 100 meters away and drive off.
- **Acceptance Criteria:**
  - **GIVEN** a compactor driver attempting to submit a "Premises Inaccessible / Gate Locked" claim,
  - **WHEN** the server processes the submission,
  - **THEN** verify that the truck’s telematic GPS was within $\le 30\text{ meters}$ of the compound centroid and that vehicle velocity was $< 2\text{ km/h}$ for a minimum of $45\text{ continuous seconds}$; if dwell time $< 45\text{ seconds}$, reject the driver’s claim and log an operational deficiency strike.

#### User Story 2.3.2: Immediate "Gate Locked" Photographic Challenge Alert
- **As a** Resident whose gate was reported locked by a driver,
- **I want** to receive an instant photo alert with a 10-minute cure window,
- **So that** I can immediately open the gate if the driver is still on our street.
- **Acceptance Criteria:**
  - **GIVEN** a verified driver "Gate Locked" submission with on-site photo,
  - **WHEN** the event publishes to the customer app,
  - **THEN** sound an urgent alert on the resident's phone displaying the driver's photo: *"Your driver reported your gate locked at 07:14 AM [View Photo]. Tap 'OPENING GATE NOW' within 10 minutes to alert the crew while they finish servicing neighboring houses."*

---

## 5. Technical Architecture, State Machines & Database Schemas

### 5.1 Telematics Ingestion & Proximity Alert State Machine

```
                              ┌──────────────────────────────────────────┐
                              │          SCHEDULED / PENDING             │
                              │     (Truck Departs Depot on Route)       │
                              └────────────────────┬─────────────────────┘
                                                   │
                               Truck Enters Cadastral Ward Boundary
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │        WARD EN-ROUTE ACTIVE              │
                              │     (Dynamic ETA Ingestion Active)       │
                              └────────────────────┬─────────────────────┘
                                                   │
                               D_haversine <= 1.5km AND RoadClass == Local Feeder
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │      PROXIMITY ALERT TRIGGERED           │
                              │   (15-Min Voice Chime, Push & SMS Sent)  │
                              └────────────────────┬─────────────────────┘
                                                   │
                               Truck Arrives within 30m; Velocity < 2 km/h
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │         DWELL-TIME VERIFIED              │
                              │       (Dwell Counter >= 45 Seconds)      │
                              └──────┬────────────────────────────┬──────┘
                                     │                            │
                    Driver Scans Bin & Empties                    │ Driver Takes Photo of Locked Gate
                    (On-Site Photo Uploaded)                      │ (Premises Inaccessible Logged)
                                     ▼                            ▼
                 ┌───────────────────────────┐   ┌─────────────────────────────────────────┐
                 │    PICKUP_PROOF_SUBMITTED │   │         GATE_LOCKED_ALERT               │
                 │ (Dual-Key Push Initiated) │   │     (10-Minute Rapid Cure Window)       │
                 └───────────────────────────┘   └─────────────────────────────────────────┘
```

### 5.2 PostgreSQL / PostGIS Relational Schema

```sql
-- Module 02: Compactor Live Tracking & Proximity Geofencing Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Real-Time Compactor Telematics Stream Cache
CREATE TABLE compactor_telematics_stream (
    telematics_id BIGSERIAL PRIMARY KEY,
    vehicle_asset_id VARCHAR(32) NOT NULL, -- E.g., 'TRK-ALM-042'
    vehicle_plate_number VARCHAR(16) NOT NULL,
    current_coordinates GEOMETRY(Point, 4326) NOT NULL,
    current_speed_kph NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    heading_degrees NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    active_route_id VARCHAR(64) NOT NULL,
    current_road_classification VARCHAR(32) NOT NULL, -- E.g., 'TERTIARY_FEEDER', 'EXPRESSWAY_ARTERIAL'
    gps_accuracy_meters NUMERIC(4, 2) NOT NULL,
    recorded_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ingested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Neighborhood Proximity Geofence Boundaries
CREATE TABLE compound_proximity_zones (
    zone_id VARCHAR(48) PRIMARY KEY, -- E.g., 'ZONE-PROX-CMP-AGEGE-0482'
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id) ON DELETE CASCADE,
    centroid_coordinates GEOMETRY(Point, 4326) NOT NULL,
    geofence_polygon GEOMETRY(Polygon, 4326) NOT NULL, -- 1.5km buffer polygon
    feeder_road_segment_ids TEXT[] NOT NULL,
    alert_push_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    alert_sms_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    alert_voice_chime_enabled BOOLEAN NOT NULL DEFAULT TRUE
);

-- 3. Proximity Alert Audit Ledger
CREATE TABLE proximity_alert_events (
    event_id VARCHAR(64) PRIMARY KEY, -- E.g., 'ALERT-PROX-20261113-08124'
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    vehicle_asset_id VARCHAR(32) NOT NULL,
    pickup_manifest_id VARCHAR(64) NOT NULL,
    trigger_distance_meters NUMERIC(6, 2) NOT NULL,
    trigger_speed_kph NUMERIC(5, 2) NOT NULL,
    estimated_arrival_minutes INTEGER NOT NULL,
    pwa_push_delivered BOOLEAN NOT NULL DEFAULT FALSE,
    sms_fallback_delivered BOOLEAN NOT NULL DEFAULT FALSE,
    sms_telco_rrn VARCHAR(64),
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Anti-Evasion Dwell-Time Verifications
CREATE TABLE compactor_dwell_verifications (
    dwell_id VARCHAR(64) PRIMARY KEY, -- E.g., 'DWELL-20261113-CMP0482'
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    vehicle_asset_id VARCHAR(32) NOT NULL,
    arrival_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    departure_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    total_dwell_seconds INTEGER GENERATED ALWAYS AS 
        (EXTRACT(EPOCH FROM (departure_timestamp - arrival_timestamp))::INTEGER) STORED,
    minimum_dwell_threshold_met BOOLEAN GENERATED ALWAYS AS 
        (EXTRACT(EPOCH FROM (departure_timestamp - arrival_timestamp)) >= 45) STORED,
    mean_speed_during_dwell_kph NUMERIC(4, 2) NOT NULL,
    distance_to_entrance_meters NUMERIC(5, 2) NOT NULL,
    outcome_status VARCHAR(32) NOT NULL 
        CHECK (outcome_status IN ('SERVICE_COMPLETED', 'GATE_LOCKED_PHOTO_VERIFIED', 'DWELL_SLA_BREACH_REJECTED'))
);

-- Spatial and Performance Indices
CREATE INDEX idx_telematics_geom ON compactor_telematics_stream USING GIST(current_coordinates);
CREATE INDEX idx_telematics_vehicle ON compactor_telematics_stream(vehicle_asset_id, recorded_at DESC);
CREATE INDEX idx_prox_geom ON compound_proximity_zones USING GIST(geofence_polygon);
CREATE INDEX idx_dwell_compound ON compactor_dwell_verifications(compound_id, arrival_timestamp DESC);
```

---

## 6. RESTful Service & Enterprise Event Bus Specifications

### 6.1 OpenAPI 3.1 REST Endpoints

```yaml
openapi: 3.1.0
info:
  title: LAWMA Compactor Tracking & Proximity Gateway API
  version: 4.0.0
  description: Real-time compactor telemetry ingestion, live ETA computation, corridor geofence alerting, and anti-evasion dwell audits.
paths:
  /v4/resident/tracking/compounds/{compound_id}/live-approach:
    get:
      summary: Retrieve Live Approach Waypoint and Dynamic ETA
      parameters:
        - name: compound_id
          in: path
          required: true
          schema: { type: string, example: "CMP-AGEGE-0482" }
      responses:
        '200':
          description: Live approach data retrieved.
          content:
            application/json:
              schema:
                type: object
                required: [vehicle_plate, eta_minutes, distance_meters, status]
                properties:
                  vehicle_plate: { type: string, example: "KTU-482-XA" }
                  eta_minutes: { type: integer, example: 14 }
                  distance_meters: { type: number, example: 1250 }
                  current_speed_kph: { type: number, example: 18.5 }
                  status:
                    type: string
                    enum: [EN_ROUTE_WARD, PROXIMITY_ALERT_ACTIVE, DWELLING_AT_COMPOUND, SERVICED_DEPARTED]

  /v4/resident/tracking/dwell-audit/verify:
    post:
      summary: Submit Driver Dwell Verification & On-Site Proof
      security:
        - OperatorTerminalKey: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [vehicle_asset_id, compound_id, arrival_time, departure_time, proof_photo_uri]
              properties:
                vehicle_asset_id: { type: string }
                compound_id: { type: string }
                arrival_time: { type: string, format: date-time }
                departure_time: { type: string, format: date-time }
                proof_photo_uri: { type: string, format: uri }
      responses:
        '200':
          description: Dwell verified. Citizen Dual-Key challenge triggered.
```

### 6.2 Enterprise Kafka Event Schemas

#### Event: `telematics.proximity_alert.dispatched`
```json
{
  "event_id": "EVT-PROX-20261113-0941",
  "event_type": "telematics.proximity_alert.dispatched",
  "timestamp": "2026-11-13T09:41:00Z",
  "data": {
    "compound_id": "CMP-AGEGE-0482",
    "cadastre_parcel_id": "LASG-CAD-AGE-98124",
    "vehicle_plate": "KTU-482-XA",
    "distance_meters": 1320.0,
    "eta_minutes": 15,
    "pwa_push_delivered": true,
    "sms_fallback_sent": false
  }
}
```

#### Event: `telematics.dwell_sla.breached`
```json
{
  "event_id": "EVT-BREACH-20261113-0948",
  "event_type": "telematics.dwell_sla.breached",
  "timestamp": "2026-11-13T09:48:00Z",
  "data": {
    "vehicle_asset_id": "TRK-ALM-042",
    "compound_id": "CMP-AGEGE-0482",
    "measured_dwell_seconds": 12,
    "minimum_required_seconds": 45,
    "violation_classification": "HONK_AND_RUN_EVASION_ATTEMPT",
    "penalty_levied_naira": 25000.00
  }
}
```

---

## 7. Field Defense Playbooks & Resident Legal Protections

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   FIELD DEFENSE PLAYBOOK: TELEMATICS & ARRIVAL PROTOCOLS                         │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│       CHALLENGE VECTOR        │       OPERATIONAL VULNERABILITY  │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Highway Flyover False Ping │ Truck on flyover triggers false  │ Corridor Feeder Road Filter;  │
│    (Residents Bring Bins Out) │ proximity alerts in valley slums.│ expressway speed decoupling.  │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. "Honk and Run" Driver Skip │ Driver honks once and leaves     │ 45-Second Stationary Dwell-   │
│    (Premises Inaccessible)    │ claiming gate was padlocked.     │ Time Telematics Mandate.      │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. Rainstorm Cellular Outage  │ Data drops; resident misses app  │ Reverse-Billed SMS Signaling  │
│    (Missed Collection Alert)  │ push alert.                      │ Fallback Broadcast.           │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Scavenger Bag Puncturing   │ Waste bags torn open on curbs    │ 15-Minute Geofence Alert;     │
│    (Street Verges Polluted)   │ waiting 3 days for compactor.    │ curb dwell time < 20 mins.    │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 7.1 "Honk and Run" Dispute Adjudication Protocol
1. When an operator files a *"Premises Inaccessible / Gate Locked"* report:
   - The Central Clearinghouse cross-references the truck’s telematic log:
     - Did the vehicle enter the feeder road segment?
     - Did the vehicle come to a complete stop ($\le 2\text{ km/h}$) within 30 meters of the gate?
     - Did the vehicle remain stationary for $\ge 45\text{ continuous seconds}$?
   - If any of these conditions fails, the driver's claim is automatically thrown out for bad faith; the operator is issued a mandatory 24-hour return order without extra tipping fees.

### 7.2 False Alarm Suppression Protocol
1. To ensure resident trust is never eroded by false proximity notifications:
   - Compactor trucks traveling at speeds $\ge 40\text{ km/h}$ are classified as "In Transit" and cannot trigger neighborhood geofence proximity alerts regardless of physical proximity.
   - Proximity alerts require a confirmed corridor entry sequence: the compactor must decelerate and register on the neighborhood's designated municipal feeder road segment before notifications are emitted.

---

## 8. Statutory Verification, Evidence Act Section 84 & Executive Sign-off Matrix

All telematic data points, geofence trigger timestamps, and dwell-time audit records are formatted to meet the strict electronic evidence admissibility standards of **Section 84 of the Nigerian Evidence Act 2011**.

### 8.1 Courtroom Evidentiary Certificate Template

```
IN THE SPECIAL OFFENCES COURT OF LAGOS STATE
HOLDEN AT IKEJA / OSHODI, LAGOS
BEFORE HIS WORSHIP: [MAGISTRATE NAME]

CHARGE NO: MEWR/ENV/2026/[NUMBER]
BETWEEN:
LAGOS STATE MINISTRY OF THE ENVIRONMENT & WATER RESOURCES ...... COMPLAINANT
AND
[CONCESSIONAIRE NAME / DRIVER NAME] ........................... DEFENDANT

CERTIFICATE OF AUTHENTICITY OF TELEMATIC ELECTRONIC RECORDS
(PURSUANT TO SECTION 84 OF THE NIGERIAN EVIDENCE ACT, 2011)

I, [OFFICER NAME], Chief Fleet Telematics Engineer, 
LAWMA Regulatory Command Room, do hereby solemnly declare and certify as follows:

1. That I am the designated systems custodian of the Municipal Fleet Telematics 
   and Proximity Geofence Monitoring Infrastructure (Module RES-02).
2. That on the [DATE], at [TIME], Compactor Vehicle Asset [VEHICLE_ID] (Plate: [PLATE_NO]) 
   was tracked executing Route Manifest [MANIFEST_ID] in Ward [WARD_ID].
3. That telematic records confirm the vehicle arrived within [DISTANCE] meters of 
   Compound [COMPOUND_ID], maintaining a dwell duration of [SECONDS] seconds, as evidenced 
   by GPS Stream Log Exhibit 'A' and On-Site Photo Manifest Exhibit 'B'.
4. That the IoT telematics gateways, CANbus onboard transponders, and spatial database 
   servers were operating properly and within certified operational tolerances, without 
   systemic error or data corruption.

DATED THIS ______ DAY OF ________________ 2026.

_______________________________________
DEPONENT / TELEMATICS ENGINEER SIGNATURE
```

### 8.2 Executive Sign-off & Inter-Agency Governance Matrix

| Verification Pillar | Legal / Regulatory Benchmark | Acceptance Threshold | Auditing Authority |
| :--- | :--- | :--- | :--- |
| **Telematic Precision** | National GPS Standard (WGS 84) | 100% of waypoint telemetry accurate within $\le 5\text{ meters}$. | Ministry of Science and Technology |
| **Dwell-Time Compliance** | LAWMA Operational Standard | Minimum 45-second stationary dwell enforced on 100% of service claims. | LAWMA Monitoring & Compliance Unit |
| **Notification Reliability**| Public Service Delivery Standard | Proximity alerts delivered $\ge 12\text{ minutes}$ prior to truck arrival in $>95\%$ of runs. | Customer Advocacy Directorate |
| **Curb Dwell Minimization**| Lagos State Environmental Standard | Average curb-side waste dwell time maintained at $< 25\text{ minutes}$. | MEWR Directorate of Sanitation |
| **Sovereign Quorum** | Ministerial Sovereign Sign-Off | Signed off by Hon. Tokunbo Wahab & MD Dr. Muyiwa Gbadegesin. | Lagos State Executive Council |
