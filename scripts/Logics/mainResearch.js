/* eslint-disable no-undef */
import { recipes } from "../../data/recipes.js";
import { fillRecipesCard } from "../index.js";
import {
  getUniqueIngredients,
  dd1ListContainer,
} from "../Components/ingredientsList.js";
import {
  getUniqueAppliances,
  dd2ListContainer,
} from "../Components/appliancesList.js";
import {
  getUniqueUstensils,
  dd3ListContainer,
} from "../Components/ustensilsList.js";
import { selectItem, updateSelectedItemLayout } from "./selectedFilters.js";

const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function () {
  handleSearch();
});

/* Fonction de recherche avec la méthode filter() */
export const handleSearch = () => {
  const userInput = searchInput.value.toLowerCase();
  // Si moins de 3 caractères
  if (userInput.length >= 3) {
    let results = recipes.filter((recipe) => {
      const titleMatch = recipe.name.toLowerCase().includes(userInput);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(userInput)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(userInput);
      return titleMatch || ingredientsMatch || descriptionMatch;
    });
    updateSearchResults(results);
    fillRecipesCard(results);
    searchByFilters(selectedFilters);
  } else {
    searchByFilters(selectedFilters);
  }
};

/* Fonction de recherche avec les "selectedFilters" */
export const searchByFilters = (selectedFilters) => {
  const userInput = searchInput.value.toLowerCase();
  if (userInput.length >= 3) {
    // Recherche par texte
    results = recipes.filter((recipe) => {
      const titleMatch = recipe.name.toLowerCase().includes(userInput);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(userInput)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(userInput);
      return titleMatch || ingredientsMatch || descriptionMatch;
    });
  } else {
    // Si la recherche par texte est vide, utilisez la liste complète
    results = recipes.slice();
  }
  // Filtrage supplémentaire en fonction des filtres sélectionnés
  for (const filter of selectedFilters) {
    results = results.filter((recipe) => {
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(filter)
      );
      const applianceMatch = recipe.appliance.toLowerCase().includes(filter);
      const ustensilsMatch = recipe.ustensils.some((ustensil) =>
        ustensil.toLowerCase().includes(filter)
      );

      return ingredientsMatch || applianceMatch || ustensilsMatch;
    });
  }
  console.log(results);
  updateSearchResults(results);
  fillRecipesCard(results);
};

/* Reset des recettes */
// const resetRecipes = () => {
//   const recipeContainer = document.getElementById("recipes-container");
//   recipeContainer.innerHTML = "";
//   fillRecipesCard(recipes);
// };

/* Fonction de mise à jour des résultats et des dropdowns en fonction des filtres sélectionnés */
const updateSearchResults = (results) => {
  console.log("updateSearchResults");
  console.log(results);
  const uniqueIngredients = getUniqueIngredients(results);
  console.log(uniqueIngredients);
  const uniqueAppliances = getUniqueAppliances(results);
  console.log(uniqueAppliances);
  const uniqueUstensils = getUniqueUstensils(results);

  updateDropdownOptions(1, uniqueIngredients, "ingredient");
  updateDropdownOptions(2, uniqueAppliances, "appliance");
  updateDropdownOptions(3, uniqueUstensils, "ustensil");

  const containers = [dd1ListContainer, dd2ListContainer, dd3ListContainer];
  selectedFilters.forEach((filter) => {
    console.log("filter", filter);
    const isInIngredients = uniqueIngredients.includes(filter);
    const isInAppliances = uniqueAppliances.includes(filter);
    const isInUstensils = uniqueUstensils.includes(filter);
    if (isInIngredients || isInAppliances || isInUstensils) {
      const dropdownElement = findDropdownElementByText(filter, containers);
      if (dropdownElement) {
        updateSelectedItemLayout(dropdownElement);
      }
    }
  });
};

/* Fonction de recherche par texte à l'intérieur des dropdowns */
const findDropdownElementByText = (text, containers) => {
  console.log("findDropdownElementByText");
  for (const container of containers) {
    const allDropdownElements = container.querySelectorAll("p");

    for (const element of allDropdownElements) {
      if (
        element.textContent.trim().toLowerCase() === text.trim().toLowerCase()
      ) {
        return element;
      }
    }
  }
  return null;
};

/* Fonction de mise à jour du contenu des dropdowns avec les options générées (texte ou objets) */
export const updateDropdownOptions = (dropdownNumber, options, property) => {
  console.log("updateDropdownOptions");
  const dropdownId = `dd${dropdownNumber}-list`;
  const dropdown = document.getElementById(dropdownId);

  if (!dropdown) {
    console.error(`Dropdown with ID ${dropdownId} not found.`);
    return;
  }

  dropdown.innerHTML = "";

  options.forEach((option) => {
    const optionElement = document.createElement("p");

    if (typeof option === "string") {
      optionElement.textContent = option.toLowerCase();
    } else if (typeof option === "object" && property in option) {
      optionElement.textContent = option[property].toLowerCase();
    } else {
      console.error(`Invalid option format: ${option}`);
      return;
    }
    optionElement.onclick = () => {
      console.log("c'est ca gamin");
      selectItem(optionElement);
    };
    dropdown.appendChild(optionElement);
  });
};
