import PDFDocument from "pdfkit";
import Recipe from "../models/Recipe.js";

export const downloadRecipePDF = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("createdBy", "username email");

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    const doc = new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${recipe.title}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(20).text("Recipe Details", { align: "center" });
    doc.moveDown();

    doc.fontSize(16).text(`Title: ${recipe.title}`);
    doc.moveDown();

    doc.text(`By: ${recipe.createdBy?.username || "Anonymous"}`);
    doc.moveDown();

    doc.fontSize(14).text("Ingredients:");
    doc.text(recipe.ingredients);
    doc.moveDown();

    doc.text("Instructions:");
    doc.text(recipe.instructions);

    doc.end();

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;

    const recipe = await Recipe.create({
      title,
      ingredients,
      instructions,

      
      image: req.file ? `/uploads/${req.file.filename}` : "",

      
      createdBy: req.user.id,
    });

    res.status(201).json(recipe);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate("createdBy", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(recipes);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate("createdBy", "username email");

    if (!recipe) {
      return res.status(404).json({
        message: "Recipe not found",
      });
    }

    res.status(200).json(recipe);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};