(async function(){
  const scrim = document.getElementById("loginScrim");
  const openBtn = document.getElementById("openLogin");
  const closeBtn = document.getElementById("closeLogin");
  const cancelBtn = document.getElementById("cancelLogin");
  const doLoginBtn = document.getElementById("doLogin");
  const errBox = document.getElementById("loginErr");

  const userEl = document.getElementById("loginUser");
  const passEl = document.getElementById("loginPass");

  const params = new URLSearchParams(location.search);
  const next = params.get("next") || "/pages/info/index.html";

  function show(){
    errBox.style.display = "none";
    errBox.textContent = "";
    scrim.style.display = "flex";
    setTimeout(() => userEl.focus(), 50);
  }
  function hide(){
    scrim.style.display = "none";
    passEl.value = "";
  }

  openBtn?.addEventListener("click", show);
  closeBtn?.addEventListener("click", hide);
  cancelBtn?.addEventListener("click", hide);

  scrim?.addEventListener("click", (e) => {
    if (e.target === scrim) hide();
  });

  async function doLogin(){
    errBox.style.display = "none";
    errBox.textContent = "";

    const user = String(userEl.value || "").trim();
    const pass = String(passEl.value || "").trim();

    if (!user || !pass){
      errBox.textContent = "Please enter username and password.";
      errBox.style.display = "block";
      return;
    }

    try{
      const data = await window.LSPD_AUTH.login(user, pass);
      // Redirect to requested page
      window.location.href = next;
    }catch(err){
      errBox.textContent = err.message || "Login failed.";
      errBox.style.display = "block";
    }
  }

  doLoginBtn?.addEventListener("click", doLogin);
  passEl?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") doLogin();
  });

  // Optional: if already logged in, you could change the Login button to "Continue"
  // (we’ll do this after auth is live)
})();