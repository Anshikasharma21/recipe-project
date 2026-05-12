import express from "express";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  createRecipe,
  getRecipes,
  getRecipeById,
  downloadRecipePDF
} from "../controllers/recipeController.js";

const router = express.Router();


router.post(
  "/",
  protect,
  upload.single("image"),
  createRecipe
);


router.get("/", getRecipes);


router.get("/:id", getRecipeById);


router.get("/download/:id", downloadRecipePDF);

export default router;