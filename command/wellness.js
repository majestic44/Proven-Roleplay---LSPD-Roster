(() => {
  // =========================================================
  // COMMAND HANDBOOK: Officer Wellness & Intervention
  // =========================================================
  const DOC = {
    title: "Officer Wellness & Intervention",
    subtitle: "Early indicators • supervisor response • support pathways • duty adjustments",
    intro:
      "Officer wellness directly affects decision-making, professionalism, and safety. Supervisors are responsible for recognizing early indicators of stress or impairment, intervening appropriately, and supporting officers before issues escalate into discipline or critical incidents.",

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
        id: "principles",
        title: "Wellness Principles",
        hint: "Leadership expectations",
        bullets: [
          "Wellness is an operational readiness issue, not a personal weakness.",
          "Early intervention is more effective than post-incident discipline.",
          "Supervisors are expected to act when indicators are observed.",
          "Supportive action and accountability can coexist.",
          "Confidentiality should be respected within operational limits.",
        ],
        callout:
          "Ignoring wellness indicators increases risk to officers, coworkers, and the public.",
      },
      {
        id: "indicators",
        title: "Common Wellness Indicators",
        hint: "What supervisors should watch for",
        bullets: [
          "Noticeable changes in demeanor, mood, or communication.",
          "Increased irritability, withdrawal, or conflict with peers.",
          "Decline in report quality, decision-making, or attention to detail.",
          "Repeated complaints, near-miss incidents, or use-of-force concerns.",
          "Fatigue, burnout, or difficulty maintaining focus during shifts.",
        ],
      },
      {
        id: "response",
        title: "Supervisor Response",
        hint: "Immediate actions",
        bullets: [
          "Address concerns privately and respectfully.",
          "Focus on observed behavior and operational impact.",
          "Listen without judgment; avoid assumptions.",
          "Document concerns and actions taken when appropriate.",
          "Consult command staff when unsure how to proceed.",
        ],
        callout:
          "A brief, professional check-in can prevent long-term issues.",
      },
      {
        id: "intervention",
        title: "Intervention Options",
        hint: "Support pathways",
        bullets: [
          "Temporary duty modification or reassignment.",
          "Mandatory time off or reduced workload.",
          "Peer support or supervisor mentorship.",
          "Referral to department-approved resources if available.",
          "Command review for continued monitoring.",
        ],
      },
      {
        id: "critical",
        title: "Post-Critical Incident Care",
        hint: "After high-stress events",
        bullets: [
          "Monitor officers involved in shootings, pursuits, or traumatic scenes.",
          "Ensure officers are removed from patrol if necessary.",
          "Provide time for decompression before returning to full duty.",
          "Avoid immediate discipline unless required for safety.",
          "Coordinate with command staff for follow-up.",
        ],
        callout:
          "Critical incidents affect performance even when officers appear composed.",
      },
      {
        id: "fitness",
        title: "Fitness for Duty",
        hint: "Operational readiness",
        bullets: [
          "Supervisors must assess fitness for duty each shift.",
          "Officers who appear impaired should be removed from active duty.",
          "Decisions should prioritize safety over staffing convenience.",
          "Command staff must be notified when fitness is in question.",
        ],
      },
      {
        id: "documentation",
        title: "Documentation & Confidentiality",
        hint: "Protecting officers and the department",
        bullets: [
          "Document observed behaviors and supervisory actions taken.",
          "Avoid speculative or diagnostic language.",
          "Limit access to wellness-related documentation.",
          "Store records according to department standards.",
        ],
        callout:
          "Document facts and actions—not opinions or diagnoses.",
      },
      {
        id: "failure",
        title: "Failure to Intervene",
        hint: "Supervisor accountability",
        bullets: [
          "Supervisors who ignore clear indicators may be subject to review.",
          "Failure to act may result in corrective action.",
          "Leadership accountability applies to wellness just as it does discipline.",
        ],
      },
    ],

    footerNote:
      "Officer wellness is a leadership responsibility. Supervisors are expected to identify concerns early, intervene professionally, and ensure officers are fit for duty before issues escalate into safety or integrity failures.",
  };

  // =========================================================
  // Renderer (matches SOP style)
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
    const intro = $("introBox");
    intro.innerHTML = `
      <div class="introKicker">Overview</div>
      <div class="introText">${escapeHtml(DOC.intro || "")}</div>
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
    $("title").textContent = norm(DOC.title) || "Command Handbook";
    $("subtitle").textContent = norm(DOC.subtitle) || "";
    $("footerNote").textContent = norm(DOC.footerNote) || "";

    const metaBox = document.getElementById("metaBox");
    renderApproval(metaBox, DOC.approval);
    appendMetaRows(metaBox, DOC.meta);
    renderIntro();
    renderQuickNav(DOC.sections);
    renderAccordion(DOC.sections);
  }

  boot();
})();