import fs from "node:fs";

const REQUIRED_ENV = [
  "MOMO_API_TOKEN",
  "MOMO_API_SECRET",
  "MOMO_API_BASE_URL"
];

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

loadLocalEnv();

const { summary, missing } = requireEnv();
console.log("momo credential check:", summary);

if (missing.length > 0) {
  console.error("Missing required momo environment variables:", missing.join(", "));
  process.exit(1);
}

const baseUrl = process.env.MOMO_API_BASE_URL;
const parsedUrl = new URL(baseUrl);

if (parsedUrl.protocol !== "https:") {
  console.error("MOMO_API_BASE_URL must use HTTPS.");
  process.exit(1);
}

const startedAt = Date.now();
let response;

try {
  response = await fetch(parsedUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.MOMO_API_TOKEN}`,
      "X-Momo-Api-Secret": process.env.MOMO_API_SECRET,
      Accept: "application/json"
    }
  });
} catch (error) {
  console.error("momo API smoke test failed:", {
    url: safeUrl(baseUrl),
    error: error.name,
    elapsedMs: Date.now() - startedAt
  });
  process.exit(1);
}

console.log("momo API smoke test:", {
  url: safeUrl(baseUrl),
  status: response.status,
  ok: response.ok,
  elapsedMs: Date.now() - startedAt
});

if (!response.ok) {
  process.exit(1);
}
