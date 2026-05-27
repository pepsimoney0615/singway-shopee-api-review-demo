const DEMO_EMAIL = "reviewer@misssi-wms.demo";
const DEMO_PASSWORD = "ShopeeReview2026!";
const AUTH_KEY = "singway_erp_wms_review_auth_v2";

const integrations = [
  ["Shopee", "Pending official API approval", "Planned", "Demo mapping ready", "Review mode", "Planned official logistics flow", "2026-05-27 10:05", "Shopee Open Platform application in review."],
  ["Lazada", "Lazada marketplace integration demo", "Demo imported", "Demo mapping ready", "Demo sync preview", "Demo logistics workflow", "2026-05-27 09:40", "Cross-platform marketplace order workflow using demo marketplace records."],
  ["Ruten", "Marketplace workflow demo", "Demo imported", "Manual review queue", "Demo sync preview", "Demo logistics workflow", "2026-05-27 09:22", "Other marketplace order format shown for reviewer context."],
  ["Amazon", "Connector design preview", "Demo pending", "Demo mapping ready", "Review mode", "Demo fulfillment workflow", "2026-05-27 08:55", "ERP/WMS architecture supports multi-channel order normalization."]
];

const marketplaceOrders = [
  ["Lazada", "LZD-DEMO-20260527-001", "READY_TO_SHIP", "LZD-HC-BEIGE-6", "Demo Hair Clip Set", 2, "Buyer L****", "Masked phone", "Taipei City", "Imported", "WMS-DEMO-HC-001"],
  ["Lazada", "LZD-DEMO-20260527-002", "PAID", "LZD-POUCH-GR-S", "Demo Travel Pouch", 1, "Buyer C****", "Masked phone", "Taichung City", "Imported", "WMS-DEMO-PO-014"],
  ["Ruten", "RTN-DEMO-20260527-003", "CONFIRMED", "RTN-LABEL-WH-120", "Demo Storage Label Pack", 4, "Buyer W****", "Masked phone", "New Taipei City", "Matched", "WMS-DEMO-LB-008"],
  ["Ruten", "RTN-DEMO-20260527-004", "READY_TO_PICK", "RTN-TIE-BK-20", "Demo Desk Cable Tie", 3, "Buyer H****", "Masked phone", "Tainan City", "Review queue", "WMS-DEMO-CT-011"],
  ["Amazon", "AMZ-DEMO-20260527-005", "UNSHIPPED", "AMZ-BOX-SM-10", "Demo Storage Box", 2, "Buyer A****", "Masked phone", "Kaohsiung City", "Imported", "WMS-DEMO-BX-022"]
];

const skuMappings = [
  ["WMS-DEMO-HC-001", "INT-HC-001", "Shopee", "SHP-HC-BEIGE-6", "Demo Hair Clip Set", "Beige / 6 pcs", "Auto matched", "98%"],
  ["WMS-DEMO-HC-001", "INT-HC-001", "Lazada", "LZD-HC-BEIGE-6", "Demo Hair Clip Set", "Beige / 6 pcs", "Auto matched", "97%"],
  ["WMS-DEMO-PO-014", "INT-PO-014", "Lazada", "LZD-POUCH-GR-S", "Demo Travel Pouch", "Gray / Small", "Need review", "72%"],
  ["WMS-DEMO-LB-008", "INT-LB-008", "Ruten", "RTN-LABEL-WH-120", "Demo Storage Label Pack", "White / 120 labels", "Auto matched", "94%"],
  ["WMS-DEMO-BX-022", "INT-BX-022", "Amazon", "AMZ-BOX-SM-10", "Demo Storage Box", "Small / 10 pcs", "Manual review", "68%"]
];

const inboundTasks = [
  ["RCV-DEMO-20260527-A", "Demo Supplier Alpha", 240, 220, "Counting in progress", "Shortage review"],
  ["RCV-DEMO-20260527-B", "Demo Supplier Beta", 180, 180, "Received", "No exception"],
  ["RCV-DEMO-20260527-C", "Demo Supplier Gamma", 96, 90, "Quality check", "Damaged carton demo"],
  ["RCV-DEMO-20260527-D", "Demo Supplier Delta", 130, 0, "Scheduled", "Pending arrival"]
];

const locations = [
  ["A-01-03", "Main Warehouse", "Route A", "WMS-DEMO-HC-001", "Available", "Normal"],
  ["A-02-11", "Main Warehouse", "Route A", "WMS-DEMO-PO-014", "Low stock", "Replenishment suggested"],
  ["B-04-05", "Reserve Area", "Route B", "WMS-DEMO-LB-008", "Available", "Normal"],
  ["UNASSIGNED", "Review Queue", "No route", "WMS-DEMO-BX-022", "Missing location", "Needs warehouse review"],
  ["C-03-02", "Main Warehouse", "Route C", "WMS-DEMO-CT-011", "Location exception", "Route check required"]
];

