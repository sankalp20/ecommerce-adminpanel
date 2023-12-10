const express = require("express");
const router = express.Router();
const { CategoryModel } = require("../models/category");

router.get("/", async (req, res) => {
  const categorysList = await CategoryModel.find();
  res.send(categorysList);
});

router.get("/:id", async (req, res) => {
  const category = await CategoryModel.findById(req.params.id);

  if (!category) return res.status(404).send("category not found");

  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  try {
    const { categoryName, categoryColors } = req.body;

    if (!categoryName || !categoryColors || !categoryColors[0]) {
      return res.status(400).json({
        error: "Invalid request body format",
        success: false,
      });
    }

    const category = new CategoryModel({
      categoryName,
      categoryColors: [
        {
          colorName:
            req.body.colors && req.body.colors[0]
              ? req.body.colors[0].colorName
              : null,
          colorValue:
            req.body.colors && req.body.colors[0]
              ? req.body.colors[0].colorValue
              : null,
        },
      ],
    });

    const savedCategory = await category.save();

    if (!savedCategory) {
      return res.status(500).json({
        error: "Category could not be saved",
        success: false,
      });
    }

    res.status(201).send(savedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        categoryName: req.body.categoryName,
        colorName: req.body.categoryColors[0].colorName,
        colorValue: req.body.categoryColors[0].colorValue,
      },
      {
        new: true,
      }
    );

    if (!category) return res.status(404).send("category cannot be updated");

    res.send(category);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

router.delete("/:id", (req, res) => {
  CategoryModel.findByIdAndDelete(req.params.id)
    .then((category) => {
      if (category) {
        return res.status(200).json({
          succees: true,
          message: "the category is deleted",
        });
      } else {
        return res.status(404).json({
          success: false,
          message: "category not found",
        });
      }
    })
    .catch((err) => {
      return res.status(404).json({
        success: false,
        error: err,
      });
    });
});

module.exports = router;
