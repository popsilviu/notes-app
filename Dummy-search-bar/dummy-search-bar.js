let search_bar_input = document.querySelector(".form__input");
let search_bar_button = document.querySelector(".form__button--search");

search_bar_button.addEventListener("click", searchButtonClick);
search_bar_input.addEventListener("keydown", function(event) {if(event.key === "Enter") {event.preventDefault();}});
search_bar_input.addEventListener("keydown", function(event) {if((event.key === "Enter") && (search_bar_input.value)) {initiateSearch();}});

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