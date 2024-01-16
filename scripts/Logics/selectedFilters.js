import { recipes } from "../recipes.js";
import {
  searchByFilters,
  updateDropdownOptions,
  handleSearch,
} from "./mainResearch.js";
import {
  dd1ListContainer,
  allIngredients,
} from "../Components/ingredientsList.js";
import { dd3ListContainer, allUstensils } from "../Components/ustensilsList.js";
import {
  dd2ListContainer,
  allAppliances,
} from "../Components/appliancesList.js";
import { fillRecipesCard, updateRecipeCount } from "../index.js";

/**
 * Selects an item and performs the necessary actions based on the selected element.
 *
 * @param {Element} selectedElement - The element that is selected.
 * @return {void} This function does not return a value.
 */
export const selectItem = (selectedElement) => {
  console.log("selectItem");
  const filterValue = selectedElement.textContent.toLowerCase();
  if (!selectedFilters.some((filter) => filter.toLowerCase() === filterValue)) {
    selectedFilters.push(filterValue);
    searchByFilters(selectedFilters);
  } else {
    const selectedItemClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    if (selectedItemClone) {
      removeSelectedItem(selectedElement, selectedItemClone);
      setTimeout(function () {
        // timeout to wait for the DOM to update
        searchByFilters(selectedFilters);
      }, 100);
    }
  }
  updateSelectedVisuals();
};

/**
 * Updates the selected visuals by removing any items that are not included in the selected filters.
 *
 * @param {none} - This function does not take any parameters.
 * @return {none} - This function does not return any value.
 */
function updateSelectedVisuals() {
  console.log("updateSelectedVisuals");
  const containers = [
    dd1ListContainer,
    dd2ListContainer,
    dd3ListContainer,
    selectedContainer,
  ];

  containers.forEach((container) => {
    const allSelectedItems = container.querySelectorAll('[class*="selected"]');

    allSelectedItems.forEach((selectedItem) => {
      const filterValue = selectedItem.getAttribute("data-filter");
      const selectedItemText = selectedItem.textContent.trim().toLowerCase();

      if (
        !selectedFilters.includes(filterValue) &&
        !selectedFilters.includes(selectedItemText)
      ) {
        removeSelectedItem(selectedItem, null);
      }
    });
  });
}

export const updateSelectedItemLayout = (selectedElement) => {
  console.log("updateSelectedItemLayout");
  const filterValue = selectedElement.textContent.trim().toLowerCase();

  if (!selectedElement.classList.contains("selected")) {
    selectedElement.classList.add("selected");
    selectedElement.style.display = "none";
    selectedElement.setAttribute("data-filter", filterValue);
    const existingClone = document.querySelector(
      `.selected-item[data-filter="${filterValue}"]`
    );
    if (!existingClone) {
      const selectedItemClone = document.createElement("p");
      selectedItemClone.textContent = filterValue;
      selectedItemClone.classList.add("selected-item");
      selectedItemClone.setAttribute("data-filter", filterValue);

      const svgElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgElement.setAttribute("viewBox", "0 0 24 24");
      svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

      const pathElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathElement.setAttribute(
        "d",
        "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41Z"
      );
      pathElement.setAttribute("fill", "currentColor");
      svgElement.appendChild(pathElement);
      selectedItemClone.appendChild(svgElement);
      selectedItemClone.onclick = () => {
        console.log("c'est ca");
        selectItem(selectedItemClone);
      };
      selectedContainer.appendChild(selectedItemClone);
    }
  }
};

const removeSelectedItem = (selectedElement, selectedItemClone) => {
  const filterValue = selectedElement.textContent.trim().toLowerCase();
  const index = selectedFilters.indexOf(filterValue);
  if (index !== -1) {
    selectedFilters.splice(index, 1);
  }
  console.log(selectedFilters);
  if (selectedFilters.length === 0) {
    resetPageState();
  }
  selectedElement.classList.remove("selected");
  selectedElement.style.height = "";

  if (document.body.contains(selectedItemClone)) {
    setTimeout(() => {
      // timeout to wait for the DOM to update
      selectedItemClone.remove();
    }, 0);
  }
};

export const resetPageState = () => {
  console.log("resetPageState");
  updateDropdownOptions(1, allIngredients, "ingredient");
  updateDropdownOptions(2, allAppliances, "appliance");
  updateDropdownOptions(3, allUstensils, "ustensil");
  fillRecipesCard(recipes);
  updateRecipeCount();
};
