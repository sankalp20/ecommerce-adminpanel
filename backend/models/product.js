const mongoose = require("mongoose");

const productImageSchema = mongoose.Schema({
  thumbnail: {
    type: String,
    trim: true,
    match: /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg)$/,
  },
  sliderPhotos: [
    {
      type: String,
      trim: true,
      match: /^https?:\/\/.*\.(png|jpg|jpeg|gif|svg)$/,
    },
  ],
});

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    trim: true,
  },
  productTitle: {
    type: String,
    trim: true,
  },
  colors: [
    {
      colorName: {
        type: String,
        trim: true,
      },
      colorValue: {
        type: String,
        trim: true,
      },
    },
  ],
  sizes: [
    {
      sizeName: {
        type: String,
        trim: true,
      },
      sizeValue: {
        type: String,
        trim: true,
      },
    },
  ],
  productDescription: {
    type: String,
    trim: true,
  },
  productPrice: {
    type: Number,
    min: 0,
  },
  productQuantity: {
    type: Number,
    min: 0,
  },
  variantEnabled: {
    type: Boolean,
    default: false, 
  },
  productsVariants: [
    {
      variantId: {
        type: Number,
        // unique: true,
      },
      variantColor: {
        type: String,
        trim: true,
      },
      variantSize: {
        type: String,
        trim: true,
      },
      variantPrice: {
        type: Number,
        min: 0,
      },
      variantQuantity: {
        type: Number,
        min: 0,
      },
      variantIsEnabled: {
        type: Boolean,
        default: true,
      },
      ProductImage: productImageSchema,
    },
  ],
  category: {
    type: mongoose.Schema.Types.String,
    ref: 'Category',
    trim: true,
  },
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  ProductImage: productImageSchema,
});

exports.ProductModel = mongoose.model("ProductListModel", productSchema);
