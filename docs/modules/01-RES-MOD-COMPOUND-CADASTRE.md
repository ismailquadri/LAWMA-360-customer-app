# PRODUCT LEVEL DOCUMENT: MODULE 01 (`RES-MOD-01-COMPOUND-CADASTRE`)
## Multi-Tenant Compound Cadastre, Fractional Room Wallets & Landlord Relations Engine

**Document Identifier:** LAWMA-PLD-RES-01-COMPOUND-CADASTRE  
**Document Version:** 4.0 (Courtroom-Grade Civic Protection Edition)  
**System Role:** Tenement Compound Identity, Room-Level Fractional Billing & Landlord Legal Interface  
**Target Codebase:** `LAWMA-360-customer-app` (`src/routes/wallet.tsx`, `src/routes/you.tsx`, `src/lib/customer-model.ts`)  
**Deployment Targets:** Progressive Web App (PWA), Reverse-Billed USSD (`*384*LAWMA#`), Mobile Money Switch (NIBSS / Instant Virtual Accounts)  
**Statutory Foundation:** 2017 Lagos State Environmental Management and Protection Law (EMPL) Sections 45, 88, 89, 102 & 103; Lagos State Tenancy Law 2011 Sections 4, 14 & 44; Land Use Charge Law of Lagos State (2020); Nigeria Data Protection Act (NDPA 2023); Nigerian Evidence Act 2011 Section 84  
**Executive Boardroom Sponsors:**
- **Dr. Kadri Obafemi Hamzat (KOH)**, Executive Governor of Lagos State
- **Hon. Tokunbo Wahab**, Honourable Commissioner, Ministry of the Environment and Water Resources (MEWR)
- **Hon. Rasheed Shabi**, Chairman, House Committee on the Environment, Lagos State House of Assembly
- **Dr. Muyiwa Gbadegesin**, Managing Director / CEO, Lagos State Waste Management Authority (LAWMA)

---

## 1. Executive Context & Statutory Authority

Across Lagos State, residential waste management is characterized by extreme structural density. Over 68% of the urban population—totaling approximately 15 million citizens—resides in multi-tenant compounds, commonly referred to as *"face-me-I-face-you"* tenements, multi-family apartment complexes, and rooming houses. In neighborhoods such as Agege, Mushin, Somolu, Bariga, Ajegunle, and Alimosho, a single physical street address frequently houses between 8 and 24 distinct families behind a single communal entrance gate.

Historically, municipal sanitation delivery completely collapsed due to an architectural mismatch between physical property structure and utility billing:
1. **The Tragedy of Lump-Sum Compound Billing:** Municipal billing systems issued a single, indivisible monthly paper bill addressed vaguely to *"The Landlord / Occupiers, 14 Olowu Street"* for ₦10,000 or ₦15,000. 
2. **The Absentee Landlord Skimming Racket:** Unscrupulous landlords and compound caretakers exploited this ambiguity by collecting ₦1,500 monthly from each tenant room under the guise of "Sanitation and Security dues" (collecting ₦18,000 across 12 rooms), paying LAWMA a subsidized flat rate of ₦5,000, and pocketing the ₦13,000 surplus. When tenants realized they were being exploited, they revolted and ceased all payments.
3. **The Collective Default Spiral:** When two transient tenants moved out leaving unpaid arrears, or when three low-income families suffered financial shocks and defaulted, the compound caretaker collected nothing. The private waste operator (PSP), receiving zero remittance, refused to lift the communal bin. Within 10 days, communal courtyards filled with rotting maggots, forcing compliant families to patronize illegal midnight cart pushers or dump waste into open street gutters during rainstorms.

Under **`MANDATE-KOH-01`** and **`MANDATE-WAH-04`**, the Executive Boardroom mandated the permanent dismantling of this collective punishment mechanism:
> *"We cannot treat an entire tenement compound of 16 families as a single monolithic delinquent. When a responsible mother who sweeps her room daily and pays her ₦600 waste share is forced to live in filth because her neighbor defaulted or her landlord pocketed the cash, the state has failed in its regulatory duty.*
> 
> *Under Section 88 of the Environmental Management and Protection Law 2017 and Section 44 of the Lagos State Tenancy Law 2011, we will establish the Multi-Tenant Compound Cadastre & Fractional Room Wallet Engine (`RES-MOD-01`). Every physical parcel shall bind to the state's sovereign LAGIS cadastre (`LASG-CAD-ID`). Every individual room or flat shall be assigned a sovereign Child Virtual Account (`VACC-*`). A tenant who pays their fractional share is legally immunized from service suspension and landlord retaliation. Furthermore, any landlord who charges tenants above the statutory tariff ceiling commits a criminal offense."*

---

## 2. Political Economy of the Tenement & Forensic Street Realities

