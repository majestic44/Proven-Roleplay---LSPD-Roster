(() => {
  // =========================================================
  // COMMAND HANDBOOK INDEX — Data-driven
  // =========================================================
  const GROUPS = [
    {
      key: "ops",
      title: "Operational Command",
      desc: "On-scene leadership, authority, and immediate supervisory responsibilities.",
      items: [
        {
          title: "Supervisor Responsibilities",
          desc: "Expectations and authority by leadership level.",
          href: "./responsibilities.html",
          scope: "Supervisor",
          status: "Draft",
        },
        {
          title: "Scene Command & Transfer",
          desc: "Incident command, role assignments, radio discipline, and clean command transfer.",
          href: "./scene-command.html",
          scope: "Supervisor",
          status: "Draft",
        },
      ],
    },
    {
      key: "admin",
      title: "Administration & Standards",
      desc: "Accountability frameworks, quality control, training compliance, and organizational readiness.",
      items: [
        {
          title: "Discipline & Corrective Action",
          desc: "Progressive discipline, documentation standards, and command oversight.",
          href: "./discipline.html",
          scope: "Command",
          status: "Draft",
        },
        {
          title: "Report Review & Quality Control",
          desc: "Review standards, approval criteria, trend identification, and accountability.",
          href: "./report-review.html",
          scope: "Supervisor",
          status: "Draft",
        },
        {
          title: "Officer Wellness & Intervention",
          desc: "Early indicators, fitness-for-duty decisions, and support pathways.",
          href: "./wellness.html",
          scope: "Supervisor",
          status: "Draft",
        },
        {
          title: "Training & Certification Oversight",
          desc: "Qualification tracking, compliance oversight, and supervisor responsibilities.",
          href: "./training.html",
          scope: "Training",
          status: "Draft",
        },
      ],
    },
  ];

  const statusClass = (s) => {
    const v = String(s || "").toUpperCase();
    if (v === "APPROVED") return "stApproved";
    if (v === "WIP" || v === "IN PROGRESS") return "stWip";
    return "stDraft";
  };

  const el = (tag, attrs = {}, children = []) => {
    const n = document.createElement(tag);
    for (const [k,v] of Object.entries(attrs)) {
      if (k === "class") n.className = v;
      else if (k.startsWith("on") && typeof v === "function") n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v);
    }
    for (const c of children) n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    return n;
  };

  function render() {
    const mount = document.getElementById("cmdIndex");
    if (!mount) return;

    mount.innerHTML = "";

    GROUPS.forEach(g => {
      const group = el("section", { class: "cmdGroup" }, [
        el("div", { class: "cmdGroupHdr" }, [
          el("div", {}, [
            el("div", { class: "cmdGroupTitle" }, [g.title]),
            el("div", { class: "cmdGroupDesc" }, [g.desc || ""]),
          ]),
        ]),
      ]);

      const grid = el("div", { class: "cmdGrid" }, []);

      g.items.forEach(item => {
        const card = el("button", {
          class: "cmdCard",
          type: "button",
          onclick: () => (window.location.href = item.href),
        }, [
          el("div", { class: "cmdCardTop" }, [
            el("div", {}, [
              el("div", { class: "cmdCardTitle" }, [item.title]),
              el("div", { class: "cmdCardDesc" }, [item.desc]),
            ]),
            el("div", { class: `chip chipStatus ${statusClass(item.status)}` }, [item.status || "Draft"]),
          ]),
          el("div", { class: "cmdChips" }, [
            el("div", { class: "chip chipScope" }, [item.scope || "General"]),
          ]),
        ]);

        grid.appendChild(card);
      });

      group.appendChild(grid);
      mount.appendChild(group);
    });
  }

  render();
})();