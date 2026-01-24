(() => {
  // =========================================================
  // COMMAND HANDBOOK: Scene Command & Transfer of Authority
  // (Same renderer style as SOP pages)
  // =========================================================
  const DOC = {
    title: "Scene Command & Transfer of Authority",
    subtitle: "Incident command • roles • radio discipline • transfers • escalation",
    intro:
      "This handbook section establishes how command is formed and transferred on incidents. The goal is simple: one plan, one voice, and clear accountability. Command should be announced early, transferred cleanly, and recorded in major incident reporting.",

    meta: [
      { k: "Status", v: "Draft" },
      { k: "Revision", v: "v1.0" },
      { k: "Owner", v: "Command Staff" },
      { k: "Applies To", v: "All sworn personnel" },
    ],

    sections: [
      {
        id: "principles",
        title: "Core Principles",
        hint: "The fundamentals of command presence",
        bullets: [
          "Command exists to reduce confusion and improve safety.",
          "The first supervisor on scene is command until relieved (unless policy dictates otherwise).",
          "Command must be clearly announced on radio with location and role assignments.",
          "One plan is better than multiple competing opinions—decide, communicate, execute, reassess.",
          "If you take command, you own the outcome and the documentation expectations.",
        ],
        callout:
          "If multiple supervisors are giving direction, the scene is already failing. Establish one command voice immediately.",
      },
      {
        id: "establish",
        title: "Establishing Command",
        hint: "How to take control early",
        bullets: [
          "Announce: 'I have scene command' with your unit identifier and 10-20.",
          "Set immediate priorities: life safety, threat containment, medical, perimeter, evidence preservation.",
          "Assign roles quickly: primary talker, inner perimeter, outer perimeter, traffic control, staging/EMS coordination.",
          "Limit radio traffic: designate one primary talker and require short updates.",
          "Request additional resources early rather than late (supervisor, air, K9, EMS, fire, additional units).",
        ],
        callout:
          "If the incident is growing, set a staging location early to prevent uncontrolled unit stacking.",
      },
      {
        id: "who",
        title: "Who Has Command",
        hint: "Authority on scene",
        bullets: [
          "If no supervisor is present, the senior officer may act as scene lead until a supervisor arrives.",
          "Once a supervisor arrives, they should assume command unless they explicitly delegate it.",
          "Higher rank does not automatically mean better command—however, higher ranks may assume command for scope/complexity.",
          "Specialized incidents may shift command based on policy (e.g., SWAT/Negotiations if your server uses them).",
          "If command is unclear, the highest-ranking supervisor present must clarify immediately.",
        ],
      },
      {
        id: "roles",
        title: "Role Assignments (Baseline)",
        hint: "Common assignments that stabilize scenes",
        bullets: [
          "Incident Commander (IC): overall plan and decisions; coordinates resources.",
          "Primary Talker: manages radio updates and relays commands to units.",
          "Inner Perimeter: closest containment; controls access to the scene.",
          "Outer Perimeter / Traffic: keeps civilians away; manages routes and safety.",
          "Staging / Resource: directs responding units to hold and prevents overcrowding.",
          "Medical Liaison: coordinates EMS entry and casualty collection points when safe.",
          "Evidence / Scene Security: protects key evidence areas once stabilized.",
        ],
        callout:
          "Assign roles out loud on radio. Silent assignments create overlap, gaps, and friendly-fire risk.",
      },
      {
        id: "radio",
        title: "Radio Discipline",
        hint: "How command communicates",
        bullets: [
          "Use short, structured transmissions: location, action, direction, hazards.",
          "One unit speaks for the scene whenever possible (primary talker).",
          "Do not debate on radio. If needed, move to a secondary channel or quick direct comms.",
          "Command traffic has priority during high-risk incidents.",
          "Announce major status changes immediately: suspect in custody, shots fired, officer down, scene secured.",
        ],
        callout:
          "Radio clutter is a safety issue. If it gets noisy, command must shut it down and reassign talkers.",
      },
      {
        id: "transfer",
        title: "Transfer of Authority",
        hint: "Clean handoff of command",
        bullets: [
          "Transfers should be explicit: 'Command transferring from X to Y.'",
          "Incoming supervisor should receive a 20–30 second brief: what happened, current threats, units assigned, plan, and next steps.",
          "If the incoming supervisor does not want command, they must clearly state they are not assuming command.",
          "After transfer, the prior commander supports the plan—do not undercut command over radio.",
          "For major incidents, document the time and reason for transfer (scope escalation, rank arrival, specialized command).",
        ],
        callout:
          "A transfer is not a status flex. It is a continuity action. Make it quick and clear.",
      },
      {
        id: "conflicts",
        title: "Multiple Supervisors / Conflicting Direction",
        hint: "Preventing leadership collisions",
        bullets: [
          "If two supervisors issue conflicting direction, the highest-ranking supervisor must clarify the plan immediately.",
          "If ranks are equal, the first supervisor who took command retains it until they transfer it.",
          "Disagreements should be handled off-radio whenever possible.",
          "If needed, pause escalation actions until command is clarified (containment over chaos).",
          "After the incident, conflicts should be addressed through leadership review to prevent repeats.",
        ],
      },
      {
        id: "escalation",
        title: "Escalation and Scope Control",
        hint: "When incidents grow",
        bullets: [
          "Increase structure as scope increases: staging, dedicated roles, and clearer comms.",
          "When resources surge, shift units to perimeter and staging rather than stacking at the hot zone.",
          "Request command staff when: major injuries, prolonged pursuits, large crowds, officer-involved incidents, or multi-scene events.",
          "If a scene becomes unstable, prioritize life safety and stabilization over arrests.",
          "When threat is resolved, transition to investigation mode: preserve evidence, control witnesses, and limit movement.",
        ],
        callout:
          "Containment is often the safest option while command is building structure.",
      },
      {
        id: "release",
        title: "Demobilization / Releasing Command",
        hint: "How to end it professionally",
        bullets: [
          "Announce: scene stabilized and command is ending or transferring to investigation lead.",
          "Release units gradually; keep only what is needed for security and documentation.",
          "Confirm: suspect status, medical handled, evidence secured, witnesses identified, reports assigned.",
          "Ensure a final radio update: scene code 4 / clear as applicable.",
          "Assign after-action review if incident meets threshold (pursuit, force, critical incident).",
        ],
      },
      {
        id: "documentation",
        title: "Documentation Expectations",
        hint: "What leadership must ensure is captured",
        bullets: [
          "Command decisions: why tactics were used or denied.",
          "Who had command and when transfers occurred.",
          "Major timeline points: escalation, custody, injuries, medical, scene secured.",
          "Unit assignments and significant actions (spikes, PIT, less-lethal, breach, etc.).",
          "Supervisor notifications and any command staff involvement.",
        ],
        callout:
          "If command decisions are not documented, they cannot be defended. Make your rationale clear.",
      },
    ],

    footerNote:
      "Command is a safety function. The incident commander is responsible for controlling the scene, maintaining radio discipline, and ensuring accountability through clear decisions and documentation. When unclear, default to containment and structure.",
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

      // Default open first section only
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