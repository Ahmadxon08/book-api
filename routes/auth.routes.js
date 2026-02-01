const express = require("express");
const {
  registerUser,
  loginUser,
  users,
  user,
  changePassword,
} = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", users);
router.get("/users/:id", user);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;
