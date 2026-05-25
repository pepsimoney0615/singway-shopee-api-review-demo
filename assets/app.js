const DEMO_EMAIL = "reviewer@misssi-wms.demo";
const DEMO_PASSWORD = "ShopeeReview2026!";
const AUTH_KEY = "singway_shopee_review_demo_auth";

const demoLogs = [
  ["2026-05-25 09:10", "order.get_order_list", "Demo success", "DEMO-REQ-ORDER-001", "Fetched masked demo orders for review."],
  ["2026-05-25 09:12", "product.get_item_list", "Demo success", "DEMO-REQ-PRODUCT-001", "Loaded demo item and SKU mapping records."],
  ["2026-05-25 09:14", "logistics.get_shipping_parameter", "Demo success", "DEMO-REQ-LOGISTICS-001", "Returned demo shipping channel options."],
  ["2026-05-25 09:18", "inventory sync", "Demo pending", "DEMO-REQ-STOCK-001", "Waiting for SKU mapping review before sync."]
];

const demoOrders = [
  ["DEMO-SHP-20260525-001", "Demo Shop A", "READY_TO_SHIP", "Buyer ****", "Address masked for privacy", "Pending pick"],
  ["DEMO-SHP-20260525-002", "Demo Shop B", "PROCESSED", "Buyer ****", "Address masked for privacy", "Picked"],
  ["DEMO-SHP-20260525-003", "Demo Shop A", "SHIPPED", "Buyer ****", "Address masked for privacy", "Completed"]
];

const skuRows = [
  ["DEMO-HC-BEIGE-6", "Demo Hair Clip Set / Beige", "WMS-DEMO-HC-001", "Auto matched"],
  ["DEMO-POUCH-GR-S", "Demo Travel Pouch / Gray", "WMS-DEMO-PO-014", "Need review"],
  ["DEMO-LABEL-WH-120", "Demo Storage Label Pack", "WMS-DEMO-LB-008", "Auto matched"]
];

function statusClass(value) {
  const text = String(value).toLowerCase();
  if (text.includes("success") || text.includes("matched") || text.includes("completed") || text.includes("picked")) return "ok";
  if (text.includes("pending") || text.includes("review")) return "warn";
  return "info";
}

function status(value) {
  return `<span class="status ${statusClass(value)}">${value}</span>`;
}

function fillRows(selector, rows, formatter) {
  const target = document.querySelector(selector);
  if (!target) return;
  target.innerHTML = rows.map(formatter).join("");
}

function handleLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;

  const error = document.querySelector("[data-login-error]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const email = String(formData.get("email") || "").trim();
    const password = String(formData.get("password") || "");

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      sessionStorage.setItem(AUTH_KEY, "yes");
      window.location.href = "/demo/dashboard";
      return;
    }

    error.textContent = "Invalid demo email or password.";
    error.classList.add("is-visible");
  });
}

function requireAuth() {
  if (!document.body.matches("[data-requires-auth]")) return;
  if (sessionStorage.getItem(AUTH_KEY) !== "yes") {
    window.location.replace("/demo/login");
  }
}

function handleLogout() {
  const button = document.querySelector("[data-logout]");
  if (!button) return;
  button.addEventListener("click", () => {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = "/demo/login";
  });
}

function fillDashboardTables() {
  fillRows("#api-log-rows", demoLogs, (row) => `
    <tr>
      <td>${row[0]}</td>
      <td><strong>${row[1]}</strong></td>
      <td>${status(row[2])}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
    </tr>
  `);

  fillRows("#order-rows", demoOrders, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${status(row[2])}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${status(row[5])}</td>
    </tr>
  `);

  fillRows("#sku-rows", skuRows, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${status(row[3])}</td>
    </tr>
  `);
}

requireAuth();
handleLogin();
handleLogout();
fillDashboardTables();
