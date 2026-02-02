(async function(){
  const qs = new URLSearchParams(location.search);
  const type = (qs.get("type") || "").toLowerCase(); // sop | policy | rank | etc
  const slug = (qs.get("slug") || "").toLowerCase();

  const $ = (id) => document.getElementById(id);

  function setText(id, v){ const el = $(id); if (el) el.textContent = v; }
  function setHtml(id, v){ const el = $(id); if (el) el.innerHTML = v; }

  // Base API helper (uses your existing AUTH client token if present)
  async function api(path){
    const base = (window.AUTH_BASE_URL || "").replace(/\/+$/,"");
    if (!base) throw new Error("AUTH_BASE_URL not set");

    const headers = {};
    const token = window.LSPD_AUTH?.getToken?.() || "";
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(base + path, { headers });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  }

  function niceType(t){
    if (t === "sop") return "SOP / Procedures";
    if (t === "policy") return "Policies";
    if (t === "rank") return "Rank Structure";
    return "Document";
  }

  async function boot(){
    if (!type || !slug) {
      setText("docTitle", "Missing document link");
      setText("docSub", "Invalid URL (type/slug).");
      setHtml("docBody", `<div class="noteBox"><div class="noteTitle">Not Found</div><div class="noteText">This link is missing <code>?type=</code> or <code>?slug=</code>.</div></div>`);
      setText("docSideFoot", "Invalid link.");
      return;
    }

    // Optional: show who is logged in
    const me = await (window.LSPD_AUTH?.me?.() ?? Promise.resolve({ authed:false }));
    if (me.authed) {
      const pill = $("authPill");
      if (pill){
        pill.style.display = "";
        pill.textContent = `${me.user} • ${String(me.role||"").toUpperCase()}`;
      }
    }

    setText("docSection", niceType(type));
    setText("docFoot", `Information Center • ${niceType(type)}`);

    // Fetch doc from Worker (Worker enforces restrictions by role + status)
    const doc = await api(`/docs/get?type=${encodeURIComponent(type)}&slug=${encodeURIComponent(slug)}`);

    // Fill UI
    document.title = `LSPD • ${doc.title || "Document"}`;
    setText("docTitle", doc.title || "Document");
    setText("docSub", doc.subtitle || doc.desc || "—");
    setText("docSideFoot", doc.tags?.length ? `Tags: ${doc.tags.join(", ")}` : " ");

    // Meta (uses your existing renderApproval/appendMetaRows helpers)
    const metaBox = $("metaBox");
    if (metaBox){
      metaBox.innerHTML = "";
      if (window.renderApproval) window.renderApproval(metaBox, doc.approval || {});
      if (window.appendMetaRows) window.appendMetaRows(metaBox, doc.meta || []);
    }

    // Body is trusted HTML from your system (you control it)
    setHtml("docBody", doc.bodyHtml || "<div class='muted'>No content.</div>");

    // Footer updated
    setText("updatedText", `Last updated: ${doc.updatedAt || "—"}`);
  }

  try {
    await boot();
  } catch (e){
    setText("docTitle", "Access denied / Not found");
    setText("docSub", "You may need to login, or you may not have permission.");
    setHtml("docBody", `
      <div class="noteBox">
        <div class="noteTitle">Unable to load document</div>
        <div class="noteText">${String(e?.message || e)}</div>
      </div>
    `);
    setText("docSideFoot", "Restricted.");
  }
})();