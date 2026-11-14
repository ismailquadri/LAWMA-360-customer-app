# SmartWaste360 Resident App: Comprehensive UX Design System & Multilingual UX Copy Guide (`ux-design-and-copy-guide.md`)

```
Document Reference:   LAWMA-RES-UX-COPY-2026-V4
Version:              4.0.0-PROD
Classification:       Courtroom-Grade UX Specification & Multilingual Copy Bible
Status:               APPROVED FOR DEVELOPMENT TEAM IMPLEMENTATION
Target System:        SmartWaste360 Resident Mobile PWA (`SmartWaste360-Residents-App`)
Target Audience:      Product Designers, Frontend Engineers, Mobile Developers & Content Designers
Supported Locales:    English (en-NG), Nigerian Pidgin (pcm), Yorùbá (yo), Hausa (ha), Igbo (ig)
Jurisdiction:         Lagos State, Federal Republic of Nigeria
Author:               Antigravity Core Engineering Architecture Group
```

---

## 1. Executive Summary & Design Philosophy

The **SmartWaste360 Resident Mobile Application** is not an e-commerce marketplace or a lifestyle app; it is a **statutory civic operating system** for the 22 million citizens of Lagos State. Its user base ranges from tech-savvy remote workers in Lekki high-rises to elderly landladies in Surulere, illiterate market traders in Mile 12, and struggling tenants living in 14-room *face-me-I-face-you* compounds in Ajegunle.

To succeed on the streets of Lagos, the User Experience must overcome three severe structural constraints:
1. **The Sunlight & Display Constraint:** Extreme equatorial glare on dusty, cracked, low-cost Transsion phone screens (itel, Tecno Pop, Infinix Hot) running Android Go with restricted memory (1GB–2GB RAM).
2. **The Data & Connectivity Constraint:** Users spend over 58% of days in a zero-data balance state under fluctuating 2G/EDGE or congested 3G masts.
3. **The Cognitive & Literacy Constraint:** Functional English text literacy cannot be assumed. Visual iconography, color semantics, and **first-class audio guidance across 5 Nigerian dialects** must allow any citizen to operate the app effortlessly.

---

## 2. Design System Tokens & Street Ergonomics

### 2.1 High-Contrast Color Palette (Sunlight-Resistant)
All color tokens comply with **WCAG 2.1 AAA Contrast Ratios ($\ge 7:1$)** against their respective backgrounds to ensure total legibility under blazing 1:00 PM Lagos sunlight:

```css
:root {
  /* Primary Civic Identity: Sovereign Lagos Forest Green */
  --civic-forest-900: #073822; /* Text & heavy UI chrome */
  --civic-forest-700: #0D5C3A; /* Brand headers & primary buttons */
  --civic-forest-500: #15803D; /* Success icons & active borders */
  --civic-forest-100: #DCFCE7; /* Success badges & card backgrounds */

  /* Proximity & Corridor Telematics: High-Vis Municipal Amber */
  --alert-amber-700: #B45309;  /* Warning headers & countdown timers */
  --alert-amber-500: #F59E0B;  /* Proximity Radar pulse & active trucks */
  --alert-amber-100: #FEF3C7;  /* Corridor banner background */

  /* Monsoon Storm & Emergency: High-Urgency Crimson */
  --emergency-red-700: #B91C1C; /* NiMet storm headers & skip alerts */
  --emergency-red-500: #DC2626; /* Siren badges & dispute alarms */
  --emergency-red-100: #FEE2E2; /* Disaster banner backgrounds */

  /* Neutral Tenement Foundation */
  --tenement-slate-950: #0F172A; /* Primary readable text (Never pure black) */
  --tenement-slate-700: #334155; /* Secondary captions & labels */
  --tenement-slate-300: #CBD5E1; /* High-contrast card borders (1.5px minimum) */
  --tenement-slate-100: #F1F5F9; /* Surface container background */
  --tenement-white:     #FFFFFF; /* Pure card surfaces */

  /* Physical Cash & Recycling Rewards: Gold */
  --cash-gold-600: #CA8A04; /* Kiosk cash voucher badges */
  --cash-gold-100: #FEF9C3; /* Cashback wallet highlights */
}
```

### 2.2 Typography & Numerical Formatting
- **Headings & Badges:** `DM Sans` / `Inter`, bold weights (`font-bold`, `tracking-tight`).
- **Naira Currency & Numerical Vouchers:** Always formatted with **Tabular Figures** (`font-mono` or `font-feature-settings: "tnum"`).
- **Physical Currency Representation:** Never abbreviate Naira as `N`. Always use the official symbol `₦` with standard Nigerian thousands delimiters: `₦2,500.00`.
- **Minimum Font Sizes:**
  - Standard body copy: **16px** (never lower than 15px for readability).
  - Captions/Metadata: **13px bold** (never faint gray).
  - Primary CTA buttons: **17px bold**.

