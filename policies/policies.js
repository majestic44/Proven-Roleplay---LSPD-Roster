(() => {
  // =========================================================
  // DATA: Add/expand policies here (easy to maintain)
  // =========================================================
  const POLICY_SECTIONS = [
    {
      title: "Professional Conduct",
      tag: "Standard",
      bullets: [
        "Officers must act realistically and professionally.",
      ],
    },
    {
      title: "Use of Force",
      tag: "High Priority",
      bullets: [
        "Force must be proportional and justified.",
        "Lethal force only when absolutely necessary.",
        "No power abuse.",
        "No abusing authority, tools, or commands.",
      ],
    },
    {
      title: "Scenario RP",
      tag: "Roleplay",
      bullets: [
        "Negotiation and de-escalation should be prioritized.",
      ],
    },
    {
      title: "Corruption RP",
      tag: "Restricted",
      bullets: [
        "Must be staff-approved and rare.",
      ],
    },
  ];

  // =========================================================
  // DOM helpers
  // =========================================================
  const $ = (id) => document.getElementById(id);

  const norm = (v) => String(v ?? "").trim();
  const escapeHtml = (s) =>
    String(s)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  function card(section) {
    const wrap = document.createElement("div");
    wrap.className = "policyCard";

    const top = document.createElement("div");
    top.className = "policyCardTop";
    top.innerHTML = `
      <div class="policyTitle">${escapeHtml(section.title)}</div>
      <div class="policyTag">${escapeHtml(section.tag || "Policy")}</div>
    `;

    const body = document.createElement("div");
    body.className = "policyBody";

    const ul = document.createElement("ul");
    ul.className = "bullet";

    for (const b of section.bullets || []) {
      const li = document.createElement("li");
      li.textContent = b;
      ul.appendChild(li);
    }

    body.appendChild(ul);
    wrap.appendChild(top);
    wrap.appendChild(body);

    return wrap;
  }

  function matches(section, q) {
    if (!q) return true;
    const hay = [
      section.title,
      section.tag,
      ...(section.bullets || []),
    ].join(" ").toLowerCase();
    return hay.includes(q);
  }

  function render() {
    const grid = $("policyGrid");
    const empty = $("emptyState");
    const countPill = $("countPill");
    const updatedText = $("updatedText");
    const q = norm($("search").value).toLowerCase();

    grid.innerHTML = "";

    const filtered = POLICY_SECTIONS.filter((s) => matches(s, q));
    for (const sec of filtered) grid.appendChild(card(sec));

    empty.style.display = filtered.length ? "none" : "block";
    countPill.textContent = `${filtered.length} ${filtered.length === 1 ? "Section" : "Sections"}`;

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
  // Events
  // =========================================================
  $("search").addEventListener("input", render);


  // Boot
  render();
})();
