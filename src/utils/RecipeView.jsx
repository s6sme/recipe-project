/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { API_URL, KEY } from "../config";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import Fraction from "fraction.js";
import PageNotFound from "../pages/PageNotFound";
import NavHeader from "./NavHeader";

import {
  BookmarkIcon,
  CheckIcon,
  ClockIcon,
  MinusIcon,
  PlusIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const RecipeView = () => {
  const { id } = useParams();
  const navigate = useNavigate(); //
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${id}?key=${KEY}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setRecipe(result.data.recipe);
        const bookmarkedRecipes =
          JSON.parse(localStorage.getItem("bookmarks")) || {};
        const isBookmarked = bookmarkedRecipes[result.data.recipe.id];
        setBookmarked(isBookmarked);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleBookmark = () => {
    const updatedBookmarked = !bookmarked;
    setBookmarked(updatedBookmarked);
    const bookmarkedRecipes =
      JSON.parse(localStorage.getItem("bookmarks")) || {};
    if (!updatedBookmarked) {
      delete bookmarkedRecipes[recipe.id];
    } else {
      bookmarkedRecipes[recipe.id] = true;
    }
    localStorage.setItem("bookmarks", JSON.stringify(bookmarkedRecipes));
  };

  const updateServings = (newServings) => {
    const updatedIngredients = recipe.ingredients.map((ingredient) => {
      const newQuantity = (ingredient.quantity * newServings) / recipe.servings;
      return { ...ingredient, quantity: parseFloat(newQuantity.toFixed(2)) };
    });

    setRecipe({
      ...recipe,
      servings: newServings,
      ingredients: updatedIngredients,
    });
  };

  const handleBack = () => {
    const storedSearchQuery = localStorage.getItem("searchQuery");
    if (storedSearchQuery) {
      navigate(`/search?query=${encodeURIComponent(storedSearchQuery)}`);
    } else {
      navigate("/search");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!recipe) {
    return <PageNotFound />;
  }

  return (
    <>
      <NavHeader />
      <button
        onClick={handleBack}
        className=" text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 mt-32 ml-32 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 max-sm:ml-0 "
      >
        &larr; Back
      </button>
      <div className="bg-white ">
        <div className="pt-6">
          <div>
            <div>
              <img
                src={recipe.image_url}
                alt={recipe.title}
                className="h-auto max-w-sm mx-auto rounded-lg shadow-xl"
              />
            </div>
          </div>

          <div className="mx-auto max-w-2xl px-4 pb-16 pt-10">
            <div>
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-indigo-600 md:text-5xl lg:text-6xl dark:text-white text-center">
                {recipe.title}
              </h1>
            </div>

            <div className="py-10">
              <div className="flex items-center max-sm:items-start max-sm:flex-col">
                <ClockIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <div className=" flex space-x-2 max-sm:w-full">
                  <p className="mr-1 text-sm font-medium text-gray-900 flex items-center">
                    {recipe.cooking_time}
                  </p>
                </div>
                <h2 className="text-sm font-medium text-gray-900 mr-24">
                  minutes
                </h2>

                <UsersIcon className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-sm font-medium text-gray-900">Servings</h2>
                <div className="ml-4 flex space-x-2 max-sm:ml-0">
                  <button
                    onClick={() => updateServings(recipe.servings - 1)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-white focus-visible:ring-opacity-50"
                  >
                    <MinusIcon className="text-gray-900 h-2 w-2" />
                  </button>
                  <span className="text-sm font-medium text-gray-900 flex items-center">
                    {recipe.servings}
                  </span>
                  <button
                    onClick={() => updateServings(recipe.servings + 1)}
                    className="px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-white focus-visible:ring-opacity-50"
                  >
                    <PlusIcon className="text-gray-900 h-2 w-2" />
                  </button>
                </div>

                <button
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 ml-24 max-sm:ml-0 max-sm:mt-3"
                  onClick={toggleBookmark}
                >
                  {bookmarked ? (
                    <BookmarkIcon
                      className="h-6 w-6 text-white fill-white"
                      aria-hidden="true"
                    />
                  ) : (
                    <BookmarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-2xl font-medium text-gray-900 mb-8">
                RECIPE INGREDIENTS
              </h3>
              <ul
                role="list"
                className="space-y-4 text-left text-gray-500 dark:text-gray-400"
              >
                {recipe.ingredients.map((ingredient, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-1 rtl:space-x-reverse "
                  >
                    <CheckIcon className="h-4 w-4 flex-shrink-0 text-green-500 dark:text-green-400" />

                    <div className="text-indigo-600">
                      {ingredient.quantity
                        ? new Fraction(ingredient.quantity).toFraction(true)
                        : ""}
                    </div>

                    <div>
                      <span className="text-indigo-600 mr-4">
                        {ingredient.unit}
                      </span>
                      {ingredient.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <h2 className="text-2xl font-medium text-gray-900 mb-4">
                HOW TO COOK IT
              </h2>
              <p className="mt-4 space-y-6 mb-8 text-gray-600">
                This recipe was carefully designed and tested by{" "}
                <span className="text-md text-indigo-600">
                  {recipe.publisher}
                </span>
                . Please check out directions at their website.
              </p>
              <a
                className=" text-white bg-indigo-700 hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                href={recipe.source_url}
                target="_blank"
              >
                <span>Directions &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeView;
