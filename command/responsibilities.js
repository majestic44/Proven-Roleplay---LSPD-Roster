(() => {
  const DATA = {
    title: "Supervisor Responsibilities",
    subtitle: "Expectations and authority by leadership level",
    intro:
      "Supervisors are responsible for decision-making, scene control, officer conduct, and accountability. Authority increases with rank, but responsibility always remains. Leadership exists to support lawful, realistic, and professional policing.",

    sections: [
      {
        id: "first-line",
        title: "First-Line Supervisors (Corporal / Sergeant)",
        hint: "Direct street-level leadership",
        bullets: [
          "Provide immediate on-scene leadership and decision-making.",
          "Ensure officer safety, professionalism, and policy compliance.",
          "Assume command of incidents until relieved by higher authority.",
          "De-escalate conflicts between officers and civilians when possible.",
          "Authorize or deny escalated tactics when required by SOP or policy.",
          "Review reports for accuracy, completeness, and realism.",
          "Correct minor issues through coaching before discipline is needed.",
        ],
        callout:
          "First-line supervisors set the tone. If discipline or professionalism fails here, it will fail everywhere.",
      },
      {
        id: "mid-level",
        title: "Mid-Level Leadership (Lieutenant / Captain)",
        hint: "Oversight, coordination, and escalation",
        bullets: [
          "Provide oversight across multiple scenes or units.",
          "Resolve conflicts between supervisors or units.",
          "Approve or restrict high-risk operations and tactics.",
          "Ensure SOPs and policies are applied consistently.",
          "Review major incidents, pursuits, and use-of-force events.",
          "Identify performance trends and recommend corrective action.",
          "Serve as the bridge between command staff and field supervisors.",
        ],
        callout:
          "Mid-level leadership balances trust in supervisors with accountability to command.",
      },
      {
        id: "command",
        title: "Command Staff",
        hint: "Department direction and accountability",
        bullets: [
          "Establish department-wide expectations and standards.",
          "Approve or revise SOPs, policies, and training requirements.",
          "Handle serious discipline, suspensions, or removals.",
          "Oversee critical incidents and after-action reviews.",
          "Ensure fairness, transparency, and professionalism at all levels.",
          "Represent the department in inter-agency or staff matters.",
          "Maintain long-term health and stability of the department.",
        ],
        callout:
          "Command staff are responsible for culture. What is tolerated becomes the standard.",
      },
    ],
  };

  const $ = (id) => document.getElementById(id);

  $("title").textContent = DATA.title;
  $("subtitle").textContent = DATA.subtitle;
  $("intro").innerHTML = `<p>${DATA.intro}</p>`;

  $("backBtn").onclick = () => location.href = "./index.html";

  const nav = $("quickNav");
  const acc = $("accordion");

  DATA.sections.forEach((s, i) => {
    const navBtn = document.createElement("button");
    navBtn.className = "navLink";
    navBtn.textContent = s.title;
    navBtn.onclick = () => document.getElementById(s.id).scrollIntoView({ behavior: "smooth" });
    nav.appendChild(navBtn);

    const item = document.createElement("div");
    item.className = "accItem";
    item.id = s.id;
    if (i === 0) item.classList.add("open");

    item.innerHTML = `
      <button class="accHead">
        <div>
          <div class="accTitle">${s.title}</div>
          <div class="accHint">${s.hint}</div>
        </div>
        <div class="accHint">Toggle</div>
      </button>
      <div class="accBody">
        <ul class="list">
          ${s.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
        ${s.callout ? `<div class="callout">${s.callout}</div>` : ""}
      </div>
    `;

    item.querySelector(".accHead").onclick = () =>
      item.classList.toggle("open");

    acc.appendChild(item);
  });
})();