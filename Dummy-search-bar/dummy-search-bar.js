let searchBar = document.getElementById("search-bar");
let searchInput = document.getElementById("search-input");
let searchButton = document.getElementById("search-button");

searchInput.addEventListener("focus", triggerFocusedStyle);
searchInput.addEventListener("focusout", triggerUnfocusedStyle);
searchInput.addEventListener("keydown", function(event) {if(event.key === "Enter") {initiateSearch();}});
searchButton.addEventListener("click", function(event) {event.preventDefault();});
searchButton.addEventListener("click", handleClickSearch);

function triggerFocusedStyle() {
    searchBar.style.backgroundColor = "white";
    searchBar.style.borderStyle = "solid";
    searchBar.style.borderWidth = "1px";
    searchBar.style.boxShadow = "-1px 2px 5px 0px rgba(0,0,0,0.75)"
}

function triggerUnfocusedStyle() {
    searchBar.style.backgroundColor = "#f1f3f4";
    searchBar.style.borderStyle = "none";
    searchBar.style.borderWidth = "0px";
    searchBar.style.boxShadow = "none"
}

function handleClickSearch() {
    if(searchInput.value) {
        initiateSearch();
    } else {
        searchInput.focus();
    }
}

function initiateSearch() {
    console.log("We will search for " + searchInput.value);
    searchInput.blur();
}