const pickingTasks = [
  ["PICK-DEMO-001", "Basket 05", 12, 38, "Zone A", "Demo Picker 01", "In progress", "0", "Ready to pack"],
  ["PICK-DEMO-002", "Basket 10", 8, 21, "Zone B", "Demo Picker 02", "Pending", "1 demo shortage", "Waiting replenishment"],
  ["PICK-DEMO-003", "Basket 15", 15, 47, "Zone C", "Demo Picker 03", "Completed", "0", "Demo logistics ready"],
  ["PICK-DEMO-004", "Basket 20", 6, 16, "Zone A", "Demo Picker 04", "Checking", "2 demo exceptions", "Supervisor review"]
];

const staffRows = [
  ["Demo Picker 01", 38, "03:12", 42, 0, "Stable"],
  ["Demo Picker 02", 21, "04:28", 18, 1, "Needs replenishment support"],
  ["Demo Receiver 01", 0, "N/A", 180, 0, "Inbound completed"],
  ["Demo QA 01", 16, "05:10", 90, 2, "Exception handling"]
];

const syncLogs = [
  ["Lazada", "order.get_order_list", "Import demo marketplace orders", "Demo success", "DEMO-REQ-LZD-ORDER-001", "2026-05-27 09:40", "Imported masked demo orders."],
  ["Lazada", "product.get_item_list", "Load demo item list", "Demo success", "DEMO-REQ-LZD-PRODUCT-001", "2026-05-27 09:42", "Mapped demo SKUs to WMS product master."],
  ["Ruten", "orders.import", "Normalize demo order file", "Demo success", "DEMO-REQ-RTN-ORDER-001", "2026-05-27 09:22", "Converted demo marketplace order format."],
  ["Amazon", "orders.preview", "Preview connector workflow", "Demo pending", "DEMO-REQ-AMZ-ORDER-001", "2026-05-27 08:55", "Connector design preview only."],
  ["Shopee", "order.get_order_list", "Planned official API sync", "Pending approval", "DEMO-REQ-SHP-ORDER-001", "2026-05-27 10:05", "Will use official authorization after approval."],
  ["Shopee", "logistics.get_shipping_parameter", "Planned logistics workflow", "Pending approval", "DEMO-REQ-SHP-LOG-001", "2026-05-27 10:07", "No real Shopee API call is made in this review environment."]
];

function statusClass(value) {
  const text = String(value).toLowerCase();
  if (text.includes("success") || text.includes("ready") || text.includes("completed") || text.includes("received") || text.includes("normal") || text.includes("stable") || text.includes("auto")) return "ok";
  if (text.includes("pending") || text.includes("review") || text.includes("shortage") || text.includes("exception") || text.includes("low") || text.includes("missing") || text.includes("checking")) return "warn";
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
      window.location.href = "/demo/dashboard/";
      return;
    }

    error.textContent = "Invalid demo email or password.";
    error.classList.add("is-visible");
  });
}

function requireAuth() {
  if (!document.body.matches("[data-requires-auth]")) return;
  if (sessionStorage.getItem(AUTH_KEY) !== "yes") {
    window.location.replace("/demo/login/");
  }
}

function handleLogout() {
  const button = document.querySelector("[data-logout]");
  if (!button) return;
  button.addEventListener("click", () => {
    sessionStorage.removeItem(AUTH_KEY);
    window.location.href = "/demo/login/";
  });
}

function fillDashboardTables() {
  fillRows("#integration-rows", integrations, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${status(row[1])}</td>
      <td>${status(row[2])}</td>
      <td>${status(row[3])}</td>
      <td>${status(row[4])}</td>
      <td>${status(row[5])}</td>
      <td>${row[6]}</td>
      <td>${row[7]}</td>
    </tr>
  `);

  fillRows("#marketplace-order-rows", marketplaceOrders, (row) => `
    <tr>
      <td>${row[0]}</td>
      <td><strong>${row[1]}</strong></td>
      <td>${status(row[2])}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td>${row[6]}</td>
      <td>${row[7]}</td>
      <td>${row[8]}</td>
      <td>${status(row[9])}</td>
      <td>${row[10]}</td>
    </tr>
  `);

  fillRows("#sku-rows", skuMappings, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td>${status(row[6])}</td>
      <td>${row[7]}</td>
    </tr>
  `);

  fillRows("#inbound-rows", inboundTasks, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${status(row[4])}</td>
      <td>${status(row[5])}</td>
    </tr>
  `);

  fillRows("#location-rows", locations, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${status(row[4])}</td>
      <td>${status(row[5])}</td>
    </tr>
  `);

  fillRows("#picking-rows", pickingTasks, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td>${status(row[6])}</td>
      <td>${status(row[7])}</td>
      <td>${status(row[8])}</td>
    </tr>
  `);

  fillRows("#staff-rows", staffRows, (row) => `
    <tr>
      <td><strong>${row[0]}</strong></td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${status(row[5])}</td>
    </tr>
  `);

  fillRows("#sync-log-rows", syncLogs, (row) => `
    <tr>
      <td>${row[0]}</td>
      <td><strong>${row[1]}</strong></td>
      <td>${row[2]}</td>
      <td>${status(row[3])}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td>${row[6]}</td>
    </tr>
  `);
}

requireAuth();
handleLogin();
handleLogout();
fillDashboardTables();
