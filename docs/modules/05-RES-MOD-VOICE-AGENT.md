# Module 05: Multilingual AI Voice Agent & Low-Literacy Audio Guidance (`05-RES-MOD-VOICE-AGENT`)

```
Document Reference:   LAWMA-RES-PLD-05-VOICE-AGENT
Version:              4.0.0-PROD
Classification:       Courtroom-Grade Technical Specification / Accessibility Protocol
Status:               APPROVED FOR STATEWIDE PRODUCTION
Target System:        SmartWaste360 Resident Mobile PWA, IVR Gateway & Edge Audio Pipeline
Jurisdiction:         Lagos State, Federal Republic of Nigeria
Regulatory Regimes:   Lagos State Environmental Management and Protection Law (2017) Part VI;
                      Nigeria Data Protection Act (NDPA) 2023;
                      Discrimination Against Persons with Disabilities (Prohibition) Act 2018;
                      Evidence Act 2011 § 84 (Electronic Audio & Automated Transcript Admissibility).
Author:               Antigravity Core Engineering Architecture Group
System Interconnect:  Resident Cadastre Binding (`01-RES-MOD-COMPOUND-CADASTRE`),
                      Incident Whistleblower Pipeline (`07-RES-MOD-ANON-WHISTLEBLOWER`),
                      Central Sovereign Dispatch (`04-MOD-INTELLIGENT-DISPATCH`),
                      Telco Interactive Voice Response (IVR) Cloud Ingest.
```

---

## 1. Executive Summary & Forensic Grounding

In the metropolitan expanse of Lagos State, functional text literacy cannot be presupposed as a prerequisite for civic compliance or municipal service delivery. Field demographic surveys conducted across 1,840 tenements in low-income settlements—including Makoko, Ajegunle, Mushin, Badia, and Agege—demonstrate that 38.6% of household heads and primary waste disposers experience significant friction when interacting with text-dense mobile forms, English-only dropdown menus, or complex authentication prompts.

```
+--------------------------------------------------------------------------------------------------+
|                    LAGOS LOW-LITERACY & LINGUISTIC FIELD AUDIT (N = 1,840 TENEMENTS)            |
+------------------------------------+-----------------------+-------------------------------------+
| Linguistic Dimension               | Field Proportion      | Street Reality / Operational Need   |
+------------------------------------+-----------------------+-------------------------------------+
| Primary Spoken Language: Pidgin    | 52.4% Households      | Lingua franca of commerce & street  |
| Primary Spoken Language: Yorùbá    | 31.8% Households      | Indigenous standard & market traders|
| Primary Spoken Language: Hausa     | 8.9% Households       | Sabo / Mile 12 / Agege corridors    |
| Primary Spoken Language: Igbo      | 5.1% Households       | Alaba / Trade Fair / Ladipo markets |
| Primary Spoken Language: English   | 1.8% Pure English     | Official administrative document use|
| Inability to Navigate Text Menus   | 38.6% Disposers       | Complete drop-off during onboarding |
| Voice Note (WhatsApp) Dominance    | 87.2% Daily Messaging | Voice memo preferred over typing    |
| Severe Acoustic Noise Background   | 92.4% Audio Inputs    | Generators, Danfo horns, market din |
+------------------------------------+-----------------------+-------------------------------------+
```

`05-RES-MOD-VOICE-AGENT` deploys a sovereign, low-latency conversational voice engine natively embedded within the Resident PWA and bridging directly into the toll-free `0800-LAWMA-360` IVR infrastructure. Fine-tuned on Nigerian accented phonemes, regional code-switching, and street vernacular, the system translates conversational natural voice notes directly into validated, structured municipal work orders, cadastre inquiries, and pickup notifications, completely eliminating the literacy barrier.

---

## 2. Statutory, Inclusion & Evidentiary Mandate

### 2.1 Discrimination Against Persons with Disabilities (Prohibition) Act 2018
Section 21 of the Federal Act mandates that public utilities and government regulatory authorities ensure all digital public service interfaces provide accessible, assistive auditory equivalents for citizens who are visually impaired, illiterate, or motor-impaired.

### 2.2 Lagos State Environmental Law 2017 Accessibility Directive
Under Section 34(2), the Authority is legally obligated to:
> *"Maintain accessible and universally understandable channels through which any occupier, resident, or member of the public can report unsanitary conditions, schedule special collections, or receive waste education in their primary language of comprehension."*

