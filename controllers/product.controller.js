const products = require("../database/fake");
const { applyTimestamps } = require("../models/book.model");
const Product = require("../models/product.model");

const getStatus = async (req, res) => {
  try {
    const result = await Product.aggregate([
      {
        $match: {
          inStock: true,
          price: {
            $gte: 1300,
          },
        },
      },
      {
        $group: {
          _id: "$category",
          avgPrice: { $avg: "$price" },
          count: { $sum: 1 },
        },
      },
    ]);

    console.log(result);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const insertProducts = async (req, res) => {
  try {
    const result = await Product.insertMany(products);
    res.status(201).json({
      success: true,
      data: `there is some ${result.length} products in store`,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = { insertProducts, getStatus };
