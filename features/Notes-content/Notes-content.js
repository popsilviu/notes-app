document.addEventListener('DOMContentLoaded', () => {
    // Sections for adding and displaying notes
    const addCardSection = document.getElementById('add-card');
    const displayCardsSection = document.getElementById('display-cards');
    const popup = document.getElementById('popup');

    // Dummy data for initial notes
    let notes = [
        {
            title: "Title 1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam faucibus arcu eros, sit amet pulvinar leo bibendum nec. Duis fermentum ut ligula eu varius. Integer nec ornare arcu. Sed blandit lobortis consectetur. Etiam non lacinia sem, nec porta leo. Nam sit amet nulla congue, efficitur risus in, pellentesque nibh. Maecenas scelerisque lacus nunc, a rutrum est laoreet et. Mauris id commodo nunc. Vestibulum sit amet tristique lectus, eget malesuada risus. Proin facilisis odio et nisl congue, eget facilisis augue commodo. Maecenas lobortis enim vel quam pulvinar, quis sagittis mauris consectetur. Duis imperdiet magna lacus, sit amet convallis tortor interdum in. Suspendisse aliquam at lorem eu facilisis. Phasellus consequat nulla eget erat suscipit facilisis. Donec elementum, nisl placerat pulvinar interdum, sem justo sagittis est, ac fermentum orci mauris sed elit."
        },
        { title: "Title 2", content: "Quisque convallis ornare urna eu tincidunt. ".repeat(10) },
        { title: "Title 3", content: "Curabitur sit amet maximus massa. ".repeat(10) },
        { title: "Title 4", content: "Ut ultrices malesuada magna. ".repeat(3) },
    ];

    // Current note being edited
    let note = { title: '', content: '' };

    // Function to create the note editor in collapsed state
    const addNote = () => {
        addCardSection.innerHTML = `
            <article class="add-card new-note">
                <textarea
                    id="content"
                    class="card-details"
                    placeholder="Take a note..."
                    rows="1"
                    onfocus="expandEditor()"
                    oninput="updateContent(event)"
                    onkeydown="handleEnter(event)"
                >${note.content}</textarea>
        `;
    };

    // Function to expand the note editor
    window.expandEditor = () => {
        const textarea = document.getElementById('content');
        if (textarea) {
            addCardSection.innerHTML = `
                <article class="add-card new-note">
                    <input 
                        id="title" 
                        class="card-details" 
                        type="text" 
                        placeholder="Title" 
                        value="${note.title}" />
                    
                    <textarea 
                        id="content" 
                        class="card-details" 
                        placeholder="Take a note..." 
                        rows="1" 
                        oninput="updateContent(event); adjustContentHeight()"
                        onkeydown="handleEnter(event)">${note.content}</textarea>
                    <br />

                    <button id="cancelButton">Cancel</button>
                    <button id="okButton">Ok</button>
                </article>
            `;
            document.getElementById('okButton').addEventListener('click', handleOk);
            document.getElementById('cancelButton').addEventListener('click', resetEditor);
            adjustContentHeight(); // Adjust height initially
        }
    };

    // Function to handle 'Enter' key press in textarea
    window.handleEnter = (event) => {
        if (event.key === 'Enter') {
            // Prevent default behavior of adding a new line
            event.preventDefault();
            const textarea = event.target;

            // Add a newline character
            textarea.value += '\n'; 

            // Adjust textarea height to fit content
            adjustContentHeight(); 
        }
    };

    // Function to adjust the height of the textarea based on its content
    const adjustContentHeight = () => {
        const textarea = document.getElementById('content');
        const maxHeight = 500; // Set maximum height (in pixels)

        if (textarea) {
            // Reset height to allow for proper scrollHeight calculation
            textarea.style.height = 'auto'; 

            // Set height based on content scrollHeight with a maximum limit
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`; 

            // Set overflow to auto if content exceeds maxHeight
            textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';
        }
    };

    // Function to update content on input
    window.updateContent = (event) => {
        note.content = event.target.value;
        adjustContentHeight(); // Adjust height on input
    };

    // Function to display the list of notes
    const displayNotes = () => {
        displayCardsSection.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('article');
            noteElement.classList.add('note');
            noteElement.innerHTML = `<strong>${note.title}</strong><p>${note.content.substring(0, 250)}${note.content.length > 250 ? '...' : ''}</p>`;
            noteElement.addEventListener('click', () => viewNoteDetails(index));
            displayCardsSection.appendChild(noteElement);
        });
    };

    // Function to show note details in a popup
    const viewNoteDetails = (index) => {
        const note = notes[index];
        popup.innerHTML = `
            <article id="popupContent">
                <button id="popupClose">&times;</button>
                <h2 id="popupTitle">${note.title}</h2>
                <p id="popupText">${note.content}</p>
            </article>
        `;

        // Show the popup
        popup.style.display = 'flex'; 
        document.getElementById('popupClose').addEventListener('click', () => {
            // Hide the popup
            popup.style.display = 'none'; 
        });
    };

    // Function to reset the editor to initial state
    const resetEditor = () => {
        note = { title: '', content: '' }; 
        addNote(); // Render the note editor
    };

    // Function to handle clicks outside the note editor
    const handleClickOutside = (event) => {
        const isClickInside = addCardSection.contains(event.target);
        if (!isClickInside) {
            resetEditor(); 
        }
    };

    // Event listener for clicks outside the editor
    document.addEventListener('click', handleClickOutside);

    // Function to handle "Ok" button click
    const handleOk = () => {
        const titleInput = document.getElementById('title');
        const contentTextarea = document.getElementById('content');
        note.title = titleInput ? titleInput.value : ''; 
        note.content = contentTextarea ? contentTextarea.value : ''; 

        // Add note to the list
        notes.push({ ...note }); 
        resetEditor();
        displayNotes(); // Refresh the notes display
    };

    // Function to render the note editor and display existing notes
    const render = () => {
        addNote(); 
        displayNotes(); 
    };

    // Initial rendering of the note editor and notes display
    render();
});
