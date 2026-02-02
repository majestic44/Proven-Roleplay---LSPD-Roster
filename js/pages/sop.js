(() => {
  // =========================================================
  // DATA: SOP Index (add new items here)
  // status: "Active" | "Draft" | "Planned"
  // link: optional URL to a future SOP detail page
  // =========================================================
  const SOPS = [
    {
    title: "Traffic Stops",
    status: "Draft",
    tags: ["Traffic", "Stops", "Patrol"],
    description: "Initiation, radio protocol, approach, investigation, enforcement outcomes, and documentation expectations.",
    link: "/pages/sop/traffic-stops.html",
  },
  {
    title: "Vehicle Pursuits",
    status: "Draft",
    tags: ["Pursuit", "Traffic", "Supervisor"],
    description: "Initiation criteria, radio protocol, supervisory control, tactics, termination guidance, and reporting expectations.",
    link: "/pages/sop/vehicle-pursuits.html",
  },
  {
    title: "Arrest Procedures",
    status: "Draft",
    tags: ["Arrest", "Custody", "Reporting"],
    description: "Authority, safe custody control, searches, transport, booking flow, and reporting expectations.",
    link: "/pages/sop/arrest-procedures.html",
  },
  {
    title: "High-Risk / Felony Stops",
    status: "Draft",
    tags: ["Tactics", "Supervisor", "Critical Incident"],
    description: "Containment setup, one-voice commands, structured suspect removal, custody, vehicle clearing, and reporting expectations.",
    link: "/pages/sop/high-risk-stops.html",
  },
  {
    title: "Use of Force",
    status: "Draft",
    tags: ["Force", "Reporting", "Supervisor"],
    description: "De-escalation baseline, proportional force decision-making, medical obligations, supervisor notification, and reporting requirements.",
    link: "/pages/sop/use-of-force.html",
  },
  {
    title: "Active Shooter Response",
    status: "Draft",
    tags: ["Critical Incident", "Contact Team", "Command"],
    description: "Immediate action response model, contact team interdiction, command establishment, perimeter, medical integration, and after-action reporting.",
    link: "/pages/sop/active-shooter.html",
  },

  // =====================================================
  // Next 6 SOPs (planned)
  // =====================================================
  {
    title: "Evidence Handling & Chain of Custody",
    status: "Planned",
    tags: ["Evidence", "Chain of Custody", "Reporting"],
    description: "Evidence identification, collection, packaging/labeling, digital evidence handling, custody transfers, and documentation standards.",
    link: "",
  },
  {
    title: "Crime Scene Management",
    status: "Planned",
    tags: ["Crime Scene", "Perimeter", "Investigations"],
    description: "Scene safety, medical priority, perimeter control, access logs, witness management, evidence preservation, and scene release procedures.",
    link: "",
  },
  {
    title: "Foot Pursuits",
    status: "Planned",
    tags: ["Foot Pursuit", "Containment", "Safety"],
    description: "Decision to pursue, radio callouts, containment coordination, termination criteria, post-pursuit medical checks, and reporting expectations.",
    link: "",
  },
  {
    title: "Warrant Service",
    status: "Planned",
    tags: ["Warrants", "Planning", "Supervisor"],
    description: "Warrant verification, operational planning, service procedures, search scope limits, high-risk considerations, and documentation requirements.",
    link: "",
  },
  {
    title: "Missing Persons Investigations",
    status: "Planned",
    tags: ["Missing Persons", "Investigations", "BOLO"],
    description: "Risk assessment, immediate actions, information gathering, search coordination, BOLO notifications, case escalation, and closure documentation.",
    link: "",
  },
  {
    title: "Officer-Involved Incidents",
    status: "Planned",
    tags: ["OII", "Critical Incident", "Command"],
    description: "Immediate actions, scene control, medical, notifications, officer separation, evidence preservation, review process, and after-action requirements.",
    link: "",
  },
];

  // =========================================================
  // STATE
  // =========================================================
  let q = "";
  let statusFilter = "All"; // All | Active | Draft | Planned
  let tagFilter = "All";

  // =========================================================
  // DOM
  // =========================================================
  const $ = (id) => document.getElementById(id);
  const sopGrid = $("sopGrid");
  const emptyState = $("emptyState");
  const countPill = $("countPill");
  const updatedText = $("updatedText");

  const norm = (v) => String(v ?? "").trim();
  const escapeHtml = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  // =========================================================
  // Sidebar navigation using data-link (keeps buttons)
  // =========================================================
  document.querySelectorAll(".navItem[data-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.link;
      if (url) window.location.href = url;
    });
  });

  // =========================================================
  // Helpers
  // =========================================================
  function statusClass(s){
    const v = String(s || "").toLowerCase();
    if (v === "active") return "active";
    if (v === "draft") return "draft";
    return "planned";
  }

  function getAllTags(){
    const set = new Set();
    for (const s of SOPS) for (const t of (s.tags || [])) set.add(t);
    return ["All", ...Array.from(set).sort((a,b)=>a.localeCompare(b))];
  }

  function getAllStatuses(){
    return ["All", "Active", "Draft", "Planned"];
  }

  function matches(item){
    const query = q.trim().toLowerCase();
    if (query) {
      const hay = [
        item.title,
        item.status,
        item.description,
        ...(item.tags || [])
      ].join(" ").toLowerCase();
      if (!hay.includes(query)) return false;
    }

    if (statusFilter !== "All" && String(item.status) !== statusFilter) return false;
    if (tagFilter !== "All" && !(item.tags || []).includes(tagFilter)) return false;

    return true;
  }

  function chipRow(containerId, values, activeVal, onPick){
    const wrap = $(containerId);
    wrap.innerHTML = "";

    for (const v of values) {
      const b = document.createElement("div");
      b.className = "chip" + (v === activeVal ? " active" : "");
      b.textContent = v;
      b.addEventListener("click", () => onPick(v));
      wrap.appendChild(b);
    }
  }

  function card(item){
    const wrap = document.createElement("div");
    wrap.className = "sopCard";

    const top = document.createElement("div");
    top.className = "sopTop";
    top.innerHTML = `
      <div class="sopTitle">${escapeHtml(item.title)}</div>
      <div class="badges">
        <div class="badge ${statusClass(item.status)}">${escapeHtml(item.status)}</div>
      </div>
    `;

    const body = document.createElement("div");
    body.className = "sopBody";
    body.innerHTML = `
      <div class="sopDesc">${escapeHtml(item.description)}</div>
      <div class="tagRow">
        ${(item.tags || []).map(t => `<span class="tagPill">${escapeHtml(t)}</span>`).join("")}
      </div>
    `;

    const foot = document.createElement("div");
    foot.className = "sopFoot";

    const left = document.createElement("div");
    left.className = "muted";
    left.textContent = item.link ? "Detail page available" : "Detail page coming soon";

    const btn = document.createElement("button");
    btn.className = "openBtn";
    btn.textContent = item.link ? "Open" : "Planned";
    btn.disabled = !item.link;

    btn.addEventListener("click", () => {
      if (item.link) window.location.href = item.link;
    });

    foot.appendChild(left);
    foot.appendChild(btn);

    wrap.appendChild(top);
    wrap.appendChild(body);
    wrap.appendChild(foot);

    return wrap;
  }

  function render(){
    sopGrid.innerHTML = "";
    const filtered = SOPS.filter(matches);

    for (const item of filtered) sopGrid.appendChild(card(item));

    emptyState.style.display = filtered.length ? "none" : "block";
    countPill.textContent = `${filtered.length} ${filtered.length === 1 ? "SOP" : "SOPs"}`;
    updatedText.textContent = `Last updated: ${new Date().toLocaleString()}`;
  }

  // =========================================================
  // Events
  // =========================================================
  $("search").addEventListener("input", (e) => {
    q = e.target.value;
    render();
  });

  // Build chips
  chipRow("statusChips", getAllStatuses(), statusFilter, (v) => {
    statusFilter = v;
    render();
    chipRow("statusChips", getAllStatuses(), statusFilter, arguments.callee);
  });

  chipRow("tagChips", getAllTags(), tagFilter, (v) => {
    tagFilter = v;
    render();
    chipRow("tagChips", getAllTags(), tagFilter, arguments.callee);
  });

  // Boot
  render();
})();
