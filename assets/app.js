const DEMO_EMAIL = "reviewer@misssi-wms.demo";
const DEMO_PASSWORD = "ShopeeReview2026!";
const AUTH_KEY = "singway_erp_wms_review_auth_v2";

const integrations = [
  ["Shopee", "Pending official API approval", "Official seller authorization planned", "Shopee planned channel mapping", "Inventory workflow prepared", "Official logistics workflow planned", "Import log available", "2026-05-27 10:05"],
  ["Lazada", "Demo review dataset available", "Marketplace order workflow demonstrated", "SKU mapping demonstrated", "Inventory workflow demonstrated", "Logistics workflow demonstrated", "Import / sync log demo available", "2026-05-27 09:40"],
  ["Ruten", "Demo review dataset available", "Marketplace order workflow demonstrated", "Manual review queue demonstrated", "Inventory workflow demonstrated", "Logistics workflow demonstrated", "Import / sync log demo available", "2026-05-27 09:22"],
  ["Amazon", "Connector design preview", "Marketplace order workflow demonstrated", "SKU mapping demonstrated", "Inventory workflow demonstrated", "Fulfillment workflow demonstrated", "Import / sync log demo available", "2026-05-27 08:55"]
];

const marketplaceOrders = [
  ["Lazada", "LZD-REVIEW-20260525-001", "READY_TO_SHIP", "LZD-HC-BEIGE-6", "INT-HC-001", "Hair Clip Set", "Beige / 6 pcs", 2, "Buyer A", "09********", "Taipei City", "Imported", "Matched", "Reserved", "Picking queued", "Shipment pending"],
  ["Lazada", "LZD-REVIEW-20260525-002", "PAID", "LZD-POUCH-GR-S", "INT-PO-014", "Travel Pouch", "Gray / Small", 1, "Buyer B", "09********", "Taichung City", "Imported", "Review needed", "Hold", "Waiting SKU review", "Not ready"],
  ["Lazada", "LZD-REVIEW-20260525-003", "READY_TO_SHIP", "LZD-LABEL-WH-120", "INT-LB-008", "Storage Label Pack", "White / 120 labels", 4, "Buyer C", "09********", "Tainan City", "Imported", "Matched", "Reserved", "Picked", "Ready to pack"],
  ["Ruten", "RT-REVIEW-20260525-004", "CONFIRMED", "RTN-TIE-BK-20", "INT-CT-011", "Desk Cable Tie", "Black / 20 pcs", 3, "Buyer D", "09********", "New Taipei City", "Imported", "Matched", "Reserved", "In progress", "Shipment pending"],
  ["Ruten", "RT-REVIEW-20260525-005", "READY_TO_PICK", "RTN-BOX-SM-10", "INT-BX-022", "Storage Box", "Small / 10 pcs", 2, "Buyer E", "09********", "Kaohsiung City", "Imported", "Manual review", "Review mode", "Review queue", "Not ready"],
  ["Ruten", "RT-REVIEW-20260525-006", "PAID", "RTN-HC-BEIGE-6", "INT-HC-001", "Hair Clip Set", "Beige / 6 pcs", 1, "Buyer F", "09********", "Hsinchu City", "Imported", "Matched", "Reserved", "Picked", "Ready to pack"],
  ["Amazon", "AMZ-REVIEW-20260525-007", "UNSHIPPED", "AMZ-BOX-SM-10", "INT-BX-022", "Storage Box", "Small / 10 pcs", 2, "Buyer G", "09********", "Taoyuan City", "Imported", "Manual review", "Review mode", "Waiting SKU review", "Not ready"],
  ["Shopee Planned", "SHP-REVIEW-20260525-008", "PENDING_APPROVAL", "SHP-HC-BEIGE-6", "INT-HC-001", "Hair Clip Set", "Beige / 6 pcs", 1, "Buyer H", "09********", "Taipei City", "Preview only", "Planned mapping", "Review mode", "Preview only", "Pending official API approval"]
];

const skuMappings = [
  ["WMS-DEMO-HC-001", "INT-HC-001", "Lazada", "LZD-HC-BEIGE-6", "Hair Clip Set", "Beige / 6 pcs", "Matched", "98%"],
  ["WMS-DEMO-HC-001", "INT-HC-001", "Ruten", "RTN-HC-BEIGE-6", "Hair Clip Set", "Beige / 6 pcs", "Matched", "96%"],
  ["WMS-DEMO-HC-001", "INT-HC-001", "Shopee Planned", "SHP-HC-BEIGE-6", "Hair Clip Set", "Beige / 6 pcs", "Planned channel mapping", "Review ready"],
  ["WMS-DEMO-PO-014", "INT-PO-014", "Lazada", "LZD-POUCH-GR-S", "Travel Pouch", "Gray / Small", "Manual review", "72%"],
  ["WMS-DEMO-LB-008", "INT-LB-008", "Lazada", "LZD-LABEL-WH-120", "Storage Label Pack", "White / 120 labels", "Matched", "94%"],
  ["WMS-DEMO-CT-011", "INT-CT-011", "Ruten", "RTN-TIE-BK-20", "Desk Cable Tie", "Black / 20 pcs", "Matched", "91%"],
  ["WMS-DEMO-BX-022", "INT-BX-022", "Amazon", "AMZ-BOX-SM-10", "Storage Box", "Small / 10 pcs", "Manual review", "68%"]
];

