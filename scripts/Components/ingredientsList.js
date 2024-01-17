import { recipes } from "../recipes.js";
import { selectItem } from "../Logics/selectedFilters.js";

let results = [];

export const allIngredients = recipes.reduce((ingredients, recipe) => {
  recipe.ingredients.forEach((ingredient) => {
    if (
      !ingredients.some(
        (i) =>
          i.ingredient.toLowerCase() === ingredient.ingredient.toLowerCase()
      )
    ) {
      ingredients.push({
        ingredient: ingredient.ingredient.toLowerCase(),
      });
    }
  });
  return ingredients;
}, []);

export const getUniqueIngredients = (results) => {
  const uniqueIngredients = results.reduce((ingredients, recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const existingIngredient = ingredients.find(
        (i) => i.toLowerCase() === ingredient.ingredient.toLowerCase()
      );
      if (!existingIngredient) {
        ingredients.push(ingredient.ingredient.toLowerCase());
      }
    });
    return ingredients;
  }, []);
  return uniqueIngredients;
};

export const dd1ListContainer = document.querySelector(".dd1-list");
const selectedContainer = document.getElementById("selectedContainer");

dd1ListContainer.innerHTML = "";

if (selectedContainer.children.length === 0 && results.length === 0) {
  allIngredients.forEach((ingredient) => {
    const pElement = document.createElement("p");
    pElement.textContent = ingredient.ingredient;
    pElement.onclick = function () {
      console.log("jekd");
      selectItem(this);
    };
    dd1ListContainer.appendChild(pElement);
  });
} else {
  const uniqueIngredients = getUniqueIngredients(results);
  uniqueIngredients.forEach((ingredient) => {
    const pElement = document.createElement("p");
    pElement.textContent = ingredient.ingredient;
    pElement.onclick = function () {
      console.log("c'est ca gamin");
      selectItem(this);
    };
    dd1ListContainer.appendChild(pElement);
  });
}
