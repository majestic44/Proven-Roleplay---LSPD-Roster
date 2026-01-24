(() => {
  // =========================================================
  // SOP CONTENT (EDIT PER SOP PAGE)
  // =========================================================
  const SOP = {
    title: "SOP Template",
    subtitle: "Use this template to build standardized procedures.",
    intro: "This document provides a standardized structure for SOP pages. Duplicate this file for each procedure and update the SOP object in the JS.",

    meta: [
      { k: "Status", v: "Template" },
      { k: "Effective", v: "—" },
      { k: "Revision", v: "v1.0" },
      { k: "Approved By", v: "—" },
    ],

    sections: [
      {
        id: "purpose",
        title: "Purpose",
        hint: "Why this SOP exists",
        bullets: [
          "Establish a consistent structure for SOP documentation.",
          "Provide quick navigation and clear, expandable sections.",
        ],
        callout: "Tip: Keep each section concise. Use bullets whenever possible.",
      },
      {
        id: "scope",
        title: "Scope",
        hint: "Who / when it applies",
        bullets: [
          "Applies to all sworn personnel unless otherwise stated.",
          "Specific procedures may be unit-restricted.",
        ],
      },
      {
        id: "procedure",
        title: "Procedure",
        hint: "Step-by-step guidance",
        bullets: [
          "Define prerequisites (when to initiate).",
          "List step-by-step actions in plain language.",
          "Include required notifications (e.g., supervisor).",
          "Document required reports or follow-up tasks.",
        ],
        callout: "Include radio/dispatch requirements where applicable.",
      },
      {
        id: "documentation",
        title: "Documentation",
        hint: "Reports and evidence",
        bullets: [
          "Identify required reports (arrest report, incident report, etc.).",
          "Record relevant times, locations, and involved parties.",
          "Preserve evidence per department policy.",
        ],
      },
      {
        id: "exceptions",
        title: "Exceptions / Notes",
        hint: "Edge cases and constraints",
        bullets: [
          "Staff direction overrides SOP where applicable.",
          "If uncertain, request supervisor guidance.",
        ],
      },
    ],

    footerNote:
      "This SOP template is a standard format. Each procedure page should be reviewed and approved by command staff before being marked Active.",
  };

  // =========================================================
  // DOM
  // =========================================================
  const $ = (id) => document.getElementById(id);
  const norm = (v) => String(v ?? "").trim();

  // Keep sidebar navigation as buttons
  document.querySelectorAll(".navItem[data-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.link;
      if (url) window.location.href = url;
    });
  });

  // Back button
  $("backBtn").addEventListener("click", () => {
    window.location.href = "../sop/index.html";
  });

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
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

      // Default open first section
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
