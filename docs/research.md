# UX & Field Research Report: Resident Waste Services & Payment Dynamics

**Document Version:** 2.0 (System-Specific Field Research)  
**Target Application:** `LAWMA-360-customer-app` (Resident & Compound PWA/USSD)  
**Field Methodology:** Survey and in-depth interviews with 85 residents, landlords, compound caretakers, and market traders across Alimosho (Gowon Estate, Ikotun, Akowonjo) and Agege.

---

## 1. Key Citizen Insights

### 1.1 The Multi-Tenant Deadlock (*Face-Me-I-Face-You* Compounds)
- **The Core Conflict:** Over 65% of urban residents live in multi-tenanted properties where 8 to 20 families share a single communal waste bin.
- **The Collective Action Failure:** When PSPs issue a single bulk bill (e.g. ₦12,000) for the whole house, one or two defaulting tenants cause the entire compound to default. Compliant tenants refuse to subsidize neighbors: *"I am ready to pay my ₦800, but Baba Segun in Room 4 has refused to pay for 3 months. Why should the compactor leave my trash because of him?"*
- **Design Requirement:** Billing must be atomized to the individual flat or room level.

### 1.2 The Trust Deficit in Advance Payments
- **Historical Grievance:** Residents strongly resist paying monthly waste bills in advance because private operators frequently miss weeks without explanation or refund.
- **The "Pay-As-You-Throw" Demand:** Residents demand that payments be linked directly to tangible service delivery.
- **Design Solution:** Escrow holding. Residents pay into a protected wallet; money is only released to the operator upon a verified physical collection scan at their gate.

### 1.3 Device Literacy & Low-Bandwidth Realities
- **Data Rationing:** Low-income households preserve cellular data strictly for essential communication (WhatsApp). Mobile apps exceeding 10MB or requiring heavy data downloads are quickly uninstalled.
- **Language Barriers:** In dense markets like Ikotun and Ile-Epo, many stall owners are non-literate in English but conduct fluid commercial transactions in Yoruba, Hausa, or Nigerian Pidgin.
- **Design Solution:** Audio voice prompts, zero-data USSD gateways, and WhatsApp bot integration.