Understanding the micro-sociology of the Lagos tenement compound is essential to designing an unassailable digital and legal architecture.

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                           POLITICAL ECONOMY & POWER MATRIX OF THE TENEMENT                       │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│        POWER BLOC             │       OPERATIONAL REALITY        │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Tenement Landlords         │ Absenteeism; arbitrary markups;  │ Sovereign LAGIS Parcel Binding│
│    (Property Owners)          │ pocketing tenant sanitation fees.│ Official State Tariff Ceiling.│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Room Tenants & Lodgers     │ Daily cash earnings; fear of     │ Compound Virtual Wallets;     │
│    (*Face-Me-I-Face-You*)     │ eviction; collective default.    │ Child Accounts (`VACC-*`).    │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. PSP Waste Concessionaires  │ Refusal to service partially paid│ 60% Quorum Service Guarantee; │
│    (Private Truck Operators)  │ compounds; route bypass.         │ Landlord Title Tax Liens.     │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Compound Caretakers        │ Informal rent collectors; cash   │ Direct USSD / POS Rails;      │
│    ("Baba Oloja / Oga Onile") │ diversion; opacity in accounting.│ automated SMS digital receipts│
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 5. Transient Lodgers          │ High turnover; move out leaving  │ Personal NIN Debt Binding;    │
│    (Short-term Migrants)      │ unpaid utility bills behind.     │ Room Vacancy Toggle Protocol. │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 2.1 The Tenement Micro-Economy & Room-Level Fractional Billing
In an 18-room compound in Agege or Bariga:
- **Tenancy Turnover:** Between 20% and 35% of compound rooms turn over annually. Migrant artisans and young gig workers move frequently. When a tenant departs without notice, they leave 2 to 3 months of unpaid waste dues that traditional systems attempted to force onto the remaining residents.
- **The Landlord-Caretaker Monopoly:** In over 70% of tenements, the property owner lives in another district (e.g., Lekki, Surulere, or abroad). The property is administered by a resident caretaker ("Baba Oloja"). Caretakers wield immense informal power, threatening eviction to any tenant who questions utility accounting.
- **Micro-Liquidity Cycles:** Low-income gig workers, tailors, and market traders do not budget on a 30-day corporate calendar. They earn daily or weekly. Forcing an annual or monthly lump-sum bill guarantees default, whereas micro-payments of ₦150/week or ₦600/month are willingly settled.

### 2.2 Forensic Street-Reality Blind Spots & Physical Attack Vectors

#### Blind Spot 1: The "Departed Tenant Arrears Trap"
- **The Vector:** Room 4 moves out at midnight, leaving ₦2,400 in unpaid waste bills. Under collective billing, the PSP refuses to collect the compound's waste until the ₦2,400 is paid. The remaining 15 tenants refuse to pay for a stranger who has moved away. The compound descends into filth.
- **Engineered Solution:** **Dynamic Room Vacancy & Personal Debt Decoupling (`ROOM-SLOT-*`).**
  - When a tenant departs, the caretaker or verified neighbor co-signs a digital `VACANT_ROOM` declaration in the app.
  - The historical debt of Room 4 is severed from the physical room and compound ledger, converting into a personal statutory civil debt bound to the departed tenant's National Identification Number (NIN) and LASRRA ID.
  - The physical room’s fractional billing pauses until a new tenant registers, preventing compound service stoppage.

#### Blind Spot 2: Landlord Retaliatory Eviction ("Bypassing the Landlord")
- **The Vector:** When an individual tenant pays LAWMA directly via the app or refuses to pay an extortionate landlord sanitation markup, the landlord serves a retaliatory "Notice to Quit" or locks the communal water supply and external gate.
- **Engineered Solution:** **Statutory Cadastral Tariff Ceiling Certificate & Tenancy Law Shield.**
  - The app publishes the legally binding Lagos State cadastral tariff ceiling for every building based on its LAGIS parcel key (`LASG-CAD-ID`).
  - Charging above this ceiling is a criminal offense under EMPL Section 88.
  - The tenant can generate an official signed State Tariff Defense Certificate. Under Section 44 of the **Lagos State Tenancy Law 2011**, retaliatory eviction or harassment for compliance with state public health statutes constitutes a criminal offense carrying mandatory fines and imprisonment.

