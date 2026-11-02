# LAWMA 360 app messages

The customer app hosts a small message hub. The Partner Hub and the LAWMA
workspace talk to it over HTTP.

Base URL: `https://smartwaste360-mobile.vercel.app`

Every request sends header `x-app-key: <PARTNER_APP_KEY or LAWMA_APP_KEY>`.

## Read your inbox

`GET /api/public/messages?since=<created_at of last message>` →
`{ app, messages: [{ id, from_app, to_app, type, customer_id, ref, payload, created_at }] }`

Poll every ~5 seconds, keep the last `created_at` as the cursor, ignore ids already seen.
Each message's `payload.customer` carries `{ name, phone, address, area, premiseId, partnerId }`.

## Send a message

`POST /api/public/messages` with JSON
`{ "to": ["customer"], "type": "pickup.status", "customerId": "CUS-…", "ref": "PU-…", "payload": { … } }`

## Customer → partner / LAWMA

| type | to | payload |
| --- | --- | --- |
| customer.registered | lawma | — |
| partner.selected | partner, lawma | partnerId, partnerName |
| bin.requested | partner | binId, size, kind (new / additional) |
| pickup.requested | partner | pickupId, amount, window, partnerId |
| pickup.cancelled | partner | pickupId |
| wallet.topup | partner, lawma | amount, method, balance |
| issue.reported | partner and/or lawma | issueId, type (category), detail (report text), title?, urgency? (low/medium/high), original? (resident's own words) |
| provider_change.requested | lawma, partner | fromPartnerId, toPartnerId, toPartnerName |

## Partner / LAWMA → customer

| type | from | payload |
| --- | --- | --- |
| pickup.status | partner | pickupId, status (Accepted, Scheduled, Collected, Completed, Declined), window?, crew?, note? |
| bin.status | partner | binId, status (Approved, Out for delivery, Delivered, Active, Declined) |
| issue.update | partner or lawma | issueId, status (Open, In review, Resolved), reply |
| provider_change.decision | lawma | approved (true/false), note? |
| notice.sent | partner or lawma | text |

Partner and LAWMA can also message each other (e.g. `to: ["lawma"]`).

Money rule: the pickup charge is held when requested. The first partner status
after Requested (other than Declined) settles it once; Declined returns it.
