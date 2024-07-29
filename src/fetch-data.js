class NotesDataAPI {
  #notes = [];

  /**
   * Retrieve notes data from the API.
   */
  async getNotes() {
    // GET request to the API
    //const res = await fetch(url);
    //this.#notes = await res.json();

    this.#notes = [
      {
        id: "1",
        title: "Note 1",
        description: new Array(5).fill("a").join(""),
        type: "details",
      },
      {
        id: "2",
        title: "Note 2",
        tasks: ["task 1", "task 2", "task 3", "task 4"],
        type: "tasks",
      },
    ];

    this.#refreshPage();
  }

  /**
   * Refresh the page.
   * @private
   */
  #refreshPage() {
    const notesConentArea = document.querySelector("#notes-content-area");

    if (notesConentArea == null)
      return console.error("Missing notes content area");

    notesConentArea.innerHTML = "";

    for (const note of this.notes.values())
      if (note.type == "details")
        notesConentArea.appendChild(
          element("div", {}, [
            element("h2", {}, [document.createTextNode(note.title)]),
            element("p", {}, [document.createTextNode(note.description)]),
          ]),
        );
      else
        notesConentArea.appendChild(
          element("div", {}, [
            element("h2", {}, [document.createTextNode(note.title)]),
            element(
              "ul",
              {},
              note.tasks.map((task) =>
                element("li", {}, [document.createTextNode(task)]),
              ),
            ),
          ]),
        );
  }
}

/**
 * Creates an HTML element.
 * @param tag - The tag name of the element.
 * @param attributes - The attributes of the element as key-value pairs.
 * @param children - The list of children strings to be added to the element.
 * @returns The created HTML element.
 */
function element(tag, attributes, children) {
  const el = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) =>
    el.setAttribute(key, value),
  );

  children.forEach((child) => el.appendChild(child));

  return el;
}

const api = new NotesDataAPI();

document.addEventListener("DOMContentLoaded", () => api.getNotes());
