const express = require("express");
const {
  registerUser,
  loginUser,
  users,
  user,
} = require("../controllers/auth.controller");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", users);
router.get("/users/:id", user);

module.exports = router;
