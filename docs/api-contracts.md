# Resident App API & Message Contract

**Target Application:** `LAWMA-360-customer-app`  
**Endpoint:** `/api/public/messages`  
**Authentication Header:** `x-app-key: CUSTOMER_APP_KEY`

---

## Inbound Messages (Partner / LAWMA / Operator -> Customer)

| Type | Source | Payload | Description |
| :--- | :--- | :--- | :--- |
| `pickup.status` | `partner` | `{ pickupId, status, window, crewName }` | Real-time collection schedule update. |
| `pickup.scanned` | `operator` | `{ tagId, timestamp, photoProofUri }` | Proof of collection at household gate. |
| `issue.update` | `lawma` | `{ issueId, status, replyText }` | Status of reported illegal dump or blocked drain. |
| `escrow.credited` | `lawma` | `{ amount, reason, cycleId }` | Auto-credit refund for missed Friday pickup. |

---

## Outbound Messages (Customer -> Partner / LAWMA)

### 1. `pickup.requested`
Dispatched when a resident requests scheduled or bulk pickup:
```json
{
  "to": ["partner"],
  "type": "pickup.requested",
  "customerId": "CUS-ALI-0148-U04",
  "ref": "REQ-2026-11-002",
  "payload": {
    "premiseId": "PROP-GOWON-41",
    "unitId": "FLAT-B",
    "amountHeldEscrow": 1500,
    "pickupWindow": "2026-11-13T08:00:00Z",
    "partnerId": "PAR-ALI-002"
  }
}
```

### 2. `issue.reported`
Dispatched when reporting a community dump or blocked canal:
```json
{
  "to": ["lawma", "partner"],
  "type": "issue.reported",
  "customerId": "CUS-ALI-0148-U04",
  "ref": "PUB-2026-0819",
  "payload": {
    "category": "blocked_drainage",
    "jurisdiction": "LASG",
    "street": "41 Road Junction, Mosan-Okunola",
    "gps": { "lat": 6.5991, "lng": 3.2855 },
    "urgency": "high",
    "description": "Drainage blocked with pure water sachets causing flash flooding",
    "photoUri": "https://storage.lawma.gov.ng/public/PUB-0819.webp"
  }
}
```