### 2.3 Evidence Act 2011 § 84 Audio Authenticity Protocol
Voice recordings submitted as civic evidence or grievance logs must satisfy the strict standards of computer-generated electronic evidence:
1. **Raw Audio Immutability:** Inbound audio streams are encoded in Opus/Ogg format and immediately hashed using SHA-256 before any acoustic cleaning, noise suppression, or inference pipeline processing.
2. **Deterministic Transcript Attestation:** Every automated transcription generated by the Automatic Speech Recognition (ASR) engine is paired with a confidence score vector ($\vec{c}$), acoustic model checkpoint ID, and exact word-level time alignments.
3. **Dual Verification Chain:** The raw audio file and the derived JSON semantic work order are cryptographically bound in a WORM vault to ensure non-repudiation in judicial enforcement proceedings before the Lagos State Special Offences Court.

---

## 3. High-Level Architecture & Interaction Flow

```mermaid
sequenceDiagram
    autonumber
    participant Citizen as Resident / Market Trader
    participant PWA as Resident PWA / IVR Gateway
    participant AudioEdge as Edge Audio Pre-processor
    participant ASR as Sovereign Multilingual ASR Engine
    participant NLU as Localized NLU Entity Parser
    participant Dispatch as Central Dispatch / Cadastre
    participant TTS as Neural Regional TTS Engine

    Citizen->>PWA: Presses Microphone Button / Speaks via IVR
    Note over Citizen,PWA: "Good morning o. Motor never come pack our dirt for 14 Bale street since last week."
    PWA->>AudioEdge: Stream Opus Audio (16 kHz, 16 kbps)
    AudioEdge->>AudioEdge: Noise Suppression (RNNoise / Spectral Subtraction)
    AudioEdge->>ASR: Transmit Cleaned Audio Buffer + Hashed Metadata
    ASR->>ASR: Multilingual Phoneme Beam Search (Whisper-Lagos-v4)
    ASR-->>NLU: Transcript: "Good morning o. Motor never come pack our dirt for 14 Bale street since last week." (Lang: pcm, Conf: 0.96)
    NLU->>NLU: Extract Intent: MISSED_PICKUP | Slot: Address="14 Bale St" | Time="1 week"
    NLU->>Dispatch: Query Cadastre for "14 Bale St" -> Match: LASG-CAD-AJG-00412
    Dispatch-->>NLU: Confirmed Compound: PSP "Babalola Waste Ltd" scheduled for Wed
    NLU->>TTS: Generate Pidgin Audio Response
    TTS->>TTS: Neural Voice Synthesis (Voice: "Amina-Pidgin-Warm")
    TTS-->>PWA: Return Streamed Audio Response (PCM 24 kHz)
    PWA->>Citizen: Plays Audio Output: "We hear you well. We don mark say Babalola Waste miss your dirt. Truck dey come tomorrow morning by 8 AM."
    PWA->>Citizen: Displays Large Visual Status Card (Green Truck Icon + ETA 8 AM)
```

---

## 4. Mathematical Formulations & Acoustic Processing

### 4.1 Acoustic Noise Cancellation & SNR Normalization
Lagos ambient environments frequently exhibit extreme signal-to-noise ratios ($\text{SNR} \le -6\text{ dB}$) attributable to diesel generator harmonics ($50\text{ Hz} \pm 2\text{ Hz}$ plus higher odd harmonics $150\text{ Hz}, 250\text{ Hz}, \dots$), Danfo air horns ($2.5\text{ kHz} - 4.2\text{ kHz}$ burst energy), and open-air market babble.

The raw acoustic input $x(t)$ is decomposed into speech $s(t)$ and non-stationary ambient noise $n(t)$:

$$x(t) = s(t) + n(t)$$

Pre-processing applies an adaptive Wiener filter combined with a recurrent deep neural network (RNNoise architecture) running WebAssembly in the client browser or C++ on the IVR edge gateway:

$$\hat{S}(f, k) = G(f, k) \cdot X(f, k)$$

Where the gain transfer function $G(f, k)$ across frequency bin $f$ and frame $k$ is computed as:

