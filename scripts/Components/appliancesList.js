import { recipes } from "../../data/recipes.js";
import { selectItem } from "../Logics/selectedFilters.js";

let results = [];

// Recherche de départ où l'on sélectionne toutes les recettes
export const allAppliances = recipes.reduce((appliances, recipe) => {
  if (!appliances.includes(recipe.appliance.toLowerCase())) {
    appliances.push(recipe.appliance.toLowerCase());
  }
  return appliances;
}, []);

// Fonction qui réduit la liste des filtres et ressort un tableau des filtres uniques
export const getUniqueAppliances = (results) => {
  const uniqueAppliances = results.reduce((appliances, recipe) => {
    if (!appliances.includes(recipe.appliance.toLowerCase())) {
      appliances.push(recipe.appliance.toLowerCase());
    }
    return appliances;
  }, []);
  return uniqueAppliances;
};

export const dd2ListContainer = document.querySelector(".dd2-list");
dd2ListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  allAppliances.forEach((appliance) => {
    const pElement = document.createElement("p");
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd2ListContainer.appendChild(pElement);
  });
} else {
  const uniqueAppliances = getUniqueAppliances(results);
  uniqueAppliances.forEach((appliance) => {
    const pElement = document.createElement("p");
    pElement.textContent = appliance;
    pElement.onclick = function () {
      selectItem(this);
    };
    dd2ListContainer.appendChild(pElement);
  });
}
