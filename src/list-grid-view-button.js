const listGridButton = document.querySelector(
  ".list-grid-button[data-view]",
);

listGridButton.onclick = () => {
  const notesContainer = document.querySelector("[data-notes-container]");
  const listGridButton = document.querySelector(
    ".list-grid-button[data-view]",
  );

  if (notesContainer.classList.contains("notes-grid")) {
    notesContainer.classList.remove("notes-grid");
    listGridButton.dataset.view = "list";
  } else {
    notesContainer.classList.add("notes-grid");
    listGridButton.dataset.view = "grid";
  }
};
