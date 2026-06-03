import fs from "node:fs";

const REQUIRED_ENV = [
  "MOMO_API_TOKEN",
  "MOMO_API_BASE_URL"
];

const SMOKE_TEST_PATH = "/apiv2/VendorApi/FileQuote";

function loadLocalEnv(filePath = ".env") {
  if (!fs.existsSync(filePath)) return;
  const contents = fs.readFileSync(filePath, "utf8");
  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const separator = trimmed.indexOf("=");
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim().replace(/^["']|["']$/g, "");
    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

function isPlaceholder(value) {
  return !value || value.includes("replace-with-") || value.includes("example.invalid");
}

function requireEnv() {
  const summary = {};
  const missing = [];
  for (const key of REQUIRED_ENV) {
    const value = process.env[key];
    const usable = !isPlaceholder(value);
    summary[key] = usable ? "present" : "missing";
    if (!usable) missing.push(key);
  }
  return { summary, missing };
}

function safeUrl(rawUrl) {
  try {
    const parsed = new URL(rawUrl);
    return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
  } catch {
    return "invalid-url";
  }
}

function buildSmokeTestUrl(baseUrl) {
  const parsed = new URL(baseUrl);
  parsed.pathname = `${parsed.pathname.replace(/\/$/, "")}${SMOKE_TEST_PATH}`;
  parsed.search = "";
  parsed.hash = "";
  return parsed;
}

function summarizeResponseKeys(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }
  return Object.keys(value).sort();
}

loadLocalEnv();

const { summary, missing } = requireEnv();
console.log("momo credential check:", summary);

if (summary.MOMO_API_BASE_URL === "missing") {
  console.error("momo API smoke test configuration error:", {
    MOMO_API_TOKEN: summary.MOMO_API_TOKEN,
    MOMO_API_BASE_URL: "missing",
    errorCode: "MISSING_API_BASE_URL",
    message: "API base URL is required for HTTP smoke test. Do not use webhook callback URL as API base URL."
  });
  process.exit(1);
}

if (missing.length > 0) {
  console.error("Missing required momo environment variables:", missing.join(", "));
  process.exit(1);
}

const baseUrl = process.env.MOMO_API_BASE_URL;
const parsedUrl = buildSmokeTestUrl(baseUrl);

if (parsedUrl.protocol !== "https:") {
  console.error("MOMO_API_BASE_URL must use HTTPS.");
  process.exit(1);
}

const startedAt = Date.now();
let response;

try {
  const headers = {
    Authorization: `Bearer ${process.env.MOMO_API_TOKEN}`,
    "Content-Type": "application/x-www-form-urlencoded"
  };

  response = await fetch(parsedUrl, {
    method: "POST",
    headers,
    body: new URLSearchParams()
  });
} catch (error) {
  console.error("momo API smoke test failed:", {
    url: safeUrl(parsedUrl.href),
    error: error.name,
    errorCode: "REQUEST_FAILED",
    elapsedMs: Date.now() - startedAt
  });
  process.exit(1);
}

const responseText = await response.text();
let responseBody;
try {
  responseBody = responseText ? JSON.parse(responseText) : undefined;
} catch {
  responseBody = undefined;
}

console.log("momo API smoke test:", {
  url: safeUrl(parsedUrl.href),
  status: response.status,
  hasSuccessField: Boolean(
    responseBody &&
      typeof responseBody === "object" &&
      !Array.isArray(responseBody) &&
      Object.hasOwn(responseBody, "success")
  ),
  responseKeys: summarizeResponseKeys(responseBody),
  elapsedMs: Date.now() - startedAt
});

if (!response.ok) {
  process.exit(1);
}
