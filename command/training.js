(() => {
  // =========================================================
  // COMMAND HANDBOOK: Training & Certification Oversight
  // =========================================================
  const DOC = {
    title: "Training & Certification Oversight",
    subtitle: "Qualification tracking • compliance • supervisor responsibility",
    intro:
      "Supervisors are responsible for ensuring all assigned personnel maintain required training and certifications. Failure to monitor qualifications exposes the department to operational, legal, and safety risks.",

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
        title: "Purpose of Oversight",
        hint: "Why training compliance matters",
        bullets: [
          "Ensure officers are legally and operationally qualified.",
          "Reduce liability and procedural errors.",
          "Maintain consistent performance standards.",
          "Support officer confidence and decision-making.",
        ],
        callout:
          "Unqualified officers create risk even when acting in good faith.",
      },
      {
        id: "required",
        title: "Required Training & Certifications",
        hint: "Minimum expectations",
        bullets: [
          "Academy completion and probationary sign-off.",
          "Use of force and pursuit policy training.",
          "Firearms qualification (if applicable).",
          "Role-specific certifications (FTO, CID, Command, etc.).",
          "Annual or periodic re-certifications.",
        ],
      },
      {
        id: "supervisor",
        title: "Supervisor Responsibilities",
        hint: "Oversight duties",
        bullets: [
          "Verify training status of assigned personnel.",
          "Ensure officers do not perform duties without proper certification.",
          "Monitor expiration dates and upcoming requirements.",
          "Restrict duties when training lapses occur.",
          "Report deficiencies to command staff promptly.",
        ],
        callout:
          "Staffing convenience never overrides qualification requirements.",
      },
      {
        id: "tracking",
        title: "Training Tracking",
        hint: "Documentation standards",
        bullets: [
          "Training records must be current and accurate.",
          "Supervisors should review records regularly.",
          "Completion dates and expiration dates must be documented.",
          "Training records may be audited by command staff.",
        ],
      },
      {
        id: "lapsed",
        title: "Lapsed or Missing Training",
        hint: "Corrective action",
        bullets: [
          "Officers with expired training shall be removed from affected duties.",
          "Supervisors must initiate corrective action immediately.",
          "Temporary reassignment may be used until compliance is restored.",
          "Repeated lapses may require formal review.",
        ],
        callout:
          "Allowing uncertified officers to operate is a leadership failure.",
      },
      {
        id: "command",
        title: "Command-Level Oversight",
        hint: "Accountability",
        bullets: [
          "Command staff may conduct periodic training audits.",
          "Units with recurring deficiencies may be reviewed.",
          "Supervisors are accountable for training compliance.",
        ],
      },
      {
        id: "discipline",
        title: "Failure to Enforce Training Standards",
        hint: "Supervisor accountability",
        bullets: [
          "Failure to monitor training may result in corrective action.",
          "Repeated negligence may lead to discipline.",
          "Training oversight is considered a core supervisory duty.",
        ],
      },
    ],

    footerNote:
      "Training and certification oversight is a fundamental leadership responsibility. Supervisors are expected to ensure officers are qualified, current, and prepared before performing any assigned duties.",
  };

  // =========================================================
  // Renderer (shared SOP logic)
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
    window.location.href = "./index.html";
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
    $("introBox").innerHTML = `
      <div class="introKicker">Overview</div>
      <div class="introText">${escapeHtml(DOC.intro)}</div>
    `;
  }

  function renderQuickNav(sections){
    const nav = $("quickNav");
    nav.innerHTML = "";
    for (const s of sections) {
      const b = document.createElement("button");
      b.className = "navLink";
      b.textContent = s.title;
      b.onclick = () => {
        document.getElementById(s.id)?.scrollIntoView({ behavior:"smooth" });
      };
      nav.appendChild(b);
    }
  }

  function renderAccordion(sections){
    const acc = $("accordion");
    acc.innerHTML = "";
    for (const s of sections) {
      const wrap = document.createElement("div");
      wrap.className = "accItem";
      wrap.id = s.id;

      const head = document.createElement("button");
      head.className = "accHead";
      head.innerHTML = `
        <div>
          <div class="accTitle">${escapeHtml(s.title)}</div>
          <div class="accHint">${escapeHtml(s.hint)}</div>
        </div>
        <div class="accHint">Toggle</div>
      `;

      const body = document.createElement("div");
      body.className = "accBody";

      const ul = document.createElement("ul");
      ul.className = "list";
      for (const b of s.bullets) {
        const li = document.createElement("li");
        li.textContent = b;
        ul.appendChild(li);
      }
      body.appendChild(ul);

      if (s.callout) {
        const c = document.createElement("div");
        c.className = "callout";
        c.textContent = s.callout;
        body.appendChild(c);
      }

      head.onclick = () => wrap.classList.toggle("open");
      if (!acc.childElementCount) wrap.classList.add("open");

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
    $("title").textContent = DOC.title;
    $("subtitle").textContent = DOC.subtitle;
    $("footerNote").textContent = DOC.footerNote;

    const metaBox = document.getElementById("metaBox");
    renderApproval(metaBox, DOC.approval);
    appendMetaRows(metaBox, DOC.meta);
    renderIntro();
    renderQuickNav(DOC.sections);
    renderAccordion(DOC.sections);
  }

  boot();
})();