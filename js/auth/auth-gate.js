(async function () {
  const REQUIRED = String(window.LSPD_REQUIRED_ROLE || "").toLowerCase(); 
  // "" = no restriction

  // Where to send people if they don't have access
  const DENY_REDIRECT = window.LSPD_DENY_REDIRECT || "/"; // landing page
  const LOGIN_REDIRECT = window.LSPD_LOGIN_REDIRECT || "/"; // landing page

  // role ranking
  const rank = (r) => {
    r = String(r || "").toLowerCase();
    if (r === "command") return 3;
    if (r === "staff") return 2;
    if (r === "member") return 1;
    return 0; // not logged in / unknown
  };

// REMOVE BELOW THIS LINE - FOR PRODUCTION
if (location.hostname === "127.0.0.1" || location.hostname === "localhost") {
console.warn("Auth gate disabled for local development");
return;
}
// END REMOVE

  // If page isn't protected, do nothing
  if (!REQUIRED) return;

  // Check session
  const me = await (window.LSPD_AUTH?.me?.() ?? Promise.resolve({ authed: false }));

  if (!me.authed) {
    // not logged in
    location.href = LOGIN_REDIRECT;
    return;
  }

  const userRole = String(me.role || "").toLowerCase();

  // REQUIRED is the minimum role (member/staff/command)
  if (rank(userRole) < rank(REQUIRED)) {
    location.href = DENY_REDIRECT;
  }
})();