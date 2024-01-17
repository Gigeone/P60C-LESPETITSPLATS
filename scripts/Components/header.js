import { searchByFilters } from "../Logics/mainResearch.js";

const searchInput = document.getElementById("searchInput");
const searchClose = document.getElementById("search-close");
// Affichage ou non du bouton X de l'input de recherche
searchInput.addEventListener("input", function () {
  console.log("input");
  if (searchInput.value) {
    searchClose.style.display = "block";
  } else {
    searchClose.style.display = "none";
  }
});
// Suppresion de l'input au clique sur le bouton X, et appel de la recherche pour les filters
searchClose.addEventListener("click", function () {
  searchInput.value = "";
  searchClose.style.display = "none";
  searchByFilters(selectedFilters);
});
