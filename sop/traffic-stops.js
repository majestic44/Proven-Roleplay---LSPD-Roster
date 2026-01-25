(() => {
  // =========================================================
  // SOP CONTENT: Traffic Stops
  // =========================================================
  const SOP = {
    title: "Traffic Stops",
    subtitle: "Initiation • approach • investigation • enforcement • documentation",
    intro:
      "Traffic stops are one of the most common and highest-risk interactions in routine patrol. This SOP establishes a consistent and professional baseline for initiating stops, communicating with dispatch, conducting safe approaches, and documenting outcomes.",

    approval: {
      status: "Draft", // Template | Draft | WIP | Approved
      approvedBy: "", // set when approved (e.g., "Chief Smith")
      approvedDate: "", // optional (e.g., "2026-01-24")
      reviewedBy: "", // optional
      reviewedDate: "", // optional
    },

    meta: [
      { k: "Effective", v: "—" },
      { k: "Revision", v: "v1.0" },
    ],

    sections: [
      {
        id: "purpose",
        title: "Purpose",
        hint: "What this SOP establishes",
        bullets: [
          "Provide a consistent structure for traffic stop conduct and officer safety.",
          "Ensure clear radio communication and lawful/proportional enforcement actions.",
          "Standardize documentation expectations for stops, citations, arrests, and searches.",
        ],
      },
      {
        id: "initiation",
        title: "Initiation Criteria",
        hint: "When to stop a vehicle",
        bullets: [
          "Traffic violation observed (speeding, reckless driving, equipment violations, etc.).",
          "Reasonable suspicion tied to a crime (BOLO match, suspicious behavior, etc.).",
          "Vehicle registration/plate issue or confirmed warrant/flag via check (when applicable).",
          "Do not initiate stops solely to “fish” for violations; stops must be justified in RP.",
        ],
        callout:
          "If the driver behavior indicates a high-risk stop may be needed, request a supervisor or additional units before initiating contact.",
      },
      {
        id: "radio",
        title: "Radio / Dispatch Protocol",
        hint: "Required radio traffic",
        bullets: [
          "Advise dispatch of a traffic stop location (10-20) and reason for stop (brief).",
          "Provide plate information when safe/available.",
          "Provide vehicle description (make/model/color) and occupant count if relevant.",
          "Advise status changes: out on stop, additional units requested, and clear (Code 4 / 10-8).",
        ],
        callout:
          "If radio traffic is heavy or you are solo, prioritize safety. Provide essentials first, then details when safe.",
      },
      {
        id: "positioning",
        title: "Vehicle Positioning & Approach",
        hint: "Safety basics",
        bullets: [
          "Choose a safe stop location when possible (lighting, space, traffic flow).",
          "Position your patrol vehicle to create a safety buffer (offset behind the vehicle).",
          "Use appropriate lighting (based on policy/server expectations).",
          "Approach with awareness: hands, movement, passenger activity, and escape routes.",
          "Do not stand directly in the lane of travel; maintain cover and reactionary distance.",
        ],
      },
      {
        id: "contact",
        title: "Initial Contact & Identification",
        hint: "Driver interaction standards",
        bullets: [
          "Greet professionally; identify yourself and department when appropriate.",
          "Explain the reason for the stop clearly and calmly.",
          "Request driver license, registration, and proof of insurance (as applicable).",
          "Observe indicators of impairment, contraband, or threat cues during conversation.",
          "Maintain de-escalation tone and avoid unnecessary escalation.",
        ],
        callout:
          "If the driver becomes hostile or non-compliant, slow down the interaction. Request backup early rather than late.",
      },
      {
        id: "checks",
        title: "Records Checks & Investigation",
        hint: "Running information",
        bullets: [
          "Run driver’s license and vehicle plate checks when possible/appropriate.",
          "Verify warrants, vehicle status, and flags if your MDT process supports it.",
          "If suspicion escalates, articulate why in RP and consider supervisor notification.",
          "If a citation/arrest is likely, ensure all relevant facts are documented.",
        ],
      },
      {
        id: "searches",
        title: "Searches & Probable Cause",
        hint: "Consent, PC, and scope",
        bullets: [
          "Consent searches require clear consent in RP; consent can be withdrawn at any time.",
          "If probable cause exists, articulate the specific facts supporting it.",
          "Search scope should match the justification (e.g., weapons vs contraband).",
          "Do not “invent” cause; your justification must make sense in the scene.",
        ],
        callout:
          "When in doubt, request a supervisor. Poorly justified searches create escalation and disputes.",
      },
      {
        id: "citations",
        title: "Warnings, Citations, and Arrests",
        hint: "Outcomes",
        bullets: [
          "Warnings are appropriate for minor issues when driver cooperation is good.",
          "Citations should be issued when warranted and explained clearly.",
          "Arrests require lawful justification in RP (warrant, offense, PC).",
          "If arresting, advise dispatch and follow prisoner handling SOP (when available).",
          "If the scene escalates to a felony stop, shift to High-Risk Stop SOP (when published).",
        ],
      },
      {
        id: "escalation",
        title: "Escalation & Safety Events",
        hint: "Fleeing, resistance, weapons",
        bullets: [
          "If a driver flees, transition to Pursuit SOP (when published).",
          "If a weapon is displayed or threats are credible, prioritize cover and request units.",
          "Use of force must be proportional and justified per policy.",
          "Maintain clear radio traffic: location updates and requests (10-32 / Code 3 as applicable).",
        ],
      },
      {
        id: "closure",
        title: "Stop Closure",
        hint: "Ending the stop properly",
        bullets: [
          "Return documents, advise outcome, and provide clear instructions to leave safely.",
          "Return to your patrol vehicle before the stopped vehicle departs when possible.",
          "Advise dispatch you are clear and return to service (10-8) when appropriate.",
          "If evidence was seized or enforcement was taken, ensure the report is completed promptly.",
        ],
      },
      {
        id: "documentation",
        title: "Documentation & Reporting",
        hint: "Minimum reporting expectations",
        bullets: [
          "Record: reason for stop, location, time, vehicle plate, and driver identity.",
          "Document: warnings/citations/arrest basis and any searches performed.",
          "Include: articulable facts for PC and any evidence seized.",
          "Supervisor notification should be documented when required (force, pursuit, etc.).",
        ],
        callout:
          "A short, complete report is better than a long report missing key justification.",
      },
    ],

    footerNote:
      "This SOP provides baseline guidance. Specific server rules, command direction, and future SOP pages (Pursuits, High-Risk Stops, Arrest Procedures) may refine these steps. When uncertain, request supervisory guidance.",
  };

  // =========================================================
  // Template renderer (same logic as sop-template.js)
  // =========================================================
  const $ = (id) => document.getElementById(id);
  const norm = (v) => String(v ?? "").trim();

  document.querySelectorAll(".navItem[data-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.link;
      if (url) window.location.href = url;
    });
  });

  $("backBtn").addEventListener("click", () => {
    window.location.href = "../sop/index.html";
  });

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&lt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderMeta(meta){
    const box = $("metaBox");
    box.innerHTML = "";
    for (const row of meta || []) {
      const div = document.createElement("div");
      div.className = "metaRow";
      div.innerHTML = `
        <div class="metaK">${escapeHtml(row.k)}</div>
        <div class="metaV">${escapeHtml(row.v)}</div>
      `;
      box.appendChild(div);
    }
  }

  function renderIntro(){
    const intro = $("introBox");
    intro.innerHTML = `
      <div class="introKicker">Overview</div>
      <div class="introText">${escapeHtml(SOP.intro || "")}</div>
    `;
  }

  function renderQuickNav(sections){
    const nav = $("quickNav");
    nav.innerHTML = "";

    for (const s of sections || []) {
      const b = document.createElement("button");
      b.className = "navLink";
      b.type = "button";
      b.textContent = s.title;

      b.addEventListener("click", () => {
        const el = document.getElementById(s.id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });

      nav.appendChild(b);
    }
  }

  function renderAccordion(sections){
    const acc = $("accordion");
    acc.innerHTML = "";

    for (const s of sections || []) {
      const wrap = document.createElement("div");
      wrap.className = "accItem";
      wrap.id = s.id;

      const head = document.createElement("button");
      head.className = "accHead";
      head.type = "button";
      head.innerHTML = `
        <div>
          <div class="accTitle">${escapeHtml(s.title)}</div>
          <div class="accHint">${escapeHtml(s.hint || "")}</div>
        </div>
        <div class="accHint">Toggle</div>
      `;

      const body = document.createElement("div");
      body.className = "accBody";

      const ul = document.createElement("ul");
      ul.className = "list";
      for (const b of (s.bullets || [])) {
        const li = document.createElement("li");
        li.textContent = b;
        ul.appendChild(li);
      }
      body.appendChild(ul);

      if (s.callout) {
        const call = document.createElement("div");
        call.className = "callout";
        call.textContent = s.callout;
        body.appendChild(call);
      }

      head.addEventListener("click", () => {
        wrap.classList.toggle("open");
      });

      // Default open first section only
      if (acc.childElementCount === 0) wrap.classList.add("open");

      wrap.appendChild(head);
      wrap.appendChild(body);
      acc.appendChild(wrap);
    }
  }

function deriveStatus(approval){
  const a = approval || {};
  const hasApproval =
    String(a.approvedBy || "").trim() &&
    String(a.approvedDate || "").trim();

  if (hasApproval) return "Approved";

  const s = String(a.status || "").trim();
  return s || "Draft";
}

function statusClass(s){
  const v = String(s || "").toUpperCase();
  if (v === "APPROVED") return "stApproved";
  if (v === "WIP" || v === "IN PROGRESS") return "stWip";
  return "stDraft";
}

function renderApproval(boxEl, approval){
  const a = approval || {};
  const status = deriveStatus(a);

  const rows = [];
  rows.push({ k: "Status", v: status, isStatus: true });

  // Only show if provided
  if (String(a.approvedBy || "").trim()) rows.push({ k: "Approved By", v: a.approvedBy });
  if (String(a.approvedDate || "").trim()) rows.push({ k: "Approved Date", v: a.approvedDate });
  if (String(a.reviewedBy || "").trim()) rows.push({ k: "Reviewed By", v: a.reviewedBy });
  if (String(a.reviewedDate || "").trim()) rows.push({ k: "Reviewed Date", v: a.reviewedDate });

  boxEl.innerHTML = "";
  for (const r of rows) {
    const div = document.createElement("div");
    div.className = "metaRow";

    if (r.isStatus) {
      div.innerHTML = `
        <div class="metaK">${escapeHtml(r.k)}</div>
        <div class="metaV">
          <span class="chip chipStatus ${statusClass(status)}">${escapeHtml(r.v)}</span>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="metaK">${escapeHtml(r.k)}</div>
        <div class="metaV">${escapeHtml(r.v)}</div>
      `;
    }

    boxEl.appendChild(div);
  }

  return status;
}

function appendMetaRows(boxEl, meta){
  for (const row of meta || []) {
    const div = document.createElement("div");
    div.className = "metaRow";
    div.innerHTML = `
      <div class="metaK">${escapeHtml(row.k)}</div>
      <div class="metaV">${escapeHtml(row.v)}</div>
    `;
    boxEl.appendChild(div);
  }
}

  function boot(){
    $("sopTitle").textContent = norm(SOP.title) || "SOP";
    $("sopSubtitle").textContent = norm(SOP.subtitle) || "";
    $("footerNote").textContent = norm(SOP.footerNote) || "";

    const metaBox = document.getElementById("metaBox");
    renderApproval(metaBox, SOP.approval);
    appendMetaRows(metaBox, SOP.meta);
    renderIntro();
    renderQuickNav(SOP.sections);
    renderAccordion(SOP.sections);
  }

  boot();
})();
