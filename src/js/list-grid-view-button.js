const layoutModifierClassName = "notes__container--grid__layout";

function setLayout(layout) {
  const notesContainer = document.querySelector("#notes-container");
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
  const notesContainer = document.querySelector("#notes-container");
  const listGridButton = document.querySelector("#layoutToggleButton");
  let lastLayout = localStorage.getItem("layout");
  console.log("the layout was " + lastLayout);
  changeListGridIcon(listGridButton, lastLayout);

  if (notesContainer.classList.contains(layoutModifierClassName))
    setLayout("list");
  else setLayout("grid");
}

document.addEventListener("DOMContentLoaded", () => {
  const layout = localStorage.getItem("layout") ?? "grid";
  const listGridButton = document.querySelector("#layoutToggleButton");
  setLayout(layout);
  console.log("The current layout is " + layout);
  setListGridIcon(listGridButton, layout);
});

function setListGridIcon(button, currentLayout) {
  if(currentLayout === "list") {
    button.innerHTML = '<i data-icon="list" class=" header__icon iconoir-view-grid"></i>'
  } else if (currentLayout === "grid") {
    button.innerHTML = '<i data-icon="grid" class="header__icon iconoir-list"></i>'
  }
}

function changeListGridIcon(button, lastLayout) {
  if(lastLayout === "list") {
    button.innerHTML = '<i data-icon="list" class=" header__icon iconoir-list"></i>'
  } else if (lastLayout === "grid") {
    button.innerHTML = '<i data-icon="grid" class="header__icon iconoir-view-grid"></i>'
  }
}