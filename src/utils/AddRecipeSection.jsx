/* eslint-disable no-unused-vars */
import { useState } from "react";
import { KEY, API_URL } from "../config";
import toast, { Toaster } from "react-hot-toast";

export default function AddRecipeSection() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    image_url: "",
    publisher: "",
    time: "",
    servings: "",
    ingredient1: "",
    ingredient2: "",
    ingredient3: "",
    ingredient4: "",
    ingredient5: "",
    ingredient6: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = {
        title: formData.title,
        source_url: formData.url,
        image_url: formData.image_url,
        publisher: formData.publisher,
        cooking_time: +formData.time,
        servings: +formData.servings,
        ingredient1: formData.ingredient1,
        ingredient2: formData.ingredient2,
        ingredient3: formData.ingredient3,
        ingredient4: formData.ingredient4,
        ingredient5: formData.ingredient5,
        ingredient6: formData.ingredient6,
      };

      const response = await fetch(`${API_URL}?key=${KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add recipe: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      toast.success("Recipe added successfully");
      handleCancel();
    } catch (error) {
      console.error("Error adding recipe:", error.message);
      toast.error("Error adding recipe:", error.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: "",
      url: "",
      image_url: "",
      publisher: "",
      time: "",
      servings: "",
      ingredient1: "",
      ingredient2: "",
      ingredient3: "",
      ingredient4: "",
      ingredient5: "",
      ingredient6: "",
    });
  };

  return (
    <>
      <Toaster />
      <form className="my-36 mx-32 max-sm:mx-2" onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-4xl font-semibold leading-7 text-indigo-600">
              Add your favourite recipe for everyone
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Avacado egg salad"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="url"
                      value={formData.url}
                      id="url"
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="https://www.twopeasandtheirpod.com/avocado-egg-salad/"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="image_url"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image URL
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="image_url"
                      value={formData.image_url}
                      id="image_url"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="https://karuzo.ua/image/cache/catalog/pizza/fiesta-700x480.jpg"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="publisher"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Publisher
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="publisher"
                      value={formData.publisher}
                      id="publisher"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="Jonas Smith"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="time"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Prep Time
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      onChange={handleChange}
                      name="time"
                      value={formData.time}
                      id="time"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="30"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="servings"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Servings
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="servings"
                      value={formData.servings}
                      onChange={handleChange}
                      id="servings"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Ingredients
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Write a list of the ingredients of your favourite dish
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="ingredient1"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredient 1
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ingredient1"
                    value={formData.ingredient1}
                    onChange={handleChange}
                    id="ingredient1"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder="0.5,kg,Rice"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="ingredient2"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredient 2
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ingredient2"
                    value={formData.ingredient2}
                    onChange={handleChange}
                    id="ingredient2"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder="1,,Avocado"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="ingredient3"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredient 3
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ingredient3"
                    value={formData.ingredient3}
                    onChange={handleChange}
                    id="ingredient3"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder=",,salt"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="ingredient4"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredient 4
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ingredient4"
                    value={formData.ingredient4}
                    onChange={handleChange}
                    id="ingredient4"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder="Format:'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="ingredient5"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredient 5
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ingredient5"
                    value={formData.ingredient5}
                    onChange={handleChange}
                    id="ingredient5"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder="Format:'Quantity,Unit,Description'"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="ingredient6"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ingredient 6
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="ingredient6"
                    value={formData.ingredient6}
                    onChange={handleChange}
                    id="ingredient6"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                    placeholder="Format:'Quantity,Unit,Description'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}
