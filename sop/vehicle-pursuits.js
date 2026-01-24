(() => {
  // =========================================================
  // SOP CONTENT: Vehicle Pursuits
  // =========================================================
  const SOP = {
    title: "Vehicle Pursuits",
    subtitle: "Initiation • radio control • roles • tactics • termination • after-action",
    intro:
      "Vehicle pursuits carry high risk to the public, officers, and suspects. This SOP establishes a controlled pursuit baseline: clear radio traffic, defined roles, proportional tactics, and timely termination when risk outweighs benefit.",

    meta: [
      { k: "Status", v: "Draft" },
      { k: "Effective", v: "—" },
      { k: "Revision", v: "v1.0" },
      { k: "Approved By", v: "—" },
    ],

    sections: [
      {
        id: "purpose",
        title: "Purpose",
        hint: "What this SOP establishes",
        bullets: [
          "Maintain public safety through disciplined pursuit conduct.",
          "Standardize communication and command/control expectations.",
          "Define roles and tactical boundaries to prevent chaos and over-escalation.",
        ],
      },
      {
        id: "initiation",
        title: "Initiation Criteria",
        hint: "When to pursue",
        bullets: [
          "A pursuit begins when a driver willfully fails to yield after lawful activation of emergency equipment.",
          "Initiate only when there is a legitimate enforcement or investigative reason (traffic stop, felony, BOLO match).",
          "Consider environment: traffic density, weather/visibility, and area (city vs highway).",
          "If the risk to the public is immediately extreme, consider not initiating or terminating early.",
        ],
        callout:
          "A driver simply speeding is not always enough to justify a prolonged high-risk pursuit. Use judgment and articulate reasoning.",
      },
      {
        id: "radio",
        title: "Radio / Dispatch Protocol",
        hint: "Minimum required callouts",
        bullets: [
          "Announce pursuit immediately: location (10-20), direction of travel, speed, and reason for pursuit.",
          "Provide suspect vehicle description (make/model/color) and plate if known.",
          "Advise occupant count and any weapons/threat information if known.",
          "Continue updates: major turns, cross streets, speed changes, and hazards.",
          "Request supervisor as early as possible if none is already monitoring.",
        ],
        callout:
          "Keep transmissions short and structured. One unit should lead radio traffic whenever possible.",
      },
      {
        id: "roles",
        title: "Roles & Unit Management",
        hint: "Prevent over-stacking and confusion",
        bullets: [
          "Primary Unit: follows closest and maintains consistent visual contact.",
          "Secondary Unit: provides spacing, calls hazards, assists with containment/box-in when approved.",
          "Supervisor: assumes command, sets limits (unit count, tactics), and can terminate the pursuit.",
          "Additional units should be limited unless the supervisor authorizes more.",
          "Air support (if available) can reduce ground unit pressure and allow safer spacing.",
        ],
        callout:
          "More cars does not mean more control. Controlled spacing and clear roles do.",
      },
      {
        id: "tactics",
        title: "Pursuit Tactics (Baseline)",
        hint: "Proportional tactics and spacing",
        bullets: [
          "Maintain safe spacing—do not ram without justification or approval where required.",
          "Avoid reckless leapfrogging; one primary and one secondary is typically sufficient.",
          "Containment is preferred over constant pressure when possible.",
          "Use road positioning to maintain sight while minimizing risk to civilians.",
          "Coordinate with units ahead for spike strips, roadblocks, or intercepts if your server supports them.",
        ],
        callout:
          "If a tactic increases collision risk significantly, it should require clear justification or supervisor approval.",
      },
      {
        id: "escalation",
        title: "Escalation Triggers",
        hint: "When the pursuit becomes higher risk",
        bullets: [
          "Suspect brandishes or fires a weapon.",
          "Suspect attempts to strike pedestrians or vehicles intentionally.",
          "Suspect enters crowded areas at high speed.",
          "Suspect vehicle type/condition increases danger (heavy vehicle, unstable driving, blowouts).",
          "If escalation occurs, supervisor should reassess tactics and termination thresholds immediately.",
        ],
      },
      {
        id: "termination",
        title: "Termination Criteria",
        hint: "When to discontinue",
        bullets: [
          "Public safety risk outweighs the need for immediate apprehension.",
          "Visual contact is lost and the area becomes too dangerous to continue aggressively.",
          "Suspect behavior becomes unpredictable beyond manageable control.",
          "Supervisor orders termination.",
          "If air support maintains visual, ground units may reduce intensity or disengage.",
        ],
        callout:
          "Terminating is not a failure. It is often the most professional decision to protect civilians and officers.",
      },
      {
        id: "endgame",
        title: "Endgame & Custody",
        hint: "When the pursuit stops",
        bullets: [
          "If the vehicle stops, transition to a controlled stop. Consider a high-risk/felony stop posture if justified.",
          "Maintain cover, communicate commands clearly, and avoid rushing into a crossfire situation.",
          "If suspects flee on foot, transition to foot pursuit/containment (coordinate perimeter).",
          "Request EMS if collisions occurred or injuries are suspected.",
        ],
      },
      {
        id: "after",
        title: "After-Action & Reporting",
        hint: "Documentation expectations",
        bullets: [
          "Document reason for pursuit, initiation point, route summary, and termination/end point.",
          "Document tactics used (spikes, PIT, box-in, roadblock, ramming) and justification/approval if applicable.",
          "Record property damage, injuries, use of force, and supervisor involvement.",
          "If required by policy, complete a pursuit review with supervisor/command.",
        ],
        callout:
          "Your report should tell a clear story: why it started, what happened, why tactics were used, and how it ended.",
      },
    ],

    footerNote:
      "This SOP defines baseline pursuit conduct. Policy and staff direction may impose additional limitations (unit count, PIT authorization, spikes, etc.). When uncertain, request supervisory guidance early.",
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

  function boot(){
    $("sopTitle").textContent = norm(SOP.title) || "SOP";
    $("sopSubtitle").textContent = norm(SOP.subtitle) || "";
    $("footerNote").textContent = norm(SOP.footerNote) || "";

    renderMeta(SOP.meta);
    renderIntro();
    renderQuickNav(SOP.sections);
    renderAccordion(SOP.sections);
  }

  boot();
})();
