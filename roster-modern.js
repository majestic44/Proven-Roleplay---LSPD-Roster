(() => {
  // ================================
  // CONFIG
  // ================================
  const DATA_URL = "https://script.google.com/macros/s/AKfycbx-RgIY2AszBYGZdbQJw7jsweqcr5_XQfqRzXJ2DL79ikJZ_c_itOkHJQU31coWIpFl/exec";

  // true  = full-page demo background + centered panel + DEMO badge
  // false = transparent/embed-friendly (MDT safe)
  const DEMO_MODE = true;

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
        --mdt-bg: #081d37;
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

      html,body{
        height:100%;
        margin:0;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;
        color: var(--mdt-text);
        background: ${DEMO_MODE ? "#081d37" : "transparent"};
      }

      /* =========================
         DEMO BACKGROUND WRAPPER
      ========================= */
      #lspd-roster-root{
        ${DEMO_MODE ? `
        min-height: 100vh;
        width: 100%;
        display:flex;
        align-items:center;
        justify-content:center;
        padding: 28px;
        box-sizing: border-box;
        background:
          radial-gradient(1200px 700px at 15% 10%, rgba(103,179,255,.20), transparent 55%),
          radial-gradient(900px 600px at 85% 25%, rgba(255,170,60,.10), transparent 55%),
          linear-gradient(180deg, #081d37, #050a14);
        ` : `
        height:100%;
        width:100%;
        padding:0;
        `}
      }

      #lspdRoster{
        ${DEMO_MODE ? `
        width: min(1320px, 100%);
        height: min(900px, 92vh);
        ` : `
        width:100%;
        height:100%;
        `}
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

      /* =========================
         CENTER PROFILE MODAL
      ========================= */
      .modalMask{
        position:fixed;
        inset:0;
        background: rgba(0,0,0,0.65);
        display:none;
        z-index: 9999;
      }
      .modalMask.open{
        display:flex;
        align-items:center;
        justify-content:center;
      }

      .modal{
        width: min(760px, 92vw);
        max-height: 90vh;
        background: linear-gradient(180deg, rgba(12,20,40,0.98), rgba(7,12,24,0.98));
        border: 1px solid rgba(103,179,255,0.28);
        border-radius: var(--r22);
        box-shadow: var(--shadow);
        display:flex;
        flex-direction:column;
        overflow:hidden;
      }

      .modalTop{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding: 16px;
        border-bottom: 1px solid var(--mdt-line);
        gap: 10px;
      }

      .modalTitle{
        font-weight:900;
        letter-spacing:.04em;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
      }

      .modalClose{
        cursor:pointer;
        border:1px solid var(--mdt-line);
        background: rgba(255,255,255,0.04);
        color: var(--mdt-text);
        border-radius: 12px;
        padding: 10px 12px;
        font-weight:900;
      }

      .modalBody{
        padding: 16px;
        overflow:auto;
        display:grid;
        grid-template-columns: 280px 1fr;
        gap:16px;
      }

      .modalAvatar{
        width:100%;
        aspect-ratio: 4 / 3;
        border-radius: var(--r16);
        border:1px solid var(--mdt-line);
        overflow:hidden;
        background: rgba(255,255,255,0.03);
      }
      .modalAvatar img{
        width:100%;
        height:100%;
        object-fit:cover;
        display:block;
      }

      .modalStack{
        display:flex;
        flex-direction:column;
        gap:12px;
      }

      .modalKV,
      .modalPara{
        border:1px solid var(--mdt-line);
        border-radius: var(--r16);
        background: rgba(255,255,255,0.02);
        padding: 12px;
      }

      .modalKV .k,
      .modalPara .h{
        color: var(--mdt-muted);
        font-size:12px;
        letter-spacing:.10em;
        text-transform:uppercase;
        font-weight:800;
      }

      .modalKV .v{
        margin-top:6px;
        font-weight:900;
      }

      .modalPara .p{
        margin-top:8px;
        line-height:1.45;
        font-size:13px;
      }

      .foot{
        padding: 0 10px 10px;
        color: var(--mdt-muted);
        font-size:12px;
      }

      /* =========================
         DEMO BADGE
      ========================= */
      .demoBadge{
        position: fixed;
        right: 14px;
        bottom: 14px;
        z-index: 10000;
        padding: 10px 12px;
        border-radius: 14px;
        border: 1px solid rgba(103,179,255,0.30);
        background: linear-gradient(180deg, rgba(103,179,255,0.18), rgba(0,0,0,0.30));
        box-shadow: 0 14px 40px rgba(0,0,0,0.35);
        color: var(--mdt-text);
        font-weight: 900;
        letter-spacing: .12em;
        font-size: 12px;
        text-transform: uppercase;
        user-select: none;
        pointer-events: none;
      }
      .demoBadge small{
        display:block;
        margin-top: 4px;
        font-weight: 800;
        letter-spacing: .08em;
        color: rgba(234,242,255,0.72);
        text-transform: none;
      }

      @media (max-width: 1100px){
        .card{ grid-column: span 6; }
        .stats{ grid-template-columns: repeat(2, minmax(160px, 1fr)); }
      }
      @media (max-width: 700px){
        .modalBody{ grid-template-columns: 1fr; }
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
      onclick: () => openModal(m),
      onkeydown: (e) => { if (e.key === "Enter" || e.key === " ") openModal(m); }
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

  function modalKV(k, v){
    return el("div", { class:"modalKV" }, [
      el("div", { class:"k" }, [k]),
      el("div", { class:"v" }, [v || "—"])
    ]);
  }

  function modalPara(h, p){
    return el("div", { class:"modalPara" }, [
      el("div", { class:"h" }, [h]),
      el("div", { class:"p" }, [p || "—"])
    ]);
  }

  function modalShell(){
    const mask = el("div", {
      id:"rosterModalMask",
      class:"modalMask",
      onclick:(e) => {
        if (e.target.id === "rosterModalMask") closeModal();
      }
    }, [
      el("div", { class:"modal" }, [
        el("div", { class:"modalTop" }, [
          el("div", { id:"modalTitle", class:"modalTitle" }, ["Profile"]),
          el("button", { class:"modalClose", onclick: closeModal }, ["Close"])
        ]),
        el("div", { id:"modalBody", class:"modalBody" }, [])
      ])
    ]);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeModal();
    });

    return mask;
  }

  function openModal(m){
    const mask = document.getElementById("rosterModalMask");
    const title = document.getElementById("modalTitle");
    const body = document.getElementById("modalBody");

    title.textContent = `${displayName(m) || "Member"} • ${norm(m.Rank) || "—"}`;

    body.innerHTML = "";

    body.appendChild(
      el("div", { class:"modalAvatar" }, [
        el("img", { src: safeImg(m.PhotoUrl), alt:"Profile photo" })
      ])
    );

    const right = el("div", { class:"modalStack" }, [
      modalKV("Badge / Callsign",
        [norm(m.BadgeNumber) ? `Badge ${norm(m.BadgeNumber)}` : "",
         norm(m.Callsign) ? `Callsign ${norm(m.Callsign)}` : ""]
        .filter(Boolean).join(" • ") || "—"
      ),
      modalKV("Rank / Unit", `${norm(m.Rank) || "—"} • ${norm(m.Unit) || "—"}`),
      modalKV("Status", norm(m.Status)),
      modalKV("Joined", norm(m.JoinedDate)),
      modalKV("Discord", norm(m.DiscordHandle)),
      modalPara("Bio", norm(m.Bio)),
      modalPara("Certifications", norm(m.Certifications)),
      modalPara("Notes", norm(m.Notes))
    ]);

    body.appendChild(right);

    mask.classList.add("open");
  }

  function closeModal(){
    const mask = document.getElementById("rosterModalMask");
    if (mask) mask.classList.remove("open");
  }

  function ensureDemoBadge(){
    if (!DEMO_MODE) return;
    if (document.getElementById("demoBadge")) return;

    const badge = el("div", { id:"demoBadge", class:"demoBadge" }, [
      "DEMO",
      el("small", {}, ["Background Enabled"])
    ]);

    document.body.appendChild(badge);
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
          oninput: (e) => {
            state.q = e.target.value;
            window.clearTimeout(window.__rosterSearchT);
            window.__rosterSearchT = window.setTimeout(() => render(root), 80);
          }
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

    // Modal once
    if (!document.getElementById("rosterModalMask")) {
      document.body.appendChild(modalShell());
    }

    // Demo badge once
    ensureDemoBadge();
  }

  async function load(root){
    root.querySelectorAll(".btn").forEach(b => b.disabled = true);

    const res = await fetch(DATA_URL, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    state.updatedAt = json.updatedAt || null;

    state.members = (json.members || [])
      .map(m => ({
        MemberId: norm(m.MemberId || m.ID),
        BadgeNumber: norm(m.BadgeNumber || m.Badge || m.BadgeNum),
        Callsign: norm(m.Callsign || m.CallSign),
        FirstName: norm(m.FirstName || m.First),
        LastName: norm(m.LastName || m.Last),
        DisplayName: norm(m.DisplayName || m.Name),
        Rank: norm(m.Rank || m.PoliceRank),
        Unit: norm(m.Unit || m.Division),
        Status: norm(m.Status),
        DiscordHandle: norm(m.DiscordHandle || m.Discord),
        PhotoUrl: norm(m.PhotoUrl || m.Photo || m.ImageUrl),
        JoinedDate: norm(m.JoinedDate || m.Joined),
        Certifications: norm(m.Certifications || m.Certs),
        Bio: norm(m.Bio),
        Notes: norm(m.Notes),
      }))
      // ✅ Hide empty lines with no usable name
      .filter(m => {
        const name = displayName(m);
        return name && name.length >= 2;
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

    // Ensure modal exists even if load fails
    if (!document.getElementById("rosterModalMask")) {
      document.body.appendChild(modalShell());
    }

    // Ensure demo badge exists even if load fails
    ensureDemoBadge();

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