const inboundTasks = [
  ["RCV-REVIEW-20260527-A", "Review Supplier Alpha", 240, 220, "Counting in progress", "Shortage review"],
  ["RCV-REVIEW-20260527-B", "Review Supplier Beta", 180, 180, "Received", "No exception"],
  ["RCV-REVIEW-20260527-C", "Review Supplier Gamma", 96, 90, "Quality check", "Package exception"],
  ["RCV-REVIEW-20260527-D", "Review Supplier Delta", 130, 0, "Scheduled", "Pending arrival"]
];

const locations = [
  ["A-01-03", "Main Warehouse", "Route A", "WMS-DEMO-HC-001", "Available", "Normal"],
  ["A-02-11", "Main Warehouse", "Route A", "WMS-DEMO-PO-014", "Low stock", "Replenishment suggested"],
  ["B-04-05", "Reserve Area", "Route B", "WMS-DEMO-LB-008", "Available", "Normal"],
  ["UNASSIGNED", "Review Queue", "No route", "WMS-DEMO-BX-022", "Missing location", "Needs warehouse review"],
  ["C-03-02", "Main Warehouse", "Route C", "WMS-DEMO-CT-011", "Location exception", "Route check required"]
];

const pickingTasks = [
  ["PICK-REVIEW-001", "Basket 05", 12, 38, "Zone A", "Picker A", "In progress", "0", "Ready to pack"],
  ["PICK-REVIEW-002", "Basket 10", 8, 21, "Zone B", "Picker B", "Pending", "1 shortage review", "Waiting replenishment"],
  ["PICK-REVIEW-003", "Basket 15", 15, 47, "Zone C", "Picker C", "Completed", "0", "Logistics ready"],
  ["PICK-REVIEW-004", "Basket 20", 6, 16, "Zone A", "Picker D", "Checking", "2 exceptions", "Supervisor review"]
];

const staffRows = [
  ["Picker A", 38, "03:12", 42, 0, "Stable"],
  ["Picker B", 21, "04:28", 18, 1, "Needs replenishment support"],
  ["Receiver A", 0, "N/A", 180, 0, "Inbound completed"],
  ["QA A", 16, "05:10", 90, 2, "Exception handling"]
];

const syncLogs = [
  ["Lazada Review Dataset", "marketplace.orders.import", "import de-identified order records", "success", "REVIEW-LZD-001", "2026-05-27 09:40", "demo/de-identified review dataset, no live API credential used"],
  ["Lazada Review Dataset", "marketplace.sku.mapping", "map marketplace SKUs to internal SKU", "success", "REVIEW-LZD-002", "2026-05-27 09:42", "cross-platform SKU mapping demonstrated"],
  ["Ruten Review Dataset", "marketplace.orders.import", "normalize de-identified order records", "success", "REVIEW-RTN-001", "2026-05-27 09:22", "marketplace order integration workflow demonstrated"],
  ["Ruten Review Dataset", "warehouse.fulfillment", "create WMS picking queue", "success", "REVIEW-RTN-002", "2026-05-27 09:28", "cross-platform WMS workflow demonstrated"],
  ["Amazon Review Dataset", "marketplace.orders.preview", "preview order normalization workflow", "pending review", "REVIEW-AMZ-001", "2026-05-27 08:55", "connector design preview, no live API credential used"],
  ["Shopee", "Open Platform authorization", "seller authorization after approval", "pending approval", "REVIEW-SHP-001", "2026-05-27 10:05", "official seller authorization will be used after API approval"],
  ["Shopee", "marketplace.orders.sync", "planned official API order workflow", "pending approval", "REVIEW-SHP-002", "2026-05-27 10:07", "Shopee integration remains pending official API approval"]
];

function statusClass(value) {
  const text = String(value).toLowerCase();
  if (text.includes("success") || text.includes("ready") || text.includes("completed") || text.includes("received") || text.includes("normal") || text.includes("stable") || text.includes("matched") || text.includes("available")) return "ok";
  if (text.includes("pending") || text.includes("review") || text.includes("shortage") || text.includes("exception") || text.includes("low") || text.includes("missing") || text.includes("checking") || text.includes("hold")) return "warn";
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
      <td>${status(row[6])}</td>
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
      <td>${row[9]}</td>
      <td>${row[10]}</td>
      <td>${status(row[11])}</td>
      <td>${status(row[12])}</td>
      <td>${status(row[13])}</td>
      <td>${status(row[14])}</td>
      <td>${status(row[15])}</td>
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
