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
        deletedNote.className = "note";
        deletedNote.innerHTML = `
                <strong>${note.title}</strong>
                <p>${fillNote(note)}</p>
                <footer class="note__footer">
                    <button class="note-content__footer-button note__footer-button" 
                    onclick="deleteThisNote(this.parentElement.parentElement.dataset.index)">
                        <i class="iconoir-bin"></i>
                    </button>
                     <button class="note-content__footer-button note__footer-button" onclick="displayConfirmation(this.parentElement.parentElement.dataset.index)">
                        <i class="iconoir-maps-turn-back"></i>
                     </button>
                </div>
            `;
        deletedNote.dataset.index = index;
        notesContainer.appendChild(deletedNote);
    });
}

function fillNote(note) {
    if (note.content.length > 250) {
        return (note.content.substring(0, 250) + "...");
    } else {
        return (note.content);
    }
}

function displayConfirmation(noteIndex) {
    let confirmChoice = document.createElement("dialog");
    
    confirmChoice.id = 'confirmChoice-details';
    confirmChoice.innerHTML = `
                           
        <p>Do you want to restore this?</p>
        <footer class="note__footer">
            <button class="note-content__footer-button " onclick="restoreThisNote(${noteIndex}, this.parentElement.parentElement)">Yes</button>
            <button class="note-content__footer-button" onclick="hideConfirmation(this.parentElement.parentElement)">No</button>
        </footer>
        `
    notesContainer.appendChild(confirmChoice);
    confirmChoice.showModal();
    document.body.style.overflow = "hidden";
}

function hideConfirmation(elementToHide) {
    elementToHide.close();
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