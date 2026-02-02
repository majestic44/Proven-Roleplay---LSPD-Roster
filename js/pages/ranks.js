(() => {
  // =========================================================
  // DATA: Expanded Rank Structure (Option B)
  // =========================================================
  const RANKS = [
    {
      name: "Chief",
      tier: "cmd",
      tierLabel: "Command",
      description: "Department head responsible for overall leadership, policy direction, and final authority on major departmental matters.",
      responsibilities: [
        "Sets department priorities, standards, and strategic direction",
        "Final approval authority for high-risk/exception requests",
        "Oversees command staff and major operational decisions",
      ],
      order: 1,
    },
    {
      name: "Deputy Chief",
      tier: "cmd",
      tierLabel: "Command",
      description: "Second-in-command assisting the Chief and supervising department-wide operations and major initiatives.",
      responsibilities: [
        "Manages operational performance and compliance",
        "Supervises division commanders / captains",
        "Acts as Chief in the Chief’s absence",
      ],
      order: 2,
    },
    {
      name: "Assistant Chief",
      tier: "cmd",
      tierLabel: "Command",
      description: "Command-level leader responsible for major operational areas and coordination between divisions.",
      responsibilities: [
        "Coordinates multiple divisions and special details",
        "Implements department-wide initiatives",
        "Supports disciplinary, training, and standards enforcement",
      ],
      order: 3,
    },
    {
      name: "Captain",
      tier: "sup",
      tierLabel: "Supervision",
      description: "Division commander overseeing staffing, performance, and day-to-day execution of departmental objectives.",
      responsibilities: [
        "Manages division operations and staffing decisions",
        "Approves schedules, assignments, and performance standards",
        "Ensures SOP/policy compliance within the division",
      ],
      order: 4,
    },
    {
      name: "Lieutenant",
      tier: "sup",
      tierLabel: "Supervision",
      description: "Shift or unit supervisor responsible for oversight of patrol operations and field supervision.",
      responsibilities: [
        "Supervises sergeants and field operations",
        "Coordinates response to major incidents",
        "Provides guidance and field review for reports/cases",
      ],
      order: 5,
    },
    {
      name: "Sergeant",
      tier: "sup",
      tierLabel: "Supervision",
      description: "Frontline supervisor responsible for direct oversight of officers, scene control, and enforcing standards.",
      responsibilities: [
        "Supervises patrol teams in the field",
        "Ensures proper procedure during stops, pursuits, and arrests",
        "Reviews reports and provides training/mentoring as needed",
      ],
      order: 6,
    },
    {
      name: "Corporal",
      tier: "sup",
      tierLabel: "Supervision",
      description: "Senior line role assisting supervision, often acting as a lead officer during calls and incidents.",
      responsibilities: [
        "Provides field leadership on scenes when assigned",
        "Assists supervisors with coordination and mentoring",
        "Supports training and standards in day-to-day operations",
      ],
      order: 7,
    },
    {
      name: "Senior Officer | Field Training Officer",
      tier: "line",
      tierLabel: "Line / Patrol",
      description: "Experienced officer with strong field competency who may mentor newer officers and support field leadership.",
      responsibilities: [
        "Acts as an example for procedure and professionalism",
        "Supports newer officers with guidance and coaching",
        "Assists with complex incidents as needed",
      ],
      order: 8,
    },
    {
      name: "Officer II",
      tier: "line",
      tierLabel: "Line / Patrol",
      description: "Primary law enforcement role responsible for patrol, response, enforcement, investigations, and service calls.",
      responsibilities: [
        "Responds to calls for service and conducts enforcement actions",
        "Completes reports, evidence handling, and case documentation",
        "Follows policy/SOP and maintains professional RP standards",
      ],
      order: 9,
    },
    {
      name: "Officer I",
      tier: "line",
      tierLabel: "Line / Patrol",
      description: "Primary law enforcement role responsible for patrol, response, enforcement, investigations, and service calls.",
      responsibilities: [
        "Responds to calls for service and conducts enforcement actions",
        "Completes reports, evidence handling, and case documentation",
        "Follows policy/SOP and maintains professional RP standards",
      ],
      order: 10,
    },
    {
      name: "Probationary Officer",
      tier: "train",
      tierLabel: "Training / Probation",
      description: "Newly hired officer under evaluation; expected to learn procedures, radio protocol, and department standards.",
      responsibilities: [
        "Operates under supervision and coaching",
        "Demonstrates competency in radio, stops, arrests, and reports",
        "Completes required training and evaluations",
      ],
      order: 11,
    },
    {
      name: "Cadet",
      tier: "train",
      tierLabel: "Training / Probation",
      description: "Entry-level member undergoing foundational training prior to full officer duties.",
      responsibilities: [
        "Completes academy or structured training milestones",
        "Learns policy/SOP basics, radio protocol, and procedures",
        "May operate in limited roles as assigned",
      ],
      order: 12,
    },
  ];

  // =========================================================
  // DOM helpers
  // =========================================================
  const $ = (id) => document.getElementById(id);
  const norm = (v) => String(v ?? "").trim();

  function escapeHtml(s) {
    return String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function matches(rank, q) {
    if (!q) return true;
    const hay = [
      rank.name,
      rank.tierLabel,
      rank.description,
      ...(rank.responsibilities || []),
    ].join(" ").toLowerCase();
    return hay.includes(q);
  }

  function card(rank) {
    const wrap = document.createElement("div");
    wrap.className = "rankCard";

    const top = document.createElement("div");
    top.className = "rankTop";
    top.innerHTML = `
      <div class="rankName">${escapeHtml(rank.name)}</div>
      <div class="rankTier ${escapeHtml(rank.tier)}">${escapeHtml(rank.tierLabel)}</div>
    `;

    const body = document.createElement("div");
    body.className = "rankBody";

    const desc = document.createElement("div");
    desc.className = "rankDesc";
    desc.textContent = rank.description;

    const ul = document.createElement("ul");
    ul.className = "bullet";
    for (const r of rank.responsibilities || []) {
      const li = document.createElement("li");
      li.textContent = r;
      ul.appendChild(li);
    }

    body.appendChild(desc);
    body.appendChild(ul);

    wrap.appendChild(top);
    wrap.appendChild(body);

    return wrap;
  }

  function render() {
    const grid = $("rankGrid");
    const empty = $("emptyState");
    const countPill = $("countPill");
    const updatedText = $("updatedText");
    const q = norm($("search").value).toLowerCase();

    grid.innerHTML = "";

    const sorted = [...RANKS].sort((a, b) => (a.order || 999) - (b.order || 999));
    const filtered = sorted.filter((r) => matches(r, q));

    for (const r of filtered) grid.appendChild(card(r));

    empty.style.display = filtered.length ? "none" : "block";
    countPill.textContent = `${filtered.length} ${filtered.length === 1 ? "Rank" : "Ranks"}`;

    updatedText.textContent = `Last updated: ${new Date().toLocaleString()}`;
  }

   // =========================================================
  // Sidebar navigation using data-link (keeps buttons)
  // =========================================================
  document.querySelectorAll(".navItem[data-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.link;
      if (url) window.location.href = url;
    });
  });

  // =========================================================
  // Sidebar nav buttons (keep as buttons, no 404 surprises)
  // =========================================================
  document.querySelectorAll(".navItem[data-link]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.dataset.link;
      if (url) window.location.href = url;
    });
  });

  // Events
  $("search").addEventListener("input", render);

  // Boot
  render();
})();
