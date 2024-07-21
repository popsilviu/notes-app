// @ts-check

/**
 * @typedef {Object} BaseNote
 * @property {string} id - The unique identifier for the note.
 * @property {string} title - The title of the note.
 */

/**
 * @typedef {Object} _NoteWithDescription
 * @property {string} description - The description of the note.
 * @property {"details"} type
 * @typedef {BaseNote & _NoteWithDescription} NoteWithDescription
 */

/**
 * @typedef {Object} _NoteWithTasks
 * @property {string[]} tasks - A list of tasks.
 * @property {"tasks"} type
 * @typedef {BaseNote & _NoteWithTasks} NoteWithTasks
 */

/**
 * @typedef {NoteWithDescription | NoteWithTasks} Note
 */

class NotesDataAPI {
  /**
   * @type {Map<string, Note>}
   */
  notes = new Map();

  /**
   * Fetch the notes data from the API
   * @param {string} [url]
   */
  fetchData(url) {
    if (url == undefined) return this.updateNotes(mockData);

    fetch(url)
      .then((res) => res.json())
      .then((notes) => this.updateNotes(notes))
      .catch((e) => console.error(e));
  }

  /**
   * Update the list of notes based on their id
   * @param {readonly Note[]} notes
   */
  updateNotes(notes) {
    notes.forEach((note) => this.updateNote(note, false));
    this.updatePage();
  }

  /**
   * @param {Note} note
   * @param {boolean} updatePage
   */
  updateNote(note, updatePage = true) {
    const noteData = this.notes.get(note.id) ?? {};

    // merge contents of both objects
    // might be a bad practice
    // Silviu help
    this.notes.set(note.id, { ...noteData, ...note });

    if (updatePage) this.updatePage();
  }

  updatePage() {
    const notesConentArea = document.querySelector("#notes-content-area");

    if (notesConentArea == null)
      return console.error("Missing notes content area");

    notesConentArea.innerHTML = "";

    for (const note of this.notes.values())
      if (note.type == "details")
        notesConentArea.appendChild(NoteWithDescriptionHTML(note));
      else notesConentArea.appendChild(NoteWithTasksHTML(note));
  }
}

// TODO: rethink the functions below after we have the markup for a note

/**
 * Generate the HTML code for a note with details
 * @param {NoteWithDescription} note
 * @returns {Node}
 */
function NoteWithDescriptionHTML(note) {
  return element("div", {}, [
    element("h2", {}, [document.createTextNode(note.title)]),
    element("p", {}, [document.createTextNode(note.description)]),
  ]);
}

/**
 * Generate the HTML code for a note with tasks
 * @param {NoteWithTasks} note
 * @returns {Node}
 */
function NoteWithTasksHTML(note) {
  return element("div", {}, [
    element("h2", {}, [document.createTextNode(note.title)]),
    element(
      "ul",
      {},
      note.tasks.map((task) =>
        element("li", {}, [document.createTextNode(task)]),
      ),
    ),
  ]);
}

/**
 * Creates an HTML element.
 * @param {string} tag - The tag name of the element.
 * @param {Object.<string, string>} attributes - The attributes of the element as key-value pairs.
 * @param {Node[]} children - The list of children strings to be added to the element.
 * @returns {Node} The created HTML element.
 */
function element(tag, attributes, children) {
  const el = document.createElement(tag);

  Object.entries(attributes).forEach(([key, value]) =>
    el.setAttribute(key, value),
  );

  children.forEach((child) => el.appendChild(child));

  return el;
}

// TODO: remove everyting below this one we have data

function generateRandomString(minLength, maxLength) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

function generateRandomList(minTasks, maxTasks) {
  const tasks =
    Math.floor(Math.random() * (maxTasks - minTasks + 1)) + minTasks;

  return new Array(tasks).fill(0).map(() => generateRandomString(5, 15));
}

const iota = (() => {
  let n = 0;
  return () => n++;
})();

/**
 * @type {readonly Note[]}
 */
// @ts-expect-error type fuckery
const mockData = Object.freeze([
  ...new Array(3).fill(0).map(() => {
    const n = iota();
    return {
      id: n + "",
      title: "Note " + n,
      description: generateRandomString(10, 20),
      type: "details",
    };
  }),
  ...new Array(3).fill(0).map(() => {
    const n = iota();
    return {
      id: n + "",
      title: "Note " + n,
      tasks: generateRandomList(1, 5),
      type: "tasks",
    };
  }),
  {
    id: iota() + "",
    title: "Note with long description",
    description: generateRandomString(300, 400),
    type: "details",
  },
]);

const api = new NotesDataAPI();

document.addEventListener("DOMContentLoaded", () => api.fetchData());
