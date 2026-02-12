const express = require("express");
const { getAllCars, createCar } = require("../controllers/car.controller");

const router = express.Router();

router.get("/cars", getAllCars);
router.post("/create", createCar);

module.exports = router;
