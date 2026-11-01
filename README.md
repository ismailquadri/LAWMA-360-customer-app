# SmartWaste360 Customer

A separate React Native customer app for iOS and Android. This project does not use the LAWMA desktop dashboard as its mobile shell. It demonstrates the resident journey with fictional records saved on the device.

![Customer app phone preview](../outputs/SmartWaste360_Customer_Onboarding_v2.jpg)

## Run it

```sh
cd customer-app
npm install
npx expo start
```

Open the QR code in Expo Go on an iOS or Android device on the same network. The browser preview is for design review only: `npx expo start --web`.

Native binary distribution requires an Expo/Apple/Google signing setup. No APK, IPA or App Store release is produced by this repository yet.

## Presentation path

1. Launch the app to see the animated brand introduction. First launch opens three image-led welcome screens; replay them from **You → Welcome to SmartWaste360**.
2. Enter fictional account details. The demo verification code is **123456**; no SMS is sent.
3. Search for **Ikeja** and select **18 Olowu Street** to demonstrate a new bin allocation. **4 Mainland Court, Yaba** joins a household with two existing bins; **71 Ajah Gardens** now demonstrates a new area with eligible demo partners.
4. Compare eligible partners and confirm one. Home guides the customer to their next action.
5. At **Bins**, request a size and quantity. The demo activates the requested bins after three seconds. Open the 3D viewer to rotate a bin and open its lid.
6. At **Wallet**, choose **Add money**, an amount and a payment method. The sheet credits fictional money and shows a confirmation. No payment provider is contacted.
7. Request a pickup and confirm the price. The charge is reserved once. Use **Presentation controls** to simulate acceptance, scheduling, crew collection and completion. Acceptance settles the reserved amount without a second debit; declining returns it.
8. At **Activity**, follow the timeline and open the completed receipt. Use **Get help** to create a support case; it appears under **You**.
9. Request a provider change after outstanding pickups and bin deliveries are finished. The current partner remains assigned until the presenter simulates LAWMA approval.
10. **Presentation controls → View partner & LAWMA handoff** explains the shared record. **Start a fresh customer journey** asks for confirmation before resetting local demo data.

## Experience design

- Separate native React Native screens, safe-area-aware tabs, keyboard-aware forms and scrollable bottom sheets.
- Three coordinated Lagos-themed onboarding photographs, generated for this presentation; they are not evidence of an actual LAWMA deployment.
- Consistent green, warm ivory and orange palette, supplied transparent logo, readable type and restrained illustration.
- Reduced-motion support, labelled controls, selected states, minimum 44-point actions and hidden offscreen onboarding content for assistive technology.
- Customer actions and presenter simulation controls are separated. State remains local to the device.

See [revision 3 and the eleven-point review](EXPERIENCE-REVIEW-V3.md), [the design handoff](DESIGN-NOTES.md) and [image provenance](assets/onboarding/README.md).

## Scope and data rules

- Household bin allocation belongs to a premise. Multiple bins can be requested in one allocation. A second request for that same local demo premise is blocked. Cross-device deduplication needs the shared production backend.
- Only sample partners whose configured coverage includes the chosen premise appear. Their prices, scores and schedules are invented.
- A customer without bins can still open the app, see rollout status and submit a service report. Pickup booking requires a selected partner, active bins and enough sample wallet credit.
- Bin sensor status, partner actions, payment channels, receipt evidence, cases and LAWMA oversight are simulated. All state is local to the current device, including the linked-record demonstration.
- No real identity verification, payment, stored-value wallet, IoT device, pickup dispatch or government database is connected.

The source requirements and unresolved LAWMA policy decisions are in [the customer app brief](../docs/CUSTOMER-APP-PARTNER-SERVICE-AND-IOT-BIN-PROVISIONING.md) and [flow atlas](../docs/CUSTOMER-APP-USER-FLOW.html).

## Code map

- `src/store.tsx`: fictional domain records and transitions.
- `src/app/index.tsx`, `welcome.tsx`, `setup.tsx`: animated launch, three welcome pages, account verification, residence and partner onboarding.
- `src/app/(tabs)/`: Home, Bins, Wallet, Activity and You.
- `src/app/pickup.tsx`, `report.tsx`, `provider.tsx`, `handoff.tsx`: customer actions and linked-record demonstration.
- `src/ui.tsx` and `src/logo.ts`: interface components and the supplied transparent brand artwork.

## Current quality checks

Lint and TypeScript checks pass. Expo exports for web, iOS and Android complete successfully. Browser previews were visually reviewed at phone widths; native device acceptance, VoiceOver/TalkBack review and signed binaries remain to be completed. Exported native bundles are not installable App Store releases.

## Revision 3 additions

Modern icon navigation, DM Sans, a reusable wallet panel, transaction filtering and details, timed partner discovery/bin activation, interactive 3D bins, populated activity, profile editing, confirmed residence changes, and guided support with priority escalation. Replay the full opening at `/launch?intro=1`.
