(() => {
  // =========================================================
  // SOP CONTENT: High-Risk / Felony Stops
  // =========================================================
  const SOP = {
    title: "High-Risk / Felony Stops",
    subtitle: "Containment • commands • approach control • custody • documentation",
    intro:
      "High-risk (felony) stops are used when a suspect is believed to be armed, dangerous, or involved in a serious offense. The priority is scene control, officer safety, and structured suspect removal using clear commands and defined roles.",

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
          "Provide a controlled baseline for high-risk/felony vehicle stops.",
          "Standardize containment, communication, and role assignment.",
          "Reduce friendly-fire risk and unsafe approaches through spacing and structure.",
        ],
      },
      {
        id: "criteria",
        title: "Criteria & Decision Point",
        hint: "When to conduct a high-risk stop",
        bullets: [
          "Credible information the suspect is armed or has used a weapon.",
          "Suspect is wanted for a violent felony or serious offense.",
          "Vehicle is linked to a violent crime (BOLO match) with articulable facts.",
          "Suspect has made threats, attempted to ram units, or demonstrated high-danger behavior.",
          "Supervisor may order a high-risk stop even if initial stop was routine (risk escalation).",
        ],
        callout:
          "If you cannot articulate why the stop is high-risk, it is likely a standard stop. Reassess before escalating.",
      },
      {
        id: "setup",
        title: "Containment & Setup",
        hint: "Before commands begin",
        bullets: [
          "Select a stop location that provides space, visibility, and cover when possible.",
          "Position units to create a containment arc (avoid stacking directly behind each other).",
          "Minimize crossfire: establish left/right coverage and avoid overlapping firing lanes.",
          "Request additional units and supervisor early; consider air support if available.",
          "Establish primary communicator (one voice) to issue commands.",
        ],
        callout:
          "If scene control is not established, do not rush commands or approach. Build containment first.",
      },
      {
        id: "radio",
        title: "Radio / Dispatch Protocol",
        hint: "Required information",
        bullets: [
          "Advise dispatch: high-risk stop being initiated (location / direction / vehicle details).",
          "Provide reason/justification (brief).",
          "Request supervisor and additional units as needed.",
          "Update dispatch as occupants are removed and secured.",
          "Announce when scene is under control and when units are Code 4 / clear.",
        ],
      },
      {
        id: "roles",
        title: "Roles & Responsibilities",
        hint: "Who does what",
        bullets: [
          "Primary Unit: leads stop and maintains visual control; may be primary communicator if assigned.",
          "Secondary Unit: supports containment, watches passenger side/angles, assists with custody once safe.",
          "Cover Units: hold perimeter and prevent escape; do not crowd the primary scene.",
          "Supervisor: assumes command, sets plan, coordinates resources, authorizes tactics.",
          "Medical/Fire: staged until scene is safe; brought in if injuries or collisions occurred.",
        ],
      },
      {
        id: "commands",
        title: "Suspect Commands (One Voice)",
        hint: "Structured removal",
        bullets: [
          "Issue clear, slow commands. Do not stack multiple instructions at once.",
          "Common sequence: engine off → keys out window → hands visible → driver exits → walk backward → kneel → hands behind head → approach/cuff.",
          "Remove one person at a time. Maintain control of remaining occupants.",
          "If occupants refuse or delay, do not rush. Maintain containment and request supervisor guidance.",
        ],
        callout:
          "Command voice should be calm and authoritative. Yelling can escalate panic and confusion.",
      },
      {
        id: "approach",
        title: "Approach & Custody",
        hint: "When to go hands-on",
        bullets: [
          "Approach only when the suspect is in a controlled posture (kneeling/prone) and hands are visible.",
          "Use a two-officer approach if available: one covers, one cuffs.",
          "Search incident to arrest/custody as required (weapons first).",
          "Move the secured suspect to a safe holding location away from the vehicle and crossfire lanes.",
        ],
      },
      {
        id: "occupants",
        title: "Multiple Occupants",
        hint: "Prevent confusion",
        bullets: [
          "Remove and secure occupants one at a time.",
          "Maintain communication: cover units call out movement or non-compliance.",
          "Do not approach the vehicle for remaining occupants until safe and directed by supervisor/plan.",
          "If occupants are unknown/high threat, keep distance and maintain cover.",
        ],
      },
      {
        id: "vehicle",
        title: "Vehicle Clearing / Search",
        hint: "After occupants are secured",
        bullets: [
          "Do not rush to clear the vehicle until all occupants are secured and scene is stable.",
          "Search method should align with policy and justification (consent/PC/warrant as applicable).",
          "If a weapon is suspected inside the vehicle, treat it as a high-risk clearing and coordinate with supervisor.",
          "Document items found and maintain evidence handling expectations.",
        ],
        callout:
          "Vehicle clearing is often where complacency sets in. Maintain cover and discipline.",
      },
      {
        id: "useofforce",
        title: "Use of Force Considerations",
        hint: "Proportional response",
        bullets: [
          "Use of force must be proportional and justified per policy and threat level.",
          "Avoid unnecessary escalation once compliance is achieved.",
          "If shots are fired, immediately communicate: officer down, suspect down, location, medical request.",
          "Supervisor notification is mandatory for force events (and document it).",
        ],
      },
      {
        id: "termination",
        title: "De-escalation / Return to Standard Stop",
        hint: "If threat reduces",
        bullets: [
          "If new information reduces threat level (e.g., mistaken identity), transition back to a standard stop posture.",
          "Supervisor should confirm de-escalation when possible.",
          "Communicate clearly to all units to prevent unnecessary tactics or crossfire positioning.",
        ],
      },
      {
        id: "documentation",
        title: "Documentation & Reporting",
        hint: "Minimum reporting expectations",
        bullets: [
          "Document the justification for a high-risk stop (facts and threat indicators).",
          "Record unit roles (primary, secondary, supervisor) and command direction where applicable.",
          "Document occupant removal steps, compliance/non-compliance, and any searches performed.",
          "Include: arrests, evidence seized, use of force, injuries, property damage, and medical response.",
        ],
        callout:
          "High-risk stop reports should be clear enough to justify the escalation decision and tactics used.",
      },
    ],

    footerNote:
      "This SOP establishes a controlled high-risk stop baseline. Policy and command staff may restrict specific tactics (approach types, vehicle clearing, force options). When uncertain, hold containment and request supervisory direction.",
  };

  // =========================================================
  // Template renderer (same structure as sop-template.js)
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
