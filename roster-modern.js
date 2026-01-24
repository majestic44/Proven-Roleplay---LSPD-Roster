(() => {
  // ================================
  // CONFIG
  // ================================
  const DATA_URL = "https://script.google.com/macros/s/AKfycbx-RgIY2AszBYGZdbQJw7jsweqcr5_XQfqRzXJ2DL79ikJZ_c_itOkHJQU31coWIpFl/exec";

  // Rank order for sorting (highest first). Adjust anytime.
  const RANK_ORDER = [
    "Chief",
    "Deputy Chief",
    "Assistant Chief",
    "Captain",
    "Lieutenant",
    "Sergeant",
    "Corporal",
    "Detective",
    "Senior Officer",
    "Officer",
    "Probationary Officer",
    "Cadet",
    "Recruit",
  ];

  // ================================
  // UTIL
  // ================================
  const norm = (v) => String(v ?? "").trim();
  const upper = (v) => norm(v).toUpperCase();
  const el = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k === "html") n.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const c of children) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    return n;
  };

  const safeImg = (url) => {
    const u = norm(url);
    if (u) return u;
    return "data:image/svg+xml;utf8," + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop stop-color="rgba(103,179,255,0.30)" offset="0"/>
            <stop stop-color="rgba(0,0,0,0)" offset="1"/>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="rgba(255,255,255,0.06)"/>
        <rect width="100%" height="100%" fill="url(#g)"/>
        <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle"
              fill="rgba(234,242,255,0.7)" font-family="Arial" font-size="18">NO PHOTO</text>
      </svg>
    `);
  };

  const rankScore = (rank) => {
    const r = upper(rank);
    const idx = RANK_ORDER.findIndex(x => upper(x) === r);
    return idx === -1 ? 999 : idx;
  };

  const displayName = (m) => {
    const dn = norm(m.DisplayName);
    if (dn) return dn;
    return [norm(m.FirstName), norm(m.LastName)].filter(Boolean).join(" ").trim();
  };

  const statusClass = (s) => {
    const v = upper(s);
    if (v === "ACTIVE") return "st-active";
    if (v === "LOA") return "st-loa";
    if (v === "INACTIVE") return "st-inactive";
    if (v === "RESERVE") return "st-reserve";
    return "st-recruit";
  };

  // ================================
  // STYLES (MDT-modern, dark + blue accents)
  // ================================
  const injectStyles = () => {
    const css = `
      :root{
        --mdt-bg: #0b1220;
        --mdt-panel: rgba(10,18,34,0.86);
        --mdt-panel2: rgba(7,13,25,0.72);
        --mdt-line: rgba(255,255,255,0.10);
        --mdt-line2: rgba(103,179,255,0.22);
        --mdt-text: #eaf2ff;
        --mdt-muted: #a9b8d3;
        --mdt-blue: #67b3ff;
        --mdt-amber: #ffaa3c;
        --shadow: 0 18px 60px rgba(0,0,0,0.45);
        --r16: 16px;
        --r22: 22px;
      }

      html,body{height:100%}
      body{
        margin:0;
        background:
          radial-gradient(1200px 700px at 20% 0%, rgba(103,179,255,.13), transparent 60%),
          radial-gradient(900px 600px at 80% 20%, rgba(255,170,60,.08), transparent 55%),
          linear-gradient(180deg, #050a14, var(--mdt-bg));
        color: var(--mdt-text);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
      }

      #lspdRoster{
        height:100%;
        display:flex;
        flex-direction:column;
        gap:12px;
        padding: 14px;
        border: 1px solid var(--mdt-line);
        border-radius: var(--r22);
        box-shadow: var(--shadow);
        background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        overflow:hidden;
      }

      .hdr{
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:12px;
        flex-wrap:wrap;
        padding: 10px 10px 2px;
      }

      .title{
        display:flex;
        flex-direction:column;
        line-height:1.05;
      }
      .title .kicker{
        font-size:12px;
        letter-spacing:.12em;
        color: var(--mdt-muted);
        text-transform:uppercase;
        font-weight:700;
      }
      .title .h1{
        font-size:22px;
        font-weight:900;
        letter-spacing:.04em;
      }

      .controls{
        display:flex;
        gap:10px;
        flex-wrap:wrap;
        justify-content:flex-end;
        align-items:center;
      }

      .in, .sel, .btn{
        border-radius: 12px;
        border: 1px solid var(--mdt-line);
        background: rgba(255,255,255,0.03);
        color: var(--mdt-text);
        padding: 10px 12px;
        outline:none;
      }
      .in{ min-width: 260px; }
      .sel{ min-width: 160px; }

      .btn{
        cursor:pointer;
        background: linear-gradient(180deg, rgba(103,179,255,0.22), rgba(103,179,255,0.10));
        border-color: rgba(103,179,255,0.35);
        font-weight:800;
      }
      .btn:disabled{ opacity:.6; cursor:not-allowed; }
      .btn:active{ transform: translateY(1px); }

      .stats{
        display:grid;
        grid-template-columns: repeat(4, minmax(160px, 1fr));
        gap:10px;
        padding: 0 10px 10px;
      }
      .stat{
        border:1px solid var(--mdt-line);
        border-radius: var(--r16);
        background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.08));
        padding: 10px 12px;
      }
      .stat .label{
        color: var(--mdt-muted);
        font-size:12px;
        letter-spacing:.10em;
        text-transform:uppercase;
        font-weight:700;
      }
      .stat .val{
        font-size:20px;
        font-weight:900;
        margin-top:6px;
      }

      .body{
        display:grid;
        grid-template-columns: 1fr;
        gap:12px;
        padding: 0 10px 10px;
        overflow:auto;
      }

      .grid{
        display:grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 12px;
      }

      .card{
        grid-column: span 4;
        border: 1px solid var(--mdt-line);
        border-radius: var(--r22);
        background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0.10));
        overflow:hidden;
        cursor:pointer;
        transition: transform .12s ease, border-color .12s ease;
        min-height: 110px;
      }
      .card:hover{
        transform: translateY(-2px);
        border-color: rgba(103,179,255,0.35);
      }

      .row{
        display:flex;
        gap:12px;
        padding: 12px;
        align-items:center;
      }
      .avatar{
        width:64px; height:64px;
        border-radius: 18px;
        border: 1px solid var(--mdt-line);
        background: rgba(255,255,255,0.03);
        overflow:hidden;
        flex:0 0 auto;
      }
      .avatar img{
        width:100%; height:100%;
        object-fit:cover;
        display:block;
      }
      .meta{ min-width:0; flex:1; }
      .name{
        font-weight:900;
        font-size:15px;
        letter-spacing:.02em;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .sub{
        margin-top:4px;
        color: var(--mdt-muted);
        font-size:12px;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }
      .chips{
        margin-top:10px;
        display:flex;
        flex-wrap:wrap;
        gap:8px;
      }
      .chip{
        font-size:12px;
        font-weight:800;
        border-radius: 999px;
        padding: 6px 10px;
        border: 1px solid var(--mdt-line);
        background: rgba(0,0,0,0.18);
      }
      .chip.rank{
        border-color: rgba(103,179,255,0.32);
        background: rgba(103,179,255,0.12);
      }
      .chip.unit{
        border-color: rgba(255,170,60,0.30);
        background: rgba(255,170,60,0.10);
      }
      .chip.status{
        border-color: rgba(255,255,255,0.12);
        background: rgba(255,255,255,0.03);
      }
      .chip.status.st-active{ background: rgba(46,229,141,0.12); border-color: rgba(46,229,141,0.30); }
      .chip.status.st-loa{ background: rgba(255,210,74,0.14); border-color: rgba(255,210,74,0.30); }
      .chip.status.st-inactive{ background: rgba(255,91,91,0.12); border-color: rgba(255,91,91,0.30); }
      .chip.status.st-reserve{ background: rgba(103,179,255,0.10); border-color: rgba(103,179,255,0.20); }
      .chip.status.st-recruit{ background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.12); }

      /* Profile drawer */
      .drawerMask{
        position:fixed;
        inset:0;
        background: rgba(0,0,0,0.55);
        display:none;
        z-index: 9999;
      }
      .drawerMask.open{ display:block; }

      .drawer{
        position:fixed;
        top:0;
        right:0;
        height:100%;
        width: min(460px, 92vw);
        background: linear-gradient(180deg, rgba(12,20,40,0.98), rgba(7,12,24,0.98));
        border-left: 1px solid rgba(103,179,255,0.22);
        box-shadow: var(--shadow);
        transform: translateX(100%);
        transition: transform .16s ease;
        display:flex;
        flex-direction:column;
      }
      .drawerMask.open .drawer{ transform: translateX(0); }

      .dTop{
        padding: 16px;
        border-bottom: 1px solid var(--mdt-line);
        display:flex;
        align-items:center;
        justify-content:space-between;
        gap:10px;
      }
      .dTop .dTitle{
        font-weight:900;
        letter-spacing:.04em;
      }
      .x{
        cursor:pointer;
        border:1px solid var(--mdt-line);
        background: rgba(255,255,255,0.03);
        color: var(--mdt-text);
        border-radius: 12px;
        padding: 10px 12px;
        font-weight:900;
      }
      .dBody{
        padding: 16px;
        overflow:auto;
        display:flex;
        flex-direction:column;
        gap:12px;
      }
      .big{
        width:100%;
        aspect-ratio: 4/3;
        border-radius: var(--r22);
        border:1px solid var(--mdt-line);
        overflow:hidden;
        background: rgba(255,255,255,0.03);
      }
      .big img{ width:100%; height:100%; object-fit:cover; display:block; }

      .kv, .para{
        border:1px solid var(--mdt-line);
        border-radius: var(--r22);
        background: rgba(255,255,255,0.02);
        padding: 12px;
      }
      .kv .k, .para .h{
        color: var(--mdt-muted);
        font-size:12px;
        letter-spacing:.10em;
        text-transform:uppercase;
        font-weight:800;
      }
      .kv .v{
        margin-top:6px;
        font-weight:900;
      }
      .para .p{
        margin-top:8px;
        color: var(--mdt-text);
        line-height:1.45;
        font-size:13px;
      }

      .foot{
        padding: 0 10px 10px;
        color: var(--mdt-muted);
        font-size:12px;
      }

      @media (max-width: 1100px){
        .card{ grid-column: span 6; }
        .stats{ grid-template-columns: repeat(2, minmax(160px, 1fr)); }
      }
      @media (max-width: 640px){
        .card{ grid-column: span 12; }
        .in{ min-width: 100%; }
        .sel{ min-width: 48%; }
      }
    `;
    const style = document.createElement("style");
    style.textContent = css;
    document.head.appendChild(style);
  };

  // ================================
  // APP STATE
  // ================================
  const state = {
    members: [],
    filtered: [],
    updatedAt: null,
    q: "",
    rank: "All",
    unit: "All",
    status: "All",
    sort: "Rank",
  };

  function computeStats(arr) {
    const total = arr.length;
    const active = arr.filter(m => upper(m.Status) === "ACTIVE").length;
    const loa = arr.filter(m => upper(m.Status) === "LOA").length;
    const inactive = arr.filter(m => upper(m.Status) === "INACTIVE").length;
    return { total, active, loa, inactive };
  }

  function applyFilters() {
    const q = upper(state.q);
    const r = upper(state.rank);
    const u = upper(state.unit);
    const s = upper(state.status);

    let arr = state.members.slice();

    if (q) {
      arr = arr.filter(m => {
        const hay = upper([
          m.BadgeNumber, m.Callsign, m.FirstName, m.LastName, m.DisplayName,
          m.Rank, m.Unit, m.Status, m.DiscordHandle
        ].join(" "));
        return hay.includes(q);
      });
    }
    if (r !== "ALL") arr = arr.filter(m => upper(m.Rank) === r);
    if (u !== "ALL") arr = arr.filter(m => upper(m.Unit) === u);
    if (s !== "ALL") arr = arr.filter(m => upper(m.Status) === s);

    if (state.sort === "Rank") {
      arr.sort((a,b) => rankScore(a.Rank) - rankScore(b.Rank) || (Number(a.BadgeNumber)||0) - (Number(b.BadgeNumber)||0));
    } else if (state.sort === "Badge") {
      arr.sort((a,b) => (Number(a.BadgeNumber)||0) - (Number(b.BadgeNumber)||0));
    } else if (state.sort === "Name") {
      arr.sort((a,b) => displayName(a).localeCompare(displayName(b)));
    }

    state.filtered = arr;
  }

  function statBox(label, val){
    return el("div", { class:"stat" }, [
      el("div", { class:"label" }, [label]),
      el("div", { class:"val" }, [String(val)]),
    ]);
  }

  function getUnique(field){
    const set = new Set();
    for (const m of state.members) {
      const v = norm(m[field]);
      if (v) set.add(v);
    }
    const arr = [...set];
    if (field === "Rank") arr.sort((a,b) => rankScore(a) - rankScore(b));
    else arr.sort((a,b) => a.localeCompare(b));
    return arr;
  }

  function selectCtl(root, key, label, options){
    const sel = el("select", {
      class:"sel",
      onchange: (e) => { state[key] = e.target.value; render(root); }
    });

    sel.appendChild(el("option", { value:"All" }, [`${label}: All`]));
    for (const o of options) {
      const opt = el("option", { value:o }, [o]);
      if (o === state[key]) opt.selected = true;
      sel.appendChild(opt);
    }
    return sel;
  }

  function card(m){
    const name = displayName(m) || "Unnamed";
    const badge = norm(m.BadgeNumber) ? `Badge ${norm(m.BadgeNumber)}` : "";
    const cs = norm(m.Callsign) ? `Callsign ${norm(m.Callsign)}` : "";
    const line = [badge, cs].filter(Boolean).join(" • ");

    return el("div", {
      class:"card",
      role:"button",
      tabindex:"0",
      onclick: () => openDrawer(m),
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") openDrawer(m); }
    }, [
      el("div", { class:"row" }, [
        el("div", { class:"avatar" }, [
          el("img", { src: safeImg(m.PhotoUrl), alt:"" })
        ]),
        el("div", { class:"meta" }, [
          el("div", { class:"name" }, [name]),
          el("div", { class:"sub" }, [line || `${norm(m.Rank)} • ${norm(m.Unit)}`]),
          el("div", { class:"chips" }, [
            el("span", { class:"chip rank" }, [norm(m.Rank) || "Rank —"]),
            el("span", { class:"chip unit" }, [norm(m.Unit) || "Unit —"]),
            el("span", { class:`chip status ${statusClass(m.Status)}` }, [norm(m.Status) || "Status —"]),
          ])
        ])
      ])
    ]);
  }

  function kv(k, v){
    return el("div", { class:"kv" }, [
      el("div", { class:"k" }, [k]),
      el("div", { class:"v" }, [v || "—"])
    ]);
  }

  function para(h, p){
    return el("div", { class:"para" }, [
      el("div", { class:"h" }, [h]),
      el("div", { class:"p" }, [p || "—"])
    ]);
  }

  function drawerShell(){
    const mask = el("div", { id:"rosterDrawerMask", class:"drawerMask", onclick:(e) => {
      if (e.target.id === "rosterDrawerMask") closeDrawer();
    }}, [
      el("div", { class:"drawer" }, [
        el("div", { class:"dTop" }, [
          el("div", { id:"dTitle", class:"dTitle" }, ["Profile"]),
          el("button", { class:"x", onclick: closeDrawer }, ["Close"])
        ]),
        el("div", { id:"dBody", class:"dBody" }, [])
      ])
    ]);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });
    return mask;
  }

  function openDrawer(m){
    const mask = document.getElementById("rosterDrawerMask");
    const dTitle = document.getElementById("dTitle");
    const dBody = document.getElementById("dBody");

    dTitle.textContent = `${displayName(m) || "Member"} • ${norm(m.Rank) || "—"}`;

    dBody.innerHTML = "";
    dBody.appendChild(el("div", { class:"big" }, [
      el("img", { src: safeImg(m.PhotoUrl), alt:"Profile photo" })
    ]));

    dBody.appendChild(kv("Badge / Callsign", [norm(m.BadgeNumber) ? `Badge ${norm(m.BadgeNumber)}` : "", norm(m.Callsign) ? `Callsign ${norm(m.Callsign)}` : ""].filter(Boolean).join(" • ")));
    dBody.appendChild(kv("Rank / Unit", `${norm(m.Rank) || "—"} • ${norm(m.Unit) || "—"}`));
    dBody.appendChild(kv("Status", norm(m.Status)));
    dBody.appendChild(kv("Joined", norm(m.JoinedDate)));
    dBody.appendChild(kv("Discord", norm(m.DiscordHandle)));

    dBody.appendChild(para("Bio", norm(m.Bio)));
    dBody.appendChild(para("Certifications", norm(m.Certifications)));
    dBody.appendChild(para("Notes", norm(m.Notes))); // remove later if you want

    mask.classList.add("open");
  }

  function closeDrawer(){
    const mask = document.getElementById("rosterDrawerMask");
    if (mask) mask.classList.remove("open");
  }

  function render(root) {
    applyFilters();
    const stats = computeStats(state.filtered);

    root.innerHTML = "";

    const hdr = el("div", { class: "hdr" }, [
      el("div", { class: "title" }, [
        el("div", { class: "kicker" }, ["Los Santos Police Department"]),
        el("div", { class: "h1" }, ["Department Roster"]),
      ]),
      el("div", { class: "controls" }, [
        el("input", {
          class: "in",
          placeholder: "Search name, badge, callsign, unit…",
          value: state.q,
          oninput: (e) => { state.q = e.target.value; render(root); }
        }),
        selectCtl(root, "rank", "Rank", getUnique("Rank")),
        selectCtl(root, "unit", "Unit", getUnique("Unit")),
        selectCtl(root, "status", "Status", getUnique("Status")),
        selectCtl(root, "sort", "Sort", ["Rank","Badge","Name"]),
        el("button", { class:"btn", onclick: () => load(root) }, ["Refresh"])
      ])
    ]);

    const statsRow = el("div", { class:"stats" }, [
      statBox("Total Sworn", stats.total),
      statBox("Active", stats.active),
      statBox("LOA", stats.loa),
      statBox("Inactive", stats.inactive),
    ]);

    const grid = el("div", { class:"grid" }, state.filtered.map(m => card(m)));
    const body = el("div", { class:"body" }, [grid]);

    const foot = el("div", { class:"foot" }, [
      state.updatedAt ? `Data Updated: ${new Date(state.updatedAt).toLocaleString()}` : ""
    ]);

    root.appendChild(hdr);
    root.appendChild(statsRow);
    root.appendChild(body);
    root.appendChild(foot);

    // Drawer once
    if (!document.getElementById("rosterDrawerMask")) {
      document.body.appendChild(drawerShell());
    }
  }

  async function load(root){
    root.querySelectorAll(".btn").forEach(b => b.disabled = true);

    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    state.updatedAt = json.updatedAt || null;

    state.members = (json.members || [])
  .map(m => ({
    MemberId: norm(m.MemberId),
    BadgeNumber: norm(m.BadgeNumber),
    Callsign: norm(m.Callsign),
    FirstName: norm(m.FirstName),
    LastName: norm(m.LastName),
    DisplayName: norm(m.DisplayName),
    Rank: norm(m.Rank),
    Unit: norm(m.Unit),
    Status: norm(m.Status),
    DiscordHandle: norm(m.DiscordHandle),
    PhotoUrl: norm(m.PhotoUrl),
    JoinedDate: norm(m.JoinedDate),
    Certifications: norm(m.Certifications),
    Bio: norm(m.Bio),
    Notes: norm(m.Notes),
  }))
  // ✅ Remove “empty lines” (no DisplayName AND no First/Last)
  .filter(m => {
    const name = displayName(m);
    return name && name.length >= 2; // keeps real names, drops blank rows
  });

    render(root);
    root.querySelectorAll(".btn").forEach(b => b.disabled = false);
  }

  function boot(){
    injectStyles();

    const mount = document.getElementById("lspd-roster-root");
    if (!mount) throw new Error("Missing #lspd-roster-root mount element");

    const app = el("div", { id:"lspdRoster" }, []);
    mount.appendChild(app);

    load(app).catch(err => {
      console.error(err);
      app.innerHTML = `
        <div style="padding:16px;color:#eaf2ff;">
          Failed to load roster. Verify DATA_URL and Apps Script deployment access.
        </div>
      `;
    });
  }

  boot();
})();
