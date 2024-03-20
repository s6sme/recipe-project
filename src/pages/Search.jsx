import { useState } from "react";
import NavHeader from "../utils/NavHeader";
import SearchSection from "../utils/SerchSection";

function Search() {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <NavHeader />
      <SearchSection
        recipesPerPage={recipesPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Search;