#### Blind Spot 3: The "Ghost Room" Fraud by Unscrupulous Landlords
- **The Vector:** To reduce their building's overall tariff classification, landlords register a 16-room tenement as a "4-room single-family dwelling" on the cadastral portal. The compound generates 4 times more waste than declared, resulting in overflowing bins and bankrupting the assigned PSP concessionaire.
- **Engineered Solution:** **Spatial PostGIS AI Cadastral Roof-Print & Tenancy Crowdsourcing.**
  - Building footprint geometries are extracted from high-resolution aerial orthophotogrammetry.
  - Roof area ($A_{\text{roof}}$) and structural height calculate a physical dwelling capacity baseline.
  - When tenants register their individual room virtual accounts via SIM-NIN OTP, the system crowdsources the true room count. If registered rooms exceed declared rooms, the compound's cadastral profile auto-escalates to `CADASTRAL_UNDER_DECLARATION_AUDIT`, assessing retroactive Land Use Charge liens against the landlord's title.

#### Blind Spot 4: Ground-Floor Commercial Sub-Letting Friction
- **The Vector:** The front two rooms of a residential compound are converted into a commercial pharmacy and a fast-food eatery. These commercial units generate high-volume, greasy packaging and medical waste, but insist on paying the standard domestic room rate of ₦600/month, infuriating residential tenants whose bins are choked within hours.
- **Engineered Solution:** **Mixed-Use Cadastral Sub-Unit Classification.**
  - The master compound cadastre supports granular sub-unit typing: `RESIDENTIAL_ROOM` vs. `COMMERCIAL_RETAIL_SHOP` vs. `FAST_FOOD_EATERY`.
  - Commercial sub-units are assessed weighted commercial multipliers ($\omega_{\text{commercial}}$), paying higher individual shares directly through their dedicated merchant virtual accounts.

---

## 3. Mathematical & Algorithmic Formulations

The Compound Cadastre Engine operates on strict mathematical, spatial, and financial formulas.

### 3.1 Compound Cadastral Tariff Determination Model
The approved gross monthly waste tariff for any physical compound $T_{\text{compound}}$ is calculated as:

$$T_{\text{compound}} = \left( T_{\text{base}} \times \Phi_{\text{density}} \times \left(1 + \sum_{k=1}^{M_{\text{commercial}}} \omega_k \right) \right) \times \left(1 + \kappa_{\text{bin\_vol}}\right)$$

Where:
- $T_{\text{base}}$ is the base zonal statutory tariff established by LAWMA Executive Regulation (nominally ₦3,500).
- $\Phi_{\text{density}}$ is the spatial cadastral density multiplier derived from LAGIS zoning:
  - Low Density (Ikoyi, Ikeja GRA): $\Phi_{\text{density}} = 1.00$
  - Medium Density (Surulere, Yaba): $\Phi_{\text{density}} = 1.25$
  - High Density / Tenement (Agege, Mushin, Alimosho): $\Phi_{\text{density}} = 1.50$
- $M_{\text{commercial}}$ is the number of active ground-floor commercial shops.
- $\omega_k$ is the commercial activity weighting factor:
  - Dry Retail / Tailor / Barber: $\omega = 0.20$
  - Provision Store / Chemist: $\omega = 0.35$
  - Restaurant / Food Bukka / Abattoir Butcher: $\omega = 0.75$
- $\kappa_{\text{bin\_vol}}$ is container volume adjustment ($+0.25$ per additional $240\text{L}$ bin).

### 3.2 Fractional Room Tariff Allocation & Dynamic Quorum
The monthly fractional financial liability $L_i$ for residential room $i$ in a compound with $N_{\text{active}}$ occupied rooms and total commercial contributions $C_{\text{commercial}}$ is:

$$L_i = \frac{T_{\text{compound}} - \sum_{k=1}^{M} C_{\text{commercial}}(k)}{N_{\text{active\_residential\_rooms}}}$$

$$\text{Minimum Service Quorum Rule:} \quad Q_{\text{collection}} = \frac{\sum_{i=1}^{N} \mathbb{I}(B_i \ge L_i)}{N_{\text{active\_residential\_rooms}}}$$

$$\text{Mandatory PSP Service Trigger:} \quad \text{If } Q_{\text{collection}} \ge 0.60 \implies \text{Compactor Must Collect Bin}$$

> **Courtroom Invariant:** As long as at least **60% of active residential rooms** have paid their individual monthly shares, the PSP is legally barred under EMPL Section 89 from withholding collection. The remaining 40% unpaid deficit is automatically converted into an accumulated statutory tax lien on the landlord's Land Use Charge (LUC) title.

### 3.3 Dynamic Arrears Decoupling & NIN Debt Binding
When tenant $j$ vacates room $i$ with accrued arrears $A_j > 0$:

$$B_{\text{room\_i}}(t_{\text{post\_vacate}}) = 0.00$$

$$\text{Personal Debt Transferred:} \quad \text{Debt}_{\text{civil}}(\text{NIN}_j) = \text{Debt}_{\text{civil}}(\text{NIN}_j) + A_j$$

The physical room resets to zero balance upon verified `VACANT_DECLARATION`, allowing the incoming tenant to start with a clean ledger.

