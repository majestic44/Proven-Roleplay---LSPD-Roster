(() => {
  // =========================================================
  // COMMAND HANDBOOK: Report Review & Quality Control
  // =========================================================
  const DOC = {
    title: "Report Review & Quality Control",
    subtitle: "Accuracy • completeness • consistency • supervisory accountability",
    intro:
      "Reports are the permanent record of officer actions and decision-making. Supervisors are responsible for ensuring reports are accurate, complete, realistic, and consistent with policy and SOPs before approval. Report review is a leadership function, not a formality.",

    meta: [
      { k: "Status", v: "Draft" },
      { k: "Revision", v: "v1.0" },
      { k: "Owner", v: "Command Staff" },
      { k: "Applies To", v: "All supervisors" },
    ],

    sections: [
      {
        id: "purpose",
        title: "Purpose of Report Review",
        hint: "Why review matters",
        bullets: [
          "Ensure accuracy and completeness of the official record.",
          "Confirm actions align with policy and SOP requirements.",
          "Identify training needs or performance trends.",
          "Protect officers and the department from liability.",
          "Maintain department credibility and professionalism.",
        ],
        callout:
          "Approving a poor report is endorsing it. Supervisors own what they approve.",
      },
      {
        id: "scope",
        title: "Scope of Review",
        hint: "What supervisors must check",
        bullets: [
          "Incident facts: who, what, when, where, and how.",
          "Clear articulation of probable cause and legal authority.",
          "Consistency between narrative, charges, and outcomes.",
          "Proper documentation of use of force, pursuits, or injuries.",
          "Inclusion of involved parties, witnesses, and evidence references.",
        ],
      },
      {
        id: "quality",
        title: "Quality Standards",
        hint: "Baseline expectations",
        bullets: [
          "Reports must be written in complete sentences and professional tone.",
          "Chronological flow should be logical and easy to follow.",
          "Avoid slang, unnecessary abbreviations, or out-of-character language.",
          "Officer actions must be justified and explained—not assumed.",
          "Reports should stand alone without requiring verbal explanation.",
        ],
        callout:
          "If a reader cannot understand what happened without asking questions, the report is not complete.",
      },
      {
        id: "consistency",
        title: "Consistency Checks",
        hint: "Cross-referencing details",
        bullets: [
          "Times, locations, and sequences should be internally consistent.",
          "Statements should not contradict cited evidence or other reports.",
          "Charges must align with described behavior.",
          "Use-of-force narratives must match force reports or logs.",
          "Supervisor notes should align with officer narratives.",
        ],
      },
      {
        id: "return",
        title: "Returning Reports for Correction",
        hint: "When approval is not appropriate",
        bullets: [
          "Return reports that are incomplete, unclear, or inaccurate.",
          "Provide clear, specific feedback on what must be corrected.",
          "Avoid rewriting reports for officers—require the officer to correct it.",
          "Set reasonable expectations for resubmission.",
          "Repeated issues should be documented and addressed.",
        ],
        callout:
          "Fixing reports for officers hides deficiencies and creates future failures.",
      },
      {
        id: "approval",
        title: "Approval Criteria",
        hint: "When a report is ready",
        bullets: [
          "All required sections are completed.",
          "Narrative clearly supports actions taken.",
          "Policy and SOP compliance is evident.",
          "No unresolved contradictions or omissions remain.",
          "Supervisor is comfortable defending the report if questioned.",
        ],
      },
      {
        id: "trends",
        title: "Trend Identification",
        hint: "Leadership awareness",
        bullets: [
          "Identify repeated report deficiencies by individuals.",
          "Watch for patterns across units or shifts.",
          "Flag recurring issues for training or corrective action.",
          "Escalate serious or systemic issues to command staff.",
        ],
        callout:
          "Patterns matter more than single mistakes. Supervisors are the first line of detection.",
      },
      {
        id: "critical",
        title: "Critical Incident Reports",
        hint: "Enhanced scrutiny",
        bullets: [
          "Use-of-force, pursuits, officer-involved incidents, and major arrests require heightened review.",
          "Confirm timelines, command notifications, and supervisory actions are documented.",
          "Ensure evidence handling and medical actions are clearly articulated.",
          "Command staff should be notified when required by policy.",
        ],
      },
      {
        id: "accountability",
        title: "Supervisor Accountability",
        hint: "Ownership of approvals",
        bullets: [
          "Supervisors are responsible for reports they approve.",
          "Failure to identify major deficiencies may result in corrective action.",
          "Supervisors should seek guidance when unsure rather than approve questionable reports.",
          "Consistent, fair review builds credibility with officers.",
        ],
        callout:
          "Approval is endorsement. Treat it as such.",
      },
    ],

    footerNote:
      "Report review is a leadership responsibility. Supervisors are expected to ensure reports accurately reflect events, comply with policy, and meet professional standards before approval.",
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

  function boot(){
    $("title").textContent = norm(DOC.title) || "Command Handbook";
    $("subtitle").textContent = norm(DOC.subtitle) || "";
    $("footerNote").textContent = norm(DOC.footerNote) || "";

    renderMeta(DOC.meta);
    renderIntro();
    renderQuickNav(DOC.sections);
    renderAccordion(DOC.sections);
  }

  boot();
})();