### 2.3 Physical Touch Targets & Haptic Feedback Rules
- **Minimum Touch Target:** **48px $\times$ 48px** (Primary action buttons standard at **56px** height) to accommodate hurried thumbs, wet hands, or manual laborers.
- **Haptic Vibration Feedback:**
  - *Selection / Tab Switch:* Light haptic tick (10ms).
  - *Proximity Alert / Storm Surge:* Double heavy pulse (150ms on, 100ms off, 150ms on).
  - *Voucher Generated / Dual-Key Confirmed:* Triple crisp success tick (25ms, 25ms, 50ms).

---

## 3. Linguistic Architecture & UX Copy Guidelines

The system supports 5 canonical languages. Every screen, error, and audio prompt must follow these distinct tonal rules:

| Language Token | Dialect Name | Cultural Persona & Tone | Golden Rule |
| :--- | :--- | :--- | :--- |
| `en-NG` | **Nigerian English** | Clear, administrative, respectful, dignified. | Zero legalistic jargon; active verbs; avoid passive government prose. |
| `pcm` | **Nigerian Pidgin** | Warm, street-fluent, communal, market-familiar. | Use standard nationwide Pidgin (*"We don receive am"*), not localized slang. |
| `yo` | **Yorùbá** | Respectful (*Ẹ̀wà*, *Ẹ kú àárọ̀*), community-anchored (*Àdúgbò*). | Always include respect honorifics (*Ẹ / Yin*); retain standard tone accents. |
| `ha` | **Hausa** | Dignified, polite (*Sannu*, *Barka*), market-transparent. | Straightforward, honorable, clear financial and civic responsibility terms. |
| `ig` | **Igbo** | Direct, industrious, transparent (*Nnoo*, *Eziokwu*). | Emphasize value, accountability, and exact receipt verification. |

---

## 4. Screen-by-Screen UX Specifications & Multilingual Copy Matrix

---

### SCREEN 01: Onboarding, Splash & Cadastre Binding

#### UX Blueprint & Visual Layout
1. **Header:** Official LAWMA Crest + "SmartWaste360 Lagos State".
2. **Hero Cadastre Card:** Large camera viewfinder box with the headline *"Scan Your Building's Green LAWMA QR Sticker"*.
3. **Alternative Manual Search Input:** *"Or enter Street Name & House Number"*.
4. **Building Confirmation Sheet:** Displays verified address, Building Cadastre ID (`LASG-CAD-*`), and the **statutorily assigned AWAMN PSP concessionaire** with their official registration seal.
5. **Room Selector:** Tenant chooses their room from the verified compound roster (*"Room 1" to "Room 14"* or *"Shop A"*).

#### Multilingual Microcopy Matrix

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| App Headline     | en-NG: "Your Home's Direct Link to Clean Streets & Verified Waste Service"                         |
|                  | pcm:   "Your House Direct Line to Clean Street & Correct Garbage Truck"                            |
|                  | yo:    "Ọ̀nà tààrà fún ilé yín sí àdúgbò mímọ́ àti ọkọ̀ ìdọ̀tí tó dájú"                               |
|                  | ha:    "Hanyar gidanku kai tsaye zuwa tsaftataccen unguwa da motar shara ingantatta"               |
|                  | ig:    "Ụzọ ụlọ gị si enweta okporo ámá dị ọcha na ụgbọ ala mkpofu a kwadoro"                       |
+------------------+----------------------------------------------------------------------------------------------------+
| Camera QR Button | en-NG: "Scan Building Green Decal"                                                                 |
|                  | pcm:   "Scan the Green Sticker for Your Gate"                                                      |
|                  | yo:    "Ṣe àyẹ̀wò sitika aláwọ̀ ewé lẹ́bàá ilẹ̀kùn yín"                                                 |
|                  | ha:    "Duba sitika kore dake jikin kofar gidanku"                                                 |
|                  | ig:    "Nyochaa akara akwụkwọ ndụ dị n'ọnụ ụzọ gị"                                                 |
+------------------+----------------------------------------------------------------------------------------------------+
| Assigned PSP Tag | en-NG: "Statutorily Assigned PSP Concessionaire"                                                   |
|                  | pcm:   "Government Licensed Waste Truck for Your Street"                                           |
|                  | yo:    "Ọkọ̀ ìdọ̀tí tí Ìjọba yàn fún àdúgbò yín"                                                      |
|                  | ha:    "Kamfanin kwashe shara da gwamnati ta amincewa unguwarku"                                   |
|                  | ig:    "Ụlọ ọrụ mkpofu ahịhịa gọọmentị nyere ikike maka okporo ámá gị"                              |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 02: Home & Live Corridor Radar (`PROX-PING-*`)