---

## 4. Comprehensive Epics & Detailed User Stories

### Epic 1.1: Sovereign LAGIS Cadastre Binding & Compound Registration (`CAD-REG-*`)
Bind every residential structure to its official Lagos State land parcel and establish the master compound entity.

#### User Story 1.1.1: Cadastral Parcel Geocoding & Tariff Transparency
- **As a** Tenement Resident in Agege,
- **I want** to search my street address and view the official government-approved waste tariff for my building,
- **So that** my landlord cannot exploit me by charging arbitrary sanitation markups.
- **Acceptance Criteria:**
  - **GIVEN** an address entered by the resident or a geolocated GPS coordinate,
  - **WHEN** the cadastre service queries the LAGIS database,
  - **THEN** return the official `LASG-CAD-ID`, building classification, total registered rooms, maximum statutory monthly tariff, and assigned licensed PSP concessionaire; display the official LAWMA Cadastral Transparency Seal.

#### User Story 1.1.2: Compound Caretaker Digital Claiming
- **As a** Compound Caretaker or Principal Tenant,
- **I want** to register my building's room layout (e.g. 14 rooms, 2 shops),
- **So that** our compound receives a Master Virtual Wallet and individual room sub-accounts.
- **Acceptance Criteria:**
  - **GIVEN** a verified LASRRA ID and telephone number,
  - **WHEN** the caretaker submits the room roster,
  - **THEN** generate a Master Compound Wallet `WAL-COMP-*` and allocate individual Child Virtual Accounts (`VACC-*`) for each room; transmit individual activation SMS invitations to all registered tenant phone numbers.

---

### Epic 1.2: Fractional Room Virtual Accounts & Omnichannel Micro-Payments (`ROOM-PAY-*`)
Enable room-level financial autonomy through bank accounts, USSD, and corner kiosk cash deposits.

#### User Story 1.2.1: Individual Room USSD Tariff Settlement
- **As a** Petty Trader living in Room 6 without mobile data,
- **I want** to dial a dedicated USSD string (`*384*Compound*Room#`) to pay my ₦600 monthly share,
- **So that** my payment is registered instantly and I receive an official SMS receipt.
- **Acceptance Criteria:**
  - **GIVEN** an active room account with an unpaid balance,
  - **WHEN** the tenant executes the USSD payment via any Nigerian telecommunications network,
  - **THEN** the session is reverse-billed to LAWMA (100% free of charge to user); funds credit the room's virtual ledger; an instant cryptographic receipt token is transmitted via SMS; the room's compliance status turns `COMPLIANT_PAID`.

#### User Story 1.2.2: Kiosk POS Cash Deposit for the Unbanked
- **As an** Informal sector laborer without a bank account in Ajegunle,
- **I want** to hand ₦600 cash to my local Moniepoint/OPay POS agent,
- **So that** my room's waste fee is paid without bank transfer fees.
- **Acceptance Criteria:**
  - **GIVEN** a tenant visiting any accredited street POS kiosk,
  - **WHEN** the agent enters the tenant's 10-digit Child Virtual Account Number (`VACC-*`),
  - **THEN** the transaction clears with zero processing deductions; the room ledger updates in real-time; the tenant receives an SMS confirmation; the physical compound ledger displays Room 6 as paid.

---

### Epic 1.3: Dynamic Tenancy Roster & Transient Room Decoupling (`ROOM-VAC-*`)
Protect compounds from collapsing when tenants depart leaving unpaid debts.

#### User Story 1.3.1: Transient Tenant Vacancy Declaration
- **As a** Compound Secretary,
- **I want** to mark Room 3 as "Vacant" when a tenant moves out,
- **So that** our compound is not penalized for a departed stranger's arrears.
- **Acceptance Criteria:**
  - **GIVEN** an active compound dashboard,
  - **WHEN** the caretaker marks Room 3 as `VACANT` and two verified neighboring tenants co-sign via SMS OTP,
  - **THEN** the historical debt of Room 3 is decoupled and bound to the departed tenant's NIN/LASRRA profile; Room 3’s ongoing billing liability freezes; the compound's 60% collection quorum is recalculated based exclusively on remaining occupied rooms.

---

### Epic 1.4: Statutory Landlord Rent-Markup Defense & Tenancy Legal Shield
Protect vulnerable tenants from extortion, illegal rent hikes, and retaliatory eviction.

