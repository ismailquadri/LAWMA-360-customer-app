# Customer app — experience revision 2

Updated 9 October 2026.

## Direction

The customer experience begins with a short animated brand launch, then three photographic welcome pages: home, bin delivery and collection. Each screen explains one benefit. Skip and Continue keep progress clear, and the welcome sequence can be replayed without deleting the account.

Account setup is a guided sequence: fictional name/phone → explicit demo verification → residence search and selection → eligible partner → confirmation. Existing household allocations are reused; a rollout-pending address remains usable for support.

## Everyday experience

Home makes the next action prominent based on partner coverage, bin activation and open pickup status. Bins show the household allocation and delivery timeline. Wallet uses one bottom sheet for amount, method and confirmation. Activity shows the collection timeline, financial outcome and completed receipt. You holds residence, partner and support details.

Presenter actions live under You → Presentation controls. Bin progression, capacity approval, partner approval and pickup progression update the same local data model used by customer screens. They do not impersonate a live connected backend.

## Component rules

- Background: warm ivory #FAF9F6. Primary action: green #215C43. Text: #18392F. Accent: orange #D95B22.
- Screen gutters: 24 points. Controls: at least 44 points; primary buttons 54 points.
- Use whitespace and dividers for records. Reserve tinted cards for context and the next action.
- Illustration belongs inside a bin card or feedback modal. Text navigation avoids decorative icon clutter.
- Preserve the supplied logo proportions and transparency.
- Bottom sheets have a labelled Close action, backdrop dismissal and Android back support. Longer content scrolls. Success replaces form content inside the same modal where applicable.
- Motion respects the device Reduce Motion preference. Page navigation remains usable without animation.
- Offscreen onboarding slides are hidden from assistive technology. Inputs have explicit labels and selection controls expose state.

## Content and honesty

Every account, partner, price, sensor reading and financial event is fictional. The generated images illustrate a service concept, not actual staff, equipment or a completed deployment. No production identity, payment, IoT or government service is connected.

## Review boundary

Lint, type checking and Expo bundle exports cover code and packaging. Browser review covers visual layout and representative interactions. Real iOS/Android device review, large-text settings, keyboard behavior and assistive technology acceptance still need physical devices. No signed binary or store submission was created in this revision.
