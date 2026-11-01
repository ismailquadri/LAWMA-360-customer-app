# SmartWaste360 customer experience — revision 3

9 October 2026. Scope: native React Native demo with a browser design preview.

## Decisions and references

- Navigation: visible icons plus labels, selected orange treatment, floating safe-area-aware tab bar. Labels remain visible so users do not have to guess icon meaning.
- Wallet: balance and reserved funds are distinct; add-money is prominent; hide-balance, transaction filters and individual transaction details are available. No debit card number or bank account is fabricated.
- Typography: bundled DM Sans Regular, Medium and Semibold. No remote font dependency at runtime.
- Imagery: taller welcome photographs. Existing generated assets are retained; provenance remains in assets/onboarding/README.md.
- Animation: logo entrance, welcome paging, stack/tab transitions, press feedback and a one-shot success celebration. Reduced Motion disables nonessential motion.
- 3D: locally generated polygon geometry with perspective projection, depth sorting, drag rotation, lid control and accessible rotation buttons. This is a concept bin, not a manufacturer CAD model or physical specification.

Research: [Mobbin iOS library](https://mobbin.com/discover/apps/ios) exposed a login shell rather than browsable screen details. [Wallet concept by Amjad Shahzad](https://dribbble.com/shots/26144713-Wallet-App-UI-Design) provided a balance/transactions/action hierarchy reference. The app uses its own brand and implementation; no reference artwork was copied. Native APIs were checked against [Expo 57](https://docs.expo.dev/versions/v57.0.0/), [Expo Font](https://docs.expo.dev/versions/v57.0.0/sdk/font/) and [React Native PanResponder](https://reactnative.dev/docs/panresponder).

## Demo journey

1. Open `/launch?intro=1` to replay the animated logo followed by all three welcome screens. Returning users can replay this from You.
2. New accounts use code 123456. Select an address; a three-second discovery state precedes the list of eligible partners.
3. Choose a partner and request household bins. Delivery/activation completes after three seconds. Additional capacity is also reviewed and fulfilled automatically in this demo.
4. Open the bin’s 3D viewer. Drag or use rotation buttons; open the lid or reset the view.
5. Add fictional funds. Review a pickup’s charge before requesting. Reservations settle on partner acceptance, or return after an unaccepted cancellation/decline.
6. Activity contains actual local updates plus a separately identified example service-history section. Sample events do not alter the wallet ledger.
7. Edit profile under You. Moving home requires a separate review and confirmation. The customer’s old bin association ends; physical shared bins remain with the residence and history is archived. Unaccepted reservations are returned. Paid collections block the move until completed or resolved.
8. The support assistant gives contextual, scripted demonstration replies. Human and urgent escalation create local cases with the conversation attached. No real AI service, human agent or emergency response is connected.

## Eleven-point usability review

Nielsen’s standard framework contains [ten heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/). Accessibility and inclusion are the explicit eleventh criterion here. This is an implementation review, not a claim of independent usability certification.

| Criterion | Implementation evidence | Remaining review |
|---|---|---|
| 1. System status | Partner discovery, bin delivery, pickup timeline, typing state, wallet reserved/available balances | Physical-device transition timing |
| 2. Familiar language | Home, household bins, service partner, pickup, wallet and support | LAWMA/resident terminology sessions |
| 3. Control and freedom | Back/Close, onboarding Skip, cancel unaccepted pickup, move confirmation, 3D reset, direct escalation | Android system-back walkthrough |
| 4. Consistency | Shared typography, buttons, sheets, wallet panel, icons and feedback | Full device visual regression |
| 5. Error prevention | Eligibility checks, duplicate allocation prevention, amount limits, paid-pickup move block, explicit relocation warning | Shared-backend concurrency is outside demo |
| 6. Recognition | Labelled tabs, visible partner options, transaction filters, suggested support topics | Real resident comprehension |
| 7. Efficiency | Three-second demo progression, amount presets, contextual next action, support shortcuts | Native performance profiling |
| 8. Minimal presentation | Home demo badge removed; simulation controls grouped under You; financial notices remain at payment confirmation | Moderated design review |
| 9. Error recovery | Insufficient-funds recovery CTA, validation messages, cancellation refunds, missing-case fallback | Network failures require real integrations |
| 10. Help | Guided assistant, contextual replies, detailed report, human/urgent escalation, case history | Real support routing and staffing |
| 11. Accessibility/inclusion | System text scaling, labelled controls, reduced motion, rotation buttons as gesture alternative, scrollable small-screen sheets, contrast-conscious orange | VoiceOver/TalkBack, larger text, hardware keyboard and physical devices |

## Scenario and edge-case coverage

| Scenario | Behavior |
|---|---|
| New home without bins | Partner choice → allocation request → timed activation |
| Existing shared household | Join existing bins; no competing initial request |
| Larger household | Size/quantity selection; maximum five demo bins; extra capacity request |
| Demo Ajah rollout | Eligible demo partners now available after discovery |
| Empty/unmatched address search | Clear guidance to the three demo addresses; arbitrary-address verification remains outside demo |
| Invalid name/phone/OTP | Inline validation; no real SMS or identity claim |
| No provider / inactive bin / insufficient balance | Booking is blocked with a specific recovery action |
| Duplicate open pickup | Store rejects a second active collection |
| Unaccepted cancellation | Status becomes Cancelled; reserved money returns once |
| Partner decline | Reservation returned; service record retained |
| Accepted pickup | Reservation settles without another balance debit |
| Move with unaccepted pickup | Cancel request, return reservation, archive prior service record |
| Move with paid pickup | Block with guidance to complete/resolve the service |
| Move to already allocated home | Join that allocation; do not create another bin request |
| Move without new-bin request | New address saved; request bins later |
| Reload during delivery | Saved delivery deadline is retained; overdue completion runs on resume |
| Reset/move during delivery | Effect cleanup and deadline checks prevent delivery to the old residence |
| Missing case reference | Recoverable message; return to existing cases |
| Urgent concern | Bypass assistant; priority local case; no emergency-dispatch claim |
| No matching wallet transactions | Clear filtered-empty state |
| Hidden wallet balance | Available and reserved figures are masked together |
| Small screen / reduced motion | Scrollable sheet content; motion preference respected |

## Verification boundary

Lint, TypeScript and Expo web/iOS/Android bundle exports are checked. Browser walkthroughs covered partner discovery, moving home with a pending collection, bin activation, 3D controls, support replies, urgent case creation, and blocking an address change after partner payment acceptance. These checks do not establish that every possible edge case passes. Device accessibility, production authentication, cross-device household matching, real payments, real AI/human support and physical hardware remain outside this demo.

## Saved previews

- [Wallet and navigation](../outputs/SmartWaste360_Wallet_v3.jpg)
- [Interactive bin model](../outputs/SmartWaste360_Bin_3D_v3.jpg)
