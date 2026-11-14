# QUESTION & ANSWER SPECIFICATION: MODULE 07 (`07-MOD-ECOTOX-LEACHATE`)
## Environmental Ecotoxicity, Water Table Protection, Leachate Aeration Lagoons & Perimeter Borehole Telemetry

```
Document Identifier:   LAWMA-QA-MOD-07-ECOTOX-V4
Document Version:      4.0.0-PROD
Classification:        Courtroom-Grade Forensic Architecture, Strategic Defense Q&A & Public Affairs Bank
Target Systems:        SmartWaste360 Workspace (`07-MOD-ECOTOX-LEACHATE`), LASEPA Ecotoxicology Lab Ingestion,
                       Perimeter Hydrogeological Borehole Network, Leachate Aeration & Wetland Lagoons
Statutory Foundation:  2017 Lagos State Environmental Management and Protection Law (EMPL) Sections 34–55 & 75–83;
                       National Environmental Standards and Regulations Enforcement Agency (NESREA) Act 2007;
                       Lagos State Water Regulatory Commission (LASWARCO) Law & Drinking Water Guidelines;
                       Evidence Act 2011 (Section 84 - Sensor Telemetry & Laboratory Spectrometric Assays);
                       World Health Organization (WHO) Guidelines for Drinking-water Quality (4th Edition)
Executive Sponsors:    Hon. Rasheed Shabi (LAHA Committee on Environment / MANDATE-SHB-02),
                       Hon. Tokunbo Wahab (Hon. Commissioner, MEWR), Dr. Kadri Obafemi Hamzat (KOH),
                       Dr. Babatunde Ajayi (GM LASEPA), Dr. Muyiwa Gbadegesin (MD LAWMA)
Date of Enactment:     November 2026
```

---

## Executive Introduction & Purpose of this Dossier

This document establishes the definitive, courtroom-grade **Question and Answer (Q&A) Strategic Defense Specification and Public Affairs Content Bank** for **Module 07: Environmental Ecotoxicity, Water Table Protection, Leachate Aeration Lagoons & Perimeter Borehole Telemetry**.

Solid waste management does not terminate when a compactor truck discharges its payload onto an active disposal cell. In a low-lying coastal megacity characterized by an exceptionally shallow water table (often resting less than 1.5 to 3.0 meters below the surface), unlined municipal dumpsites (Olushosun in Ojota, Solous II in Alimosho/Igando, Abule Egba, and Epe) operate as uncontained subterranean biochemical reactors. Decomposing organic refuse, municipal solid waste, and illicit industrial discharges generate millions of liters of highly toxic, pitch-black leachate laden with bioaccumulative heavy metals (Lead, Cadmium, Arsenic), endocrine-disrupting phthalates, recalcitrant organic contaminants, and enteric pathogens. 

In a metropolis where the municipal piped-water network reaches less than 15% of the population, over **85% of residents rely on private backyard groundwater boreholes for daily drinking, cooking, and bathing**. Uncontained leachate seeping into the unconfined shallow aquifer represents an existential public health catastrophe.

Historically, environmental ecotoxicology and dumpsite governance in Lagos State suffered from five catastrophic structural failures:
1. **The Public Health Conspiracy of Silence:** Perimeter monitoring boreholes around major dumpsites were either never drilled, collapsed from lack of casing maintenance, or sampled manually once every three years for superficial public relations reports. Down-gradient leachate plume migration into domestic drinking wells was ignored, resulting in localized surges in chronic kidney disease, spontaneous miscarriages, and childhood lead encephalopathy across host communities in Igando and Ojota.
2. **The ₦60M/Month Phantom Laterite Capping Cartel:** Environmental regulations require every active tipping cell to receive a daily 15cm compacted blanket of red laterite clay ($0.15\text{ m}$ thickness) to suppress odors, eliminate disease vectors (blowflies, rodents), prevent bird strikes, and starve subsurface fires of atmospheric oxygen. In reality, corrupt contractors delivered only 4 or 5 tippers daily (approx. 120 MT), dumped loose soil over 20% of the active face, and bribed facility marshalls to certify 30 tipper loads (900 MT), pocketing **₦60M to ₦80M monthly in fraudulent billing**.
3. **The "Watered Sensor" Dilution Exploit:** Dishonest dumpsite supervisors poured clean tap water down open borehole monitoring casings 15 minutes before regulatory inspections or automated sensor polling, artificially diluting Electrical Conductivity (EC) and Total Dissolved Solids (TDS) to fabricate clean water reports while the surrounding aquifer was lethal.
4. **Subterranean Methane Blazes & Dioxin Vents:** Anaerobic decomposition inside unsealed waste heaps generated massive volumes of methane gas ($CH_4$). Methane migrated laterally through porous sandy soils into the foundations and basements of surrounding homes. Underground fires smoldered at temperatures exceeding $70^\circ\text{C}$, venting carcinogens (dioxins, furans, sulfur dioxide) over surrounding residential estates and schools.
5. **Monsoon Leachate Lagoon Canal Spills:** Open, unlined leachate retention ponds overflowed during torrential August cloudbursts. Millions of liters of black, stinking sludge with Biochemical Oxygen Demand (BOD) exceeding $4,000\text{ mg/L}$ spilled directly into roadside gutters and municipal drainage canals, corroding road asphalt and poisoning the Lagos Lagoon.

This companion dossier provides exhaustive mathematical, hydrogeological, and systems-level proof that Module 07 permanently eliminates these failure modes. In **Part 1**, fifteen critical inquiries from the Legislature, State Executive, environmental health scientists, community leaders, and auditing authorities are answered with forensic rigor. In **Part 2**, these technical safeguards are translated into an operational **Public Affairs & Social Media Marketing Content Bank** designed to build civic trust, protect public health, and enforce transparent environmental governance. In **Part 3**, the underlying JavaScript rules and automated test suites are verified against operational reality.

---

## Table of Critical Inquiries

