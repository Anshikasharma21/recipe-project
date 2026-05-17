import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateRecipe from "./pages/CreateRecipe";
import RecipeDetail from "./pages/RecipeDetail";

export default function App() {
  return (
    <BrowserRouter>
   
      {/* ✅ Global Toast Container */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111118",
            color: "#f3f4f6",
            border: "1px solid #1f2937",
            borderRadius: "12px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#6366f1",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateRecipe />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </BrowserRouter>
  );
}