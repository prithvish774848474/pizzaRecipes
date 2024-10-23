import { useState, useRef } from "react";
import "./App.css";
import { recipes } from "./data.js";

function SearchList({ updateRecipeList }) {
  const handleOptionChange = (e) =>
    updateRecipeList((previousRecipeList) =>
      previousRecipeList.filter((recipe) => recipe.title === e.target.value)
    );
  return (
    <div className="header">
      <p className="introduction">
        Welcome to the <span>World of Pizzas</span>
      </p>
      <select className="searchBar" onChange={handleOptionChange}>
        <option value=""> --Select-- </option>
        {recipes.map((recipe) => {
          return (
            <option key={recipe.id} value={recipe.title}>
              {recipe.title}
            </option>
          );
        })}
      </select>
      <button
        type="button"
        className="reset"
        onClick={() => updateRecipeList(recipes)}
      >
        Reset!
      </button>
    </div>
  );
}

function RecipeContainer({ recipeList }) {
  return (
    <div className="recipe-container">
      {recipeList.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="recipe-card">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="recipe-card-image"
      />
      <p className="recipe-card-title">{recipe.title}</p>
      <button
        type="button"
        className="recipe-card-redirect"
        onClick={() => window.open(recipe.recipe_url)}
      >
        View Full Recipe <br />
        <span>({recipe.publisher})</span>
      </button>
    </div>
  );
}

export default function App() {
  const [recipeList, setRecipeList] = useState(recipes);
  return (
    <>
      <SearchList updateRecipeList={setRecipeList} />
      <RecipeContainer recipeList={recipeList} />
    </>
  );
}
