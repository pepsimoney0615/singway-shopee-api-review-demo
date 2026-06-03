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
- momo API Evidence

Required paths:

```text
/demo/login/
/demo/dashboard/
```

## Demo and De-identified Review Dataset

This review environment uses demo and de-identified review datasets.

- Buyer information, order identifiers, addresses, phone numbers, and logistics numbers are masked or anonymized for review safety.
- Phone fields are masked and do not contain real phone numbers.
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

The review environment includes Lazada, Ruten, Amazon and mo店+ marketplace workflow demonstrations to show that the ERP/WMS product supports cross-platform order normalization, SKU mapping, inventory control and warehouse fulfillment concepts.

Lazada, Ruten and Amazon use demo and de-identified review datasets. mo店+ API permission received and the review environment shows only sanitized smoke test evidence. The site does not expose a full production workflow for these marketplaces.

Recommended wording used in the UI:

- Lazada marketplace integration demo
- Ruten marketplace order integration demo
- mo店+ API permission received
- smoke test completed from whitelisted fixed IPv4
- low-risk FileQuote endpoint verified
- no live credential exposed in review environment
- full production workflow not exposed in review demo
- marketplace order integration workflow
- cross-platform WMS workflow
- authorized connector ready
- import / sync log demo

## momo API Evidence

mo店+ API permission received. A smoke test was completed from the whitelisted fixed IPv4 `114.33.182.95`, matching the mo店+ A103 application IP.

Smoke test summary:

- API Base URL: `https://api3p.momo.com.tw`
- Verified endpoint: `POST /apiv2/VendorApi/FileQuote`
- Token usage: `Authorization: Bearer <token>`
- HTTP status: `200`
- Response structure summary: `data`, `success`
- hasSuccessField: `true`

Security boundaries:

- No live token is stored in GitHub, Cloudflare Pages, frontend JavaScript, README, or review UI.
- No complete response body is stored in the repository or shown in the review UI.
- `OrderQuery` was intentionally not used for the review smoke test to avoid retrieving buyer PII, order details, address data, or phone data.
- Full production workflow is not exposed in the review demo.

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
- No live momo credential or complete momo API response body.
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

## momo API Test Environment

This repository includes a local-only momo API smoke-test script:

```bash
npm run test:momo
```

The script reads these values from local environment variables or a local `.env` file:

```text
MOMO_API_TOKEN
MOMO_API_BASE_URL
```

`MOMO_API_SECRET` is not required for this smoke test.

The local smoke test uses:

```text
POST https://api3p.momo.com.tw/apiv2/VendorApi/FileQuote
Authorization: Bearer <token>
Content-Type: application/x-www-form-urlencoded
```

The confirmed review smoke test result was HTTP `200`, with response keys summary `data`, `success`, and `hasSuccessField: true`.

Security rules:

- Put real momo credentials only in local `.env`.
- Do not commit `.env`.
- Commit only `.env.example` with placeholder values.
- The script reports whether required values are present, but never prints credential values.
- The script reports sanitized API URL, HTTP status, response keys summary, success field presence and elapsed time, but does not print request headers or complete response bodies.
- Do not use `OrderQuery` in the review smoke test.
- The repository must not contain live momo credentials, seller credentials, API keys, partner keys or private key files.

Before pushing any momo-related change, verify:

```bash
git ls-files .env '.env.*' 'secrets/*' 'credentials/*' '*.key' '*.pem'
```

The command should return no tracked secret files.
