document.addEventListener('DOMContentLoaded', () => {
    // Sections for adding and displaying notes
    const addCardSection = document.getElementById('add-card');
    const displayCardsSection = document.getElementById('display-cards');

    // Dummy data for initial notes
    let notes = [
        { title: "Title 1", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(100) },
        { title: "Title 2", content: "Quisque convallis ornare urna eu tincidunt. ".repeat(10) },
        { title: "Title 3", content: "Curabitur sit amet maximus massa. ".repeat(10) },
        { title: "Title 4", content: "Ut ultrices malesuada magna. ".repeat(3) },
        { title: "", content: "Ut ultrices malesuada magna. ".repeat(1) },
        { title: "Title 6", content: "" }
    ];

    // Object to hold the current note being edited
    let note = { title: '', content: '' };

    // Function to initialize the note editor button
    const addNote = () => {
        const addButton = document.createElement('button');
        addButton.id = 'add-card-button';
        addButton.textContent = "Take a note...";
        addButton.className = "add-card__details";
        addButton.addEventListener('click', openEditor); // Open editor on button click
        addCardSection.innerHTML = '';
        addCardSection.appendChild(addButton);
    };

    // Function to open the note editor modal
    const openEditor = () => {
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
        createNote.showModal(); // Display the modal

        // Retrieve elements
        const titleInput = document.getElementById('title');
        const contentTextarea = document.getElementById('content');
        const saveButton = document.getElementById('saveButton');

        // Function to update Save button visibility
        const updateSaveButtonVisibility = () => {
            const title = titleInput.value.trim();
            const content = contentTextarea.value.trim();
            saveButton.style.display = (title || content) ? 'inline-block' : 'none'; // Show button if content is present
        };

        // Event listeners
        titleInput.addEventListener('input', updateSaveButtonVisibility);
        contentTextarea.addEventListener('input', updateSaveButtonVisibility);
        contentTextarea.addEventListener('keydown', (event) => handleEnter(event));

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

    // Function to reset the editor state
    const resetEditor = () => {
        note = { title: '', content: '' };
        const dialogSpace = document.getElementById('add-card-button');
        if (dialogSpace) {
            dialogSpace.style.marginBottom = '0'; // Reset margin
        }
    };

    // Function to display the list of notes
    const displayNotes = () => {
        displayCardsSection.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('article');
            noteElement.className = 'note';
            noteElement.innerHTML = `<strong>${note.title}</strong>
            <p>${note.content.substring(0, 250)}${note.content.length > 250 ? '...' : ''}</p>`;
            noteElement.addEventListener('click', () => viewNoteDetails(index));
            displayCardsSection.appendChild(noteElement);
        });
    };

    // Function to show note details in a modal
    const viewNoteDetails = (index) => {
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

    // Function to adjust modal margins based on viewport height
    const adjustMargins = (dialog) => {
        const viewportHeight = window.innerHeight;
        const maxHeight = viewportHeight * 0.75; // 75% of viewport height

        if (dialog.scrollHeight > maxHeight) {
            dialog.style.height = `${maxHeight}px`;
            dialog.style.overflowY = 'auto'; // Enable scroll if content exceeds max height
        }
    };

    // Function to handle 'Enter' key press in textarea
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default newline
            const textarea = event.target;

            textarea.value += '\n'; // Add newline character
            adjustContentHeight(); // Adjust textarea height
        }
    };

    // Function to adjust the height of the textarea based on its content
    const adjustContentHeight = () => {
        const textarea = document.getElementById('content');
        const dialogSpace = document.getElementById('add-card-button'); // Check if this is the correct element
        const maxHeight = 500; // Set maximum height (in pixels)

        if (textarea) {
            textarea.style.height = 'auto'; // Reset height to allow proper scrollHeight calculation

            const newHeight = Math.min(textarea.scrollHeight, maxHeight);
            textarea.style.height = `${newHeight}px`;

            if (dialogSpace) {
                dialogSpace.style.marginBottom = `${newHeight + 50}px`; // Adjust margin
            }

            textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'; // Set overflow
        }
    };

    // Function to render the note editor and display existing notes
    const render = () => {
        addNote(); // Initialize note editor
        displayNotes(); // Display notes
    };

    // Initial rendering of the note editor and notes display
    render();
});
