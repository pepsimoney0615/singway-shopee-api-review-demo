# SingWay ERP/WMS Review Environment v2

## Purpose

This project is a standalone static review environment for Shopee Open Platform profile and API review. It presents SingWay ERP/WMS as a read-only product environment with multi-marketplace order workflow, WMS fulfillment, inbound receiving, SKU mapping, inventory control, picking, logistics tracking, staff productivity and security controls.

The site is designed for Cloudflare Pages deployment so reviewers can open a stable HTTPS URL without depending on a local computer or a temporary tunnel.

## Review Environment v2

The review environment demonstrates:

- Marketplace Integration Center
- Other Marketplace Orders
- Product Master / SKU Mapping
- Inbound / Receiving Management
- Warehouse / Location Management
- Outbound / Picking Management
- Staff Efficiency Management
- Import / Sync Logs
- Security & Privacy Center

Required paths:

```text
/demo/login/
/demo/dashboard/
```

## Demo and De-identified Review Dataset

This review environment uses demo and de-identified review datasets.

- Buyer information, order identifiers, addresses, phone numbers, and logistics numbers are masked or anonymized for review safety.
- Phone values use masked examples such as `09********`.
- Address values are city-only examples.
- Order IDs, request IDs, SKU values, product names, purchase batches and tracking-like identifiers are review identifiers.
- Staff names and supplier names are role-based review labels.
- No production database, live API credentials, or unmasked PII is exposed.

## Test Account

Reviewer email:

```text
reviewer@misssi-wms.demo
```

Reviewer password:

```text
ShopeeReview2026!
```

The account is a static review gate and is intended only for read-only product evaluation.

## Other Marketplace Integration Workflow

The review environment includes Lazada, Ruten and Amazon marketplace workflow demonstrations to show that the ERP/WMS product supports cross-platform order normalization, SKU mapping, inventory control and warehouse fulfillment concepts.

These are demo and de-identified review datasets. The site does not claim production API authorization for these marketplaces and does not call their live APIs.

Recommended wording used in the UI:

- Lazada marketplace integration demo
- Ruten marketplace order integration demo
- marketplace order integration workflow
- cross-platform WMS workflow
- authorized connector ready
- import / sync log demo

## Shopee API Application Context

Shopee is shown as `Pending official API approval`.

The planned production flow is:

1. Seller authorizes through Shopee Open Platform.
2. The backend validates the redirect and authorization code.
3. The backend handles access and refresh tokens by shop or merchant scope.
4. First-phase permissions do not request unmasked PII.
5. ERP/WMS workflows use official API authorization only after approval.

The static review environment does not call live Shopee APIs and does not store credentials.

## Security Limitations

- Static website only.
- Read-only review account.
- No production database connection.
- No production upload folder, spreadsheet source or export folder.
- No live Shopee, Lazada, Ruten or Amazon API call.
- No production API credential, partner key, API key or secret key.
- No unmasked buyer identity, full phone number, full address, live order number, live logistics number or live product image.
- No write, delete, export or production mutation feature.
- Official API authorization only in production design.
- The system does not perform scraping, simulated login, CAPTCHA bypassing, browser automation or unofficial data extraction.

## No Production DB / No Live Token / No Unmasked PII

This repository and review site must not contain:

- production DB path
- database files
- upload folders
- export folders
- dependency folders
- live access token
- live refresh token
- API key
- secret
- partner key
- full phone number
- full address
- buyer full name
- live order number
- live tracking number

## Cloudflare Pages Deployment

Recommended settings:

- Framework preset: None
- Build command: leave empty
- Build output directory: `.`
- Root directory: `shopee-api-review-static-demo` if deploying from the parent repository

If the Cloudflare Pages project root is already this folder, the build output directory remains:

```text
.
```

Review URL format:

```text
https://<your-cloudflare-pages-domain>/demo/login/
```
