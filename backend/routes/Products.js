const express = require("express");
const router = express.Router();
const { ProductModel } = require("../models/product");
const { CategoryModel } = require("../models/category");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  const productsList = await ProductModel.find();
  res.send(productsList);
});

router.get("/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) return res.sendStatus(404).send("product not found");

  res.sendStatus(200).send(product);
});

router.post("/", async (req, res) => {
  try {
    console.log('Category:', req.body.category);
    const category = await CategoryModel.findOne({ categoryName: req.body.category });

    if (!category) return res.sendStatus(404).send("Invalid category");

    const productToBeAdded = new ProductModel({
      productName: req.body.productName,
      productTitle: req.body.productTitle,
      colors: req.body.colors && req.body.colors.length > 0
    ? [
      {
        colorName: req.body.colors[0].colorName,
        colorValue: req.body.colors[0].colorValue,
      },
    ]
    : [],
      sizes: req.body.sizes && req.body.sizes.length > 0
      ? [
        {
          sizeName: req.body.sizes[0].sizeName,
          sizeValue: req.body.sizes[0].sizeValue,
        },
      ]
      : [],
      productDescription: req.body.productDescription && req.body.productDescription,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      variantEnabled: req.body.variantEnabled,
      productsVariants: [
        {
          variantId: req.body.productsVariants[0].variantId,
          variantColor: req.body.productsVariants[0].variantColor,
          variantSize: req.body.productsVariants[0].variantSize,
          variantPrice: req.body.productsVariants[0].variantPrice,
          variantQuantity: req.body.productsVariants[0].variantQuantity,
          variantIsEnabled: req.body.productsVariants[0].variantIsEnabled,
          ProductImage: {
            thumbnail: req.body.productsVariants[0].ProductImage.thumbnail,
            sliderPhotos:
              req.body.productsVariants[0].ProductImage.sliderPhotos,
          },
        },
      ],
      category: req.body.category,
      tags: req.body.tags,
      ProductImage: {
        thumbnail: req.body.ProductImage.thumbnail,
        sliderPhotos: req.body.ProductImage.sliderPhotos,
      },
    });

    const addedProduct = await productToBeAdded.save();
    res.status(201).json(addedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
      success: false,
    });
  }
});

router.put("/:id", async (req, res) => {
  if (mongoose.isValidObjectId(req.params.id))
    return res.sendStatus(400).send("Invalid product Id");

  const product = await ProductModel.findByIdAndUpdate(
    req.params.id,
    {
      productName: req.body.productName,
      productTitle: req.body.productTitle,
      colors: req.body.colors
        ? req.body.colors.map((color) => ({
            colorName: color.colorName,
            colorValue: color.colorValue,
          }))
        : [],
      sizes: req.body.sizes
        ? req.body.sizes.map((size) => ({
            sizeName: size.sizeName,
            sizeValue: size.sizeValue,
          }))
        : [],
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productQuantity: req.body.productQuantity,
      variantEnabled: req.body.variantEnabled,
      productsVariants: req.body.productsVariants.map((variant) => ({
        variantId: variant.variantId,
        variantColor: variant.variantColor,
        variantSize: variant.variantSize,
        variantPrice: variant.variantPrice,
        variantQuantity: variant.variantQuantity,
        variantIsEnabled: variant.variantIsEnabled,
        ProductImage: {
          thumbnail: variant.ProductImage.thumbnail,
          sliderPhotos: variant.ProductImage.sliderPhotos,
        },
      })),
      category: req.body.category,
      tags: req.body.tags,
      ProductImage: {
        thumbnail: req.body.ProductImage.thumbnail,
        sliderPhotos: req.body.ProductImage.sliderPhotos,
      },
    },
    {
      new: true,
    }
  );

  if (!product) return res.sendStatus(404).send("product cannot be updated");

  res.send(product);
});

router.delete("/:id", async (req, res) => {
  ProductModel.findByIdAndDelete(req.params.id)
    .then((product) => {
      if (product) {
        return res.sendStatus(200).json({
          succees: true,
          message: "the product is deleted",
        });
      } else {
        return res.sendStatus(404).json({
          success: false,
          message: "product not found",
        });
      }
    })
    .catch((err) => {
      return res.sendStatus(404).json({
        success: false,
        error: err,
      });
    });
});

router.get("/get/count", async (req, res) => {
  const productCount = await ProductModel.countDocuments();

  if (!productCount) return res.sendStatus(404).send("product not found");

  res.send({
    totalProducts: productCount,
  });
});
module.exports = router;
