document.addEventListener('DOMContentLoaded', () => {
    const displayCardsSection = document.getElementById('display-cards');
    const addCardButton = document.getElementById('add-card-button');
    const toggleButton = document.getElementById('toggle-view');
    const maxCharLength = 250; // Maximum length of content for uniform height
    const gridMinWidth = 992;  // Minimum width for grid view

    // Dummy data for initial notes
    let notes = [
        { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(70) },
        { title: "Title 2", content: "Quisque convallis ornare urna eu tincidunt. ".repeat(10) },
        { title: "Title 3", content: "Curabitur sit amet maximus massa. ".repeat(10) },
        { title: "Title 4", content: "Ut ultrices malesuada magna. ".repeat(3) },
        { title: "", content: "Ut ultrices malesuada magna. ".repeat(1) },
        { title: "Title 6", content: "" }
    ];

    //Empty trash array to hold deleted notes
    let trash = [];

    //****************************Add new note**************************** */
    // Object to hold the current note being edited
    let note = { title: '', content: '' };

    // Function to open the note editor modal
    function openEditor(editMode = false, noteIndex = null) {
        const createNote = document.createElement('dialog');
        createNote.id = 'create-note';
        createNote.className = 'add-card__details';
        createNote.innerHTML = `
            <input 
                id="title"
                class="create-note__details" 
                type="text" 
                placeholder="Title" 
                value="${editMode && noteIndex !== null ? notes[noteIndex].title : ''}">
    
            <textarea 
                id="content" 
                class="create-note__details"
                placeholder="Take a note..." 
                resize="none"
                rows="1">${editMode && noteIndex !== null ? notes[noteIndex].content : ''}</textarea>
            <br>
    
            <menu>
                <button id="cancelButton" class="button-details">Cancel</button>
                <button id="saveButton" class="button-details" style="display: none;">Save</button>
            </menu>
        `;
        document.body.appendChild(createNote);
        createNote.showModal();

        // Retrieve elements
        const titleInput = document.getElementById('title');
        const contentTextarea = document.getElementById('content');
        const saveButton = document.getElementById('saveButton');

        function updateSaveButtonVisibility() {
            const title = titleInput.value.trim();
            const content = contentTextarea.value.trim();
            saveButton.style.display = (title || content) ? 'inline-block' : 'none';
        };

        // Event listeners
        titleInput.addEventListener('input', updateSaveButtonVisibility);
        contentTextarea.addEventListener('input', updateSaveButtonVisibility);
        contentTextarea.addEventListener('input', adjustContentHeight);
        contentTextarea.addEventListener('keydown', (event) => handleEnter(event, contentTextarea));

        document.getElementById('cancelButton').addEventListener('click', () => {
            createNote.close(); // Close the modal
            createNote.remove(); // Remove from DOM
            resetEditor(); // Reset editor state
        });

        document.getElementById('saveButton').addEventListener('click', () => {
            const title = titleInput.value.trim();
            const content = contentTextarea.value.trim();

            if (title || content) {
                if (editMode && noteIndex !== null) {
                    notes[noteIndex] = { title, content }; // Update existing note
                } else {
                    notes.push({ title, content }); // Save new note
                }
                createNote.close(); // Close the modal
                createNote.remove(); // Remove from DOM
                resetEditor(); // Reset editor state
                displayNotes(); // Refresh notes display
            }
        });

        // Adjust content height initially
        adjustContentHeight();
        // Update the Save button visibility initially
        updateSaveButtonVisibility();
    };

    function handleEnter(event, textarea) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            textarea.value += '\n';
            adjustContentHeight();
        }
    };

    function resetEditor() {
        note = { title: '', content: '' };
        const dialogSpace = document.getElementById('add-card-button');
        if (dialogSpace) {
            dialogSpace.style.marginBottom = '0'; // Reset margin
        }
    };

    // Function to adjust the height of the textarea based on its content
    function adjustContentHeight() {
        const textarea = document.getElementById('content');
        const maxHeight = 500; // Set maximum height (in pixels)

        if (textarea) {
            textarea.style.height = 'auto'; // Reset height
            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;
            textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
        }
    };

    // Attach the click event to the button by its ID
    addCardButton.addEventListener('click', openEditor);


    //****************************Display notes*************************** */
    // Function to display notes in the display section
    function displayNotes() {
        displayCardsSection.innerHTML = '';
        // Reverse the notes array to show the newest notes first
        [...notes].reverse().forEach((note, index) => {
            const noteElement = document.createElement('article');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <img src="/public/images/svg/check-circle-solid.svg" class="note__icon" alt="select note" />
                <strong>${note.title}</strong>
                <p>${note.content.substring(0, maxCharLength)}${note.content.length > maxCharLength ? '...' : ''}</p>
                <footer class="note__footer">
                    <button id="editDetails-${index}" class="note-content__footer-button note__footer-button">
                        <img src="/public/images/svg/page-edit.svg" alt="edit note" />
                    </button>
                    <button id="deleteDetails-${index}" class="note-content__footer-button note__footer-button">
                        <img src="/public/images/svg/bin.svg" alt="delete note" />
                    </button>
                </footer>
                `;
            // Store the original index to use when viewing details
            noteElement.dataset.index = notes.length - 1 - index;
            noteElement.addEventListener('click', () => viewNoteDetails(noteElement.dataset.index));

            const editButton = noteElement.querySelector(`#editDetails-${index}`);
            const deleteButton = noteElement.querySelector(`#deleteDetails-${index}`);


            // Attach the note actions
            noteContextUpdateDeleteButton(editButton, deleteButton, noteElement.dataset.index);

            displayCardsSection.appendChild(noteElement);
        });
    };

    //****************************Note context*************************** */
    function viewNoteDetails(index) {
        const note = notes[index];
        const noteDetails = document.createElement('dialog');
        noteDetails.id = 'note-details';
        noteDetails.innerHTML = `
           <header class="note__header">
                <h2>${note.title}</h2>
                <button id="closeDetails" class="button-details">&times;</button>
            </header>
            <p class="note__content">${note.content}</p>
            <footer class="note__footer">
                <button id="editDetails" class="note-content__footer-button">
                    <img src="/public/images/svg/page-edit.svg" alt="edit note" />
                </button>
                <button id="deleteDetails" class="note-content__footer-button">
                    <img src="/public/images/svg/bin.svg" alt="delete note" />
                </button>
            </footer>
        `;

        document.body.appendChild(noteDetails);
        noteDetails.showModal(); // Display the modal

        document.getElementById('closeDetails').addEventListener('click', () => {
            noteDetails.close(); // Close the modal
            noteDetails.remove(); // Remove from DOM
        });

        // document.getElementById('editDetails').addEventListener('click', () => {
        //     openEditor(true, index); // Open editor for editing
        //     noteDetails.close();
        //     noteDetails.remove();
        // });

        // document.getElementById('deleteDetails').addEventListener('click', () => {
        //     trash.push(notes.splice(index, 1)[0]); // Move note to trash
        //     noteDetails.close();
        //     noteDetails.remove();
        //     displayNotes(); // Refresh notes display
        // });

        const editButton = document.getElementById('editDetails');
        const deleteButton = document.getElementById('deleteDetails');

        // Attach the note actions
        noteContextUpdateDeleteButton(editButton, deleteButton, index, noteDetails);
    };

    function noteContextUpdateDeleteButton(editButton, deleteButton, index, noteDetails = null) {
        editButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering any parent click events
            openEditor(true, index); // Open editor for editing

            if (noteDetails) {
                noteDetails.close(); // Close the modal if it exists
                noteDetails.remove();
            }
        });

        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent triggering any parent click events
            trash.push(notes.splice(index, 1)[0]); // Move note to trash

            if (noteDetails) {
                noteDetails.close(); // Close the modal if it exists
                noteDetails.remove();
            }
            displayNotes(); // Refresh notes display
        });
    }

    //****************************Grid/List******************************** */
    // Function to set the layout (grid or list)
    function setLayout(layout) {
        const notesContainer = document.querySelector("[data-notes-container]");
        if (layout === "grid") {
            notesContainer.classList.add("notes--grid");
            notesContainer.classList.remove("notes--list");
            toggleButton.dataset.view = "grid";
        } else if (layout === "list") {
            notesContainer.classList.remove("notes--grid");
            notesContainer.classList.add("notes--list");
            toggleButton.dataset.view = "list";
        } else {
            throw new Error(`Unknown layout: ${layout}`);
        }

        // Update button icons
        const iconList = toggleButton.querySelector('[data-icon="list"]');
        const iconGrid = toggleButton.querySelector('[data-icon="grid"]');
        if (layout === "grid") {
            iconList.style.display = 'none';
            iconGrid.style.display = 'block';
        } else {
            iconList.style.display = 'block';
            iconGrid.style.display = 'none';
        }

        // Save the current layout in localStorage if the screen is wide enough
        if (window.innerWidth >= gridMinWidth) {
            localStorage.setItem("layout", layout);
        }
    }

    // Function to handle the layout toggle button click
    toggleButton.onclick = () => {
        if (window.innerWidth >= gridMinWidth) {
            const currentLayout = toggleButton.dataset.view;
            if (currentLayout === "grid") {
                setLayout("list");
            } else {
                setLayout("grid");
            }
        }
    };

    // Function to check the screen size and adjust layout options
    function checkScreenSize() {
        if (window.innerWidth < gridMinWidth) {
            // If screen is small, force list view and disable toggle to grid
            setLayout("list");
            toggleButton.disabled = true;
        } else {
            // Re-enable the toggle button if the screen is wide enough
            toggleButton.disabled = false;
            const savedLayout = localStorage.getItem("layout") || "grid";
            setLayout(savedLayout);
        }
    }

    // Event listener for window resize to dynamically adjust layout
    window.addEventListener('resize', checkScreenSize);

    // Initial rendering of notes and layout setup
    function render() {
        displayNotes();
        checkScreenSize();  // Check screen size initially
    }

    // Initial setup
    render();
});