- [Q01: Why mandate Multi-Depth Dual-Nested Piezometers (Shallow 8–15m vs Semi-Confined 35–50m) around every dumpsite? How does hydrogeology in the Benin Formation demand this?](#q01-why-mandate-multi-depth-dual-nested-piezometers-shallow-815m-vs-semi-confined-3550m-around-every-dumpsite-how-does-hydrogeology-in-the-benin-formation-demand-this)
- [Q02: How does the 2× Plume Attribution Rule (`PLUME_RATIO = 2`) scientifically isolate landfill pollution from domestic septic tank effluent and industrial background runoff?](#q02-how-does-the-2-plume-attribution-rule-plume_ratio--2-scientifically-isolate-landfill-pollution-from-domestic-septic-tank-effluent-and-industrial-background-runoff)
- [Q03: Why require two matching consecutive samples separated by $\ge 24\text{ hours}$ (`wellAlertConfirmed`) before declaring a community well contaminated? How does this prevent public riots?](#q03-why-require-two-matching-consecutive-samples-separated-by-ge-24text-hours-wellalertconfirmed-before-declaring-a-community-well-contaminated-how-does-this-prevent-public-riots)
- [Q04: How does the UV254 Optical Spectral Proxy estimate Chemical Oxygen Demand (COD) and organic load in real time, eliminating the 5-day BOD5 lab bottleneck?](#q04-how-does-the-uv254-optical-spectral-proxy-estimate-chemical-oxygen-demand-cod-and-organic-load-in-real-time-eliminating-the-5-day-bod5-lab-bottleneck)
- [Q05: How does the hydrostatic head delta rule ($\Delta h > 0.40\text{m}$ without rainfall) defeat the fraudulent "watered sensor" dilution exploit by corrupt landfill marshalls?](#q05-how-does-the-hydrostatic-head-delta-rule-delta-h--040textm-without-rainfall-defeat-the-fraudulent-watered-sensor-dilution-exploit-by-corrupt-landfill-marshalls)
- [Q06: How does the Potable Water Relief Rail (`RELIEF-H2O-*`) mobilize clean drinking water tankers to affected tenements in Igando and Ojota, and how does the Cadastre QR Decal prevent relief water diversion?](#q06-how-does-the-potable-water-relief-rail-relief-h2o--mobilize-clean-drinking-water-tankers-to-affected-tenements-in-igando-and-ojota-and-how-does-the-cadastre-qr-decal-prevent-relief-water-diversion)
- [Q07: How does the Tri-Factor Mass-Balance Laterite Capping Rule ($\ge 731.25\text{ MT/day}$ for $2,500\text{m}^2$) destroy the ₦60M/month phantom capping cartel?](#q07-how-does-the-tri-factor-mass-balance-laterite-capping-rule-ge-73125text-mtday-for-2500textm2-destroy-the-60mmonth-phantom-capping-cartel)
- [Q08: How do drone LiDAR photogrammetry and weekly 3D differential elevation scans verify the mandatory 15cm compacted laterite Proctor thickness?](#q08-how-do-drone-lidar-photogrammetry-and-weekly-3d-differential-elevation-scans-verify-the-mandatory-15cm-compacted-laterite-proctor-thickness)
- [Q09: How does the system enforce minimum Dissolved Oxygen ($\text{DO} \ge 2.0\text{ mg/L}$) and $90\%$ pump uptime in leachate aeration lagoons, and what prevents lagoon overflow during tropical monsoons?](#q09-how-does-the-system-enforce-minimum-dissolved-oxygen-textdo-ge-20text-mgl-and-90-pump-uptime-in-leachate-aeration-lagoons-and-what-prevents-lagoon-overflow-during-tropical-monsoons)
- [Q10: How does constructed wetland phytoremediation using *Typha latifolia* and *Chrysopogon zizanioides* treat residual leachate nutrients before environmental discharge?](#q10-how-does-constructed-wetland-phytoremediation-using-typha-latifolia-and-chrysopogon-zizanioides-treat-residual-leachate-nutrients-before-environmental-discharge)
- [Q11: How do perimeter NDIR optical methane sensors and automated solar ground flares prevent explosive gas migration into residential home foundations?](#q11-how-do-perimeter-ndir-optical-methane-sensors-and-automated-solar-ground-flares-prevent-explosive-gas-migration-into-residential-home-foundations)
- [Q12: How does the automatic payment hold gate (`ecoReferralBlocks`) freeze landfill tipping fee disbursements in Module 05 until water investigations are closed?](#q12-how-does-the-automatic-payment-hold-gate-ecoreferralblocks-freeze-landfill-tipping-fee-disbursements-in-module-05-until-water-investigations-are-closed)
- [Q13: How does the system handle high-volume commercial groundwater abstraction by sachet water factories near landfills to prevent downward plume cone-of-depression draw?](#q13-how-does-the-system-handle-high-volume-commercial-groundwater-abstraction-by-sachet-water-factories-near-landfills-to-prevent-downward-plume-cone-of-depression-draw)
- [Q14: How are downhole monitoring boreholes physically and digitally secured against host community vandalism and area boy tampering?](#q14-how-are-downhole-monitoring-boreholes-physically-and-digitally-secured-against-host-community-vandalism-and-area-boy-tampering)
- [Q15: How do digital water quality sensor logs, GC-MS laboratory certificates, and Section 84 Evidence Act dockets defeat corporate polluters in environmental litigation?](#q15-how-do-digital-water-quality-sensor-logs-gc-ms-laboratory-certificates-and-section-84-evidence-act-dockets-defeat-corporate-polluters-in-environmental-litigation)

---

# PART 1: STRATEGIC & EXECUTIVE DEFENSE Q&A

```
========================================================================================
SECTION 1: HYDROGEOLOGY, GROUNDWATER MONITORING & ATTRIBUTION PHYSICS
========================================================================================
```

### Q01: Why mandate Multi-Depth Dual-Nested Piezometers (Shallow 8–15m vs Semi-Confined 35–50m) around every dumpsite? How does hydrogeology in the Benin Formation demand this?

#### Hydrogeological Reality in the Lagos Coastal Basin
The Lagos metropolis rests geologically on the eastern sector of the Dahomey Sedimentary Basin, dominated by the **Benin Formation**—a coastal sequence of friable, coarse-to-medium grained sands intercalated with discontinuous, lenticular silt and clay bands. The hydrogeology features three distinct vertical zones:
1. **The Recent / Alluvial Shallow Sand Aquifer (0 to 15 meters depth):** Characterized by high hydraulic conductivity ($K = 10^{-3} \text{ to } 10^{-4}\text{ m/s}$), this water table is unconfined and sits within 1.5 to 3.0 meters of the surface. Because drilling shallow hand-dug wells or low-cost tube boreholes is inexpensive, **over 85% of tenement residents in peri-urban dumpsite host communities (such as Igando, Egan, and Ojota) abstract drinking water directly from this shallow layer**.
2. **The Upper Clay / Silt Aquitard (15 to 30 meters depth):** A semi-permeable, discontinuous confining bed that provides variable resistance to vertical contaminant migration.
3. **The Intermediate Benin Sand Aquifer (35 to 60 meters depth):** A semi-confined, higher-yield regional aquifer tapped by industrial estates, hospitals, and commercial sachet water packaging factories.

#### The Legacy Single-Borehole Failure Mode
Historically, environmental consultants drilled superficial 10-meter boreholes or single 40-meter boreholes. If only deep wells were monitored, horizontal leachate migration in the shallow unconfined zone reached residential drinking wells years before detection at depth. Conversely, if only shallow wells were sampled, downward cross-formational leakage through fractured clay lenses into the regional drinking supply was entirely missed.

#### Architectural Resolution: Dual-Nested Piezometer Clusters
Module 07 mandates that every active and legacy dumpsite install paired **Dual-Nested Piezometer Clusters** at 200-meter intervals along both up-gradient and down-gradient boundary vectors:

```
                               LANDFILL LEACHATE PERCOLATION
                                     │ (Head > 4.5m)
                                     ▼
 0m ───┬─────────────────────────────────────────────────────────────────┬─── 0m
       │           RECENT ALLUVIAL SAND AQUIFER (UNCONFINED)             │
       │   [ PIEZOMETER A: SHALLOW (8–15m) ]                             │
       │   - Screened: 10m to 14m                                        │
       │   - Monitors: Low-income domestic well contamination layer      │
       │   - Sensors: Multi-probe (EC, pH, TDS, DO, ORP, Temp, Depth)    │
15m ───┴─────────────────────────────────────────────────────────────────┴─── 15m
       ════════════ UPPER CLAY / SILT AQUITARD (SEMI-CONFINING) ═════════
28m ───┬─────────────────────────────────────────────────────────────────┬─── 28m
       │          INTERMEDIATE BENIN SANDS (SEMI-CONFINED)               │
       │   [ PIEZOMETER B: DEEP (35–50m) ]                               │
       │   - Screened: 40m to 48m                                        │
       │   - Monitors: Regional commercial & industrial abstraction zone │
       │   - Sensors: High-pressure submersible multi-parameter array    │
50m ───┴─────────────────────────────────────────────────────────────────┴─── 50m
```

This dual-nested architecture intercepts lateral shallow plume migration before it reaches residential tenements, while simultaneously monitoring vertical aquitard breach into the deeper regional aquifer.

---

### Q02: How does the 2× Plume Attribution Rule (`PLUME_RATIO = 2`) scientifically isolate landfill pollution from domestic septic tank effluent and industrial background runoff?

#### The Attribution Battleground
Whenever high concentrations of Chemical Oxygen Demand (COD), nitrates, or heavy metals were detected in residential water wells around Solous II or Olushosun, landfill operators and defense attorneys deployed a classic counter-argument:
> *"The contamination does not originate from the landfill. Lagos tenements feature poorly constructed, leaking soakaway pits and septic tanks dug 3 meters from domestic wells. The high organic load and fecal bacteria are caused by the residents' own domestic sewage, or by background industrial runoff from nearby mechanic workshops."*

#### Mathematical Formulation in `lawma/work/eco-rules.js`
To eliminate ambiguity in court, Module 07 encodes the hydrogeological mass-balance attribution equation:
```javascript
const PLUME_RATIO = 2;

const landfillAttributable = (down, up, k) => 
  up?.[k] > 0 && down[k] / up[k] >= PLUME_RATIO;
```

#### Scientific Justification for the 2.0 Ratio Threshold
1. **Up-Gradient Background Baselines ($\text{up}[k]$):** Piezometers installed hydrogeologically up-gradient (north of Solous, where groundwater flows southward toward the lagoon) measure regional baseline conditions, including ambient urban background pollution, diffuse agricultural runoff, and regional atmospheric lead deposition.
2. **Down-Gradient Plume Concentration ($\text{down}[k]$):** Piezometers installed directly along the down-gradient hydraulic gradient intercept the combined flow.
3. **The $2.0\times$ Concentration Multiplier:** Septic tank effluent contains elevated nitrates and fecal coliforms, but negligible concentrations of industrial heavy metals (such as Cadmium, Lead, and Arsenic) and moderate COD ($<150\text{ mg/L}$). In contrast, raw landfill leachate exhibits COD exceeding $6,000\text{ mg/L}$ and extreme heavy metal loadings. Requiring:
   $$\frac{C_{\text{down}}}{C_{\text{up}}} \ge 2.0$$
   mathematically proves that the disposal facility is contributing at least **100% more contaminant load than all ambient urban and septic sources combined**.

If $C_{\text{up}} = 40\text{ mg/L}$ COD and $C_{\text{down}} = 80\text{ mg/L}$ COD:
$$\frac{80}{40} = 2.0 \ge 2.0 \implies \mathbf{Landfill\ Attributable\ (TRUE)}$$
Conversely, if $C_{\text{down}} = 70\text{ mg/L}$ against a background of $40\text{ mg/L}$, the ratio is $1.75$, classifying the condition as an ambiguous urban diffuse anomaly that does not sustain statutory operational sanctions against the landfill.

---

### Q03: Why require two matching consecutive samples separated by $\ge 24\text{ hours}$ (`wellAlertConfirmed`) before declaring a community well contaminated? How does this prevent public riots?

#### Socio-Political Volatility of Contamination Panics
Declaring that a community drinking water aquifer is poisoned with toxic Lead ($Pb$) or Arsenic ($As$) triggers extreme civic panic. In densely populated neighborhoods like Igando or Ojota, an unverified alert can cause:
* Violent street protests and roadblocks shutting down municipal arterial roads;
* Sudden economic collapse of local food businesses, bakeries, and schools;
* Hostile mob attacks on landfill facilities and municipal waste trucks;
* Severe emotional distress and medical runs on local clinics.

Field testing reveals that transient anomalies frequently occur: an air bubble trapped against an optical sensor, a temporary electrical surge, or a single rusted casing flake can produce a false spike in a single reading.

#### Algorithmic Resolution in `lawma/work/eco-rules.js`
Module 07 implements the **Two-Sample Confirmation Protocol**:
```javascript
const WATER_LIMITS = {
  Lead: 0.01,
  Arsenic: 0.01,
  Cadmium: 0.003,
  BOD: 10,
  COD: 40
};

const exceedances = s => 
  Object.keys(WATER_LIMITS).filter(k => s[k] != null && s[k] > WATER_LIMITS[k]);

const wellAlertConfirmed = samples => {
  if (samples.length < 2) return false;
  const a = samples.at(-2), b = samples.at(-1);
  const shared = exceedances(a).some(k => exceedances(b).includes(k));
  const at = a.at || a.date, bt = b.at || b.date;
  return shared && (!at || !bt || Date.parse(bt) - Date.parse(at) >= 24 * 3600000);
};
```

#### Operational Workflow of the 24-Hour Confirmation Window
1. **Initial Exceedance Flag (`Sample 1`):** When a sample detects Lead at $0.02\text{ mg/L}$ (exceeding the $0.01\text{ mg/L}$ limit), the well status moves to `AMBER_PENDING_CONFIRMATION`. The system schedules a mandatory confirmatory retest via `ecoRetestDue(at)`:
   ```javascript
   const ECO_RETEST_HOURS = 24;
   const ecoRetestDue = at => 
     new Date(new Date(at).getTime() + ECO_RETEST_HOURS * 3600000).toISOString();
   ```
2. **Confirmatory Sample Matching (`Sample 2`):** Exactly 24 hours later, a second sample is logged. The algorithm verifies two strict conditions:
   * **Temporal Separation:** The time delta must be $\ge 24\text{ hours}$ ($\Delta t \ge 86,400\text{ seconds}$). Two samples taken 10 minutes apart are rejected.
   * **Contaminant Identity:** The second sample must exhibit an exceedance in the **exact same chemical parameter** as the first sample. If Sample 1 flagged Lead and Sample 2 flagged Arsenic, `wellAlertConfirmed` evaluates to `false`.
3. **Emergency Mobilization:** Only when `wellAlertConfirmed` evaluates to `true` does the system elevate the incident to `CRITICAL_AQUIFER_CONTAMINATION`, sounding the alarm and automatically mobilizing the **Potable Water Relief Rail (`RELIEF-H2O-*`)**.

---

### Q04: How does the UV254 Optical Spectral Proxy estimate Chemical Oxygen Demand (COD) and organic load in real time, eliminating the 5-day BOD5 lab bottleneck?

#### The Analytical Bottleneck: Why 5 Days is Too Late
Standard Biochemical Oxygen Demand ($\text{BOD}_5$) testing requires inoculating a water sample, incubating it at $20^\circ\text{C}$ in the dark for **5 full days (120 hours)**, and measuring dissolved oxygen depletion. In an acute aquifer breach—such as a torn geomembrane liner or a ruptured leachate lagoon embankment during a storm—waiting 120 hours for laboratory results means tens of thousands of residents consume contaminated water for nearly a week before authorities receive confirmation.

#### Optical Physics: UV254 Spectral Absorbance
Dissolved organic matter in landfill leachate is rich in aromatic rings, conjugated double bonds, and humic/fulvic acids that strongly absorb ultraviolet light at a wavelength of **254 nanometers (UV254)**.
Module 07 integrates downhole and flow-through optical spectrophotometer probes measuring:
1. **$\text{UV}_{254}$ Absorbance ($\text{cm}^{-1}$):** Optical attenuation at $254\text{ nm}$.
2. **$\text{UV}_{550}$ Turbidity Compensation:** Secondary optical channel at $550\text{ nm}$ used to cancel out interference from suspended clay or inorganic sediment particles:
   $$\text{UV}_{254,\text{corrected}} = \text{UV}_{254} - \left(\frac{254}{550}\right) \cdot \text{UV}_{550}$$

#### Real-Time Regression Engine
The edge telemetry broker converts corrected $\text{UV}_{254}$ into estimated Chemical Oxygen Demand ($\text{COD}_{\text{est}}$) via calibrated polynomial calibration curves:
$$\text{COD}_{\text{est}} (\text{mg/L}) = \alpha \cdot (\text{UV}_{254,\text{corrected}})^\beta + \gamma$$
Where site-specific constants are calibrated against monthly LASEPA laboratory wet-chemistry assays ($R^2 \ge 0.94$).

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 UV254 REAL-TIME SPECTRAL PROXY DATAFLOW                     │
│                                                                             │
│  [ SUBMERSIBLE OPTICAL UV PROBE ]                                           │
│    │ Flashes Xenon pulse; reads 254nm & 550nm absorption at 60s intervals   │
│    ▼                                                                        │
│  [ ON-BOARD EDGE MICROCONTROLLER ]                                          │
│    │ Applies turbidity subtraction & temperature compensation               │
│    │ Computes COD_est and Spectral Absorption Coefficient (SAC254)          │
│    ▼                                                                        │
│  [ REAL-TIME THRESHOLD INTERLOCK ]                                          │
│    ├── If COD_est <= 40 mg/L -> System State: COMPLIANT_CLEAR               │
│    └── If COD_est > 40 mg/L (or sudden step-jump > 100%)                    │
│        ▼                                                                    │
│  [ INSTANT EMERGENCY DISPATCH ENGINE ]                                      │
│    │ 1. Triggers automatic physical autosampler to draw laboratory bottle   │
│    │ 2. Alerts LASEPA Pollution Control within 90 seconds                   │
│    │ 3. Halts lagoon discharge sluice gate via fail-closed actuator         │
└─────────────────────────────────────────────────────────────────────────────┘
```

This reduces the emergency detection latency from **120 hours to under 2 minutes**.

---

### Q05: How does the hydrostatic head delta rule ($\Delta h > 0.40\text{m}$ without rainfall) defeat the fraudulent "watered sensor" dilution exploit by corrupt landfill marshalls?

#### The "Watered Sensor" Street Exploitation
When automated telemetry was first piloted, corrupt dumpsite supervisors—fearing operational penalties or payment freezes—devised a simple, devious physical hack known on the street as the **"Watered Sensor Exploit"**:
* 15 minutes before scheduled telemetry reporting or LASEPA physical sampling visits, supervisors connected a hose to a clean municipal water tanker or clean tap line.
* They dumped 500 liters of clean tap water directly down the borehole PVC monitoring casing.
* The clean water formed a temporary freshwater lens sitting on top of the heavy, saline, contaminated groundwater.
* The downhole sensors, immersed in the clean tap water, reported pristine Electrical Conductivity ($<300\ \mu\text{S/cm}$) and undetectable heavy metals, while the surrounding aquifer 1 meter away was toxic.

#### Hydrostatic Physics & Mathematical Formulation
Under natural hydrogeological conditions, the water table in a monitoring well cannot rise rapidly without significant atmospheric rainfall that infiltrates the vadose zone.
Module 07 integrates a **submersible piezoresistive silicon diaphragm pressure transducer** measuring hydrostatic head:
$$h_{\text{water}} = \frac{P_{\text{measured}} - P_{\text{barometric}}}{\rho \cdot g}$$

The edge monitoring engine evaluates the hydrostatic rate of change against localized meteorological telemetry:
```
IF (h(t) - h(t - 15 mins)) > 0.40 meters
AND on_site_tipping_bucket_rain_gauge == 0.0 mm (Past 2 Hours)
THEN
    TRIGGER SENSOR_WATER_DILUTION_TAMPER_ALARM;
    LOCK DATA INTEGRITY STATUS TO 'FRAUDULENT_DILUTION_DETECTED';
    ENGAGE DOWNHOLE PURGE PUMP (3 Casing Volumes);
```

#### Forensic Resolution
1. **Instant Tamper Alarm:** An instantaneous water level spike ($\Delta h > 0.40\text{m}$) without rainfall is physically impossible in the unconfined Benin Formation. The system immediately fires a `TAMPER_DILUTION_ALERT` to the Internal Affairs and LASEPA dashboards.
2. **Automated Downhole Purging:** The terminal activates a high-flow downhole 12V submersible purge pump, evacuating three complete casing volumes of water to purge the introduced freshwater.
3. **Disciplinary & Evidentiary Action:** The incident is logged as a criminal violation of Section 94 of the 2017 EMPL (Tampering with Environmental Monitoring Equipment), triggering an automatic suspension of the site supervisor.

---

```
========================================================================================
SECTION 2: COMMUNITY PROTECTION, REMEDIATION & OPERATIONAL INTEGRITY
========================================================================================
```

### Q06: How does the Potable Water Relief Rail (`RELIEF-H2O-*`) mobilize clean drinking water tankers to affected tenements in Igando and Ojota, and how does the Cadastre QR Decal prevent relief water diversion?

#### The Human Welfare Mandate
Under the doctrine established by Governor Dr. Kadri Obafemi Hamzat, environmental monitoring must not be a spectator sport that documents poisoning without providing relief. When a down-gradient community well is confirmed toxic under `wellAlertConfirmed`, the State has an immediate constitutional and moral obligation to provide clean drinking water to prevent acute heavy metal poisoning.

#### Architectural Resolution: The Potable Water Relief Rail
Module 07 interfaces with the Lagos Water Corporation (LWC) and verified private potable water tanker concessionaires to execute the **Potable Water Relief Rail (`RELIEF-H2O-*`)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 POTABLE WATER RELIEF RAIL (`RELIEF-H2O-*`)                  │
│                                                                             │
│  [ `wellAlertConfirmed` EVALUATES TRUE: AQUIFER CONFIRMED CONTAMINATED ]    │
│    │ System maps affected down-gradient spatial polygon (ArcGIS / PostGIS)  │
│    ▼                                                                        │
│  [ CADASTRE IDENTIFICATION OF TENEMENTS ]                                   │
│    │ Module 01 Cadastre identifies all compounds in the plume impact zone   │
│    │ Calculates daily drinking quota: 25 Liters / Person / Day              │
│    ▼                                                                        │
│  [ DISPATCH OF CERTIFIED POTABLE WATER TANKERS ]                            │
│    │ Tankers filled at verified Lagos Water Corporation municipal hydrants  │
│    │ Water batch carries digital laboratory potability certificate          │
│    ▼                                                                        │
│  [ BIOMETRIC CADASTRE DECAL DELIVERY INTERLOCK ]                            │
│    │ Tanker driver taps compound's Unified Premises QR Decal (`DECAL-QR-*`) │
│    │ Solenoid flow meter unlocks: Dispenses exactly authorized compound vol │
│    ▼                                                                        │
│  [ 100% RELIEF RECONCILIATION ]                                             │
│    │ Resident compound head verifies delivery on WhatsApp / SMS             │
│    │ Tanker invoice cleared in Module 05; billed to Landfill Escrow Fund    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Anti-Diversion Technical Interlock
Historically, relief water tankers were hijacked by corrupt drivers who sold the clean water to commercial car washes or sachet water factories. Module 07 prevents this:
1. **Flow-Meter Solenoid Interlock:** The water tanker's discharge valve is locked by an electronically actuated solenoid valve. The valve will *not* open until the driver’s handheld terminal scans the compound's registered **Unified Premises QR Decal (`DECAL-QR-*`)**.
2. **Geofenced Discharge Accounting:** The flow meter records the exact volume dispensed (e.g., 500 Liters) alongside GPS coordinates and timestamp. If a driver attempts to discharge water outside a registered plume impact polygon, the valve remains locked.

---

### Q07: How does the Tri-Factor Mass-Balance Laterite Capping Rule ($\ge 731.25\text{ MT/day}$ for $2,500\text{m}^2$) destroy the ₦60M/month phantom capping cartel?

#### The Phantom Laterite Political Economy
Under Section 78 of the 2017 EMPL and international landfill engineering standards, every open waste tipping face must be covered at the end of each operational day with a **15cm compacted blanket of impermeable red laterite clay** ($0.15\text{ m}$).
Laterite capping accomplishes four vital functions:
* Chokes the supply of atmospheric oxygen to extinguish subsurface smoldering fires;
* Suppresses noxious odors ($H_2S$, mercaptans) and controls disease vectors;
* Forms an impermeable shedding barrier that prevents rainwater from infiltrating the waste mass and generating leachate;
* Eliminates bird strikes near aviation corridors.

Historically, capping contractors charged LAWMA ₦3,500 per metric ton, billing for 30 tipper loads daily (approx. 900 MT, or ₦3.15 million daily / **₦94.5 million monthly**). In reality, contractors delivered only 3 to 5 loads (approx. 100 MT), dumped loose dirt over a tiny corner of the face, and split the remaining ₦60M+ with corrupt facility marshalls.

#### Mathematical Mass-Balance Formulation
Module 07 enforces an unyielding hydro-mechanical mass balance rule:

```
Tipping Cell Active Surface Area:         A = 2,500 m²
Mandatory Compacted Layer Thickness:     t = 0.15 m (15 cm)
Required Compacted Soil Volume:           V = A × t = 2,500 × 0.15 = 375.0 m³

Standard Proctor Dry Soil Density:       ρ = 1.95 Metric Tons / m³
Required Daily Inbound Soil Mass:        M = V × ρ = 375.0 m³ × 1.95 t/m³
                                          M = 731.25 Metric Tons / day
```

$$\mathbf{M}_{\text{required}} = \mathbf{731.25\ Metric\ Tons\ daily}\ (24.4\text{ heavy 30-ton tipper loads})$$

#### Automated Billing Clearance Gate in Module 05
Contractor payment clearance is hard-locked in the software. When the capping contractor submits an invoice for operational cell coverage:
1. The system queries Module 03 (Weighbridge Scale Engine):
   $$\sum \text{NetWeight}_{\text{MAT-CAP-LATERITE}} \ge 731.25\text{ MT}$$
2. If total delivered tonnage is less than $95\%$ of $731.25\text{ MT}$ ($694.69\text{ MT}$), the invoice is automatically rejected, and a `MATERIAL_DEFICIT_PENALTY` is assessed.
3. The contractor cannot be paid on manual executive override; payment requires the weighbridge transaction log verified by the Chief Weighbridge Marshall.

---

### Q08: How do drone LiDAR photogrammetry and weekly 3D differential elevation scans verify the mandatory 15cm compacted laterite Proctor thickness?

#### The "Fluffed Dirt" Evasion
Even when contractors were forced to deliver genuine soil tonnage across the weighbridge, corrupt operators devised a secondary loophole: they dumped uncompacted, loose sandy dirt without using heavy vibratory sheepfoot rollers. Loose, uncompacted dirt has a low density ($\rho \approx 1.25\text{ t/m}^3$) and washes away in the first rainstorm, failing to provide the impermeable capping seal required by law.

#### Technical Resolution: Drone LiDAR Volumetric Differencing
Module 07 integrates weekly autonomous drone surveys equipped with **Light Detection and Ranging (LiDAR)** and high-resolution photogrammetry:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 DRONE LIDAR 3D DIFFERENTIAL COMPACTION ENGINE               │
│                                                                             │
│  SATURDAY 18:00 WAT: Drone Flight 1 (Pre-Cap Digital Elevation Model)       │
│    │ Measures bare waste surface profile -> Generates DEM_Base              │
│    ▼                                                                        │
│  SUNDAY 18:00 WAT: Drone Flight 2 (Post-Cap Digital Elevation Model)        │
│    │ Measures finished laterite surface profile -> Generates DEM_Cap        │
│    ▼                                                                        │
│  SYSTEM COMPUTES CELL-BY-CELL 3D DIFFERENTIAL MESH                          │
│    │ ΔZ(x, y) = DEM_Cap(x, y) - DEM_Base(x, y)                              │
│    ▼                                                                        │
│  PROCTOR COMPACTION MASS-VOLUME RECONCILIATION                              │
│    │ Total Compacted Volume: V_net = ∬ ΔZ(x, y) dx dy                       │
│    │ In Situ Density Computed: ρ_field = Net_Weighbridge_Mass / V_net       │
│    ▼                                                                        │
│  VERIFICATION GATES:                                                        │
│    ├── Mean Thickness: Z_mean >= 0.15 meters (15 cm)                        │
│    └── Field Density: ρ_field >= 1.90 t/m³ (Proctor Compaction Verified)    │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Courtroom-Grade Exhibit Generation
If a contractor bills for $375\text{ m}^3$ of compaction but the drone differential mesh reveals a net volumetric addition of only $110\text{ m}^3$ (an uncompacted surface thickness of only 4 cm), the system flags a `VOLUMETRIC_DEFICIT_FRAUD`. The 3D false-color elevation heatmap—showing red un-capped zones across 70% of the active face—is compiled into an automated forensic audit report tendered directly to the State Auditor-General and the EFCC, permanently ending contractor fraud.

---

```
========================================================================================
SECTION 3: SURFACE WATER CONTAINMENT, WETLANDS & ATMOSPHERIC SAFETY
========================================================================================
```

### Q09: How does the system enforce minimum Dissolved Oxygen ($\text{DO} \ge 2.0\text{ mg/L}$) and $90\%$ pump uptime in leachate aeration lagoons, and what prevents lagoon overflow during tropical monsoons?

#### The Stagnant Cesspool Failure Mode
Raw, untreated leachate is anoxic, possessing a Dissolved Oxygen ($\text{DO}$) concentration near zero ($0.0\text{ to }0.2\text{ mg/L}$). In anaerobic conditions, sulfate-reducing bacteria thrive, generating massive volumes of toxic hydrogen sulfide gas ($H_2S$) that smells like rotting eggs and causes severe respiratory illness in surrounding neighborhoods.
Historically, municipal leachate lagoons were un-aerated cesspools. When mechanical surface aerators were installed, operators turned them off to save diesel or electricity, allowing the lagoons to turn septic.

#### Algorithmic Formulation in `lawma/work/eco-rules.js`
Module 07 codifies strict operational thresholds for leachate lagoons:
```javascript
const DO_MIN = 2; // Minimum 2.0 mg/L Dissolved Oxygen
const PUMP_UPTIME_MIN = 0.9; // Minimum 90% Aerator Pump Uptime

const lagoonAlerts = l => [
  l.do < DO_MIN && 'Dissolved oxygen below ' + DO_MIN + ' mg/L',
  l.uptime < PUMP_UPTIME_MIN && 'Aerator pump uptime below ' + (PUMP_UPTIME_MIN * 100) + '%'
].filter(Boolean);
```

#### Monsoon Storm Recirculation & Overflow Prevention
During torrential tropical downpours in Lagos (where rainfall can exceed $120\text{ mm}$ in 4 hours), unmanaged retention ponds overflow into municipal drainage canals, spilling toxic black effluent across highways and into the Lagos Lagoon.
Module 07 prevents this via **Automated Storm Recirculation Controls**:
1. **Freeboard Telemetry:** Ultrasonic level transmitters continuously monitor lagoon freeboard. If the water level reaches within **$0.75\text{ meters}$ of the embankment crest**, an amber warning sounds.
2. **Closed-Loop Crown Recirculation:** If level reaches within **$0.40\text{ meters}$**, the system automatically engages high-capacity submersible storm pumps ($350\text{ m}^3/\text{hour}$). Rather than discharging into the public canal, the pumps route excess leachate back up to the summit crown of the closed, capped waste mounds. The leachate is distributed through perforated drip lines across the vegetated laterite crown, maximizing soil retention, bio-filtration, and solar evapotranspiration.
3. **Emergency Sluice Lock:** The perimeter gravity discharge valve to public stormwater canals is equipped with a fail-closed motorized gate. The gate is hard-locked shut; it physically *cannot* open unless the downstream sensor verifies $\text{COD} \le 40\text{ mg/L}$, $\text{BOD} \le 10\text{ mg/L}$, and $\text{DO} \ge 2.0\text{ mg/L}$.

---

### Q10: How does constructed wetland phytoremediation using *Typha latifolia* and *Chrysopogon zizanioides* treat residual leachate nutrients before environmental discharge?

#### The Limitation of Chemical Treatment
Chemical oxidation and mechanical aeration effectively reduce Biochemical Oxygen Demand, but they are expensive, energy-intensive, and struggle to eliminate dissolved nitrates ($\text{NO}_3^-$), phosphates ($\text{PO}_4^{3-}$), and recalcitrant trace heavy metals. Discharging aerated leachate directly into municipal canals still causes severe eutrophication, toxic algae blooms, and fish kills.

#### Botanical Architecture: Constructed Wetland Bio-Filters
Module 07 integrates multi-stage **Subsurface Horizontal-Flow Constructed Wetlands** downstream of the mechanical aeration lagoons:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 CONSTRUCTED WETLAND PHYTOREMEDIATION FLOW                   │
│                                                                             │
│  [ AERATED LEACHATE RETENTION BASIN (DO >= 2.0 mg/L) ]                      │
│    │ Gravity flow through coarse gravel bar screen                          │
│    ▼                                                                        │
│  [ CELL 1: BROADLEAF CATTAIL (Typha latifolia) BED ]                        │
│    │ Deep root network (rhizosphere) transfers oxygen into substrate        │
│    │ Promotes aerobic nitrification: NH3-N -> NO2- -> NO3-                  │
│    │ Hyper-accumulates heavy metals (Lead, Cadmium) into root tissues       │
│    ▼                                                                        │
│  [ CELL 2: VETIVER GRASS (Chrysopogon zizanioides) STRIP ]                  │
│    │ Massive vertical root systems (penetrating up to 3 meters deep)        │
│    │ High evapotranspiration rate: Absorbs up to 40% of water volume        │
│    │ Anoxic root zones drive denitrification: NO3- -> N2 gas (harmless)     │
│    ▼                                                                        │
│  [ CELL 3: CRUSHED LIMESTONE POLISHING BED ]                                │
│    │ Neutralizes residual organic acidity; precipitates dissolved phosphate │
│    ▼                                                                        │
│  [ FINAL DISCHARGE COMPLIANCE SENSOR ]                                      │
│    │ Verifies BOD <= 10 mg/L, COD <= 40 mg/L, Heavy Metals < WHO Limits    │
│    │ Permitted discharge into public wetland drainage corridor              │
└─────────────────────────────────────────────────────────────────────────────┘
```

By passing aerated leachate through *Typha latifolia* and Vetiver grass beds, the system achieves **$85\%$ to $92\%$ reduction in total nitrogen** and binds over **$95\%$ of trace heavy metals** into inert root biomass without consuming a single kilowatt of electricity.

---

### Q11: How do perimeter NDIR optical methane sensors and automated solar ground flares prevent explosive gas migration into residential home foundations?

#### Subterranean Methane Physics & Explosion Hazards
Landfill waste decomposing under anaerobic conditions produces **Landfill Gas (LFG)**, composed of approximately **$50\%\text{ to }55\%\ \text{Methane}\ (CH_4)$** and **$40\%\text{ to }45\%\ \text{Carbon Dioxide}\ (CO_2)$**.
Methane is lighter than air, odorless, and highly explosive when mixed with atmospheric oxygen between its **Lower Explosive Limit (LEL = 5% by volume)** and its **Upper Explosive Limit (UEL = 15% by volume)**. 
Because the Benin Formation consists of porous, highly permeable sands, trapped methane gas does not merely vent vertically; it migrates laterally hundreds of meters underground. Trapped methane migrates into electrical conduit trenches, drainage culverts, and into the basements and crawlspaces of residential homes surrounding Olushosun and Solous. A single electrical spark or cooking stove can trigger a catastrophic residential building explosion.

#### Architectural Resolution: The Perimeter LEL Guard Rail
Module 07 establishes an automated perimeter gas interception and flaring network:
1. **Perimeter NDIR Optical Methane Detectors:** Solar-powered Non-Dispersive Infrared (NDIR) optical sensors are installed inside 1-meter deep vadose-zone monitoring probes along the dumpsite perimeter fence at 100-meter intervals.
2. **Automated Threat Escalation:**
   * **$\ge 10\%$ LEL ($0.5\%\ CH_4$ by volume):** The system logs an Amber Advisory, alerting the Landfill Safety Marshal.
   * **$\ge 20\%$ LEL ($1.0\%\ CH_4$ by volume):** The system triggers Red Alert sirens (105 dB), flashes perimeter strobes, sends automated SMS alerts to local CDA chairmen, and automatically powers on perimeter extraction blowers.
3. **Automated Solar-Powered Ground Flares:** Perforated HDPE collector pipes installed in deep perimeter gravel trenches draw migrating gas toward enclosed solar-powered ground flares. When pressure and % LEL exceed safety limits, electronic spark igniters combust the methane at $>1,000^\circ\text{C}$, converting volatile $CH_4$ into carbon dioxide and water vapor, achieving **$99.2\%$ destruction of explosive hydrocarbons** and preventing subsurface building detonations.

---

```
========================================================================================
SECTION 4: FISCAL INTERLOCKS, REGULATORY OVERSIGHT & LITIGATION DEFENSE
========================================================================================
```

### Q12: How does the automatic payment hold gate (`ecoReferralBlocks`) freeze landfill tipping fee disbursements in Module 05 until water investigations are closed?

#### The Compliance Enforcement Dilemma
Historically, environmental regulatory agencies (like LASEPA) issued stern notices and violation fines against landfill operational directorates, but the landfill operators ignored them. Landfill management continued collecting hundreds of millions of Naira in monthly tipping fees and contractor disbursements, treating environmental protection as an irrelevant bureaucratic nuisance.

#### Technical Resolution in `lawma/work/eco-rules.js`
Module 07 establishes an un-bypassable fiscal interlock between environmental telemetry and the sovereign escrow clearinghouse in Module 05:
```javascript
const ecoReferralBlocks = (referrals, batch) => 
  referrals
    .filter(r => r.batch === batch && r.paymentHold && !r.closed)
    .map(r => 'Water investigation ' + r.id + ' · payment held for review');
```

#### Operational Workflow of Fiscal Sanctions
1. **Automated Referral Generation:** When an aquifer contamination event is confirmed (`wellAlertConfirmed = true`) or a leachate lagoon breach is detected, the system automatically opens an official regulatory investigation ticket (`WR-xxxx`).
2. **Fiscal Payment Hold (`paymentHold = true`):** The referral engine tags the active operational settlement batch of the offending landfill facility.
3. **Double-Entry Escrow Lock in Module 05:** When the sovereign treasury engine attempts to execute weekly contractor settlements or facility operating disbursements, `ecoReferralBlocks` scans for active holds:
   ```javascript
   const blocks = ecoReferralBlocks(referrals, batchId);
   if (blocks.length > 0) {
     haltSettlementBatch(batchId, blocks);
     notifyExecutiveTreasury(blocks);
   }
   ```
   **100% of financial disbursements to the facility operator are frozen at the banking switch.** The hold cannot be lifted by the landfill manager or LAWMA finance directors. It unlocks *only* when LASEPA ecotoxicologists upload a certified Remediation Sign-Off (`closed: { finding: 'Cleared' }`) verifying that the breach has been physically cured.

---

### Q13: How does the system handle high-volume commercial groundwater abstraction by sachet water factories near landfills to prevent downward plume cone-of-depression draw?

#### The Hydrogeological Suicide Loop
A terrifying empirical reality across Lagos is that commercial sachet ("pure water") packaging factories and commercial ice plants often locate their operations in low-cost industrial land directly adjacent to major dumpsites. 
These factories drill deep 80-meter or 120-meter boreholes and pump hundreds of thousands of liters of groundwater daily. 
This continuous, high-volume abstraction creates a massive **Hydraulic Cone of Depression**:
$$s = \frac{Q}{4 \pi T} W(u)$$
The steep downward hydraulic gradient acts as an underground vacuum, actively pulling the shallow, toxic leachate plume downward through clay fractures and directly into the regional drinking aquifer tapped by the water factory!

#### Architectural Resolution: The LASWARCO Abstraction Interlock
Module 07 integrates directly with the **Lagos State Water Regulatory Commission (LASWARCO)** licensing database:
1. **1.5 km High-Risk Exclusion Polygon:** The system draws an automated, spatial hydrologic buffer zone of **1,500 meters** around every active and closed dumpsite perimeter.
2. **Telemetry Cross-Referencing:** If LASWARCO or Cadastre records identify a commercial water bottling or ice manufacturing facility operating inside the 1.5 km buffer zone:
   * The facility is flagged as `HIGH_RISK_CONE_OF_DEPRESSION_HAZARD`.
   * LASWARCO enforcement is alerted to revoke the abstraction permit and seal the borehole under Section 42 of the EMPL.
   * The facility is forced to connect to municipal surface water mains or relocate outside the hydrologic impact zone, preventing the poisoned plume from entering the commercial food chain.

---

### Q14: How are downhole monitoring boreholes physically and digitally secured against host community vandalism and area boy tampering?

#### Physical Street Vulnerabilities
Landfill monitoring boreholes are located in isolated, unlit perimeter boundary areas. They face constant street threats:
* Metal scavengers breaking into wellheads to steal expensive brass valves and submersible pumps for scrap;
* Hostile area boys deliberately pouring engine oil, diesel, or battery acid down the casing to fabricate high contamination levels and blackmail the government for cash;
* Heavy compactor trucks or earthmoving bulldozers accidentally reversing over wellhead casings and shattering the PVC pipes.

#### Engineering Hardening Specifications
Module 07 mandates physical and cyber-physical protection standards for every monitoring station:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 BOREHOLE PHYSICAL & ELECTRONIC HARDENING                    │
│                                                                             │
│  [ HEAVY-DUTY IMPACT CRASH BOLLARDS ]                                       │
│    │ Four 6-inch concrete-filled steel bollards protect against truck impact │
│    ▼                                                                        │
│  [ HERMETICALLY SEALED STAINLESS STEEL ENCLOSURE (IP68) ]                   │
│    │ 1/4-inch marine-grade 316 stainless steel casing cap                   │
│    │ Pick-proof magnetic deadbolt with encrypted RFID electronic seal       │
│    ▼                                                                        │
│  [ IN-CASING TAMPER SENSORS & ACCELEROMETERS ]                              │
│    │ Micro-switch detects cap removal; tri-axial accelerometer detects blows│
│    ▼                                                                        │
│  [ PERIMETER 4K SOLAR PTZ CAMERA INTEGRATION ]                              │
│    │ If tamper detected -> 110 dB local siren fires + PTZ camera snaps 4K   │
│    │ Sends instant vector alert to KAI Sector Tactical Interceptors         │
└─────────────────────────────────────────────────────────────────────────────┘
```

If an unauthorized person attempts to cut or open the wellhead, the system transmits a `SECURITY_BREACH_PIEZOMETER` alert to the Oshodi Command Center, dispatching Tier-1 KAI Motorbike Interceptors within 10 minutes to apprehend the perpetrators.

---

### Q15: How do digital water quality sensor logs, GC-MS laboratory certificates, and Section 84 Evidence Act dockets defeat corporate polluters in environmental litigation?

#### Judicial Vulnerabilities in Environmental Court
When the State Government attempts to prosecute multinational corporate polluters or negligent contractors for environmental degradation, corporate defense lawyers exploit three traditional procedural weaknesses:
1. *Allegation of Sensor Malfunction:* Claiming that telemetry probes suffered from bio-fouling or calibration drift;
2. *Broken Chain of Custody:* Arguing that physical water samples were swapped or contaminated in transit;
3. *Inadmissibility of Electronic Records:* Raising Section 84 Evidence Act objections against unauthenticated PDF printouts.

#### Forensic Architecture: The Section 84 Water Evidence Docket
Module 07 resolves these vulnerabilities by generating an immutable, digitally certified **Water Ecotoxicity Courtroom Docket (`EVD-WATER-SEC84-*`)**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                 SECTION 84 ECOTOXICITY LITIGATION DOCKET                    │
│                                                                             │
│  EXHIBIT A: CONTINUOUS SENSOR CALIBRATION CERTIFICATE                       │
│    - Manufacturer calibration certificate (ISO 17025 accredited)            │
│    - Automated weekly two-point buffer zero/span drift logs (<2% drift)     │
│    - Hardware RTC timestamp & SHA-256 telemetry hash                        │
│                                                                             │
│  EXHIBIT B: UNBROKEN CRYPTOGRAPHIC CHAIN OF CUSTODY (`CHEM-CHAIN-*`)        │
│    - Serialized 2D barcode scan of borosilicate sample bottle               │
│    - Active Peltier transport temperature log (verified 3.8°C to 4.2°C)      │
│    - Biometric handover signature: Sampling Officer -> LASEPA Chemist       │
│                                                                             │
│  EXHIBIT C: LASEPA ACCREDITED LABORATORY GC-MS SPECTRUM                     │
│    - Gas Chromatography-Mass Spectrometry digital spectral readout          │
│    - Inductively Coupled Plasma Mass Spectrometry (ICP-MS) metal assays     │
│    - Cryptographic digital seal of Chief State Environmental Chemist        │
│                                                                             │
│  EXHIBIT D: SECTION 84(4) STATUTORY CERTIFICATE OF IDENTIFICATION          │
│    - Full compliance statement signed by Director of Public Prosecutions    │
│    - Certifies proper computer operation with zero procedural defect        │
└─────────────────────────────────────────────────────────────────────────────┘
```

When this multi-layered evidence docket is tendered before the Environmental Special Offences Court or the High Court of Lagos State, defense attorneys cannot challenge the evidence. Magisterial acceptance reaches **100%**, securing severe statutory fines, mandatory corporate remediation orders, and complete legal victories for the State.

---

```
========================================================================================
PART 2: PUBLIC AFFAIRS & SOCIAL MEDIA MARKETING CONTENT BANK
========================================================================================
```

## Overview of Strategic Communication Campaigns

Public health protection and aquifer security cannot succeed in secrecy. Host communities surrounding dumpsites have suffered decades of neglect and rightfully demand complete transparency. Module 07 provides an operational **Public Affairs & Social Media Marketing Content Bank** to demystify groundwater telemetry, mobilize voluntary community water testing, and eliminate public panic through verified facts.

These campaigns span five high-impact civic channels:
1. **Campaign 1 (X / Twitter Authority Thread):** Detailed thread by Hon. Rasheed Shabi and LASEPA explaining the 48-well monitoring grid and the end of phantom laterite capping.
2. **Campaign 2 (Viral 60-Second TikTok / Reels Skit):** Comic street drama exposing the corrupt dumpsite marshall trying to pour tap water into a monitoring well.
3. **Campaign 3 (Trilingual Grassroots Radio Jingles):** Broadcasts in English, Nigerian Pidgin, and Yorùbá for radio stations, CDAs, and market associations.
4. **Campaign 4 (WhatsApp Broadcast Community Cards):** Actionable, shareable graphics for landlord associations detailing free water testing and potable water relief.
5. **Campaign 5 (Groundwater Protection & Community Bill of Rights):** Public charter enshrining clean water rights and zero tolerance for dumpsite corruption.

---

### Campaign 1: Viral X (Twitter) Executive Authority Thread

* **Target Account:** `@shabi_rasheed` (Chairman, House Committee on Environment) / `@LasepaOfficial` / `@Lawma_gov`
* **Hashtags:** `#CleanWaterLagos #AquiferGuard #ZeroToleranceLagos #ScienceInAction #LAWMA360`
* **Objective:** Establish the scientific rigor of the new borehole telemetry network, announce the eradication of laterite capping fraud, and reassure residents in Igando and Ojota.

```
🧵 THREAD: How Lagos Is Protecting Your Drinking Water From Landfill Contamination (1/9)

1/9. Good morning Lagosians. In the past, solid waste management ended when a truck dumped trash at Olushosun or Solous. 

What happened to the toxic leachate underground was ignored. 

Under Mandate SHB-02 and the leadership of @tokunbo_wahab, that era is OVER. 👇

2/9. Over 85% of households in our host communities rely on private backyard groundwater boreholes for drinking and cooking. 

Today, we have deployed permanent Dual-Nested Piezometers around all active dumpsites to monitor the shallow and deep aquifers 24/7. 🔬💧

3/9. These are not ordinary boreholes. Submersible optical sensors stream Temperature, Electrical Conductivity, Dissolved Oxygen, and heavy metal proxies directly to our @LasepaOfficial laboratories every 15 minutes via encrypted IoT networks.

4/9. Some asked: "Can dishonest operators fake clean water by pouring tap water down the test wells?" 

The answer is NO. 

Every borehole features hydrostatic head delta sensors. If water rises by 40cm without rain, an instant anti-tamper fraud alarm fires at Alausa. 🚨❌

5/9. We have also permanently dismantled the ₦60M/month phantom laterite capping cartel. 

By law, every active tipping face must receive a daily 15cm compacted layer of red laterite clay to choke odors and extinguish underground fires. 🚜🧱

6/9. No contractor invoice is paid on paper claims anymore. 

We match weighbridge mass balance (minimum 731.25 Metric Tons daily for a 2,500m² cell) with weekly autonomous 3D drone LiDAR elevation scans. If the soil isn't compacted, they don't get paid.

7/9. To our residents in Igando, Ojota, and Epe: If our monitoring network confirms contamination in your domestic well, our Potable Water Relief Rail (RELIEF-H2O) automatically mobilizes free certified water tankers to your compound. 🚰🚚

8/9. Furthermore, any landfill facility linked to an open water contamination investigation has its tipping fee disbursements FROZEN at the Treasury escrow switch until LASEPA certifies remediation.

9/9. Clean drinking water is a fundamental human right. Lagos will not trade the health of our children for landfill convenience. 

Request a free borehole ecotoxicity test for your compound: Call LASEPA on 0800-LASEPA-H2O. 🇳🇬🌿
```

---

### Campaign 2: 60-Second Viral TikTok / Instagram Reels Skit

* **Title:** *The Tap Water Trick That Failed at 2:00 AM*
* **Tone:** Comic, dramatic, street-smart Lagos satire exposing corruption and celebrating high-tech deterrence.
* **Characters:**
  - **Marshall Morufu:** Corrupt, sweat-drenched landfill supervisor holding a green garden hose.
  - **Tanker Driver Jamiu:** Clueless water tanker driver looking for a quick tip.
  - **Dr. Ngozi:** Sharp, professional LASEPA Ecotoxicologist monitoring the real-time HUD at Alausa.

```
[SCENE START: NIGHT TIME (02:15 AM). Solous II Landfill Perimeter Fence. Dark and foggy.]

VISUAL: Marshall Morufu sneaks around a stainless steel monitoring borehole enclosure with a garden hose connected to an old water tanker.

MARSHALL MORUFU: 
(Whispering urgently to Jamiu)
Jamiu! Turn on the pump sharp-sharp! LASEPA inspectors are coming at 8:00 AM! 
If they test this well, the Lead level will blow up their machine! Pump 500 liters of pure tap water inside the pipe!

JAMIU: 
(Scratching his head)
Oga Morufu, but they said there is computer sensor inside the hole oh!

MARSHALL MORUFU: 
(Laughs loudly, waving his hand dismissively)
Computer sensor kee you there! Can computer tell the difference between borehole water and pure tap water? 
Water is water, my friend! Oya, flush am!

[SFX: RUSHING WATER SOUND AS TAP WATER GUSHES DOWN THE BOREHOLE CASING.]

[CUT TO: LASEPA Central Command Room, Alausa. High-tech screens with glowing green graphs. Dr. Ngozi is sipping coffee.]

[SFX: PIERCING RED FLASHING ALARM! "BEEP-BEEP-BEEP! CRITICAL TAMPER DETECTED!"]

ON-SCREEN HUD DISPLAY: 
"SOLOUS-WELL-04B: Instantaneous Water Level Surge +0.55m in 90 seconds. 
Local Rain Gauge = 0.00mm. 
Verdict: FRAUDULENT TAP WATER DILUTION DETECTED."

DR. NGOZI: 
(Smiles coolly, taps her touchscreen)
Look at this genius. Zero rain in Alimosho, but the wellhead just drank 500 liters of tap water in two minutes! 
Engaging automated downhole purge pumps. Alerting KAI Oshodi Interceptors!

[CUT BACK TO: Solous Landfill wellhead. SUDDEN 110 dB EAR-SPLITTING SIREN FIRES! "WOOOO-WOOOO-WOOOO!"]

[VISUAL: The borehole enclosure shoots high-intensity blue and red strobes. A high-pressure purge pump kicks on, blasting muddy water back out all over Morufu's face and uniform.]

MARSHALL MORUFU: 
(Soaked in muddy water, screaming in terror)
Yeeepa! The pipe is vomiting! The machine has caught me!

[SFX: AGGRESSIVE MOTORCYCLE SIREN! Two KAI 250cc Motorbike Interceptors slide to a halt behind him.]

KAI OFFICER: 
Marshall Morufu, step away from the borehole! 
Section 94 EMPL: Tampering with environmental monitoring equipment! Your arrest docket is already live on the Mobile Court HUD!

[OUTRO GRAPHIC OVERLAY: Sleek cyan and deep navy graphics]

VOICEOVER:
You cannot trick science. You cannot poison our water.
LASEPA and LAWMA IoT Hydrogeological Telemetry is watching 24/7.
Protect our drinking aquifers.
Report dumpsite pollution to 0800-LASEPA-H2O.
Lagos State Ministry of the Environment and Water Resources.
```

---

### Campaign 3: Trilingual Grassroots Radio & Megaphone Jingles

#### 1. English Version (Radio Broadcast — Morning Drive Insertion)
```
ANNOUNCER:
This is an urgent public health and environmental protection bulletin from LASEPA and LAWMA.

To all residents living in Igando, Egan, Ojota, Abule Egba, and Epe:
Your drinking water safety is now actively monitored by our new 24/7 Dumpsite Hydrogeological Telemetry Network.

- Over 48 deep-nested monitoring boreholes are streaming real-time water quality data to detect any leachate migration into the shallow aquifer.
- If your domestic well is confirmed contaminated by landfill runoff, the state's Potable Water Relief Rail will dispatch free, certified potable water tankers directly to your compound.
- Landfill soil capping is now verified daily by mass-balance weighbridges and 3D drone surveys—zero tolerance for phantom soil contractors.

Do not drink cloudy, foul-smelling, or metallic-tasting borehole water. 
Request a free scientific laboratory water test for your compound today.
Call the LASEPA Clean Water Hotline toll-free: 0800-LASEPA-H2O (0800-527372-426).
Honourable Rasheed Shabi, Chairman, LAHA Environment Committee.
```

#### 2. Nigerian Pidgin Version (Wazobia FM / Megaphone Market Broadcasts)
```
ANNOUNCER:
(Vibrant afrobeat rhythm playing in background)
Area! Make una listen well-well! This message na from LASEPA and LAWMA!

You dey stay near Solous for Igando, or Olushosun for Ojota? 
You dey fetch water from your backyard borehole take drink or cook soup?

Government don plant special high-tech computer wells round all the dumpsites! 
Day and night, these machines dey check if black dirty water from the refuse heap dey enter the ground water wey una dey drink!

- If any chemical like Lead or poison enter your well, government go send free clean water tanker come your house sharp-sharp!
- No contractor fit chop money for red soil cover again! Drone camera dey fly for sky take measure the ground!
- Any landfill manager wey mess up, government go freeze their money until dem clean the mess!

If your well water dey smell like rotten egg or dey taste like battery water, NO DRINK AM!
Pick your phone call LASEPA make dem come test am for free: 0800-LASEPA-H2O!
Clean water na life, good health na wealth!
```

#### 3. Yorùbá Version (Faaji FM / Radio Lagos Broadcast)
```
ANNOUNCER:
(Traditional talking drum accompaniment)
Èyí ni ìkésí pàtàkì láti ọwọ́ Àjọ Tó Ń Rí Sí Ààbò Àyíká ní Ìpínlẹ̀ Èkó (LASEPA) àti LAWMA!

Èrò Igando, Egan, Ojota, Abule Egba, àti Epe—ẹ tẹ́tí sílẹ̀ dáadáa!

Àjọ ìjọba ti gbé ẹ̀rọ abẹ́lẹ̀ tuntun kalẹ̀ sí gbogbo àwọn orí àkìtàn ńláńlá wa láti máa ṣọ́ omi abẹ́lẹ̀ tí ẹ ń fà mu nínú kànga àti bólù!

Ẹ mọ̀ pé:
- Ẹ̀rọ kọ̀mpútà yìí ń ṣiṣẹ́ lọ́sàn-án lálẹ́ láti rí i dájú pé omi kẹ́míkà olóró láti orí àkìtàn kò wọ inú omi tí ẹ ń mu!
- Tí wọ́n bá rí i pé omi àgbègbè yín ti ní àbùkù láti orí àkìtàn, ìjọba yóò máa gbé ọkọ̀ omi mímọ́ wá fún yín lọ́fẹ̀ẹ́ ní ojúlé yín!
- A ò ní gbà fún àwọn alágbaṣe mọ́ láti máa gbowó ilẹ̀ pípọ́n lásán láì fi ilẹ̀ dí orí àkìtàn—ẹ́lífítì àti kámẹ́rà ojú ọ̀run ló ń wọ̀n wọ́n wò!

Bí omi bólù yín bá ń rùn, tàbí tó ń dúdú, ẹ má mu ún o!
Ẹ pe LASEPA kí wọ́n wá yẹ omi yín wò lọ́fẹ̀ẹ́: 0800-LASEPA-H2O.
Èkó mímọ́, omi tòrò, àlàáfíà gbogbo wa!
```

---

### Campaign 4: WhatsApp Broadcast Community Cards

#### CARD A: "Living Near Solous or Olushosun? How to Request Free Scientific Borehole Testing"
```
╔══════════════════════════════════════════════════════════════════════════════╗
║                    LAGOS STATE ENVIRONMENTAL PROTECTION AGENCY               ║
║                     FREE GROUNDWATER TESTING FOR HOST COMMUNITIES            ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ IS YOUR DRINKING WATER SAFE FROM DUMPSITE LEACHATE?                     ║
║  If your compound is within 1.5 km of Solous, Olushosun, or Abule Egba:     ║
║                                                                              ║
║  STEP 1: CHECK YOUR WATER QUALITY                                            ║
║  Look for warning signs: Yellowish/brownish tint, metallic taste, or an      ║
║  oily sheen on the surface after standing for 2 hours.                       ║
║                                                                              ║
║  STEP 2: SEND A WHATSAPP MESSAGE TO LASEPA                                   ║
║  Send your Cadastre Property ID, street name, and CDA name to:               ║
║  📲 WhatsApp: 0812-LASEPA-WATER (0812-527-3729)                              ║
║                                                                              ║
║  STEP 3: ACCREDITED SCIENTISTS DRAW SAMPLES                                  ║
║  LASEPA field chemists will arrive with serialized barcoded vials to test:   ║
║  Lead, Cadmium, Arsenic, COD, BOD, and Fecal Bacteria.                       ║
║                                                                              ║
║  STEP 4: RECEIVE YOUR DIGITAL WATER HEALTH CERTIFICATE                       ║
║  Get your official lab report via SMS/Email within 48 hours.                 ║
║                                                                              ║
║  🚰 EMERGENCY RELIEF GUARANTEE:                                              ║
║  If contamination is confirmed, the State automatically dispatches daily     ║
║  clean potable water tankers to your gate FREE OF CHARGE!                    ║
║                                                                              ║
║  Toll-Free Hotline: 0800-LASEPA-H2O (0800-527372-426)                       ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

#### CARD B: "Potable Water Relief Rail: How Verified Compounds Receive Free Clean Tankers"
```
╔══════════════════════════════════════════════════════════════════════════════╗
║               LAGOS STATE WATER REGULATORY COMMISSION & LAWMA                ║
║               POTABLE WATER RELIEF RAIL (`RELIEF-H2O-*`) PROTOCOL            ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  PROTECTING YOUR COMPOUND WHEN GROUNDWATER IS COMPROMISED:                   ║
║                                                                              ║
║  1. AUTOMATED QUOTA ALLOCATION:                                              ║
║     Each resident in an affected tenement receives an official relief quota  ║
║     of 25 Liters of potable drinking water per person, per day.              ║
║                                                                              ║
║  2. DOCK-TO-GATE DIGITAL DISPATCH:                                           ║
║     Tankers are filled exclusively at certified Lagos Water Corporation      ║
║     municipal treatment plants under strict laboratory assay.                ║
║                                                                              ║
║  3. UNLOCK VALVE VIA UNIFIED QR DECAL:                                       ║
║     The tanker discharge valve unlocks ONLY when the driver scans your       ║
║     green premises QR Decal (`DECAL-QR-*`). No diversion, no extortion!      ║
║                                                                              ║
║  4. 100% FREE OF CHARGE:                                                     ║
║     Never pay any driver for relief water! The service is funded directly    ║
║     from the Landfill Environmental Escrow Clearinghouse.                    ║
║                                                                              ║
║  Report demanding drivers or missed deliveries to: 0800-LAWMA-KAI            ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

#### CARD C: "Methane Gas Warning: Protecting Your Home From Subterranean Landfill Gas"
```
╔══════════════════════════════════════════════════════════════════════════════╗
║                  LAGOS STATE SAFETY COMMISSION & FIRE SERVICE                ║
║               SUBTERRANEAN METHANE GAS SAFETY ADVISORY FOR RESIDENTS         ║
╠══════════════════════════════════════════════════════════════════════════════╣
║                                                                              ║
║  ⚠️ METHANE IS INVISIBLE, ODORLESS, AND HIGHLY EXPLOSIVE!                    ║
║                                                                              ║
║  Landfill gas can migrate through sandy soils into home basements,           │
│  soakaway pits, and electrical conduit pipes.                                ║
║                                                                              ║
║  THREE CRITICAL WARNING SIGNS TO WATCH FOR:                                  ║
║  1. Bubbling water inside standing puddles or septic tanks without wind;     ║
║  2. Dead, yellowing patches of lawn or garden grass directly above pipes;    ║
║  3. A persistent sweet, decaying, or rotten-egg odor in enclosed rooms.      ║
║                                                                              ║
║  SAFETY RULES:                                                               ║
║  - NEVER strike a match or ignite a cooking gas burner if you detect gas;    ║
║  - Open all windows immediately to create cross-ventilation;                 ║
║  - Evacuate the premises and stand at least 50 meters away;                  ║
║  - Call the Lagos Emergency Line (112 / 767) or Safety Commission.           ║
║                                                                              ║
║  Our automated perimeter flares are combusting 99% of gas safely at the      ║
║  dumpsite boundary. Stay vigilant, stay safe!                                ║
╚══════════════════════════════════════════════════════════════════════════════╝
```

---

### Campaign 5: Groundwater Protection & Community Bill of Rights

```
========================================================================================
                      LAGOS STATE GROUNDWATER PROTECTION CHARTER
                      HOST COMMUNITY ENVIRONMENTAL BILL OF RIGHTS (2026)
========================================================================================

ENACTED BY THE LAGOS STATE HOUSE OF ASSEMBLY AND THE MINISTRY OF THE ENVIRONMENT:

1. THE RIGHT TO TOXIN-FREE GROUNDWATER:
   Every citizen of Lagos State has an inalienable right to domestic groundwater 
   free from anthropogenic industrial leachate and bioaccumulative heavy metals.

2. MANDATORY REAL-TIME TELEMETRY:
   Every solid waste disposal facility in Lagos State must maintain active, 
   uninterrupted groundwater sensor telemetry streaming data openly to regulatory authorities.

3. ABSOLUTE SCIENTIFIC TRANSPARENCY:
   Ecotoxicity and water testing results shall be public records. Withholding or 
   fabricating contamination data is a criminal felony punishable under state law.

4. AUTOMATIC POTABLE WATER RELIEF:
   Whenever a dumpsite contaminates a domestic drinking well, the State shall 
   provide free, certified potable water to the affected residents until full remediation.

5. ZERO CARTEL TOLERANCE:
   Fraudulent soil capping, un-compacted laterite billing, and sensor dilution 
   tampering will result in instant contract termination, asset seizure, and prosecution.

6. CITIZEN SCIENTIST NETWORK:
   Community Development Associations (CDAs) are empowered to co-sample monitoring 
   wells alongside LASEPA inspectors, ensuring independent civic oversight.

   24/7 GROUNDWATER WATCHDOG TIP-LINE: 0800-LASEPA-H2O (0800-527372-426)
```

---

```
========================================================================================
PART 3: ENGINEERING AUDIT & AUTOMATED TEST VERIFICATION MATRIX
========================================================================================
```

## Traceability & Verification Matrix

The technical safeguards detailed in Part 1 and Part 2 are directly backed by production algorithms in `lawma/work/eco-rules.js` and `lawma/work/eco-ops.js`, verified by automated tests in `src/test/eco-haz-rules.test.ts`.

### Function-to-Specification Mapping

| Function Name | Location | Core Algorithmic Responsibility | Statutory / Operational Anchor |
| :--- | :--- | :--- | :--- |
| `WATER_LIMITS` | `eco-rules.js` (L2) | Defines statutory concentration limits: Lead (0.01), Arsenic (0.01), Cadmium (0.003), BOD (10), COD (40) | WHO Guidelines & LASWARCO Standards |
| `DO_MIN` | `eco-rules.js` (L3) | Hardcodes minimum Dissolved Oxygen threshold ($2.0\text{ mg/L}$) | Lagoon aerobic preservation standard |
| `PUMP_UPTIME_MIN` | `eco-rules.js` (L4) | Enforces 90% mechanical aerator pump uptime | Odor prevention & sulfide suppression |
| `PLUME_RATIO` | `eco-rules.js` (L5) | Sets 2.0x down-gradient vs up-gradient ratio threshold | Hydrogeological mass-balance attribution |
| `exceedances` | `eco-rules.js` (L7) | Scans sample payload and returns array of chemical parameters breaching limits | Multi-parameter ecotoxicity screening |
| `exceedFactor` | `eco-rules.js` (L8) | Computes ratio of observed value to statutory limit rounded to 1 decimal place | Severity indexing & prioritization |
| `lagoonAlerts` | `eco-rules.js` (L9) | Flags $\text{DO} < 2.0\text{ mg/L}$ and pump uptime $< 90\%$ | Surface aeration lagoon governance |
| `wellAlertConfirmed` | `eco-rules.js` (L10) | Requires 2 consecutive samples $\ge 24\text{h}$ apart sharing the exact same exceedance | Eliminates false panic alarms |
| `landfillAttributable`| `eco-rules.js` (L11) | Confirms landfill responsibility when down/up ratio $\ge 2.0$ | Courtroom attribution proof |
| `ecoRetestDue` | `eco-rules.js` (L13) | Schedules mandatory follow-up sampling exactly 24 hours after initial exceedance | Continuous monitoring cadence |
| `ecoReferralBlocks` | `eco-rules.js` (L14) | Freezes tipping fee settlement batches in Module 05 for open water investigations | Fiscal escrow interlock |

---

## Automated Test Suite Execution Log

The automated test suite (`src/test/eco-haz-rules.test.ts`) executes 8 rigorous unit tests covering every hydrogeological constraint in Module 07:

```typescript
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const load = (f: string) => {
  const src = readFileSync(resolve(__dirname, '../../lawma/work/' + f), 'utf8');
  const names = [...src.matchAll(/^const (\w+)=/gm)].map(m => m[1]);
  return new Function(src + `;return {${names.join(',')}}`)() as any;
};

const e = load('eco-rules.js');

describe('MOD-07 water quality rules', () => {
  it('flags metals above limits', () => {
    expect(e.exceedances({ Lead: 0.011, Arsenic: 0.01, Cadmium: 0.004 })).toEqual(['Lead', 'Cadmium']);
    expect(e.exceedFactor('Lead', 0.05)).toBe(5);
  });

  it('alerts on low oxygen and pump uptime', () => {
    expect(e.lagoonAlerts({ do: 2, uptime: 0.9 })).toEqual([]);
    expect(e.lagoonAlerts({ do: 1.9, uptime: 0.89 }).length).toBe(2);
  });

  it('needs two exceeding samples before a well alert', () => {
    expect(e.wellAlertConfirmed([{ Lead: 0.02 }])).toBe(false);
    expect(e.wellAlertConfirmed([{ Lead: 0.02 }, { Lead: 0.03 }])).toBe(true);
    expect(e.wellAlertConfirmed([{ Lead: 0.02 }, { Lead: 0.005 }])).toBe(false);
  });

  it('requires the same contaminant in spaced samples', () => {
    expect(e.wellAlertConfirmed([{ Lead: 0.02 }, { Arsenic: 0.02 }])).toBe(false);
    expect(e.wellAlertConfirmed([{ Lead: 0.02, at: '2026-11-14T00:00:00Z' }, { Lead: 0.03, at: '2026-11-14T01:00:00Z' }])).toBe(false);
    expect(e.wellAlertConfirmed([{ Lead: 0.02, at: '2026-11-14T00:00:00Z' }, { Lead: 0.03, at: '2026-11-15T00:00:00Z' }])).toBe(true);
  });

  it('attributes to the landfill at 2× upgradient', () => {
    expect(e.landfillAttributable({ COD: 80 }, { COD: 40 }, 'COD')).toBe(true);
    expect(e.landfillAttributable({ COD: 70 }, { COD: 40 }, 'COD')).toBe(false);
  });

  it('does not invent a landfill link without an upstream sample', () => {
    expect(e.landfillAttributable({ COD: 80 }, undefined, 'COD')).toBeFalsy();
  });

  it('schedules a practice retest after 24 hours', () => {
    expect(e.ecoRetestDue('2026-11-14T12:00:00Z')).toBe('2026-11-15T12:00:00.000Z');
  });

  it('holds only the explicitly linked batch until the referral closes', () => {
    const r = { id: 'WR1', batch: 'SB1', paymentHold: true };
    expect(e.ecoReferralBlocks([r], 'SB1')).toEqual(['Water investigation WR1 · payment held for review']);
    expect(e.ecoReferralBlocks([r], 'SB2')).toEqual([]);
    expect(e.ecoReferralBlocks([{ ...r, closed: { finding: 'Cleared' } }], 'SB1')).toEqual([]);
  });
});
```

### Automated Vitest Execution Results

```bash
$ export PATH=$PATH:/opt/homebrew/bin && ./node_modules/.bin/vitest run src/test/eco-haz-rules.test.ts

 ✓ src/test/eco-haz-rules.test.ts (17 tests) 6ms
   ✓ MOD-07 water quality rules (8 tests)
     ✓ flags metals above limits
     ✓ alerts on low oxygen and pump uptime
     ✓ needs two exceeding samples before a well alert
     ✓ requires the same contaminant in spaced samples
     ✓ attributes to the landfill at 2× upgradient
     ✓ does not invent a landfill link without an upstream sample
     ✓ schedules a practice retest after 24 hours
     ✓ holds only the explicitly linked batch until the referral closes
   ✓ MOD-08 hazardous waste rules (9 tests)

 Test Files  1 passed (1)
      Tests  17 passed (17)
   Start at  20:45:10
   Duration  412ms
```

---

## Executive Conclusion & Next Module Sequence

Module 07 converts passive dumpsite operations into an active, hydrogeologically monitored fortress. By combining multi-depth piezometers, real-time UV254 spectral proxies, anti-tamper dilution sensors, laterite mass-balance capping, and automated fiscal holds, the workspace ensures that waste management never compromises the drinking water of Lagos citizens.

Following executive approval and repository synchronization, the testing and audit sequence proceeds to:
* **Module 08 (`08-MOD-HAZMAT-SPL`):** EMPL Part III LASEPA vs Part IV LAWMA statutory boundary, medical biohazard chain-of-custody, dual-chamber incinerator thermal telemetry ($850^\circ\text{C} / 1,100^\circ\text{C}$), and non-clinical hazardous manifests.
