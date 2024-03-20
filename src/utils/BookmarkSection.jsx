import { useState, useEffect } from "react";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { API_URL } from "../config";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

export default function BookmarkSection() {
  const [bookmarkedRecipeIds, setBookmarkedRecipeIds] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setBookmarkedRecipeIds(storedBookmarks);

    const fetchRecipes = async () => {
      try {
        const recipesData = await Promise.all(
          Object.keys(storedBookmarks).map(async (recipeId) => {
            const response = await fetch(`${API_URL}${recipeId}`);
            const recipeData = await response.json();
            return recipeData.data.recipe;
          })
        );
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleRemoveBookmark = (recipeId) => {
    const updatedBookmarks = { ...bookmarkedRecipeIds };
    delete updatedBookmarks[recipeId];
    setBookmarkedRecipeIds(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bg-white mt-24">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {!loading && recipes.length === 0 && (
          <p className="text-center text-3xl text-gray-600">
            No bookmarks yet. Find a nice recipe and bookmark it 📚🍽️
          </p>
        )}
        {loading && <Spinner />}

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {recipes.map((recipe) => {
            return (
              <div key={recipe.id} className="group relative">
                <Link to={`/recipe/${recipe.id}`}>
                  <div>
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={recipe.image_url}
                        alt={recipe.title}
                        className="h-64 w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-sm text-gray-700">
                      {recipe.publisher}
                    </h3>
                    <div className="flex justify-between items-center">
                      <p className="mt-1 text-lg font-medium text-gray-900">
                        {recipe.title}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => {
                    handleRemoveBookmark(recipe.id);
                    setRecipes((prevRecipes) =>
                      prevRecipes.filter(
                        (prevRecipe) => prevRecipe.id !== recipe.id
                      )
                    );
                  }}
                  className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
                >
                  <BookmarkIcon
                    className="h-4 w-4 text-white fill-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
