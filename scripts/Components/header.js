// import { recipes } from "../recipes.js";
// import { fillRecipesCard } from "../index.js";
import { resetPageState } from "../Logics/selectedFilters.js";

// reset&close the input with cross icon

const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("search-close");

searchInput.addEventListener("input", function () {
  console.log("input");
  if (searchInput.value) {
    searchClose.style.display = "block";
  } else {
    searchClose.style.display = "none";
  }
});

searchClose.addEventListener("click", function () {
  searchInput.value = "";
  searchClose.style.display = "none";
  resetPageState();
});
