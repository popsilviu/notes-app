let search_bar = document.getElementById("top-search-bar");
let search_bar_input = document.querySelector(".search-bar__input");
let search_bar_button = document.querySelector(".search-bar__button");


search_bar_input.addEventListener("focusout", function() {search_bar.classList.remove("search-bar--focused")});
search_bar_input.addEventListener("focus", function() {search_bar.classList.add("search-bar--focused")});
search_bar_button.addEventListener("click", searchButtonClick);
search_bar_input.addEventListener("keydown", function(event) {if(event.key === "Enter") {event.preventDefault();}});
search_bar_input.addEventListener("keydown", function(event) {if((event.key === "Enter") && (search_bar_input.value)) {initiateSearch();}});

function searchBarClick() {
    console.log("clicked search bar");
    if(!search_bar.classList.contains("search-bar--focused")) {
        search_bar.classList.add("search-bar--focused");
        search_bar_input.focus();
    }
}

function searchButtonClick() {
    if(search_bar_input.value) {
        initiateSearch();
    } else {
        search_bar_input.focus();
    }
}

function initiateSearch() {
    console.log("Searching for " + search_bar_input.value);
    search_bar_input.blur();  
}