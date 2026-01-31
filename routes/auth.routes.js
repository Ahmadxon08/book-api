const express = require("express");
const {
  registerUser,
  loginUser,
  users,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", users);

module.exports = router;
