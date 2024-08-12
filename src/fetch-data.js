class NotesDataAPI {
  #notes = [];

  // TODO: replace once we have the url
  #baseURL = "http://localhost:3000";

  // TODO: remove once we have data
  getNotesDummy() {
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
   * Retrieve notes data from the API.
   */
  async getNotes() {
    const url = this.#baseURL;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }

    this.#notes = await res.json();
    this.#refreshPage();
  }

  /**
   * Create a new note.
   * @param note The note to create.
   * @param refetch Whether to refetch the notes after creating the new note. Defaults to true. Useful for batch updates.
   */
  async createNote(note, refetch = true) {
    const url = this.#baseURL;
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(note),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }

    if (refetch === true) return this.getNotes();
  }

  /**
   * Update an existing note's data.
   * @param note The note to update.
   * @param refetch Whether to refetch the notes after creating the new note. Defaults to true. Useful for batch updates.
   */
  async updateNote(note, refetch = true) {
    const url = `${this.#baseURL}/${note.id}`;
    const res = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(note),
    });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }

    if (refetch === true) return this.getNotes();
  }

  /**
   * Delete a note by ID.
   * @param noteID The ID of the note to delete.
   * @param refetch Whether to refetch the notes after creating the new note. Defaults to true. Useful for batch updates.
   */
  async deleteNote(noteID, refetch = true) {
    const url = `${this.#baseURL}/${noteID}`;
    const res = await fetch(url, { method: "DELETE" });

    if (!res.ok) {
      throw new Error(
        `Failed to fetch ${url}: ${res.status} ${res.statusText}`,
      );
    }

    if (refetch === true) return this.getNotes();
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

    for (const note of this.#notes.values())
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

document.addEventListener("DOMContentLoaded", () => api.getNotesDummy());
