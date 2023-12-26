import { recipes } from "./recipes.js";

console.log(recipes);

// Créer les 50 cartes
recipes.forEach((recipe) => {
  // Créer une carte pour la recette
  const card = createRecipeCard(recipe);
  // Ajouter la carte à la page
  document.getElementById("recipes-container").appendChild(card);
});

// Fonction pour créer une carte de recette
function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.classList.add("recipe-card");

  card.innerHTML = `
    
        <img class="recipeImage" src="./assets/recipeImages/${
          recipe.image
        }" alt="${recipe.name}">
        <div class="recipeInfo">
          <h1>${recipe.name}</h1>
          <h2>Recette</h2>
          <div class="recipeDescription">${recipe.description}</div>
          <h2>Ingrédients</h2>
          <div class="recipeIngredients">
          ${recipe.ingredients
            .map(
              (ingredient, i) => `
            <div class="ingredient${i + 1}">
              <p class="ingredientName">${ingredient.ingredient}</p>
              <p class="ingredientQuantity">${
                ingredient.quantity !== undefined ? ingredient.quantity : "-"
              } ${ingredient.unit !== undefined ? ingredient.unit : ""}</p>
            </div>`
            )
            .join("")}</div>
        </div>

    `;

  return card;
}
