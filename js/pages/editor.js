(() => {
  const $ = (id) => document.getElementById(id);

  const KEY_PREFIX = "lspd_drafts::"; // localStorage only (for now)

  // Map your existing pages (slugs) so the editor can target them.
  // NOTE: match your /pages/* paths.
  const DOCS = {
    sop: [
      { slug: "active-shooter", title: "Active Shooter", path: "./sop/active-shooter.html" },
      { slug: "arrest-procedures", title: "Arrest Procedures", path: "./sop/arrest-procedures.html" },
      { slug: "high-risk-stops", title: "High Risk Stops", path: "./sop/high-risk-stops.html" },
      { slug: "traffic-stops", title: "Traffic Stops", path: "./sop/traffic-stops.html" },
      { slug: "use-of-force", title: "Use of Force", path: "./sop/use-of-force.html" },
      { slug: "vehicle-pursuits", title: "Vehicle Pursuits", path: "./sop/vehicle-pursuits.html" }
    ],
    policies: [
      { slug: "index", title: "Policies Index", path: "./policies/index.html" }
      // Add more policy pages here when they exist
    ]
  };

  function setUpdated(){
    const el = $("updatedText");
    if (el) el.textContent = "Last updated: " + new Date().toLocaleString();
  }

  function showErr(msg){
    const el = $("editErr");
    if (!el) return;
    el.style.display = msg ? "" : "none";
    el.textContent = msg || "";
  }

  function getSelection(){
    const section = ($("docSection")?.value || "sop");
    const slug = ($("docSlug")?.value || "");
    const state = ($("docState")?.value || "draft"); // draft | approved
    return { section, slug, state };
  }

  function storageKey(section, slug, state){
    return `${KEY_PREFIX}${section}::${slug}::${state}`;
  }

  function populateSlugOptions(){
    const section = $("docSection")?.value || "sop";
    const list = DOCS[section] || [];
    const sel = $("docSlug");
    if (!sel) return;

    sel.innerHTML = "";
    list.forEach(d => {
      const opt = document.createElement("option");
      opt.value = d.slug;
      opt.textContent = d.title;
      sel.appendChild(opt);
    });
  }

  function updateEditingLabel(){
    const { section, slug, state } = getSelection();
    const doc = (DOCS[section] || []).find(d => d.slug === slug);
    const label = doc ? `${doc.title} • ${state.toUpperCase()}` : "—";
    $("editingLabel").textContent = label;
  }

  async function loadIntoEditor(){
    showErr("");

    const { section, slug, state } = getSelection();
    const doc = (DOCS[section] || []).find(d => d.slug === slug);
    if (!doc) return showErr("Select a document.");

    updateEditingLabel();

    // 1) Prefer local draft/approved from storage
    const k = storageKey(section, slug, state);
    const saved = localStorage.getItem(k);
    if (saved && saved.trim()){
      $("editArea").value = saved;
      setUpdated();
      return;
    }

    // 2) Otherwise attempt to fetch page and extract panel content (best-effort)
    // Since your SOP pages are full HTML docs, we do a simple fallback:
    // load entire file text and let you edit it manually (UI-first).
    try {
      const res = await fetch(doc.path, { cache: "no-store" });
      const txt = await res.text();
      $("editArea").value = txt;
      setUpdated();
    } catch (e) {
      showErr("Could not load document file. (Local server path?)");
    }
  }

  function saveDraft(){
    showErr("");
    const { section, slug, state } = getSelection();
    if (!slug) return showErr("Select a document.");
    const v = $("editArea").value || "";
    localStorage.setItem(storageKey(section, slug, state), v);
    setUpdated();
  }

  function resetDraft(){
    showErr("");
    const { section, slug, state } = getSelection();
    if (!slug) return;
    localStorage.removeItem(storageKey(section, slug, state));
    $("editArea").value = "";
    setUpdated();
  }

  function preview(){
    // UI-first: open the target page in a new tab
    const { section, slug } = getSelection();
    const doc = (DOCS[section] || []).find(d => d.slug === slug);
    if (!doc) return showErr("Select a document.");
    window.open(doc.path, "_blank");
  }

  function copyToClipboard(){
    const v = $("editArea").value || "";
    navigator.clipboard?.writeText(v).then(() => {
      setUpdated();
    }).catch(() => showErr("Clipboard copy failed."));
  }

  function download(){
    const { section, slug, state } = getSelection();
    const v = $("editArea").value || "";
    const name = `lspd-${section}-${slug}-${state}.html`;
    const blob = new Blob([v], { type: "text/html;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setUpdated();
  }

  function format(){
    // Intentionally minimal: avoid mangling HTML with a naive formatter.
    // Later we can add a real formatter or a safe indentation pass.
    alert("Formatter is a placeholder for now (avoids breaking HTML).");
  }

  // Wiring
  $("btnBackPublishing")?.addEventListener("click", () => location.href = "./publisher.html");
  $("btnRefreshDocs")?.addEventListener("click", () => { populateSlugOptions(); updateEditingLabel(); });
  $("btnLoad")?.addEventListener("click", loadIntoEditor);
  $("btnPreview")?.addEventListener("click", preview);
  $("btnReset")?.addEventListener("click", resetDraft);
  $("btnSaveDraft")?.addEventListener("click", saveDraft);
  $("btnCopy")?.addEventListener("click", copyToClipboard);
  $("btnDownload")?.addEventListener("click", download);
  $("btnFormat")?.addEventListener("click", format);

  $("docSection")?.addEventListener("change", () => {
    populateSlugOptions();
    updateEditingLabel();
  });
  $("docSlug")?.addEventListener("change", updateEditingLabel);
  $("docState")?.addEventListener("change", updateEditingLabel);

  // Init
  populateSlugOptions();
  updateEditingLabel();
  setUpdated();
})();