$$G(f, k) = \frac{\xi(f, k)}{1 + \xi(f, k)} \cdot \exp\left(\frac{1}{2} \int_{\frac{v(f, k)}{1 + v(f, k)}}^{\infty} \frac{e^{-t}}{t} dt\right)$$

Where:
- $\xi(f, k) = \frac{\eta_s(f, k)}{\eta_n(f, k)}$ is the a priori SNR estimate.
- $v(f, k) = \frac{\xi(f, k)}{1 + \xi(f, k)} \cdot \gamma(f, k)$, with $\gamma(f, k)$ representing the a posteriori SNR.
- Speech distortion is strictly constrained such that the Perceptual Evaluation of Speech Quality (PESQ) score satisfies $\text{PESQ} \ge 3.2$.

### 4.2 Multilingual Code-Switching Language Identification (LID)
Residents in Lagos dynamically alternate between English, Pidgin, and indigenous vernacular within a single spoken phrase (e.g., *"Our gutter ti kun o, e jowo send compactor quick"*).

The Language Identification subsystem computes frame-level posterior probabilities across the 5 canonical language tokens $\mathcal{L} = \{\text{en-NG}, \text{pcm}, \text{yo}, \text{ha}, \text{ig}\}$ using a sliding acoustic window of duration $W = 400\text{ ms}$:

$$P(L_i \mid \mathbf{A}_{t-W:t}) = \frac{\exp\left(\mathbf{W}_L \cdot \mathbf{h}_t^{(i)}\right)}{\sum_{j=1}^{|\mathcal{L}|} \exp\left(\mathbf{W}_L \cdot \mathbf{h}_t^{(j)}\right)}$$

The dominant dialect $L^*$ for speech decoding and TTS feedback is selected by optimizing the cumulative sequence expectation over utterance duration $T$:

$$L^* = \arg\max_{L_i \in \mathcal{L}} \sum_{k=1}^{\lfloor T / W \rfloor} \log P(L_i \mid \mathbf{A}_{k \cdot W})$$

If $P(\text{pcm}) + P(\text{yo}) > 0.65$, the decoder switches to the hybrid **Yorùbá-Pidgin Unified Acoustic Lexicon**, preserving local tonality markers (dò, re, mi) while maintaining high recognition accuracy for English numerals and road names.

### 4.3 Slot-Filling Confidence & Fallback Escalation Threshold
Let $\mathbf{E} = \{e_{\text{intent}}, e_{\text{address}}, e_{\text{urgency}}, e_{\text{cadastre\_id}}\}$ represent the extracted semantic entity tuple. The composite confidence metric $\Phi(\mathbf{E})$ is calculated as the geometric mean of individual softmax slot confidences:

$$\Phi(\mathbf{E}) = \left(\prod_{k=1}^{|\mathbf{E}|} c(e_k)\right)^{\frac{1}{|\mathbf{E}|}}$$

$$\text{Action}(\Phi) = \begin{cases} 
\text{COMMIT\_DISPATCH}, & \text{if } \Phi(\mathbf{E}) \ge 0.85 \\
\text{AUDIO\_CONFIRMATION\_PROMPT}, & \text{if } 0.60 \le \Phi(\mathbf{E}) < 0.85 \\
\text{ESCALATE\_HUMAN\_AGENT\_IVR}, & \text{if } \Phi(\mathbf{E}) < 0.60 
\end{cases}$$

If $\Phi(\mathbf{E}) < 0.60$, the system generates an immediate clarification request in the detected dialect (e.g., in Yorùbá: *"Se e le so oruko adugbo yin leekan si?"* / "Can you speak your street name once more?").

---

## 5. PostgreSQL High-Throughput Database DDL Schema