#### User Story 1.4.1: Statutory Cadastral Defense Certificate Generation
- **As a** Tenant threatened with eviction for refusing to pay an illegal ₦2,000 landlord sanitation markup,
- **I want** to download a certified State Cadastral Defense Certificate,
- **So that** I have legally admissible proof that the landlord's demand is criminal.
- **Acceptance Criteria:**
  - **GIVEN** a tenant viewing their room profile in `/wallet`,
  - **WHEN** they tap *"Generate Statutory Tariff Certificate"*,
  - **THEN** the app outputs an authenticated, digitally signed PDF bearing: the official LAGIS parcel ID, approved statutory tariff band, tenant payment history, and explicit statutory warning: *"Charging above the statutory rate or attempting retaliatory eviction violates Lagos State Tenancy Law Section 44 and EMPL Section 88, carrying mandatory criminal penalties."*

---

## 5. Technical Architecture, State Machines & Database Schemas

### 5.1 Compound Cadastre & Room Lifecycle State Machine

```
                              ┌──────────────────────────────────────────┐
                              │         UNREGISTERED PARCEL              │
                              │      (LAGIS Orthophoto Baseline)         │
                              └────────────────────┬─────────────────────┘
                                                   │
                                      Caretaker / Tenant Onboarding Scan
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │         MASTER COMPOUND ACTIVE           │
                              │    (`WAL-COMP-*` & `LASG-CAD-ID`)        │
                              └────────────────────┬─────────────────────┘
                                                   │
                                  Child Virtual Accounts (`VACC-*`) Provisioned
                                                   ▼
                              ┌──────────────────────────────────────────┐
                              │         ROOM OCCUPIED & ACTIVE           │
                              │     (Monthly Liability Calculated)       │
                              └──────┬────────────────────────────┬──────┘
                                     │                            │
             Tenant Pays Fractional  │                            │ Tenant Moves Out Leaving Arrears
             Share (USSD / POS Cash) │                            │ (Midnight Departure)
                                     ▼                            ▼
                 ┌───────────────────────────┐   ┌─────────────────────────────────────────┐
                 │      COMPLIANT_PAID       │   │         VACANT_DECLARATION              │
                 │   (Receipt SMS Issued)    │   │   (Arrears Transferred to Tenant NIN;   │
                 └───────────────────────────┘   │    Billing Liability Paused)            │
                                                 └─────────────────────────────────────────┘
```

### 5.2 PostgreSQL / Supabase Client-Server DDL Schema

