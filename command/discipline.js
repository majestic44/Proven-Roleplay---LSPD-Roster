(() => {
  // =========================================================
  // COMMAND HANDBOOK: Discipline & Corrective Action
  // =========================================================
  const DOC = {
    title: "Discipline & Corrective Action",
    subtitle: "Coaching • progressive discipline • documentation • command oversight",
    intro:
      "Discipline is a leadership tool designed to correct behavior, reinforce standards, and protect the integrity of the department. It must be applied consistently, proportionally, and with clear documentation. Supervisors are expected to correct issues early before they escalate.",

    meta: [
      { k: "Status", v: "Draft" },
      { k: "Revision", v: "v1.0" },
      { k: "Owner", v: "Command Staff" },
      { k: "Applies To", v: "All supervisors" },
    ],

    sections: [
      {
        id: "principles",
        title: "Disciplinary Principles",
        hint: "How discipline should be applied",
        bullets: [
          "Discipline exists to correct behavior, not to punish individuals.",
          "Corrective action should be progressive whenever possible.",
          "Similar conduct should result in similar outcomes.",
          "Supervisors are expected to address issues promptly.",
          "Documentation protects both the department and the supervisor.",
        ],
        callout:
          "Unaddressed behavior becomes accepted behavior. Early correction prevents major discipline later.",
      },
      {
        id: "coaching",
        title: "Informal Coaching",
        hint: "First-line correction",
        bullets: [
          "Used for minor performance or professionalism issues.",
          "May include verbal counseling or informal guidance.",
          "Should be private, respectful, and specific.",
          "Expectations must be clearly stated.",
          "Repeated coaching for the same issue should be documented.",
        ],
      },
      {
        id: "progressive",
        title: "Progressive Discipline Model",
        hint: "Escalation framework",
        bullets: [
          "Step 1: Informal coaching or verbal counseling.",
          "Step 2: Documented counseling or written warning.",
          "Step 3: Formal discipline (suspension, demotion, or removal).",
          "Progression may accelerate based on severity.",
          "Serious misconduct may bypass early steps.",
        ],
        callout:
          "Progressive discipline is not required when misconduct is severe or intentional.",
      },
      {
        id: "authority",
        title: "Disciplinary Authority by Level",
        hint: "Who can do what",
        bullets: [
          "First-line supervisors may coach and document minor issues.",
          "Mid-level leadership may issue written discipline or restrictions.",
          "Command staff handles suspension, demotion, or removal.",
          "Supervisors must not exceed their authority.",
          "Uncertainty should be escalated rather than guessed.",
        ],
      },
      {
        id: "documentation",
        title: "Documentation Expectations",
        hint: "Protecting the process",
        bullets: [
          "Document facts, not opinions or personal frustration.",
          "Include date, time, behavior observed, and corrective action taken.",
          "Reference applicable policy or SOP when relevant.",
          "Maintain professionalism in all written discipline.",
          "Store documentation according to department standards.",
        ],
        callout:
          "If it is not documented, it did not happen.",
      },
      {
        id: "investigation",
        title: "Administrative Review & Investigation",
        hint: "When issues require review",
        bullets: [
          "Allegations of serious misconduct require supervisor notification.",
          "Command staff determines whether an administrative investigation is required.",
          "Officers should be informed of the nature of the review when appropriate.",
          "Administrative reviews are separate from criminal investigations.",
          "Confidentiality must be maintained.",
        ],
      },
      {
        id: "consistency",
        title: "Consistency & Fairness",
        hint: "Maintaining trust",
        bullets: [
          "Discipline must be applied evenly across ranks and units.",
          "Personal relationships must not influence outcomes.",
          "Supervisors should consult peers or command when unsure.",
          "Inconsistent discipline undermines authority and morale.",
        ],
      },
      {
        id: "appeals",
        title: "Appeals & Command Review",
        hint: "Oversight and correction",
        bullets: [
          "Officers may request command review of formal discipline.",
          "Appeals should be professional and fact-based.",
          "Command staff may uphold, modify, or overturn discipline.",
          "Retaliation for appeals is strictly prohibited.",
        ],
      },
      {
        id: "failure",
        title: "Failure to Supervise",
        hint: "Supervisor accountability",
        bullets: [
          "Supervisors are responsible for the conduct of their subordinates.",
          "Ignoring misconduct may result in corrective action for supervisors.",
          "Command may review supervisory decisions after incidents.",
          "Leadership failures are treated seriously.",
        ],
        callout:
          "Leadership is accountability. Failing to act is still a decision.",
      },
    ],

    footerNote:
      "Discipline must be professional, proportional, and documented. Supervisors are expected to correct behavior early, escalate when necessary, and maintain consistent standards across the department.",
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