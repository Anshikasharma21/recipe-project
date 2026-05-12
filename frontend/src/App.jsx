import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetail from "./pages/RecipeDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE */}
        <Route path="/" element={<Login />} />

        {/* REGISTER PAGE */}
        <Route path="/register" element={<Register />} />

        {/* HOME PAGE */}
        <Route path="/home" element={<Home />} />

        {/* CREATE RECIPE */}
        <Route path="/create" element={<CreateRecipe />} />

        {/* RECIPE DETAILS */}
        <Route path="/recipe/:id" element={<RecipeDetail />} />

      </Routes>
    </BrowserRouter>
  );
}