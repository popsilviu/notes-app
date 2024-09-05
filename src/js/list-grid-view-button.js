/*
const layoutModifierClassName = "notes__container--grid__layout";

function setLayout(layout) {
  const notesContainer = document.querySelector("#notesContainer");
  const layoutToggleButton = document.querySelector("#layoutToggleButton");

  if (layout === "grid") {
    notesContainer.classList.add(layoutModifierClassName);
    layoutToggleButton.dataset.view = "grid";
  } else if (layout === "list") {
    notesContainer.classList.remove(layoutModifierClassName);
    layoutToggleButton.dataset.view = "list";
  } else throw new Error(`Unknown layout: ${layout}`);

  localStorage.setItem("layout", layout);
}

function toggleLayout() {
  const notesContainer = document.querySelector("#notesContainer");
  const listGridButton = document.querySelector("#layoutToggleButton");

  if (notesContainer.classList.contains(layoutModifierClassName))
    setLayout("list");
  else setLayout("grid");
}

document.addEventListener("DOMContentLoaded", () => {
  const layout = localStorage.getItem("layout") ?? "grid";
  setLayout(layout);
});
*/

