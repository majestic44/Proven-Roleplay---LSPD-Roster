(() => {
  // =========================================================
  // SOP CONTENT: Use of Force
  // =========================================================
  const SOP = {
    title: "Use of Force",
    subtitle: "De-escalation • proportionality • medical • supervisor notification • reporting",
    intro:
      "Use of force must be objectively reasonable, proportional to the threat, and discontinued once control is achieved. This SOP establishes a consistent baseline for de-escalation, force decision-making, medical obligations, supervisory notification, and documentation after force events.",

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
          "Provide a consistent baseline for force decision-making and de-escalation.",
          "Ensure medical care and supervisory notification after force events.",
          "Standardize minimum documentation expectations for review and accountability.",
        ],
      },
      {
        id: "principles",
        title: "Core Principles",
        hint: "Non-negotiables",
        bullets: [
          "De-escalate when feasible: time, distance, cover, and communication reduce force.",
          "Use the minimum force necessary to safely control the situation.",
          "Force must be objectively reasonable based on the totality of circumstances.",
          "Stop using force once compliance/control is achieved.",
          "Consider bystanders, environment, and secondary risks (traffic, crowds, crossfire).",
        ],
        callout:
          "If you cannot explain why you used force in one clear sentence, pause and reassess before escalating.",
      },
      {
        id: "levels",
        title: "Force Options (Baseline Ladder)",
        hint: "Typical escalation path",
        bullets: [
          "Presence / Verbal: commands, tone, positioning, and clear expectations.",
          "Soft Control: guiding, control holds, handcuffing with compliant subjects.",
          "Hard Control: strikes or takedowns when actively resisting or assaulting.",
          "Less-Lethal: taser/OC/impact tools when justified and safe (as applicable).",
          "Lethal Force: only when facing an imminent threat of death or serious bodily harm.",
        ],
        callout:
          "This is not a checklist. You may move up or down based on threat, but you must justify it.",
      },
      {
        id: "triggers",
        title: "Escalation Triggers",
        hint: "When escalation may be justified",
        bullets: [
          "Active resistance: pulling away, fighting, attempting to disarm, assault.",
          "Weapon display or credible threat cues (reaching, brandishing, firing).",
          "High-risk environment: crowded areas, moving vehicles, poor lighting/visibility.",
          "Multiple suspects with limited officer resources (request backup early).",
        ],
      },
      {
        id: "deescalation",
        title: "De-escalation Tools",
        hint: "How to reduce force",
        bullets: [
          "Create time/distance: reposition to cover; do not rush into bad angles.",
          "Use calm, clear commands; avoid insults or unnecessary escalation language.",
          "Use a single communicator when multiple officers are present.",
          "Call for supervisor / specialized units when risk is elevated.",
          "If safe, pause and re-issue commands instead of instantly escalating.",
        ],
        callout:
          "If the subject is contained and not actively harming anyone, slowing down is often the best move.",
      },
      {
        id: "lesslethal",
        title: "Less-Lethal Considerations",
        hint: "Taser/OC/impact tools baseline",
        bullets: [
          "Less-lethal must be justified by active resistance or threat level (not punishment).",
          "Assess environment: flammables, traffic, fall risks, and bystanders.",
          "Coordinate before deployment when possible (announce 'taser' / 'less-lethal' in RP).",
          "Once the subject is controlled, stop applications and transition to custody procedures.",
        ],
        callout:
          "Avoid multiple officers deploying less-lethal simultaneously without coordination—crossfire and confusion increase.",
      },
      {
        id: "lethal",
        title: "Lethal Force Baseline",
        hint: "Highest threshold",
        bullets: [
          "Only when an imminent threat of death or serious bodily harm exists.",
          "Confirm backdrop where possible; minimize risk to bystanders.",
          "Communicate status immediately: shots fired, officer down, suspect down, location.",
          "Request medical response as soon as the scene can be safely managed.",
        ],
        callout:
          "Lethal force is a last resort. When viable, de-escalation and containment are preferred.",
      },
      {
        id: "medical",
        title: "Medical Aid & Scene Care",
        hint: "Post-force responsibilities",
        bullets: [
          "Once the scene is safe, check for injuries and request EMS if needed.",
          "Provide reasonable aid consistent with safety and training expectations.",
          "Document injuries and medical requests/arrival times in your report.",
          "If a suspect claims injury, treat it seriously and document the complaint.",
        ],
      },
      {
        id: "supervisor",
        title: "Supervisor Notification",
        hint: "When to notify and what to provide",
        bullets: [
          "Notify a supervisor for significant force, injuries, weapon deployment, or critical incidents.",
          "Provide: location, involved units, subject status, and immediate scene needs.",
          "Supervisor should coordinate scene stabilization and preliminary review when required.",
          "If the incident is high-profile (shots fired, serious injury), command staff may need notification.",
        ],
      },
      {
        id: "documentation",
        title: "Documentation & Reporting",
        hint: "Minimum force reporting expectations",
        bullets: [
          "Clearly explain: threat indicators, resistance level, and why force was necessary.",
          "Describe: what force was used, how many times, duration, and when it stopped.",
          "Document: injuries, medical aid, EMS response, and witness statements if applicable.",
          "Identify: involved officers, supervisor notification, and any evidence (bodycam/RP equivalent).",
        ],
        callout:
          "Reports should read like a timeline: what happened, what you saw, what you did, why you did it, and how it ended.",
      },
      {
        id: "review",
        title: "Review & Follow-Up",
        hint: "After the scene",
        bullets: [
          "If required, complete use-of-force review with supervisor/command.",
          "Preserve evidence and document property damage or complaints.",
          "If policy violations are alleged, notify command and document objectively.",
        ],
      },
    ],

    footerNote:
      "This SOP provides baseline use-of-force guidance. Department policy and server rules may impose specific restrictions (tool availability, escalation rules, reporting formats). When uncertain, prioritize de-escalation, request supervision, and document thoroughly.",
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
