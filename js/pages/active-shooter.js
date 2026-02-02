(() => {
  // =========================================================
  // SOP CONTENT: Active Shooter Response
  // =========================================================
  const SOP = {
    title: "Active Shooter Response",
    subtitle: "Immediate action • contact teams • rescue task force • command & control",
    intro:
      "Active shooter incidents are rapidly evolving events requiring decisive action and disciplined coordination. The priority is to immediately stop the threat, then rapidly transition to casualty care, scene control, and investigation under unified command.",

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
        hint: "Operational priorities",
        bullets: [
          "Establish a consistent response model for active shooter events.",
          "Prioritize threat interdiction, casualty reduction, and controlled scene stabilization.",
          "Standardize communications, command establishment, and after-action documentation.",
        ],
      },
      {
        id: "definition",
        title: "Definition & Immediate Priorities",
        hint: "Stop the killing / stop the dying",
        bullets: [
          "Active shooter: an individual actively engaged in killing or attempting to kill people in a populated area.",
          "Primary objective: stop the threat as quickly as possible.",
          "Secondary objective: rapid casualty care and evacuation coordination.",
          "Tertiary objective: establish command, secure scene, and preserve evidence.",
        ],
        callout:
          "Officers should move toward the threat when safe and feasible—waiting for perfect conditions can cost lives.",
      },
      {
        id: "dispatch",
        title: "Dispatch / Radio Protocol",
        hint: "Minimum callouts",
        bullets: [
          "Announce: active shooter reported, location (10-20), and entry point if known.",
          "Provide: suspect description, weapons, direction of movement, and number of suspects if known.",
          "Request: additional units, supervisor, EMS, and any specialized teams available.",
          "Broadcast hazards: explosives rumors, barricades, secondary threats.",
          "Assign a primary talker when possible; keep updates short and structured.",
        ],
      },
      {
        id: "arrival",
        title: "Initial Arrival & Approach",
        hint: "First responding officers",
        bullets: [
          "Identify safest approach route and entry point; avoid funneling into unknown kill zones.",
          "Use cover and movement discipline; do not crowd doorways or narrow hallways.",
          "If possible, form an immediate contact team (2–4 officers) rather than waiting for large stacks.",
          "Move toward sounds of gunfire or credible threat indicators while maintaining situational awareness.",
        ],
        callout:
          "If you arrive solo, you may still need to move—coordinate with the next arriving unit for a two-officer contact team when feasible.",
      },
      {
        id: "contact",
        title: "Contact Team (Threat Interdiction)",
        hint: "Stopping the shooter",
        bullets: [
          "Primary mission: locate, close with, and stop the shooter.",
          "Bypass injured persons when necessary during active threat interdiction (triage later).",
          "Maintain one primary direction of movement; avoid splitting unless coordinated.",
          "Communicate key updates: suspect location, direction, and whether threat is neutralized.",
          "Once the shooter is stopped, immediately transition to scene control and medical coordination.",
        ],
      },
      {
        id: "command",
        title: "Command & Control (ICS / Unified Command)",
        hint: "Structure the incident",
        bullets: [
          "First supervisor establishes incident command (IC) as early as feasible.",
          "Set up a command post and staging area (units, EMS, fire).",
          "Assign operational zones: contact team operations, perimeter, evacuation, and medical.",
          "Coordinate with other agencies if present; shift to unified command where applicable.",
        ],
        callout:
          "Without command structure, resources stack up and chaos increases. Establish control early.",
      },
      {
        id: "perimeter",
        title: "Perimeter & Containment",
        hint: "Prevent escape and protect civilians",
        bullets: [
          "Establish inner and outer perimeter when possible.",
          "Control ingress/egress routes; keep civilians away from hot zones.",
          "Watch for secondary suspects or vehicles related to the incident.",
          "Use clear identifiers to avoid friendly-fire confusion (team locations and lanes).",
        ],
      },
      {
        id: "medical",
        title: "Medical Response (Rescue Task Force Concept)",
        hint: "Stop the dying",
        bullets: [
          "Once the threat is contained/neutralized, coordinate EMS entry under police protection.",
          "Designate casualty collection points (CCPs) and evacuation routes.",
          "Triage and prioritize life-threatening injuries.",
          "If medically trained, provide immediate life-saving care consistent with scene safety.",
        ],
        callout:
          "Medical entry should be coordinated—uncontrolled EMS access can create more victims.",
      },
      {
        id: "search",
        title: "Clearing & Secondary Search",
        hint: "Confirm no additional threats",
        bullets: [
          "After initial threat is stopped, conduct methodical clearing for additional suspects.",
          "Treat unexplored areas cautiously; watch for barricaded doors and booby-trap rumors.",
          "If explosives are suspected, isolate and request specialized resources if available.",
          "Maintain accountability: track teams, cleared areas, and known hazards.",
        ],
      },
      {
        id: "evidence",
        title: "Evidence Preservation & Investigation",
        hint: "Protect the case",
        bullets: [
          "Preserve key evidence: weapons, casings, CCTV locations, witness lists.",
          "Limit unnecessary movement through primary crime scenes.",
          "Assign a scene security lead if staffing allows.",
          "Document: timeline, initial actions, threat engagement, medical actions, and command decisions.",
        ],
        callout:
          "Life safety comes first. Preserve evidence once the scene is stabilized.",
      },
      {
        id: "media",
        title: "Public Information & Communications",
        hint: "Controlled messaging",
        bullets: [
          "Command should coordinate public updates through a designated spokesperson if applicable.",
          "Avoid unverified information on open radio; keep sensitive details controlled.",
          "Establish reunification points for families if the incident is large-scale.",
        ],
      },
      {
        id: "after",
        title: "After-Action Reporting & Review",
        hint: "Documentation and lessons learned",
        bullets: [
          "Complete reports detailing your actions, observations, and use of force (if any).",
          "Document: suspect description, threat engagement, injuries, evidence seized, and witness identifiers.",
          "Supervisor/command should conduct an after-action review for improvements.",
          "If required, document officer injuries, equipment usage, and policy compliance checks.",
        ],
        callout:
          "Your report should support accountability: what you knew, what you did, why you did it, and what happened next.",
      },
    ],

    footerNote:
      "Active shooter response is mission-critical. This SOP establishes baseline priorities and structure; policy and command direction may refine tactics, unit roles, and medical integration. When in doubt, prioritize stopping the threat and establishing command control.",
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
