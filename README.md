# Shopee API Review Static Demo

This project is a standalone static demo for Shopee Open Platform review. It is designed for deployment to Cloudflare Pages so the review URL remains available without depending on a local computer or Cloudflare Quick Tunnel.

The site does not connect to a production WMS database, does not call the real Shopee API, and does not contain real buyer data, real orders, real logistics numbers, real product images, access tokens, refresh tokens, API keys, or partner keys.

## Demo Login

Login path:

```text
/demo/login
```

Reviewer email:

```text
reviewer@misssi-wms.demo
```

Reviewer password:

```text
ShopeeReview2026!
```

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

Recommended setup:

- Framework preset: None
- Build command: leave empty
- Build output directory: `.`
- Root directory: `shopee-api-review-static-demo` if deploying from the parent repository

After deployment, the Shopee review URL should use the Cloudflare Pages HTTPS domain:

```text
https://<your-cloudflare-pages-domain>/demo/login
```

## Review Scope

Dashboard sections:

- Shopee Integration
- Connected Shop Management
- Order Synchronization Demo
- Product Master / SKU Mapping
- Inventory Control
- Picking Tasks
- Shipment Workflow
- Logistics Tracking
- API Sync Logs
- Security & Privacy Controls

All dashboard records are demo-only examples for review.
