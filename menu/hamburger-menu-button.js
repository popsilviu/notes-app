document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById('menu');
    const sidebar = document.getElementById('sidebar');

    menu.addEventListener('click', function() {
        if (sidebar.style.width === '250px') {
            sidebar.style.width = '52px';
        } else {
            sidebar.style.width = '250px';
        }
    });
});