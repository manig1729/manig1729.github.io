const projectEntries = document.querySelectorAll(".project-entry");
const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleLabel = document.querySelector(".theme-toggle-label");
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let trailX = pointerX;
let trailY = pointerY;
let trailFrame = 0;

const setTheme = (theme) => {
  const nextTheme = theme === "light" ? "light" : "dark";

  root.dataset.theme = nextTheme;
  themeToggle?.setAttribute("aria-pressed", String(nextTheme === "light"));
  themeToggle?.setAttribute("aria-label", `Switch to ${nextTheme === "light" ? "dark" : "light"} theme`);

  if (themeToggleLabel) {
    themeToggleLabel.textContent = nextTheme === "light" ? "Light" : "Dark";
  }
};

setTheme(localStorage.getItem("theme") || "dark");

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "light" ? "dark" : "light";

  setTheme(nextTheme);
  localStorage.setItem("theme", nextTheme);
});

projectEntries.forEach((entry) => {
  entry.addEventListener("toggle", () => {
    if (!entry.open) return;

    projectEntries.forEach((otherEntry) => {
      if (otherEntry !== entry) {
        otherEntry.removeAttribute("open");
      }
    });
  });
});

if (window.matchMedia("(pointer: fine)").matches) {
  const moveTrail = () => {
    trailX += (pointerX - trailX) * 0.14;
    trailY += (pointerY - trailY) * 0.14;

    root.style.setProperty("--trail-x", `${trailX}px`);
    root.style.setProperty("--trail-y", `${trailY}px`);

    if (document.body.classList.contains("has-pointer")) {
      trailFrame = window.requestAnimationFrame(moveTrail);
    } else {
      trailFrame = 0;
    }
  };

  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    document.body.classList.add("has-pointer");

    if (!trailFrame) {
      trailFrame = window.requestAnimationFrame(moveTrail);
    }
  });

  window.addEventListener("pointerleave", () => {
    document.body.classList.remove("has-pointer");
  });
}
