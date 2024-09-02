document.addEventListener("DOMContentLoaded", function() {
    const menu = document.getElementById('header__menu');
    const sidebar = document.getElementById('sidebar');

    menu.addEventListener('click', function() {
        console.log('click')
        if (sidebar.style.width === '250px') {
            sidebar.style.width = '52px';
        } else {
            sidebar.style.width = '250px';
        }
    });
});