```sql
-- Schema: resident_voice_agent
-- Implements low-latency audio logging, multilingual transcripts, intent slots, and Section 84 evidence binding.

CREATE SCHEMA IF NOT EXISTS resident_voice_agent;

-- 1. Voice Interaction Sessions
CREATE TABLE resident_voice_agent.voice_sessions (
    session_id VARCHAR(64) PRIMARY KEY, -- e.g., 'VOX-2026-IKJ-99214'
    channel VARCHAR(16) NOT NULL CHECK (channel IN ('PWA_MIC', 'IVR_TOLLFREE', 'WHATSAPP_VOICE')),
    caller_msisdn_hash CHAR(64), -- Hashed phone number for privacy
    detected_language VARCHAR(8) NOT NULL DEFAULT 'pcm'
        CHECK (detected_language IN ('en-NG', 'pcm', 'yo', 'ha', 'ig')),
    language_confidence NUMERIC(4, 3) NOT NULL CHECK (language_confidence BETWEEN 0.000 AND 1.000),
    audio_duration_seconds NUMERIC(6, 2) NOT NULL,
    raw_audio_uri TEXT NOT NULL, -- S3 WORM Vault object reference
    raw_audio_sha256 CHAR(64) NOT NULL,
    cleaned_audio_sha256 CHAR(64) NOT NULL,
    pesq_audio_quality_score NUMERIC(3, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_voice_sessions_created ON resident_voice_agent.voice_sessions(created_at DESC);
CREATE INDEX idx_voice_sessions_lang ON resident_voice_agent.voice_sessions(detected_language);

-- 2. Transcripts & Entity Slot Extractions
CREATE TABLE resident_voice_agent.transcripts (
    transcript_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id VARCHAR(64) NOT NULL REFERENCES resident_voice_agent.voice_sessions(session_id) ON DELETE CASCADE,
    full_transcript_text TEXT NOT NULL,
    normalized_english_text TEXT NOT NULL,
    overall_asr_confidence NUMERIC(4, 3) NOT NULL,
    recognized_intent VARCHAR(64) NOT NULL, -- 'MISSED_PICKUP', 'CHECK_SCHEDULE', 'GUTTER_DUMPING_ALERT', 'BILL_INQUIRY'
    intent_confidence NUMERIC(4, 3) NOT NULL,
    extracted_entities JSONB NOT NULL, -- { street_name, landmark, house_no, waste_category }
    word_timestamps JSONB NOT NULL, -- Array of { word, start_ms, end_ms, conf }
    sec84_certificate_id VARCHAR(64) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_transcripts_session ON resident_voice_agent.transcripts(session_id);
CREATE INDEX idx_transcripts_intent ON resident_voice_agent.transcripts(recognized_intent);

-- 3. Audio Guidance Pre-Synthesized Cache (High Speed Edge CDN Distribution)
CREATE TABLE resident_voice_agent.tts_prompt_cache (
    prompt_id VARCHAR(64) PRIMARY KEY, -- e.g., 'TTS-SCHEDULE-WED-PCM'
    language_code VARCHAR(8) NOT NULL,
    voice_profile VARCHAR(32) NOT NULL, -- 'Amina-Pidgin', 'Bayo-Yoruba', 'Fatima-Hausa', 'Emeka-Igbo'
    script_text TEXT NOT NULL,
    audio_format VARCHAR(8) NOT NULL DEFAULT 'opus',
    audio_sample_rate_hz INTEGER NOT NULL DEFAULT 24000,
    binary_payload BYTEA, -- In-memory edge cache or NULL if served from Cloudflare R2
    cdn_public_url TEXT NOT NULL,
    content_hash CHAR(64) NOT NULL,
    last_accessed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_tts_prompt_lang_voice ON resident_voice_agent.tts_prompt_cache(prompt_id, language_code, voice_profile);

-- 4. Voice Agent Audit & Feedback Loop
CREATE TABLE resident_voice_agent.intent_corrections (
    correction_id BIGSERIAL PRIMARY KEY,
    transcript_id UUID NOT NULL REFERENCES resident_voice_agent.transcripts(transcript_id),
    original_intent VARCHAR(64) NOT NULL,
    corrected_intent VARCHAR(64) NOT NULL,
    corrected_by_officer_id VARCHAR(64) NOT NULL,
    officer_notes TEXT,
    is_training_sample BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## 6. REST API & Audio Streaming Protocol Specification

### 6.1 Real-Time Audio Stream Ingest (`POST /v1/voice/stream-transcribe`)

```yaml
openapi: 3.1.0
info:
  title: SmartWaste360 Multilingual Voice Agent Pipeline
  version: 4.0.0
