(async function(){
  // Allow list: these pages stay public
  const PUBLIC_PREFIXES = [
    "/index.html",
    "/roster/",        // Web roster folder
    "/embed/",         // if you have embed elsewhere
  ];

  const path = location.pathname;

  // If path starts with allowed prefixes, do nothing
  if (PUBLIC_PREFIXES.some(p => path === p || path.startsWith(p))) return;

  // If AUTH not configured yet, just bounce to landing
  if (!window.LSPD_AUTH){
    location.href = `/index.html?next=${encodeURIComponent(path)}`;
    return;
  }

  const res = await window.LSPD_AUTH.me();
  if (!res || !res.authed){
    location.href = `/index.html?next=${encodeURIComponent(path)}`;
    return;
  }

  // expose role for page logic
  window.LSPD_ROLE = res.role || "officer";
  window.LSPD_USER = res.user || "";
})();