```sql
-- Module 01: Multi-Tenant Compound Cadastre & Fractional Room Wallets Schema

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. Master Cadastral Compound Registry
CREATE TABLE customer_compounds (
    compound_id VARCHAR(32) PRIMARY KEY, -- E.g., 'CMP-AGEGE-0482'
    cadastre_parcel_id VARCHAR(32) NOT NULL UNIQUE, -- Official LAGIS 'LASG-CAD-ID'
    street_number VARCHAR(16) NOT NULL,
    street_name VARCHAR(128) NOT NULL,
    neighborhood_district VARCHAR(64) NOT NULL,
    lga_id VARCHAR(32) NOT NULL,
    ward_id VARCHAR(32) NOT NULL,
    building_footprint_geom GEOMETRY(Polygon, 4326) NOT NULL,
    centroid_coordinates GEOMETRY(Point, 4326) NOT NULL,
    building_type VARCHAR(32) NOT NULL DEFAULT 'FACE_ME_I_FACE_YOU' 
        CHECK (building_type IN ('SINGLE_FAMILY', 'MULTI_FLAT_APARTMENT', 'FACE_ME_I_FACE_YOU', 'MIXED_COMMERCIAL_RESIDENTIAL')),
    total_rooms_count INTEGER NOT NULL DEFAULT 1,
    active_residential_rooms INTEGER NOT NULL DEFAULT 1,
    active_commercial_units INTEGER NOT NULL DEFAULT 0,
    density_multiplier NUMERIC(3, 2) NOT NULL DEFAULT 1.50,
    approved_statutory_tariff_naira NUMERIC(10, 2) NOT NULL,
    master_wallet_balance_naira NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    compound_qr_hash VARCHAR(64) NOT NULL UNIQUE,
    assigned_psp_partner_id VARCHAR(32) NOT NULL,
    landlord_lasrra_id VARCHAR(32),
    landlord_phone VARCHAR(16),
    caretaker_lasrra_id VARCHAR(32),
    caretaker_phone VARCHAR(16),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Individual Room Fractional Sub-Accounts
CREATE TABLE customer_rooms (
    room_id VARCHAR(48) PRIMARY KEY, -- E.g., 'CMP-AGEGE-0482-RM-04'
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id) ON DELETE CASCADE,
    room_number_label VARCHAR(32) NOT NULL, -- E.g., 'Room 4', 'Flat 2B', 'Ground Chemist'
    unit_category VARCHAR(32) NOT NULL DEFAULT 'RESIDENTIAL_ROOM' 
        CHECK (unit_category IN ('RESIDENTIAL_ROOM', 'COMMERCIAL_RETAIL', 'COMMERCIAL_FOOD', 'EXEMPT_STORE')),
    room_state VARCHAR(16) NOT NULL DEFAULT 'OCCUPIED' 
        CHECK (room_state IN ('OCCUPIED', 'VACANT', 'EXEMPT')),
    current_tenant_name VARCHAR(128),
    current_tenant_phone VARCHAR(16),
    current_tenant_nin_hash VARCHAR(64),
    current_tenant_lasrra_id VARCHAR(32),
    fractional_monthly_liability_naira NUMERIC(10, 2) NOT NULL,
    child_virtual_account_nuban VARCHAR(16) NOT NULL UNIQUE, -- 10-digit NIBSS dedicated virtual account
    current_wallet_balance_naira NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    compliance_state VARCHAR(16) NOT NULL DEFAULT 'COMPLIANT_PAID' 
        CHECK (compliance_state IN ('COMPLIANT_PAID', 'PENDING_TOPUP', 'IN_ARREARS')),
    days_in_arrears INTEGER NOT NULL DEFAULT 0,
    accumulated_arrears_naira NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    last_payment_timestamp TIMESTAMP WITH TIME ZONE,
    last_payment_rrn VARCHAR(64)
);

-- 3. Room Financial Transactions Ledger (Omnichannel)
CREATE TABLE room_financial_transactions (
    transaction_id VARCHAR(64) PRIMARY KEY, -- E.g., 'TX-ROOM-20261113-0941'
    room_id VARCHAR(48) NOT NULL REFERENCES customer_rooms(room_id),
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    payment_channel VARCHAR(16) NOT NULL 
        CHECK (payment_channel IN ('USSD', 'POS_KIOSK_CASH', 'BANK_TRANSFER', 'CARD', 'RECYCLING_CREDIT')),
    amount_paid_naira NUMERIC(10, 2) NOT NULL,
    pre_transaction_balance NUMERIC(10, 2) NOT NULL,
    post_transaction_balance NUMERIC(10, 2) NOT NULL,
    external_switch_reference VARCHAR(64) NOT NULL UNIQUE,
    pos_agent_id VARCHAR(32),
    receipt_sms_delivery_status VARCHAR(16) NOT NULL DEFAULT 'DELIVERED',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Tenancy Vacancy & Arrears Decoupling Audit Vault
CREATE TABLE tenancy_vacancy_audits (
    audit_id VARCHAR(64) PRIMARY KEY, -- E.g., 'VAC-AUDIT-20261113-042'
    room_id VARCHAR(48) NOT NULL REFERENCES customer_rooms(room_id),
    compound_id VARCHAR(32) NOT NULL REFERENCES customer_compounds(compound_id),
    departed_tenant_phone VARCHAR(16) NOT NULL,
    departed_tenant_nin_hash VARCHAR(64) NOT NULL,
    outstanding_arrears_decoupled_naira NUMERIC(10, 2) NOT NULL,
    declared_by_caretaker_lasrra VARCHAR(32) NOT NULL,
    verified_by_neighbor_room_1 VARCHAR(48) NOT NULL,
    verified_by_neighbor_room_2 VARCHAR(48) NOT NULL,
    vacancy_effective_date DATE NOT NULL,
    civil_debt_recovery_ticket_id VARCHAR(64) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Spatial and Relational Indices
CREATE INDEX idx_compound_cadastre ON customer_compounds(cadastre_parcel_id);
CREATE INDEX idx_compound_geom ON customer_compounds USING GIST(centroid_coordinates);
CREATE INDEX idx_rooms_nuban ON customer_rooms(child_virtual_account_nuban);
CREATE INDEX idx_rooms_compound ON customer_rooms(compound_id, compliance_state);
CREATE INDEX idx_tx_room_date ON room_financial_transactions(room_id, created_at DESC);
```

---

## 6. RESTful Service & Enterprise Event Bus Specifications

### 6.1 OpenAPI 3.1 REST Endpoints