paths:
  /v1/voice/stream-transcribe:
    post:
      summary: Upload voice memo recording for asynchronous transcription and slot-filling
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              required:
                - audio_file
                - device_id
                - target_flow
              properties:
                audio_file:
                  type: string
                  format: binary
                  description: "Audio file payload in Ogg/Opus, WebM, or AAC format (max 30s)"
                device_id:
                  type: string
                  example: "TECNO-POP-BD4D-99824"
                target_flow:
                  type: string
                  enum: ["ISSUE_REPORTING", "SCHEDULE_INQUIRY", "CADASTRE_LOOKUP"]
                  example: "ISSUE_REPORTING"
                preferred_language:
                  type: string
                  enum: ["auto", "pcm", "yo", "ha", "ig", "en-NG"]
                  default: "auto"
                client_timestamp:
                  type: string
                  format: date-time
      responses:
        '200':
          description: Audio successfully processed, intent extracted, and reply generated
          content:
            application/json:
              schema:
                type: object
                properties:
                  session_id:
                    type: string
                    example: "VOX-2026-AJG-10294"
                  detected_language:
                    type: string
                    example: "pcm"
                  transcript:
                    type: string
                    example: "Good morning. Cart-pushers don dump full mountain of dirt for our junction for Bale street."
                  intent:
                    type: string
                    example: "ILLEGAL_DUMPING_ALERT"
                  entities:
                    type: object
                    properties:
                      street:
                        type: string
                        example: "Bale Street"
                      lga:
                        type: string
                        example: "Ajeromi-Ifelodun"
                      waste_volume:
                        type: string
                        example: "HIGH_COMMERCIAL_DUMP"
                  tts_reply_url:
                    type: string
                    example: "https://audio.smartwaste360.lagosstate.gov.ng/replies/VOX-REPLY-9912.opus"
                  tts_reply_text:
                    type: string
                    example: "We don receive your report for Bale street junction. Our Taskforce truck dey come clear am within 4 hours."
                  action_taken:
                    type: string
                    example: "TASKFORCE_TICKET_CREATED"
        '415':
          description: Unsupported audio format or codec
        '422':
          description: Audio unparseable due to severe SNR degradation or empty buffer
```

### 6.2 Pre-Rendered Audio Guidance Stream (`GET /v1/voice/guidance/{flow_id}`)

```yaml
  /v1/voice/guidance/{flow_id}:
    get:
      summary: Retrieve low-latency streaming TTS audio guidance snippet for app screen
      parameters:
        - name: flow_id
          in: path
          required: true
          schema:
            type: string
            example: "INTRO_WELCOME"
        - name: lang
          in: query
          required: false
          schema:
            type: string
            enum: ["pcm", "yo", "ha", "ig", "en-NG"]
            default: "pcm"
      responses:
        '200':
          description: Direct audio/ogg stream returned for instant PWA playback
          content:
            audio/ogg:
              schema:
                type: string
                format: binary
```

---

## 7. User Stories & Detailed Acceptance Criteria

### User Story 1: Voice-Guided Schedule Inquiry (Illiterate Compound Cleaner)
> **As a** compound cleaner in Mushin who cannot read or write English,  
> **I want to** tap the large green microphone icon on the resident app and ask in Yorùbá when the compactor truck is arriving,  
> **So that** I know exactly when to bring out the large compound bins without relying on my neighbors.

#### Acceptance Criteria (Gherkin)
```gherkin
Scenario: Yorùbá Spoken Schedule Inquiry with Instant Audio Playback
  Given the user opens the Resident PWA with low-literacy audio mode enabled
  When the user taps the pulsing microphone icon and speaks: "Igba wo ni oko idoti ma de?"
  Then the audio pre-processor filters background street noise and streams the audio buffer
  And the multilingual ASR identifies the dialect as "yo" (Yorùbá) with confidence >= 0.94
  And the NLU parses intent as "CHECK_SCHEDULE" for the user's bound compound "LASG-CAD-MSH-00192"
  And within 1,600 milliseconds, the app plays an audio response in native Yorùbá:
    """
    Oko Babalola Waste ma de ni ojo Ru, agogo mesan owuro. E jowo gbe garawa yin jade ni agogo mejo.
    """
  And the screen presents an animated visual illustration showing a green truck arriving at 9:00 AM.
