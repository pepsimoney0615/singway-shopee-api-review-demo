# SingWay ERP/WMS Review Environment v2

## Purpose

This project is a standalone static review environment for Shopee Open Platform profile and API review. It presents SingWay ERP/WMS as a read-only product environment with multi-marketplace order workflow demos, WMS fulfillment, inbound receiving, SKU mapping, inventory control, picking, logistics, staff productivity and security controls.

The site is designed for Cloudflare Pages deployment so reviewers can open a stable HTTPS URL without depending on a local computer or Cloudflare Quick Tunnel.

## Review URL

Cloudflare Pages review URL format:

```text
https://<your-cloudflare-pages-domain>/demo/login/
```

Required paths:

```text
/demo/login/
/demo/dashboard/
```

## Test Account

Reviewer email:

```text
reviewer@misssi-wms.demo
```

Reviewer password:

```text
ShopeeReview2026!
```

The account is simulated by frontend JavaScript and is intended only for read-only review.

## Security Limitations

- Static website only.
- No production database connection.
- No production upload folder or export folder.
- No real Shopee, Lazada, Ruten or Amazon API call.
- No production API credential, partner key, API key or secret key.
- No real buyer identity, real order, real phone number, full address, real logistics number or real product image.
- No write, delete, export or production mutation feature.
- Review account can only view demo pages.
- Official API authorization only in production design.
- No scraping, no CAPTCHA bypass and no unofficial data extraction.

## Data Masking Policy

All review records are demo data or masked data:

- Buyer name examples use masked display such as `Buyer L****`.
- Phone values use `Masked phone`.
- Address values are city-only examples.
- Order IDs, request IDs, SKU values, product names, purchase batches and tracking-like identifiers are demo identifiers.
- Staff names and supplier names are demo names.

## Other Marketplace Integration Explanation

The review environment includes Lazada, Ruten and Amazon marketplace workflow demos to show that the ERP/WMS product supports cross-platform order normalization, SKU mapping, inventory control and warehouse fulfillment concepts.

These records are demo marketplace records. The site does not claim production authorization for these marketplaces and does not call their real APIs.

Recommended wording used in the UI:

- Lazada marketplace integration demo
- Cross-platform marketplace order workflow
- Demo marketplace records
- Connector design preview

## Shopee API Application Explanation

Shopee is shown as `Pending official API approval`.

The planned production flow is:

1. Seller authorizes through Shopee Open Platform.
2. The backend validates the redirect and authorization code.
3. The backend handles access and refresh tokens by shop or merchant scope.
4. First-phase permissions do not request unmasked PII.
5. ERP/WMS workflows use official API authorization only.

The static review environment does not call real Shopee APIs and does not store credentials.

## Local Preview

From this folder, run any static file server. For example:

```bash
python3 -m http.server 8788
```

Then open:

```text
http://127.0.0.1:8788/demo/login/
```

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
