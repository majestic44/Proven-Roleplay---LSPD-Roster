(() => {
  const $ = (id) => document.getElementById(id);

  function setUpdated(){
    const d = new Date();
    const el = $("updatedText");
    if (el) el.textContent = "Last updated: " + d.toLocaleString();
  }

  // Top right
  $("btnBackCmd")?.addEventListener("click", () => {
    location.href = "/pages/command.html";
  });

  // Quick tools
  $("btnOpenSOP")?.addEventListener("click", () => location.href = "/pages/sop/index.html");
  $("btnOpenPolicies")?.addEventListener("click", () => location.href = "/pagespolicies/index.html");
  $("btnOpenWebRoster")?.addEventListener("click", () => location.href = "/pages/webroster.html");

  // Placeholder views
  $("btnOpenDraftView")?.addEventListener("click", () => alert("Draft view not wired yet."));
  $("btnOpenApprovedView")?.addEventListener("click", () => alert("Approved view not wired yet."));

  // Status refresh (UI-only placeholders)
  $("btnRefreshStatus")?.addEventListener("click", () => {
    $("pubLast").textContent = "—";
    $("pubStatus").innerHTML = `<span class="stateWarn">Unknown</span>`;
    setUpdated();
  });

  // Repo links (set these once you want them)
  $("btnOpenRepo")?.addEventListener("click", () => {
    alert("Set your repo URL in js/pages/publisher.js (btnOpenRepo handler).");
  });
  $("btnOpenActions")?.addEventListener("click", () => {
    alert("Set your Actions URL in js/pages/publisher.js (btnOpenActions handler).");
  });
  $("btnOpenPages")?.addEventListener("click", () => {
    alert("Set your GitHub Pages URL in js/pages/publisher.js (btnOpenPages handler).");
  });

  $("btnAddChange")?.addEventListener("click", () => {
    alert("Add-change modal not wired yet (Phase 2).");
  });

  document.getElementById("btnOpenEditor")?.addEventListener("click", () => {
  location.href = "./editor.html";
});


  setUpdated();
})();
