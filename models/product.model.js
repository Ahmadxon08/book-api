const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  price: Number,
  inStock: Boolean,
  tags: [String],
});

module.exports = mongoose.model("Products", productSchema);
