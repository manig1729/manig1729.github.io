const projectEntries = document.querySelectorAll(".project-entry");
const root = document.documentElement;
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;
let trailX = pointerX;
let trailY = pointerY;
let trailFrame = 0;

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
