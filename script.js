const $ = (selector) => document.querySelector(selector);
const show = (selector) => {
  const section = $(selector);
  section.classList.remove("hidden");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
};

$("#startBtn").addEventListener("click", () => show("#capitulo"));
$("#letterBtn").addEventListener("click", () => show("#carta"));

$("#envelope").addEventListener("click", () => {
  const paper = $("#letterPaper");
  const isOpening = paper.hidden;
  paper.hidden = !isOpening;
  $("#envelope").setAttribute("aria-expanded", String(isOpening));
  if (isOpening) {
    $("#nextStep").classList.remove("hidden");
    setTimeout(
      () => paper.scrollIntoView({ behavior: "smooth", block: "center" }),
      100,
    );
  } else {
    $("#nextStep").classList.add("hidden");
  }
});

$("#verdictBtn").addEventListener("click", () => show("#veredito"));

document.querySelectorAll("[data-verdict]").forEach((button) => {
  button.addEventListener("click", () => {
    const cute = button.dataset.verdict === "fofo";
    $("#result").textContent = cute
      ? "Veredito aceito! Agora vou ficar sorrindo pra tela por uns 3 dias. Obrigado, Agatha. ♡"
      : "Bobo? Justo. Mas pelo menos sou um bobo que adora conversar com você. ♡";
    burstHearts();
  });
});

const petalContainer = $("#petals");
function createPetal(isBurst = false) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const petal = document.createElement("span");
  petal.className = "petal";
  petal.textContent = Math.random() > 0.5 ? "♥" : "✦";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty("--size", `${10 + Math.random() * 14}px`);
  petal.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
  petal.style.animationDuration = `${5 + Math.random() * 6}s`;
  if (isBurst) petal.style.top = `${Math.random() * 35}%`;
  petalContainer.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}
function burstHearts() {
  for (let i = 0; i < 25; i++) createPetal(true);
}
for (let i = 0; i < 12; i++) setTimeout(createPetal, i * 350);
setInterval(() => {
  if (!document.hidden) createPetal();
}, 950);
