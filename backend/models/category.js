const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    categoryName: {
      type: String,
      required: true
    },
    categoryColors: [
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
});
exports.CategoryModel = mongoose.model('CategoryListModel', categorySchema);

