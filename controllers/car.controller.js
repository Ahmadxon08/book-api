const Car = require("../models/car.model");

const getAllCars = async (req, res) => {
  try {
    const allCars = await Car.find();
    if (allCars.length > 0) {
      res.status(200).json({
        success: true,
        message: "All cars fetched successfully",
        totalCars: allCars.length,
        data: allCars,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "There is no car in car-store",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
const createCar = async (req, res) => {
  try {
    const carData = req.body;
    const newCar = await Car.create(carData);
    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: newCar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  getAllCars,
  createCar,
};
