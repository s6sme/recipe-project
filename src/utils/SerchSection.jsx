import { useEffect, useState } from "react";
import { API_URL, KEY } from "../config";
import {
  BookmarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes, setRecipes] = useState([]);
  const recipesPerPage = 8;
  const [isBookmarked, setIsBookmarked] = useState({});

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}?search=${searchTerm}&key=${KEY}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRecipes(data.data.recipes);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBookmark = (recipeId) => {
    setIsBookmarked((prevBookmarks) => ({
      ...prevBookmarks,
      [recipeId]: !prevBookmarks[recipeId],
    }));
    const updatedBookmarks = {
      ...isBookmarked,
      [recipeId]: !isBookmarked[recipeId],
    };
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};
    setIsBookmarked(storedBookmarks);
  }, []);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div className="bg-white">
      <form className="text-center" onSubmit={handleSubmit}>
        <p className="mt-32 text-3xl text-stone-600">
          👋 Welcome! Let&apos;s start cooking:
        </p>

        <div className="items-center flex text-center justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search over 1,000,000 recipes ..."
            className="input my-8 w-96 rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
          />
          <button
            type="submit"
            className=" ml-6 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-white" />
          </button>
        </div>
      </form>

      {loading && <Spinner />}

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Recipes</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {currentRecipes.map((recipe) => (
            <div key={recipe.id} className="group relative">
              <Link to={`/recipe/${recipe.id}`} className="group">
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
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {recipe.title}
                  </p>
                </div>
              </Link>
              <button
                onClick={() =>
                  handleBookmark(recipe.id, !isBookmarked[recipe.id])
                }
                className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-700 transition-colors duration-300 focus:outline-none"
              >
                {isBookmarked[recipe.id] ? (
                  <BookmarkIcon
                    className="h-4 w-4 text-white fill-white"
                    aria-hidden="true"
                  />
                ) : (
                  <BookmarkIcon
                    className="h-4 w-4 text-white"
                    aria-hidden="true"
                  />
                )}
              </button>
            </div>
          ))}
        </div>

        {/* PAGINATION */}

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-4 py-3 sm:px-6 items-center justify-center flex">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          {[...Array(Math.ceil(recipes.length / recipesPerPage))].map(
            (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`"" ${
                  currentPage === index + 1
                    ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    : "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                }`}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={
              currentPage === Math.ceil(recipes.length / recipesPerPage)
            }
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
