/* eslint-disable react/prop-types */
export default function InputSearch({ searchTerm, handleSearch }) {
  return (
    <form className="text-center">
      <p className="mt-32 text-3xl text-stone-600">
        👋 Welcome! Let&apos;s start cooking:
      </p>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search over 1,000,000 recipes ..."
        className="input mt-8 w-96 rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
    </form>
  );
}
