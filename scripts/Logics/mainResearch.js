import { recipes } from "../recipes.js";
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

/**
 * Handles the search functionality.
 *
 * @return {void} No return value.
 */
export const handleSearch = () => {
  console.log("handleSearch");
  let userInput = searchInput.value.toLowerCase();
  console.log(userInput);
  selectedContainer.innerHTML = "";
  if (userInput.length >= 3) {
    let results = [];
    const recipeContainer = document.getElementById("recipes-container");
    recipeContainer.innerHTML = "";

    recipes.forEach((recipe) => {
      const titleMatch = recipe.name.toLowerCase().includes(userInput);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(userInput)
      );
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(userInput);

      if (titleMatch || ingredientsMatch || descriptionMatch) {
        results.push(recipe);
      }
    });
    updateSearchResults(results);
    fillRecipesCard(results);
  } else {
    resetRecipes();
  }
};

/**
 * Searches for recipes based on selected filters.
 *
 * @param {Array} selectedFilters - An array of filters selected by the user.
 * @return {undefined} No return value.
 */
export const searchByFilters = (selectedFilters) => {
  console.log("searchByFilters");
  const userInput = searchInput.value.toLowerCase();
  console.log(results);
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

/**
 * Resets the recipes by clearing the recipe container and filling it with new recipes.
 *
 * @param {none} - This function does not take any parameters.
 * @return {none} - This function does not return any value.
 */
const resetRecipes = () => {
  console.log("resetRecipes");
  const recipeContainer = document.getElementById("recipes-container");
  recipeContainer.innerHTML = "";
  fillRecipesCard(recipes);
};

/**
 * Updates the search results with the given results.
 *
 * @param {array} results - The search results to update with.
 */
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
  console.log(selectedFilters);
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

/**
 * Finds a dropdown element by the specified text within the given containers.
 *
 * @param {string} text - The text to search for in the dropdown elements.
 * @param {NodeList} containers - The containers to search within.
 * @return {Element|null} - The found dropdown element, or null if not found.
 */
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

/**
 * Updates the dropdown options with new values.
 *
 * @param {number} dropdownNumber - The number of the dropdown to update.
 * @param {Array} options - The new options to display in the dropdown.
 * @param {string} property - The property to use as the display value for each option.
 * @return {void} This function does not return a value.
 */
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
