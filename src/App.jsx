import { BrowserRouter, Route, Routes } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import HeroSection from "./pages/HeroSection";
import Search from "./pages/Search";
import Bookmarks from "./pages/Bookmarks";
import AddRecipe from "./pages/AddRecipe";
import AboutUs from "./pages/AboutUs";
import RecipeView from "./utils/RecipeView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<HeroSection />} />
          <Route path="/search" element={<Search />} />
          <Route path="/recipe/:id" element={<RecipeView />} />
          <Route path="/addrecipe" element={<AddRecipe />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