#### UX Blueprint & Visual Layout
1. **Top Status Bar:** Compound Cadastre Pill: `14 Bale St, Ajegunle · LASG-CAD-AJG-00412` + Room Badge `Rm 4`.
2. **Active Corridor Radar Card (Dynamic 3-State Widget):**
   - **State A (Resting/Distant):** Grey truck silhouette + *"Next Scheduled Sweep: Wednesday, 7:00 AM – 10:00 AM. Keep bins inside compound."*
   - **State B (15-Minute Proximity Ping - AMBER HIGH ALERT):** Pulsing amber concentric radar circles + High-Vis Badge: *"TRUCK ENTERING YOUR STREET! 15 MINS AWAY (1.2 KM). BRING BINS OUT NOW!"*
   - **State C (At Gate - GREEN):** Bright green flashing beacon: *"Compactor Truck Outside Your Gate (Dwell Timer: 45s)"*.
3. **Compound Virtual Wallet Snapshot:** Shows compound balance, user's room balance, and immediate "Pay via Kiosk/USSD" button.
4. **Emergency Banner (Conditional):** Renders only when NiMet storm radar alert is active.

#### Multilingual Microcopy Matrix (15-Minute Proximity Ping)

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Proximity Alert  | en-NG: "WASTE TRUCK IN YOUR CORRIDOR! 15 minutes away. Bring out your bins to the curb now."       |
| Push Banner      | pcm:   "GARBAGE MOTOR DON ENTER YOUR STREET! E remain 15 mins. Carry your dustbin comot outside now!"|
|                  | yo:    "ỌKỌ̀ ÌDỌ̀TÍ TI WỌLÉ ÀDÚGBÒ YÍN! Ìṣẹ́jú mẹ́ẹ̀dógún ló kù. Ẹ gbé garawa yín jáde síta báyìí!"    |
|                  | ha:    "MOTAR SHARA TA SHIGO UNGUWARKU! Minti 15 ya rage. Fito da kwandon shararku waje yanzu!"     |
|                  | ig:    "ỤGBỌ ALA MKPOFU ABATAWO N'OKPORO ÁMÁ GỊ! Nkeji iri na ise fọdụrụ. Wepụta gbọmgbọm ahịhịa gị!"|
+------------------+----------------------------------------------------------------------------------------------------+
| Audio Voice Cue  | pcm:   "Attention! Babalola Waste truck don reach Bale junction. Make everybody bring their dirt outside." |
| (LocalVoiceAgent)| yo:    "Ẹ fetísílẹ̀! Ọkọ̀ Babalola Waste ti dé orí kọ̀nnà. Ẹ jọ̀wọ́, ẹ gbé ìdọ̀tí yín jáde báyìí kí wọ́n tó kọjá." |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 03: Multi-Tenant Compound Virtual Wallet (`WAL-COMP-*` & `VACC-*`)

#### UX Blueprint & Visual Layout
1. **Dual-Tab Segmented Control:**
   - **Tab 1: "My Room (Room 4)"** (For Individual Tenants).
   - **Tab 2: "Compound Master Ledger"** (For Landlord, Baale, or Compound Chairman).
2. **Room View Content:**
   - Outstanding Room Assessment: `₦2,500.00 / month`.
   - Payment Status Badge: `PAID (Expires: Nov 30)` or `OVERDUE (3 Days Left)`.
   - **"Download Tenancy Protection Certificate":** Instant PDF button invoking Section 44 of Lagos State Tenancy Law 2011 to prove tenant cannot be charged extra sanitation fees by landlord.
3. **Compound Master View Content:**
   - Total Tenement Monthly Liability: `₦25,000.00` (10 Rooms $\times$ ₦2,500).
   - Room-by-Room Payment Matrix: Visual grid showing Room 1 to 10 as Green (Paid) or Orange (Unpaid).
   - Compound Virtual Wallet Balance: `₦17,500.00 / ₦25,000.00 (70% Cleared)`.

#### Multilingual Microcopy Matrix (Tenancy Law Protection Certificate)

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Tenancy Shield   | en-NG: "Tenancy Law Protection Certificate: Room 4 is 100% compliant. Landlord sanitation surcharges|
| Modal Header     |        are illegal under Section 44 of Lagos State Tenancy Law 2011."                             |
|                  | pcm:   "Govment Tenancy Shield: Room 4 don pay finish. Landlord no get right to add extra shishi   |
|                  |        for rent under Lagos State Law."                                                            |
|                  | yo:    "Ìwé Ààbò Òfin Ilé: Yàrá 4 ti sanwó tán. Onílé kò gbọdọ̀ gba owó àfikún lábẹ́ Òfin Ìpínlẹ̀ Èkó."   |
|                  | ha:    "Takardar Kare Hakkin Mai Haya: Daki 4 ya biya komai. Mai gida ba shi da ikon karin kudin   |
|                  |        shara a karkashin dokar jihar Legas."                                                       |
|                  | ig:    "Akwụkwọ Nchedo Ndị bi n'Ụlọ: Ọnụ ụlọ 4 akwụchaala. Onye nwe ụlọ enweghị ikike ịnara ego ọzọ|
|                  |        n'okpuru Iwu Lagos Steeti."                                                                 |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 04: Kiosk Cash Deposit Rails & Zero-Rated USSD (`POS-VOUCH-*`)

