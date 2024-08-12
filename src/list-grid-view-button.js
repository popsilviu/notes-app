function setLayout(layout) {
  const notesContainer = document.querySelector("[data-notes-container]");

  if (layout === "grid") {
    notesContainer.classList.add("notes-grid");
    listGridButton.dataset.view = "grid";
  } else if (layout === "list") {
    notesContainer.classList.remove("notes-grid");
    listGridButton.dataset.view = "list";
  } else throw new Error(`Unknown layout: ${layout}`);

  localStorage.setItem("layout", layout);
}

const listGridButton = document.querySelector(".list-grid-button[data-view]");

listGridButton.onclick = () => {
  const notesContainer = document.querySelector("[data-notes-container]");
  const listGridButton = document.querySelector(".list-grid-button[data-view]");

  if (notesContainer.classList.contains("notes-grid")) setLayout("list");
  else setLayout("grid");
};

document.addEventListener("DOMContentLoaded", () => {
  const layout = localStorage.getItem("layout") ?? "grid";
  setLayout(layout);
});
