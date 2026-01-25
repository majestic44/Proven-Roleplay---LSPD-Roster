(function(){
  const KEY = "lspd_auth_token";

  function getToken(){ return localStorage.getItem(KEY) || ""; }
  function setToken(t){ localStorage.setItem(KEY, t || ""); }
  function clearToken(){ localStorage.removeItem(KEY); }

  async function api(path, opts = {}){
    const base = (window.AUTH_BASE_URL || "").replace(/\/+$/,"");
    if (!base) throw new Error("AUTH_BASE_URL not set");

    const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(base + path, { ...opts, headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  async function login(user, pass){
    const data = await api("/auth/login", {
      method: "POST",
      body: JSON.stringify({ user, pass }),
    });
    if (data.token) setToken(data.token);
    return data; // {token,user,role,expiresAt}
  }

  async function me(){
    if (!getToken()) return { authed:false };
    try {
      return await api("/auth/me", { method: "GET" });
    } catch {
      return { authed:false };
    }
  }

  function logout(){
    clearToken();
  }

  window.LSPD_AUTH = { getToken, setToken, clearToken, login, me, logout, KEY };
})();