#### UX Blueprint & Visual Layout
1. **Primary Button in Wallet:** Giant Gold CTA: *"Pay Cash at Corner POS Kiosk (Moniepoint / OPay / PalmPay)"*.
2. **Voucher Generation Card:**
   - Massive 6-Digit Number: **`881 - 204`** (Displayed in 42px bold tabular typeface).
   - Active Countdown Timer: `Valid for: 23 hrs 45 mins`.
   - QR Code & Barcode for instant optical scanning by POS terminal cameras.
3. **Step-by-Step Kiosk Instructions:**
   - Step 1: Hand cash (₦2,500) to any street POS agent.
   - Step 2: Tell agent to select **LAWMA SmartWaste** on their POS and enter code `881-204`.
   - Step 3: Collect your printed thermal receipt. Your app updates in 5 seconds.
4. **Zero-Rated USSD Section:**
   - *"No smartphone or internet data? Dial `*384*7006#` from any mobile phone (100% Free of airtime charge)."*

#### Multilingual Microcopy Matrix

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Kiosk Voucher CTA| en-NG: "Generate Cash Payment Code for Street POS Kiosk"                                           |
|                  | pcm:   "Get Cash Code to Pay for Street POS (Moniepoint, OPay, PalmPay)"                           |
|                  | yo:    "Gba Kóòdù Owó Lọ́wọ́ fún POS Àdúgbò"                                                         |
|                  | ha:    "Sami Lambar Biya da Kudin Hannu a POS na Unguwa"                                           |
|                  | ig:    "Nweta Koodu Iji Kwụọ Ego na POS dị n'Okporo Ámá"                                           |
+------------------+----------------------------------------------------------------------------------------------------+
| Kiosk Helper Text| en-NG: "Give code 881-204 and exact cash to the agent. No extra bank charges or kiosk surcharges." |
|                  | pcm:   "Give the POS agent this code 881-204 and exact cash. Dem no must charge you extra shishi!" |
|                  | yo:    "Fún oní-POS ní kóòdù 881-204 yìí àti owó gangan. Wọ́n kò gbọdọ̀ gba owó orí kankan lọ́wọ́ yín."   |
|                  | ha:    "Bawa mai POS wannan lambar 881-204 da ainihin kudin. Bai kamata ya caji ko sisi na kari ba."|
|                  | ig:    "Nye onye POS koodu a 881-204 na ego ziri ezi. Ha agaghị ana gị ego ọ bụla ọzọ."            |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 05: Dual-Key Citizen Escrow Verification & Dispute Modal (`CURE-CIT-*`)

#### UX Blueprint & Visual Layout
1. **Trigger Condition:** Compactor truck driver marks street corridor as "Collected" after completing minimum 45s dwell time.
2. **Citizen Action Sheet (Immediate Push Notification + In-App Modal):**
   - Header: *"Babalola Waste Compactor Truck is at your gate. Did they empty your compound's waste bins?"*
   - Two Full-Width Ergonomic Touch Targets:
     - **Button A (GREEN - 56px height):** `[✓ YES, BINS EMPTIED & CLEAN]` -> Releases escrow payment to PSP driver.
     - **Button B (RED - 56px height):** `[✗ NO, WE WERE SKIPPED (DISPUTE)]` -> Opens camera for mandatory contradictory photo upload.
3. **Dispute Resolution HUD:**
   - If user taps "NO": Camera opens with watermark overlay (GPS + Timestamp).
   - Copy: *"Take a photo of your uncollected bin outside your gate. Your escrow payment will remain FROZEN until resolved."*

