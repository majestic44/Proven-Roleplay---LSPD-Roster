(() => {
  const $ = (id) => document.getElementById(id);

  function setErr(msg){
    const box = $("cmdErr");
    if (!box) return;
    if (!msg) { box.style.display = "none"; box.textContent = ""; return; }
    box.style.display = "block";
    box.textContent = msg;
  }

  function setText(id, v){
    const el = $(id);
    if (el) el.textContent = v;
  }

  function tokenState(){
    const t = window.LSPD_AUTH?.getToken?.() || "";
    if (!t) return "None";
    return `Present (${Math.min(12, t.length)}+)`;
  }

  async function boot(){
    setErr("");

    setText("updatedText", `Last updated: ${new Date().toLocaleString()}`);
    setText("authApiText", window.AUTH_BASE_URL || "—");

    // Show auth pill
    const me = await (window.LSPD_AUTH?.me?.() ?? Promise.resolve({ authed:false }));
    if (me.authed) {
      const pill = $("authPill");
      if (pill) {
        pill.style.display = "inline-flex";
        pill.textContent = `${me.user} • ${me.role}`;
      }
      $("btnLogout")?.style?.setProperty("display","inline-flex");
      setText("meUser", me.user || "—");
      setText("meRole", me.role || "—");
      setText("tokenState", tokenState());
      setText("sysStatus", "Online");
      setText("cmdSideFoot", `Logged in: ${me.user} (${me.role})`);
    } else {
      setText("sysStatus", "Auth required");
      setText("cmdSideFoot", "Not logged in");
    }

    // buttons
    $("btnLogout")?.addEventListener("click", () => {
      window.LSPD_AUTH?.logout?.();
      location.href = "/";
    });

    $("btnOpenSopIndex")?.addEventListener("click", () => location.href = "./sop/index.html");
    $("btnOpenPolicies")?.addEventListener("click", () => location.href = "./policies/index.html");
    $("btnOpenRanks")?.addEventListener("click", () => location.href = "./ranks/index.html");

    $("btnRefreshUsers")?.addEventListener("click", () => loadUsers());
    $("btnOpenCreateUser")?.addEventListener("click", () => setErr("Create User modal not wired yet. Next step: add /admin/users endpoints."));
    $("btnOpenResetPass")?.addEventListener("click", () => setErr("Reset Password modal not wired yet. Next step: add /admin/reset-password endpoint."));

    // initial
    await loadUsers();
  }

  async function loadUsers(){
    // Placeholder until we add Worker routes:
    // GET /admin/users (command-only)
    const tbody = $("usersBody");
    if (!tbody) return;

    tbody.innerHTML = `<tr><td colspan="4">Loading…</td></tr>`;
    setErr("");

    try {
      // If you already have an endpoint later, we’ll swap this in:
      // const data = await api("/admin/users", { method:"GET" });
      // renderUsers(data.users)

      // For now, show placeholder rows:
      renderUsers([
        { username: "majestic44", role: "command", active: 1 },
        { username: "exampleStaff", role: "staff", active: 1 },
        { username: "exampleMember", role: "member", active: 1 },
      ]);
    } catch (e) {
      tbody.innerHTML = `<tr><td colspan="4">Failed to load</td></tr>`;
      setErr(String(e?.message || e));
    }
  }

  function renderUsers(users){
    const tbody = $("usersBody");
    if (!tbody) return;

    if (!users || !users.length) {
      tbody.innerHTML = `<tr><td colspan="4">No users found</td></tr>`;
      return;
    }

    tbody.innerHTML = "";
    users.forEach(u => {
      const tr = document.createElement("tr");

      const tdUser = document.createElement("td");
      tdUser.textContent = u.username || "—";

      const tdRole = document.createElement("td");
      tdRole.textContent = u.role || "—";

      const tdActive = document.createElement("td");
      tdActive.textContent = u.active ? "Yes" : "No";

      const tdActions = document.createElement("td");
      tdActions.style.textAlign = "right";

      const wrap = document.createElement("div");
      wrap.className = "cmdActions";

      const btnDisable = document.createElement("button");
      btnDisable.className = "cmdAct danger";
      btnDisable.type = "button";
      btnDisable.textContent = "Disable";
      btnDisable.addEventListener("click", () => {
        setErr("Disable user action not wired yet. Next: POST /admin/users/:id/disable");
      });

      const btnEdit = document.createElement("button");
      btnEdit.className = "cmdAct";
      btnEdit.type = "button";
      btnEdit.textContent = "Edit Role";
      btnEdit.addEventListener("click", () => {
        setErr("Edit role action not wired yet. Next: PATCH /admin/users/:id role");
      });

      wrap.appendChild(btnEdit);
      wrap.appendChild(btnDisable);
      tdActions.appendChild(wrap);

      tr.appendChild(tdUser);
      tr.appendChild(tdRole);
      tr.appendChild(tdActive);
      tr.appendChild(tdActions);

      tbody.appendChild(tr);
    });
  }

  boot();
})();