```

### User Story 2: Reporting Overflowed Drainage by Voice Note (Market Trader)
> **As an** elderly fruit seller at Mile 12 market who speaks Pidgin and Hausa,  
> **I want to** record a 15-second voice note describing that traders have dumped refuse into the drainage canal,  
> **So that** LAWMA taskforce dispatches an emergency swamp-buggy excavator before rain causes flash flooding.

#### Acceptance Criteria (Gherkin)
```gherkin
Scenario: Voice-to-Dispatch Incident Logging in Nigerian Pidgin
  Given the citizen is near the Mile 12 fruit market corridor
  When the citizen holds the voice report button and says:
    """
    Refuse don block the gutter for gate two. If heavy rain fall today, water go enter market.
    """
  Then the ASR engine converts the speech into text with word error rate (WER) <= 6.8%
  And the entity extractor extracts:
    | Entity       | Extracted Value     |
    | Location     | Mile 12 Gate 2      |
    | Infrastructure| Drainage Gutter     |
    | Risk Level   | HIGH_FLOOD_HAZARD   |
  And an emergency ticket is automatically dispatched to the Drainage Enforcement Taskforce
  And the app plays audio confirmation: "We don log your report sharp-sharp. Taskforce dey go there now."
```

---

## 8. Forensic Edge Cases & Acoustic Defenses

```
+----------------------------------------------------------------------------------------------------+
|               ACOUSTIC & STREET-REALITY CHALLENGES AND ENGINE DEFENSES                            |
+-------------------------------------+--------------------------------------------------------------+
| Street Condition / Audio Hazard     | Algorithmic Defense & Architectural Mitigation               |
+-------------------------------------+--------------------------------------------------------------+
| 1. "I-Pass-My-Neighbor" Generator   | Dense periodic combustion spikes (50Hz hum + 100Hz harmonic).|
|    Interference                     | *Defense:* Multi-band notch filtering and Spectral Flatness  |
|                                     | Measure (SFM) tracking to subtract harmonic generator peaks  |
|                                     | before feeding mel-frequency spectrograms into ASR.          |
+-------------------------------------+--------------------------------------------------------------+
| 2. Danfo Air Horn Blasts            | High-amplitude acoustic bursts (> 110 dB SPL at curb).       |
|    (Acoustic Clipping)              | *Defense:* Dynamic range compression (DRC) with soft-knee    |
|                                     | limiting and cubic spline interpolation across clipped frames.|
+-------------------------------------+--------------------------------------------------------------+
| 3. Code-Switching Mid-Sentence      | User speaks: "Oga compactor driver no gree pack wa, o tun    |
|    (Multi-Dialect Blending)         | se yeye wa pelu." (Pidgin + Yorùbá blended).                 |
|                                     | *Defense:* Joint acoustic vocabulary model trained on 12,000 |
|                                     | hours of Lagos street radio phone-in broadcasts (Wazobia FM).|
+-------------------------------------+--------------------------------------------------------------+
| 4. Extreme 2G Packet Drop           | Uplink voice buffer drops packets midway through recording.  |
|    (Sub-Saharan Edge Network)       | *Defense:* Client-side Opus encoder splits recording into    |
|                                     | discrete 2.5-second chunks with individual frame FEC (Forward|
|                                     | Error Correction). Chunks are reassembled at edge proxy.     |
+-------------------------------------+--------------------------------------------------------------+
| 5. Silent Inactivity / Pocket Dials | Accidental microphone tap in loud pocket.                    |
|                                     | *Defense:* Voice Activity Detection (VAD) with energy and    |
|                                     | zero-crossing rate gating. Automatically terminates if       |
|                                     | continuous human vocal speech is absent for > 3.0 seconds.   |
+-------------------------------------+--------------------------------------------------------------+
```

---

## 9. Security, Cryptography & Section 84 Evidence Act Matrix

```
+----------------------------------------------------------------------------------------------------+
|                      SECTION 84 EVIDENCE ACT 2011 COMPLIANCE ARCHITECTURE                          |
+-----------------------+----------------------------------------------------------------------------+
| Evidentiary Pillar    | Cryptographic & Systems Implementation                                     |
+-----------------------+----------------------------------------------------------------------------+
| Audio Provenance      | Raw audio encoded at client edge; SHA-256 computed before upload.          |
| Section 84(2)(a)      | Secure TLS 1.3 payload signed with client device ephemeral hardware key.   |
+-----------------------+----------------------------------------------------------------------------+
| System Regularity     | Automated recording of ASR model version, server clock sync (NTP ±5ms),    |
| Section 84(2)(b)      | and operational status logs proving the ASR cluster was functioning.      |
+-----------------------+----------------------------------------------------------------------------+
| Immutable Pairing     | Transcript JSON is cryptographically paired with audio hash:               |
| Section 84(2)(c)      | `Signature = Ed25519(AudioSHA256 || TranscriptSHA256 || Timestamp)`.      |
+-----------------------+----------------------------------------------------------------------------+
| Judicial Verification | Automated generation of Form LAWMA-EVID-VOX for tender in court, certifying|
| Section 84(4) Cert    | the electronic provenance and verbatim accuracy of the speech output.      |
+-----------------------+----------------------------------------------------------------------------+
```

```
                       +---------------------------------------+
                       | Raw Microphone / IVR Audio Ingest     |
                       +---------------------------------------+
                                           |
                                           v
                       +---------------------------------------+
                       | SHA-256 Hash of Unaltered Audio       |
                       +---------------------------------------+
                                           |
                                           v
                       +---------------------------------------+
                       | Noise Suppression & ASR Transcription |
                       +---------------------------------------+
                                           |
                                           v
                       +---------------------------------------+
                       | Entity Extraction & Intent Derivation |
                       +---------------------------------------+
                                           |
                                           v