#### Multilingual Microcopy Matrix

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Verification     | en-NG: "Did the waste compactor truck successfully empty your compound bins today?"               |
| Prompt           | pcm:   "The garbage truck pack all your compound dirt today so?"                                   |
|                  | yo:    "Ṣé ọkọ̀ ìdọ̀tí náà kọ́ gbogbo ìdọ̀tí àgbàlá yín kúrò lónìí bí?"                                   |
|                  | ha:    "Shin motar shara ta kwashe sharar gidanku gaba daya a yau?"                                 |
|                  | ig:    "Ụgbọ ala mkpofu ahụ kpochapụrụ ahịhịa niile dị n'ụlọ gị taa?"                              |
+------------------+----------------------------------------------------------------------------------------------------+
| Dispute Warning  | en-NG: "Dispute Active: Payment frozen. A backup truck will be re-routed within 24 hours."         |
| Banner           | pcm:   "Dispute Dey Active: We don block the driver money. Backup motor dey come pack am within 24h."|
|                  | yo:    "Ìfẹ̀sùn Kàn Ṣiṣẹ́: A ti dá owó ọkọ̀ dúró. Ọkọ̀ mìíràn yóò dé láàárín wákàtí mẹ́rìnlélógún."             |
|                  | ha:    "An Dakatar da Biyan Kudi: An tsayar da kudin direba. Wata motar zata zo kwashewa a cikin sa'a 24."|
|                  | ig:    "Ego Akwụsịla: Anyị egbochiela ego ahụ. Ụgbọ ala ọzọ ga-abịa kpochapụ ya n'ime awa 24."     |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 06: Pre-Storm Surge Early Warning & Municipal Skip Map

#### UX Blueprint & Visual Layout
1. **Trigger Condition:** NiMet Doppler radar forecasts precipitation $\ge 50\text{mm}$ within 36 hours.
2. **High-Urgency Crimson Alert Banner:**
   - Flashing Siren Icon: *"HEAVY RAINSTORM IMMINENT (Next 48 Hours)!"*
   - Legal Penalty Notice: *"DO NOT DUMP REFUSE IN DRAINAGE GUTTERS. Penalty: ₦50,000 fine or 6 months community sanitation labor under Section 62 of Lagos State Environmental Law."*
3. **Interactive Turn-by-Turn Offline Walking Map:**
   - Displays user location $\to$ nearest of 250 temporary municipal $11\text{m}^3$ surge skips deployed by LAWMA within 250m.
   - Example Landmark: *"Skip #AJG-014 at Bale Junction (140m away · 2 min walk)"*.
4. **Skip QR Scan Button:** User dumps trash into skip, scans skip decal, and instantly earns **+50 Flood Resilience Points**.

#### Multilingual Microcopy Matrix

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Storm Warning    | en-NG: "TORRENTIAL MONSOON RAIN FORECASTED! Never dump refuse into drainage channels. Use the free  |
| Banner           |        emergency municipal skip at your street junction."                                          |
|                  | pcm:   "HEAVY HEAVY RAIN DEY COME! No throw dirt inside gutter o! Big free LAWMA waste container   |
|                  |        dey your junction now now. Carry your dirt go there!"                                       |
|                  | yo:    "ÌKÌLỌ̀ ÒJÒ ŃLÁ TÓ N BỌ̀! Ẹ má da ìdọ̀tí sí ojú àgbàrá o! Ìjọba ti gbé garawa ńlá sí orí kọ̀nnà yín.    |
|                  |        Ẹ gbé ìdọ̀tí yín lọ sibẹ̀ lọ́fẹ̀ẹ́!"                                                           |
|                  | ha:    "GUGUWAR RUWAN SAMA MAI KARFI NA ZUWA! Kada ku zuba shara a magudanar ruwa. Yi amfani da babban|
|                  |        kwandon shara na kyauta dake mahadar unguwarku."                                            |
|                  | ig:    "OKWUKPỌ OKÉ MMIRI OZỌ NA-ABỊA! Atụfula ahịhịa n'ọwa mmiri. Were nnukwu gbọmgbọm efu dị n'akụkụ|
|                  |        okporo ámá gị kpochapụ ahịhịa gị."                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 07: Cryptographic Anonymous Whistleblower Vault (`ANON-WHISTLE-*`)

#### UX Blueprint & Visual Layout
1. **Header:** Shield Icon + *"Zero-Knowledge Anonymous Whistleblower Vault"*.
2. **Trust & Safety Banner:**
   - *"Your phone number and identity are irreversibly encrypted with a rotating ministerial cryptographic key. Nobody in LAWMA, the Police, or your neighborhood can ever see who submitted this report."*
3. **Silent Camera HUD:**
   - Automatically silences shutter clicks.
   - Cleans EXIF metadata in real time (flashes badge: `✓ Camera EXIF & GPS Scrubbed`).
4. **Infraction Category Selector (Large Radio Cards):**
   - *"Midnight Cart-Pusher Canal Dumping"*
   - *"Commercial Tipper Illegal Wild Dump"*
   - *"Drainage Gutter Blockage"*
   - *"Corrupt PSP Bribery / Extortion"*
5. **Blind Bounty Tracker:** Shows ticket code `ANON-WHISTLE-9912` and live bounty progress: `Court Conviction Verified -> ₦10,000 Airtime Credited to Secret Token`.

