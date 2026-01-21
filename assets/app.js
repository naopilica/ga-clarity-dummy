function gaEvent(name, params = {}) {
  if (typeof gtag === "function") gtag("event", name, params);
}

document.addEventListener("click", (e) => {
  const id = e.target?.id;

  if (id === "cta_signup") {
    gaEvent("sign_up", { method: "dummy_button" });
    if (typeof clarity === "function") clarity("set", "funnel_step", "signup_click");
  }

  if (id === "cta_download") {
    gaEvent("file_download", { file_name: "dummy.pdf" });
  }

  if (id === "cta_search") {
    gaEvent("search", { search_term: "dummy search" });
  }

  if (id === "cta_error") {
    throw new Error("Dummy error for testing");
  }

  if (id === "outbound") {
    gaEvent("click", { link_url: e.target.href, outbound: true });
  }

  if (id === "buy_basic") {
    gaEvent("purchase", {
      transaction_id: "T" + Date.now(),
      currency: "JPY",
      value: 1200,
      items: [{ item_id: "basic", item_name: "Basic Plan", price: 1200, quantity: 1 }]
    });
    alert("purchase イベント送信（ダミー）");
  }
});

const leadForm = document.getElementById("lead_form");
if (leadForm) {
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    gaEvent("generate_lead", { form_id: "lead_form" });
    if (typeof clarity === "function") clarity("set", "lead", "submitted");
    window.location.href = "thanks.html";
  });
}

let fired = { s25: false, s50: false, s75: false };
window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;

  if (scrolled > 25 && !fired.s25) { fired.s25 = true; gaEvent("scroll_25"); }
  if (scrolled > 50 && !fired.s50) { fired.s50 = true; gaEvent("scroll_50"); }
  if (scrolled > 75 && !fired.s75) { fired.s75 = true; gaEvent("scroll_75"); }
});