```yaml
openapi: 3.1.0
info:
  title: LAWMA Multi-Tenant Compound Cadastre & Fractional Wallet API
  version: 4.0.0
  description: Sovereign REST endpoints for address cadastre resolution, room fractional accounts, USSD balance queries, and vacancy decoupling.
paths:
  /v4/resident/compounds/resolve-address:
    get:
      summary: Resolve Address to Sovereign LAGIS Parcel & Tariff Ceiling
      parameters:
        - name: query
          in: query
          required: true
          schema: { type: string, example: "14 Olowu Street Agege" }
      responses:
        '200':
          description: Cadastral parcel resolved successfully.
          content:
            application/json:
              schema:
                type: object
                required: [cadastre_parcel_id, address, statutory_tariff_ceiling_naira, density_multiplier]
                properties:
                  cadastre_parcel_id: { type: string, example: "LASG-CAD-AGE-98124" }
                  address: { type: string }
                  building_type: { type: string, example: "FACE_ME_I_FACE_YOU" }
                  statutory_tariff_ceiling_naira: { type: number, example: 9600.00 }
                  density_multiplier: { type: number, example: 1.50 }
                  assigned_psp_name: { type: string, example: "Mainland Clean Services" }

  /v4/resident/rooms/{room_id}/wallet/deposit-pos-kiosk:
    post:
      summary: Ingest Kiosk POS Cash Deposit
      security:
        - PosSwitchApiKey: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [child_virtual_account_nuban, amount_naira, pos_agent_terminal_id, pos_rrn]
              properties:
                child_virtual_account_nuban: { type: string, example: "9821400412" }
                amount_naira: { type: number, example: 600.00 }
                pos_agent_terminal_id: { type: string, example: "MONIE-POS-7821" }
                pos_rrn: { type: string, example: "RRN-20261113-998124" }
      responses:
        '200':
          description: Cash deposit credited. Instant receipt SMS generated.

  /v4/resident/rooms/{room_id}/declare-vacancy:
    post:
      summary: Declare Room Vacancy & Decouple Historical Arrears
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required: [caretaker_lasrra_id, neighbor_witness_1_room, neighbor_witness_2_room]
              properties:
                caretaker_lasrra_id: { type: string }
                neighbor_witness_1_room: { type: string }
                neighbor_witness_2_room: { type: string }
      responses:
        '200':
          description: Vacancy registered. Arrears decoupled to personal NIN civil debt.
```

### 6.2 Enterprise Kafka Event Schemas

#### Event: `compound.room_payment.settled`
```json
{
  "event_id": "EVT-PAY-20261113-0941",
  "event_type": "compound.room_payment.settled",
  "timestamp": "2026-11-13T09:41:00Z",
  "data": {
    "compound_id": "CMP-AGEGE-0482",
    "cadastre_parcel_id": "LASG-CAD-AGE-98124",
    "room_id": "CMP-AGEGE-0482-RM-04",
    "child_virtual_account": "9821400412",
    "amount_naira": 600.00,
    "payment_channel": "POS_KIOSK_CASH",
    "new_room_balance": 600.00,
    "compliance_status": "COMPLIANT_PAID",
    "compound_quorum_percent": 81.25
  }
}
```

#### Event: `tenancy.arrears.decoupled`
```json
{
  "event_id": "EVT-VAC-20261113-1104",
  "event_type": "tenancy.arrears.decoupled",
  "timestamp": "2026-11-13T11:04:00Z",
  "data": {
    "compound_id": "CMP-AGEGE-0482",
    "room_id": "CMP-AGEGE-0482-RM-03",
    "decoupled_debt_amount_naira": 2400.00,
    "departed_tenant_nin_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    "civil_debt_file_reference": "DEBT-CIVIL-2026-98124",
    "room_state": "VACANT_BILLING_PAUSED"
  }
}
```

---

