import { useState, useRef } from "react";
import "./output.css";
import { recipes } from "./data.js";

function SearchList({ updateRecipeList }) {
  const handleOptionChange = (e) =>
    updateRecipeList((previousRecipeList) =>
      previousRecipeList.filter((recipe) => recipe.title === e.target.value)
    );
  return (
    <div className="mx-4 my-0 p-4 border-b-2 header">
      <p className="my-4 text-center text-[2rem] text-blue-200 introduction">
        Welcome to the <span className="font-bold italic">World of Pizzas</span>
      </p>
      <div className="flex flex-col gap-2 md:flex-row md:justify-between mt-4">
        <select
          className="p-2 rounded-[2rem] cursor-pointer text-center italic bg-blue-200 outline-0 outline-offset-0 searchBar"
          onChange={handleOptionChange}
        >
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
          className="p-2 rounded-md cursor-pointer text-center italic bg-blue-200 font-bold outline-0 outline-offset-0 searchBar"
          onClick={() => updateRecipeList(recipes)}
        >
          Reset!
        </button>
      </div>
    </div>
  );
}

function RecipeContainer({ recipeList }) {
  return (
    <div className="mx-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 place-content-evenly box-border">
      {recipeList.map((recipe) => {
        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </div>
  );
}

function RecipeCard({ recipe }) {
  return (
    <div className="border-none rounded-md text-center text-gray-300 h-[95vh] md:h-[90vh] hover:cursor-grab recipe-card hover:recipe-card:hover">
      <img
        src={recipe.image_url}
        alt={recipe.title}
        className="border-none rounded-md w-full h-[45%] object-cover recipe-card-image hover:h-1/2"
      />
      <p className="font-serif text-[1.25rem] md:text-[1.5rem] italic mt-2">{recipe.title}</p>
      <button
        type="button"
        className="mt-2 font-bold text-[1.25rem] text-green-300 px-1 py-3 m-2 border-t-green-300 border-t-2 border-l-green-300 border-l-2 rounded-tl-md cursor-pointer hover:scale-x-[1.2] recipe-card-redirect"
        onClick={() => window.open(recipe.recipe_url)}
      >
        View Full Recipe <br />
        <span className="text-sm font-thin font-mono">({recipe.publisher})</span>
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
