export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // ---- CORS (allow your GH Pages domain) ----
    const allowedOrigins = (env.ALLOWED_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
    const origin = request.headers.get("Origin") || "";
    const corsOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0] || "*";

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders(corsOrigin),
      });
    }

    // Routes
    if (url.pathname === "/auth/login" && request.method === "POST") {
      return withCors(corsOrigin, await handleLogin(request, env));
    }

    if (url.pathname === "/auth/me" && request.method === "GET") {
      return withCors(corsOrigin, await handleMe(request, env));
    }

    if (url.pathname === "/auth/logout" && request.method === "POST") {
      return withCors(corsOrigin, await handleLogout());
    }

    return withCors(corsOrigin, json({ error: "Not found" }, 404));
  },
};

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
    "Vary": "Origin",
  };
}
function withCors(origin, res) {
  const h = new Headers(res.headers);
  const ch = corsHeaders(origin);
  for (const [k, v] of Object.entries(ch)) h.set(k, v);
  return new Response(res.body, { status: res.status, headers: h });
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}

// -------------------------------
// AUTH: Simple username/password list in env.USERS_JSON
// USERS_JSON example:
// [{"user":"chief","pass":"ChangeMe!","role":"command"},
//  {"user":"sgt","pass":"ChangeMe!","role":"staff"}]
// -------------------------------
async function handleLogin(request, env) {
  let body;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON" }, 400); }

  const user = String(body.user || "").trim();
  const pass = String(body.pass || "").trim();

  if (!user || !pass) return json({ error: "Missing credentials" }, 400);

  const users = safeParseUsers(env.USERS_JSON);
  const found = users.find(u => u.user === user && u.pass === pass);
  if (!found) return json({ error: "Invalid username or password" }, 401);

  const role = String(found.role || "public").toLowerCase();
  const exp = Date.now() + (Number(env.SESSION_TTL_MS) || 1000 * 60 * 60 * 8); // default 8h

  const payload = { user, role, exp };
  const token = await signToken(payload, env.AUTH_SECRET);

  return json({
    token,
    user,
    role,
    expiresAt: new Date(exp).toISOString(),
  });
}

async function handleMe(request, env) {
  const token = getBearer(request);
  if (!token) return json({ authed: false });

  const verified = await verifyToken(token, env.AUTH_SECRET);
  if (!verified.ok) return json({ authed: false });

  const { user, role, exp } = verified.payload;
  if (Date.now() > exp) return json({ authed: false });

  return json({ authed: true, user, role, expiresAt: new Date(exp).toISOString() });
}

async function handleLogout() {
  // Stateless JWT: logout is handled on the client by deleting token.
  return json({ ok: true });
}

function getBearer(request) {
  const h = request.headers.get("Authorization") || "";
  const m = h.match(/^Bearer\s+(.+)$/i);
  return m ? m[1] : "";
}

function safeParseUsers(s) {
  try {
    const arr = JSON.parse(s || "[]");
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// -------------------------------
// Minimal HMAC “JWT-like” token
// header.payload.signature (base64url)
// -------------------------------
const te = new TextEncoder();

function b64url(bytes) {
  let str = btoa(String.fromCharCode(...new Uint8Array(bytes)));
  return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
function b64urlJson(obj) {
  return b64url(te.encode(JSON.stringify(obj)));
}
function b64urlToBytes(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function hmacSha256(keyStr, dataStr) {
  const key = await crypto.subtle.importKey(
    "raw",
    te.encode(keyStr),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, te.encode(dataStr));
  return new Uint8Array(sig);
}

async function signToken(payload, secret) {
  if (!secret) throw new Error("AUTH_SECRET missing");
  const header = { alg: "HS256", typ: "JWT" };
  const h = b64urlJson(header);
  const p = b64urlJson(payload);
  const msg = `${h}.${p}`;
  const sig = await hmacSha256(secret, msg);
  return `${msg}.${b64url(sig)}`;
}

async function verifyToken(token, secret) {
  try {
    const [h, p, s] = token.split(".");
    if (!h || !p || !s) return { ok: false };

    const msg = `${h}.${p}`;
    const expected = await hmacSha256(secret, msg);
    const got = b64urlToBytes(s);

    // constant-ish compare
    if (expected.length !== got.length) return { ok: false };
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ got[i];
    if (diff !== 0) return { ok: false };

    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(p)));
    return { ok: true, payload };
  } catch {
    return { ok: false };
  }
}