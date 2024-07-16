document.addEventListener('DOMContentLoaded', function() {
    // Check if a theme is saved in localStorage
    let theme = localStorage.getItem('theme');
    if (theme === 'dark') {
        // If the theme is dark, add the 'dark-mode' class to the body
        document.body.classList.add('dark-mode');
        // Set the checkbox to checked
        document.getElementById('themeToggle').checked = true;
    }

    // Add an event listener to toggle the theme when the checkbox is clicked
    document.getElementById('themeToggle').addEventListener('change', function() {
        let element = document.body;
        // Toggle the 'dark-mode' class on the body
        element.classList.toggle("dark-mode");

        // Save the selected theme in localStorage
        if (element.classList.contains('dark-mode')) {
            // If 'dark-mode' class is present, save 'dark' in localStorage
            localStorage.setItem('theme', 'dark');
        } else {
            // Otherwise, save 'light' in localStorage
            localStorage.setItem('theme', 'light');
        }
    });
});
