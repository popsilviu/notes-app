document.addEventListener('DOMContentLoaded', () => {
    // Sections for adding and displaying notes
    const displayCardsSection = document.getElementById('display-cards');
    const addCardButton = document.getElementById('add-card-button');

    // Dummy data for initial notes
    let notes = [
        { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(70) },
        { title: "Title 2", content: "Quisque convallis ornare urna eu tincidunt. ".repeat(10) },
        { title: "Title 3", content: "Curabitur sit amet maximus massa. ".repeat(10) },
        { title: "Title 4", content: "Ut ultrices malesuada magna. ".repeat(3) },
        { title: "", content: "Ut ultrices malesuada magna. ".repeat(1) },
        { title: "Title 6", content: "" }
    ];

    // Object to hold the current note being edited
    let note = { title: '', content: '' };

    // Function to open the note editor modal
    function openEditor() {
        const createNote = document.createElement('dialog');
        createNote.id = 'create-note';
        createNote.className = 'add-card__details';
        createNote.innerHTML = `
            <input 
                id="title"
                class="create-note__details" 
                type="text" 
                placeholder="Title" 
                value="${note.title}">

            <textarea 
                id="content" 
                class="create-note__details"
                placeholder="Take a note..." 
                resize="none"
                rows="1">${note.content}</textarea>
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
                note.title = title;
                note.content = content;
                notes.push({ ...note }); // Save the note
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

    function resetEditor() {
        note = { title: '', content: '' };
        const dialogSpace = document.getElementById('add-card-button');
        if (dialogSpace) {
            dialogSpace.style.marginBottom = '0'; // Reset margin
        }
    };

    /* Function to display the most recent notes first*/
    function displayNotes() {
        displayCardsSection.innerHTML = '';
        // Reverse the notes array to show the newest notes first
        [...notes].reverse().forEach((note, index) => {
            const noteElement = document.createElement('article');
            noteElement.className = 'note';
            noteElement.innerHTML = `
                <strong>${note.title}</strong>
                <p>${note.content.substring(0, 250)}${note.content.length > 250 ? '...' : ''}</p>
            `;
            // Store the original index to use when viewing details
            noteElement.dataset.index = notes.length - 1 - index;
            noteElement.addEventListener('click', () => viewNoteDetails(noteElement.dataset.index));
            displayCardsSection.appendChild(noteElement);
        });
    };

    function viewNoteDetails(index) {
        const note = notes[index];
        const noteDetails = document.createElement('dialog');
        noteDetails.id = 'note-details';
        noteDetails.className = 'note-details';
        noteDetails.innerHTML = `
           <header class="note__header">
                <h2 class="view-note-title">${note.title}</h2>
                <button id="closeDetails" class="button-details">&times;</button>
            </header>
            <p>${note.content}</p>
        `;

        document.body.appendChild(noteDetails);
        noteDetails.showModal(); // Display the modal

        adjustMargins(noteDetails); // Adjust modal height based on viewport

        document.getElementById('closeDetails').addEventListener('click', () => {
            noteDetails.close(); // Close the modal
            noteDetails.remove(); // Remove from DOM
        });
    };

    function adjustMargins(dialog) {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * 0.75; // 75% of viewport height

        if (dialog.scrollHeight > maxHeight) {
            dialog.style.height = `${maxHeight}px`;
            dialog.style.overflowY = 'auto';
        }
    };

    function handleEnter(event, textarea) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            textarea.value += '\n';
            adjustContentHeight();
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

    // Function to render the note editor and display existing notes
    const render = () => {
        displayNotes(); // Display notes
    };

    // Initial rendering of the note editor and notes display
    render();
});