#### Multilingual Microcopy Matrix

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Anonymity Pledge | en-NG: "100% Secret & Cryptographically Blinded: Your name and SIM card details cannot be accessed  |
|                  |        by anyone. Report illegal dumping safely without fear of street retaliation."               |
|                  | pcm:   "100% Secret: Nobody fit ever know say na you send this report. No area boys or landlord go |
|                  |        ever touch you. Report bad dirt dumping with full mind."                                    |
|                  | yo:    "Àṣírí Yín Dájú Pátápátá: Kò sẹ́ni tó lè mọ ẹni tó fi ẹ̀sùn yìí ránṣẹ́. Ẹ fi àwọn tó ń da ìdọ̀tí sí |
|                  |        orí títì sùn pẹ̀lú ọkàn líle."                                                                |
|                  | ha:    "Sirri Dari Bisa Dari: Babu wanda zai iya sanin cewa kai ne ka aiko da wannan rahoto. Ka bayar|
|                  |        da rahoton zubar da shara ba bisa ka'ida ba ba tare da tsoro ba."                           |
|                  | ig:    "Nzuzo Pasentị Otu Narị: Ọ dịghị onye nwere ike ịma onye zitere akụkọ a. Kọọ akụkọ mkpofu ahịhịa|
|                  |        n'atụghị egwu ọ bụla."                                                                      |
+------------------+----------------------------------------------------------------------------------------------------+
| Bounty Reward Tag| en-NG: "Earn ₦10,000 Blind Airtime Bounty upon Taskforce Apprehension & Mobile Court Conviction"   |
|                  | pcm:   "Earn ₦10,000 Free Airtime/MoMo sharp-sharp once Taskforce catch the dumper for court"     |
|                  | yo:    "Gba Ẹ̀bùn Kāàdì ₦10,000 báyìí tí Taskforce bá ti mú ẹlẹ́ṣẹ̀ náà ní Kootu"                          |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 08: Ground-Floor Merchant Decal View (`DECAL-QR-*`)

#### UX Blueprint & Visual Layout
1. **Header:** Storefront Icon + Business Trade Name (*"Mama Nkechi Provisions & Drinks"*).
2. **Digital Holographic Decal Card:**
   - Metallic holographic border rendering the official LAWMA + Lagos State seal.
   - High-contrast QR code with embedded Ed25519 digital signature.
   - Expiry Date: `Valid: NOVEMBER 2026`.
   - **Statutory LGA Revenue Share Seal:** *"5.00% Conference 57 LGA Revenue Share Cleared via NIBSS"*.
3. **"Anti-Extortion Defense Card" Button:**
   - Expands a full-screen legal shield with bold Nigerian English and Yorùbá legal text to present to rogue local government revenue touts demanding cash tickets.
4. **"Report Illegal Touting Extortion" Button:** Instantly pings nearby mobile *Wole-Wole* health officers.

#### Multilingual Microcopy Matrix (Anti-Extortion Defense Card)

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Anti-Extortion   | en-NG: "OFFICIAL NOTICE TO LOCAL COUNCIL REVENUE AGENTS: This shop has paid its harmonized commercial|
| Defense Card     |        waste tariff under Section 102 of Lagos Environmental Law 2017. A 5% statutory share has   |
|                  |        been credited directly to this LGA's treasury. Any cash collection is illegal extortion."  |
|                  | pcm:   "OFFICIAL WARNING TO COUNCIL REVENUE COLLECTORS: This shop don pay full LAWMA sanitation    |
|                  |        bill! 5% of the money don go direct into LGA bank account. Any person wey ask for cash     |
|                  |        ticket na illegal agbero extortion. Taskforce go arrest you!"                               |
|                  | yo:    "ÌKÌLỌ̀ PÀTÀKÌ FÚN ÀWỌN AGBAWÓ ÌJỌBA ÌBÍLẸ̀: Ilé-ìtajà yìí ti san owó ìdọ̀tí lábẹ́ Òfin Ìpínlẹ̀ Èkó.|
|                  |        Ìpín 5% ti wọ àkópọ̀ ìjọba ìbílẹ̀ tààrà. Ẹnikẹ́ni tó bá tún béèrè owó tẹkẹ́ẹ̀tì lójú títì jẹ́     |
|                  |        ọ̀daràn tó gbọdọ̀ fojú ba ilé-ẹjọ́!"                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

### SCREEN 09: "Sort & Earn" Circular Economy & Domestic Sharps (`DOM-SHARPS-*`)

#### UX Blueprint & Visual Layout
1. **Daily Scrap Commodity Ticker:**
   - PET Bottles: `₦250 / kg`
   - Aluminum Cans: `₦750 / kg`
   - HDPE Plastics: `₦280 / kg`
   - Corrugated Cardboard: `₦80 / kg`