## 7. Field Defense Playbooks & Resident Legal Protections

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│                   FIELD DEFENSE PLAYBOOK: TENEMENT LEGAL PROTECTIONS                             │
├───────────────────────────────┬──────────────────────────────────┬───────────────────────────────┤
│       CHALLENGE VECTOR        │       OPERATIONAL VULNERABILITY  │       SYSTEMIC DEFENSE        │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 1. Landlord Rent-Markup       │ Caretaker charges ₦1,500/room for│ Official State Cadastral      │
│    Extortion                  │ ₦500 official LAWMA tariff.      │ Tariff Ceiling Certificate.   │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 2. Retaliatory Eviction       │ Landlord threatens "Notice to    │ Tenancy Law 2011 Section 44   │
│    Threats                    │ Quit" for paying LAWMA directly. │ Criminal Retaliation Shield.  │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 3. PSP Operator Route Strike  │ PSP refuses compound lift        │ 60% Quorum Service Mandate;   │
│    (Deficit Withholding)      │ because 2 rooms defaulted.       │ Landlord Title Tax Liens.     │
├───────────────────────────────┼──────────────────────────────────┼───────────────────────────────┤
│ 4. Departed Tenant Arrears    │ New tenant forced to pay debts   │ Dynamic Vacancy Decoupling;   │
│    Inheritance                │ incurred by previous occupant.   │ Personal NIN Debt Binding.    │
└───────────────────────────────┴──────────────────────────────────┴───────────────────────────────┘
```

### 7.1 Landlord Retaliatory Eviction Defense Protocol
1. Under the **Lagos State Tenancy Law 2011 (Section 44)** and **EMPL 2017 (Section 88)**, no landlord or property owner may evict, harass, or terminate tenancy agreements on grounds of a tenant complying with statutory state environmental sanitation payments.
2. If a landlord threatens a tenant with eviction for paying their fractional share directly via the app:
   - The tenant taps *"Generate Tenancy Legal Defense Certificate"* on `/wallet`.
   - The app compiles an official sealed document bearing the property's `LASG-CAD-ID`, verified payment logs, and statutory warning: *"Any landlord who issues eviction notices or demands sums exceeding the statutory tariff ceiling commits an offense punishable under Section 44 of the Tenancy Law."*
   - The tenant submits the certificate to the nearest Citizens' Mediation Centre (CMC) or Special Offences Court, securing an immediate restraining order against the landlord.

### 7.2 PSP 60% Quorum Enforcement Protocol
1. If a private operator attempts to skip a compound because some rooms have defaulted:
   - The compound dashboard displays the verified **Payment Quorum Index ($Q_{\text{collection}}$)**.
   - If $Q_{\text{collection}} \ge 60\%$, the system automatically issues a binding collection dispatch to the PSP truck terminal.
   - If the driver bypasses the compound, an automated operational deficiency penalty (₦25,000) is debited from the PSP's escrow liquidity reserve, and the complaint is escalated to the LAWMA Monitoring & Compliance Unit.

---

## 8. Statutory Verification, Evidence Act Section 84 & Executive Sign-off Matrix

Every cadastral parcel binding, room-level transaction receipt, and tenancy vacancy audit is formatted to meet the strict admissibility standards of **Section 84 of the Nigerian Evidence Act 2011**.

### 8.1 Courtroom Evidentiary Certificate Template

```
IN THE SPECIAL OFFENCES COURT OF LAGOS STATE
HOLDEN AT IKEJA / OSHODI, LAGOS
BEFORE HIS WORSHIP: [MAGISTRATE NAME]

CHARGE NO: MEWR/ENV/2026/[NUMBER]
BETWEEN:
LAGOS STATE MINISTRY OF THE ENVIRONMENT & WATER RESOURCES ...... COMPLAINANT
AND
[DEFENDANT NAME / LANDLORD / CARETAKER] ....................... DEFENDANT

CERTIFICATE OF AUTHENTICITY OF ELECTRONIC CADASTRAL RECORDS
(PURSUANT TO SECTION 84 OF THE NIGERIAN EVIDENCE ACT, 2011)

I, [OFFICER NAME], Director of Land Cadastre & Citizen Integration, 
LAWMA Regulatory Command Room, do hereby solemnly declare and certify as follows:

1. That I am the designated technical custodian of the Multi-Tenant Compound 
   Cadastre and Room Virtual Account Registry (Module RES-01).
2. That on the [DATE], at [TIME], the cryptographic database recorded that Compound ID 
   [COMPOUND_ID], bound to LAGIS Parcel [LASG_CAD_ID], had an approved statutory tariff 
   ceiling of [AMOUNT] Naira per month, with individual Room Liability set at [AMOUNT] Naira.
3. That electronic payment receipts confirm Tenant Room ID [ROOM_ID] paid all statutory 
   dues via Virtual Account [NUBAN], disproving allegations of tenant default.
4. That the servers, NIBSS virtual account interfaces, and cadastral spatial databases 
   were operating properly and within certified operational tolerances, without 
   unauthorized tampering or systemic malfunction.

DATED THIS ______ DAY OF ________________ 2026.

_______________________________________
DEPONENT / CUSTODIAN SIGNATURE
```

### 8.2 Executive Sign-off & Inter-Agency Governance Matrix

| Verification Pillar | Legal / Regulatory Benchmark | Acceptance Threshold | Auditing Authority |
| :--- | :--- | :--- | :--- |
| **Cadastral Integrity** | LAGIS Land Registry Standards | 100% of compound addresses bound to verified `LASG-CAD-ID` parcel polygons. | Lagos State Lands Bureau |
| **Tenancy Protection** | Lagos State Tenancy Law 2011 | Zero collective compound service suspensions where room payment quorum $\ge 60\%$. | Ministry of Housing / Judiciary |
| **Financial Inclusion** | CBN / NIBSS Financial Inclusion Mandate | Zero-fee cash deposit availability at $>95\%$ of registered neighborhood POS kiosks. | State Treasury Office (STO) |
| **Data Sovereignty** | NDPA 2023 Section 39 | 100% of tenant identity and NIN records encrypted with AES-256 on onshore servers. | NDPC / State DPO |
| **Sovereign Quorum** | Gubernatorial Sovereign Mandate | Signed off by Gov. Dr. Kadri Obafemi Hamzat, Comm. Wahab & MD Gbadegesin. | Lagos State Executive Council |
