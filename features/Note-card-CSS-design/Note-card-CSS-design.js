document.addEventListener('DOMContentLoaded', () => {
    const displayCardsSection = document.getElementById('display-cards');
    const toggleButton = document.getElementById('toggle-view');
    const cardWidth = 400; // Fixed width of each card
    const maxCharLength = 250; // Maximum length of content for uniform height

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

    // Function to display notes in the display section
    const displayNotes = () => {
        displayCardsSection.innerHTML = ''; // Clear existing content
        notes.forEach((note) => {
            const noteElement = document.createElement('article');
            noteElement.classList.add('note');
            // Set the note content and title
            noteElement.innerHTML = `<strong>${note.title}</strong><p>${note.content.substring(0, maxCharLength)}${note.content.length > maxCharLength ? '...' : ''}</p>`;
            displayCardsSection.appendChild(noteElement);
        });
    };

    // Function to adjust the number of columns and the gap based on container width
    const setDynamicGapAndColumns = () => {
        const containerWidth = displayCardsSection.offsetWidth;
        const minGap = 10; // Minimum gap between cards

        // Calculate number of columns
        let columns = Math.floor(containerWidth / cardWidth);
        if (columns > 3) columns = 3;

        // Set grid layout based on number of columns
        if (columns === 3) {
            const columnGap = (containerWidth - (3 * cardWidth)) / 2;
            displayCardsSection.style.columnGap = `${Math.max(columnGap, minGap)}px`;
            displayCardsSection.style.gridTemplateColumns = `repeat(3, ${cardWidth}px)`;
            displayCardsSection.style.justifyContent = 'space-between';
            toggleButton.textContent = 'Grid View';
        } else {
            displayCardsSection.style.columnGap = `${minGap}px`;
            displayCardsSection.style.gridTemplateColumns = `repeat(1, ${cardWidth}px)`;
            displayCardsSection.style.justifyContent = 'center';
            toggleButton.textContent = 'List View';
        }
    };

    // Function to render the notes and adjust layout
    const render = () => {
        displayNotes(); 
        setDynamicGapAndColumns(); 
    };

    // Function to toggle between grid and list views
    const toggleView = () => {
        if (displayCardsSection.classList.contains('list-view')) {
            displayCardsSection.classList.remove('list-view');
            displayCardsSection.classList.add('grid-view');
        } else {
            displayCardsSection.classList.remove('grid-view');
            displayCardsSection.classList.add('list-view');
        }
        setDynamicGapAndColumns(); // Reapply layout after toggling view
    };

    // Adjust layout on window resize
    window.addEventListener('resize', setDynamicGapAndColumns);

    // Set up button click event
    toggleButton.addEventListener('click', () => {
        toggleView();
        setDynamicGapAndColumns(); // Adjust layout after toggling view
    });

    // Initial setup
    displayCardsSection.classList.add('grid-view'); // Set initial view to grid
    render();
});
