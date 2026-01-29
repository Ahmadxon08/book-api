const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");

router.get("/user", authMiddleware, (req, res) => {
  const { username, role, userId } = req.userInfo;

  res.status(200).json({
    success: true,
    message: "Welcome to our home page",
    user: {
      _id: userId,
      username,
      role,
    },
  });
});

module.exports = router;
