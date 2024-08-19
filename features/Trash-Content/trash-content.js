let deletedNotes = [
    { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(70) },
    { title: "Title 2", content: "Quisque convallis ornare urna eu tincidunt. ".repeat(10) },
    { title: "Title 3", content: "Curabitur sit amet maximus massa. ".repeat(10) },
    { title: "Title 4", content: "Ut ultrices malesuada magna. ".repeat(3) },
    { title: "", content: "Ut ultrices malesuada magna. ".repeat(1) },
    { title: "Title 6", content: "" },
    { title: "Title 7", content: "Curabitur sit amet maximus massa. ".repeat(10) },
    { title: "Title 8", content: "Ut ultrices malesuada magna. ".repeat(3) }
];

let notesContainer = document.querySelector(".trash-content__notes");
displayDeletedNotes();


function displayDeletedNotes() {
    notesContainer.innerHTML = "";
    deletedNotes.forEach((note, index) => {
        let deletedNote = document.createElement("article");
        deletedNote.className = "trash-content__notes__deleted-note";
        deletedNote.innerHTML = `
                <strong>${note.title}</strong>
                <p>${fillNote(note)}</p>
                <div class="note__buttons">
                    <button class="note__buttons__delete-button" onclick="deleteThisNote(this.parentElement.parentElement.dataset.index)">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                     <button class="note__buttons__restore-button" onclick="displayConfirmation(this.parentElement.parentElement.dataset.index)">
                        <i class="fa-solid fa-trash-can-arrow-up"></i>
                     </button>
                </div>
            `;
        deletedNote.dataset.index = index;
        notesContainer.appendChild(deletedNote);
    });
}

function fillNote(note) {
    if(note.content.length > 250) {
        return (note.content.substring(0,250) + "...");
    } else {
        return (note.content);
    }
}

function displayConfirmation(noteIndex) {
    let confirmChoice = document.createElement("div");
    confirmChoice.className = "confirm-action";
    confirmChoice.innerHTML = `
                            <div class="confirm-action__background"></div>
                            <div class="confirm-action__choices">
                                <span>Do you want to restore this?</span>
                                <button onclick="restoreThisNote(${noteIndex}, this.parentElement.parentElement)">Yes</button>
                                <button onclick="hideConfirmation(this.parentElement.parentElement)">No</button>
                            </div>;`
    notesContainer.appendChild(confirmChoice);
    document.body.style.overflow = "hidden";
}

function hideConfirmation(elementToHide) {
 notesContainer.removeChild(elementToHide);
 document.body.style.overflow = "scroll";
}

function deleteThisNote(noteIndex) {
    try {
        apiCallDelete();
        delete deletedNotes[noteIndex];
        displayDeletedNotes();
    } catch {
        console.log("something went wrong");
    }
}

function restoreThisNote(noteIndex, elementToHide) {
    try {
        console.log(noteIndex);
        apiCallRestore();
        delete deletedNotes[noteIndex];
        displayDeletedNotes();
        document.body.style.overflow = "scroll";
    } catch {
        console.log("something went wrong");
        hideConfirmation(elementToHide);
    }
}

function deleteAllNotes() {
    try {
        apiCallDeleteAll();
        deletedNotes.length = 0;
        displayDeletedNotes();
    } catch {
        console.log("something went wrong");
    }
}

function restoreAllNotes() {
    try {
        apiCallRestoreAll();
        deletedNotes.length = 0;
        displayDeletedNotes();
    } catch {
        console.log("something went wrong");
    }
}

function apiCallDelete() {
    console.log("api call delete this note");
}

function apiCallRestore() {
    console.log("api call restore this note")
}

function apiCallDeleteAll() {
    console.log("api call delete all notes");
}

function apiCallRestoreAll() {
    console.log("api call restore all notes")
}