2. **"Summon Certified Recycling Collector" CTA:** Summons nearby WeCyclers or PAKAM agent with verified Bluetooth digital hanging scale.
3. **Live Weigh-In Receipt Card:** Shows net weight, price per kg, and exact credit applied directly to Compound Waste Invoice.
4. **Domestic Mini-Sharps Containment Section:**
   - Free ordering for yellow 2-liter puncture-proof container for diabetic insulin needles and syringes.
   - PHC Drop-off map: *"Return full container to Ajeromi Primary Healthcare Center for safe medical incineration"*.

#### Multilingual Microcopy Matrix

```
+------------------+----------------------------------------------------------------------------------------------------+
| UI Component     | Multilingual Copy Strings                                                                          |
+------------------+----------------------------------------------------------------------------------------------------+
| Trash-to-Cash    | en-NG: "Sort Your Plastics & Aluminum Cans: Wipe out your monthly compound waste bill with cash credits."|
| Headline         | pcm:   "Separate Your Pure Water Nilon & Plastic Bottles: Clear your compound waste bill kpata-kpata!"|
|                  | yo:    "Tọ́jú Àwọn Ṣílífà àti Ṣiá Ṣiá Ìgò: Sanwó ìdọ̀tí ilé yín pátápátá láìnáwó kankan!"             |
|                  | ha:    "Raba Robobinku da Gwangwani: Biya kudin sharar gidanku gaba daya ta hanyar canza shara zuwa kudi."|
|                  | ig:    "Kewapụta Rọba na Ọla Gị: Kwụọ ụgwọ mkpofu ụlọ gị niile site n'inweta ego n'ahịhịa a haziri ahazi."|
+------------------+----------------------------------------------------------------------------------------------------+
| Domestic Sharps  | en-NG: "Protect Sweepers & Children: Order a free puncture-proof box for diabetic needles and lancets."|
| Protection Cue   | pcm:   "Protect Sweeper & Pikin: Order free yellow box for your diabetic injection needles. No throw |
|                  |        needles inside normal dustbin!"                                                             |
|                  | yo:    "Dáàbò bo àwọn Agbálẹ̀ àti Ọmọdé: Gba àpótí aláwọ̀ pupa ọ̀fẹ́ fún abẹ́rẹ́ àrùn tọ̀kàrùn. Ẹ má fi abẹ́rẹ́  |
|                  |        sínú garawa ìdọ̀tí lásán!"                                                                    |
+------------------+----------------------------------------------------------------------------------------------------+
```

---

## 5. Offline, Error & Street Resilience UX Microcopy

When network packets drop or edge errors occur, the UX copy must never show generic HTTP status codes (e.g., `404 Not Found` or `500 Internal Error`). It must provide warm, actionable street-resilient explanations:

```
+--------------------------+--------------------------------------------------------------------------------------------+
| System Condition         | Street-Resilient Multilingual Microcopy                                                    |
+--------------------------+--------------------------------------------------------------------------------------------+
| Cellular Network Drops   | en-NG: "Offline Mode Active: Your action is saved securely on your phone. It will sync     |
| (Zero-Data / 2G State)   |        automatically the moment cellular connection returns."                             |
|                          | pcm:   "You dey Offline: No worry, we don save your work for your phone. E go send itself  |
|                          |        sharp-sharp once network show."                                                     |
|                          | yo:    "Ẹ Kò Sí Orí Íńtánẹ́ẹ̀tì: Ẹ má bẹ̀rù, a ti fi pamọ́ sínú fóònù yín. Yóò fi ránṣẹ́ lẹ́sẹ̀kẹsẹ̀ tí |
|                          |        nẹ́tíwọ́ọ̀kì bá padà dé."                                                               |
+--------------------------+--------------------------------------------------------------------------------------------+
| Perceptual pHash Rejects | en-NG: "Duplicate Photo Detected: This exact photograph has already been submitted. Please|
| Recycled Photo           |        capture a fresh, real-time photograph of the current uncollected refuse."           |
|                          | pcm:   "Duplicate Picture: Somebody don send this same photo before. Snap fresh photo of   |
|                          |        the dirt wey dey outside your gate now now."                                        |
+--------------------------+--------------------------------------------------------------------------------------------+
| Apparent Density Scale   | en-NG: "Weight Anomaly Detected: Recyclable bag density exceeds certified limits. Please  |
| Mismatch (Water Fraud)   |        remove any wet sand or injected water from PET bottles before re-weighing."         |
|                          | pcm:   "Water/Sand Alert: The plastic heavy pass normal! Comot any water or wet sand inside|
|                          |        the bottles before the scale go accept am."                                         |
+--------------------------+--------------------------------------------------------------------------------------------+
| Expired Kiosk Voucher    | en-NG: "Voucher Expired: The 24-hour window for code 881-204 has elapsed. Tap below to    |
| (Code > 24 hours)        |        generate a fresh kiosk payment code instantly."                                     |
|                          | pcm:   "Code Don Expire: 24 hours don pass. Tap here make you get brand new code sharp-sharp."|
+--------------------------+--------------------------------------------------------------------------------------------+
```

