const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdminUser = require("../middleware/isAdmin.middleware");
const router = express.Router();

router.get("/dashboard", authMiddleware, isAdminUser, (req, res) => {
  res.status(200).json({
    message: "Welcome to Admin Page",
  });
});

module.exports = router;
