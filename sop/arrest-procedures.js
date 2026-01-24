(() => {
  // =========================================================
  // SOP CONTENT: Arrest Procedures
  // =========================================================
  const SOP = {
    title: "Arrest Procedures",
    subtitle: "Authority • control • search • transport • booking • reporting",
    intro:
      "Arrests are high-liability events that require clear legal justification, professional communication, safe control tactics, and complete documentation. This SOP standardizes the arrest flow from decision point through booking and reporting.",

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
          "Standardize safe and lawful arrests across the department.",
          "Ensure consistent searches, transport practices, and prisoner handling.",
          "Define minimum reporting and evidence handling expectations.",
        ],
      },
      {
        id: "authority",
        title: "Authority & Arrest Decision",
        hint: "When an arrest is appropriate",
        bullets: [
          "Arrests require lawful justification in RP (warrant, probable cause, or offense observed).",
          "Officers must be able to articulate the facts supporting the arrest decision.",
          "Consider alternatives when appropriate (citation, warning, summons) based on policy and seriousness.",
          "If the suspect is cooperative and scene is stable, slow down and confirm charges/authority.",
        ],
        callout:
          "If you cannot clearly explain the reason for arrest, pause and reassess before going hands-on.",
      },
      {
        id: "scene",
        title: "Scene Control & Safety",
        hint: "Before going hands-on",
        bullets: [
          "Ensure the scene is controlled: cover, spacing, and communications.",
          "Request backup early if you anticipate resistance or multiple subjects.",
          "Position suspects where you have visibility and control.",
          "Use clear commands and give reasonable time for compliance in RP.",
        ],
      },
      {
        id: "custody",
        title: "Taking a Suspect Into Custody",
        hint: "Cuffing and control baseline",
        bullets: [
          "Announce the arrest and give simple commands (hands visible, do not move, etc.).",
          "Control the suspect’s hands before applying restraints.",
          "Apply restraints securely; check fit (not overly tight) and ensure double-lock if applicable (RP).",
          "Maintain officer safety positioning; avoid standing directly behind or too close to a free hand.",
        ],
        callout:
          "Maintain professionalism. Avoid unnecessary language escalation—control is achieved through structure and presence.",
      },
      {
        id: "search",
        title: "Search Incident to Arrest",
        hint: "Mandatory searches and scope",
        bullets: [
          "Search the suspect incident to arrest for weapons/contraband (consistent with policy/server rules).",
          "Secure any weapons immediately and maintain safe muzzle/handling discipline in RP.",
          "Search should be thorough and documented (what was found, where it was found).",
          "If property must be inventoried, do so per departmental policy.",
        ],
      },
      {
        id: "miranda",
        title: "Rights Advisement (Miranda) & Interviewing",
        hint: "When and how to advise rights",
        bullets: [
          "If you intend to question the suspect about the incident, advise rights as required by your server’s expectations.",
          "Avoid interrogation-style questioning without rights advisement where it is applicable.",
          "Routine booking questions (identity, medical needs) are typically separate from investigative questioning.",
          "Document advisement and the suspect’s response in your report if it occurred.",
        ],
        callout:
          "If your server doesn’t mandate Miranda, keep it as best-practice for realism and clarity.",
      },
      {
        id: "transport",
        title: "Transport Procedures",
        hint: "Moving prisoners safely",
        bullets: [
          "Search the suspect again before placing them in the vehicle (best-practice).",
          "Seat the suspect safely; secure seatbelt if your realism standard includes it.",
          "Notify dispatch of transport start and destination when appropriate.",
          "If multiple prisoners are involved, request additional units for separate transports where feasible.",
        ],
      },
      {
        id: "vehicle",
        title: "Vehicle Search Related to Arrest",
        hint: "Consent, PC, and limitations",
        bullets: [
          "Consent searches require clear consent in RP; consent can be withdrawn.",
          "Probable cause searches must be articulated with specific facts.",
          "Search scope must match the suspected evidence/contraband type.",
          "Document all reasons and results clearly—avoid vague justification.",
        ],
      },
      {
        id: "booking",
        title: "Booking / Intake (Station or Jail)",
        hint: "Processing steps",
        bullets: [
          "Confirm identity and charges based on the arrest justification.",
          "Record property/evidence and maintain chain-of-custody expectations.",
          "If medical attention is needed, prioritize EMS evaluation before full processing.",
          "Ensure any warrants/holds are communicated if your system supports it.",
        ],
        callout:
          "Booking is where arrests are validated by documentation. If it isn’t written down, it didn’t happen.",
      },
      {
        id: "documentation",
        title: "Documentation & Reporting",
        hint: "Minimum report expectations",
        bullets: [
          "Include: probable cause facts, arrest time/location, suspect identity, and applicable charges.",
          "Include: search details, items seized, any statements (and rights advisement if applicable).",
          "Include: any force used, injuries, or property damage and supervisor notifications.",
          "Attach/record evidence references as required (photos, items, vehicle info).",
        ],
        callout:
          "Write a report that an outside reviewer could understand without being at the scene.",
      },
      {
        id: "exceptions",
        title: "Exceptions / Supervisory Notification",
        hint: "When to elevate",
        bullets: [
          "Notify a supervisor for serious felonies, injuries, use of force, or high-profile incidents.",
          "If the arrest involves multiple units or complex case facts, coordinate a lead officer.",
          "If a suspect alleges misconduct or medical distress, document and notify supervision.",
        ],
      },
    ],

    footerNote:
      "This SOP provides baseline arrest procedures. Policies and future SOP pages (Use of Force, Evidence Handling, High-Risk Stops) may add requirements. When uncertain, slow down and request supervisory guidance.",
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