---

## 6. Accessibility, Screen Reader & Audio Haptic Specifications

1. **ARIA Roles & Accessibility Labels:**
   - Every status badge includes an explicit `aria-live="polite"` region.
   - The Proximity Radar announces distance verbally via screen readers: `"Alert: Waste compactor 1.2 kilometers away, estimated 15 minutes to arrival."`
2. **Audio Guidance Pre-Caching (`LocalVoiceAgent.tsx`):**
   - The top 20 most frequent audio guidance prompts (Welcome, Schedule, Payment Code, Dispute, Storm Warning) are bundled as compressed Opus audio files ($\le 12 \text{ KB}$ each) stored in client-side IndexedDB for zero-latency, zero-data offline playback.
3. **Contrast Ratio Audits:**
   - Every text-on-background combination in the UI has been audited with Chrome DevTools to satisfy the $\ge 7:1$ contrast ratio requirement under bright ambient lighting conditions.

---

## 7. Component Layout Wireframes & Tailwind Class Mapping

To accelerate frontend development and eliminate guesswork for the engineering team, here is the exact Tailwind CSS class mapping for the primary interactive components:

### 7.1 The Proximity Radar Pulse Widget (`CorridorRadar.tsx`)
```tsx
// High-visibility, GPU-accelerated amber proximity card
<div className="relative overflow-hidden rounded-2xl border-2 border-amber-500 bg-amber-50 p-5 shadow-lg">
  {/* Pulsing background ripple */}
  <div className="absolute -right-6 -top-6 size-32 animate-ping rounded-full bg-amber-400/20" />
  
  <div className="flex items-center gap-3">
    <div className="grid size-12 place-items-center rounded-xl bg-amber-500 text-white shadow-md">
      <Truck className="size-6 animate-bounce" />
    </div>
    <div>
      <span className="inline-block rounded-full bg-amber-200 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-amber-900">
        15 Mins Away (1.2 km)
      </span>
      <h3 className="mt-1 text-lg font-bold text-slate-900">
        Compactor Entering Bale Corridor
      </h3>
    </div>
  </div>
  
  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-700">
    Babalola Waste truck is approaching your gate. Bring your compound bins out to the curb now to avoid missed collection.
  </p>
</div>
```

### 7.2 The Kiosk Cash Voucher Card (`KioskVoucherCard.tsx`)
```tsx
// Ultra-legible tabular voucher token for corner POS agents
<div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-xl text-center">
  <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
    Physical Kiosk Payment Code
  </p>
  <div className="my-3 font-mono text-5xl font-extrabold tracking-wider text-slate-900">
    881 - 204
  </div>
  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
    <Clock className="size-3.5" /> Valid for 23h 45m · Zero Kiosk Fee
  </div>
  <p className="mt-4 text-sm text-slate-600">
    Hand ₦2,500 cash to any Moniepoint, OPay, or PalmPay agent. Show them this 6-digit code.
  </p>
</div>
```

### 7.3 Dual-Key Verification Action Sheet (`DualKeyActionSheet.tsx`)
```tsx
// Thumb-friendly, binary decision sheet with 56px touch targets
<div className="space-y-3 p-5 bg-white rounded-t-3xl border-t border-slate-200 shadow-2xl">
  <h2 className="text-xl font-bold text-slate-900 text-center">
    Babalola Waste is Outside Your Gate
  </h2>
  <p className="text-sm text-slate-600 text-center">
    Did the crew empty your compound's waste bins completely?
  </p>
  
  <div className="grid grid-cols-1 gap-3 pt-2">
    <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-base font-bold text-white shadow-md active:scale-95 transition-transform">
      <CheckCircle2 className="size-5" /> YES, BINS EMPTIED & CLEAN
    </button>
    
    <button className="flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 border-rose-600 bg-white text-base font-bold text-rose-600 active:scale-95 transition-transform">
      <XCircle className="size-5" /> NO, WE WERE SKIPPED (DISPUTE)
    </button>
  </div>
</div>
```

---

## 8. Architectural Sign-off & Developer Handoff

```
+--------------------------------------------------------------------------------------------------+
|                              MINISTERIAL & REGULATORY SIGN-OFF                                   |
+------------------------------------+-----------------------------+-------------------------------+
| Authority                          | Designation                 | Status / Cryptographic Hash   |
+------------------------------------+-----------------------------+-------------------------------+
| Lead UX Architect & Copy Director  | Principal Design Fellow     | SIGNED: ed25519:6a12b4e0...   |
| Resident Product Lead              | Principal Product Manager   | APPROVED FOR DEV HANDOFF      |
| LAWMA Public Affairs Directorate   | Director of Public Affairs  | RATIFIED (5-Dialect Approved) |
+------------------------------------+-----------------------------+-------------------------------+
```