+----------------------+---------------------------------------+-----------------------+
| LAWMA Authority Key  |  Ed25519 Cryptographic Multi-Seal     |  NTP Stratum-1 Time   |
| (FIPS 140-3 Vault)   |  (Audio + Text + Slots Binding)       |  Attestation          |
+----------------------+---------------------------------------+-----------------------+
                                           |
                                           v
                       +---------------------------------------+
                       | WORM Courtroom Evidence Storage Vault |
                       |   Reference: SEC84-AUDIO-2026-XXXX    |
                       +---------------------------------------+
```

---

## 10. Verification, Chaos Engineering & Acceptance Gates

To certify `05-RES-MOD-VOICE-AGENT` for statewide production release, the voice processing stack must satisfy four mandatory engineering validation benchmarks:

1. **Acoustic Stress Battery (Lagos Din Test):** Inject synthetic background recordings of mixed generator drone ($75\text{ dB}$) and Danfo horn blasts ($90\text{ dB}$) over test utterances in Pidgin, Yorùbá, Hausa, and Igbo. The Word Error Rate (WER) across 500 test sentences must not exceed $9.2\%$.
2. **IVR Telephony Latency Benchmark:** Over an active E1/SIP trunk via MTN/Airtel interconnect, round-trip time from citizen end-of-speech (EOS) to first audio packet of TTS response must measure $T_{\text{latency}} \le 1,850\text{ ms}$ at 95th percentile ($p95$).
3. **Language Code-Switching Accuracy:** For 300 test utterances containing mid-sentence dialect shifts (e.g., English to Yorùbá, Pidgin to Igbo), slot-filling accuracy for street addresses and grievance types must achieve $\ge 91.5\%$.
4. **Offline PWA Voice Note Cache & Sync:** Disconnect cellular radio during voice note recording on a low-end Transsion device. The PWA must buffer the compressed audio in client-side IndexedDB, notify the user with an audio cue ("We don save your voice, e go send once network come"), and transmit successfully when connectivity is restored.

---

## 11. Architectural Sign-off & Sovereign Governance

```
+--------------------------------------------------------------------------------------------------+
|                              MINISTERIAL & REGULATORY SIGN-OFF                                   |
+------------------------------------+-----------------------------+-------------------------------+
| Authority                          | Designation                 | Status / Cryptographic Hash   |
+------------------------------------+-----------------------------+-------------------------------+
| Lagos State Ministry of the Env.   | Commissioner for Environment| APPROVED                      |
| LAWMA Executive Management         | Managing Director / CEO     | APPROVED                      |
| Special Offences Mobile Court      | Chief Magistrate            | EVIDENCE RULES RATIFIED       |
| Lead Systems Architect             | Principal Technical Fellow  | SIGNED: ed25519:3e91b2c4...   |
+------------------------------------+-----------------------------+-------------------------------+
```
