document.addEventListener('DOMContentLoaded', () => {
    const displayCardsSection = document.getElementById('display-cards');
    const toggleButton = document.getElementById('toggle-view');
    const maxCharLength = 250; // Maximum length of content for uniform height
    const gridMinWidth = 992;  // Minimum width for grid view

    // Dummy data for initial notes
    let notes = [
        { title: "Title 1", content: "Lorem ipsum dolor sit amet.".repeat(70) },
        { title: "Title 2", content: "Quisque convallis ornare urna eu tincidunt. ".repeat(10) },
        { title: "Title 3", content: "" },
        { title: "", content: "Ut ultrices malesuada magna. ".repeat(3) },
    ];

    // Function to display notes in the display section
    function displayNotes() {
        displayCardsSection.innerHTML = ''; // Clear existing content
        notes.forEach(note => {
            const noteElement = document.createElement('article');
            noteElement.classList.add('note');
            // Set the note content and title
            noteElement.innerHTML = `<strong>${note.title}</strong>
                                     <p>${note.content.substring(0, maxCharLength)}${note.content.length > maxCharLength ? '...' : ''}</p>`;
            displayCardsSection.appendChild(noteElement);
        });
    }

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
