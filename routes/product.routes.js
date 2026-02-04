const express = require("express");
const {
  insertProducts,
  getStatus,
} = require("../controllers/product.controller");

const router = express.Router();

router.post("/create", insertProducts);
router.get("/status", getStatus);

module.exports = router;
