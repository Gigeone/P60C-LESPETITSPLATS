import { recipes } from "../../data/recipes.js";
import { selectItem } from "../Logics/selectedFilters.js";

let results = [];

// Recherche de départ où l'on sélectionne toutes les recettes
export const allUstensils = recipes.reduce((ustensils, recipe) => {
  recipe.ustensils.forEach((ustensil) => {
    const lowerCaseUstensil = ustensil.toLowerCase();
    if (!ustensils.includes(lowerCaseUstensil)) {
      ustensils.push(lowerCaseUstensil);
    }
  });
  return ustensils;
}, []);

// Fonction qui réduit la liste des filtres et ressort un tableau des filtres uniques
export const getUniqueUstensils = (results) => {
  const uniqueUstensils = results.reduce((ustensils, recipe) => {
    recipe.ustensils.forEach((ustensil) => {
      const lowerCaseUstensil = ustensil.toLowerCase();
      if (!ustensils.includes(lowerCaseUstensil)) {
        ustensils.push(lowerCaseUstensil);
      }
    });
    return ustensils;
  }, []);
  return uniqueUstensils;
};

export const dd3ListContainer = document.querySelector(".dd3-list");
dd3ListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  allUstensils.forEach((ustensil) => {
    const pElement = document.createElement("p");
    pElement.textContent = ustensil;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd3ListContainer.appendChild(pElement);
  });
} else {
  const uniqueUstensils = getUniqueUstensils(results);
  uniqueUstensils.forEach((ustensil) => {
    const pElement = document.createElement("p");
    pElement.textContent = ustensil;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd3ListContainer.appendChild(pElement);
  });
}
