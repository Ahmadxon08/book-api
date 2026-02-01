const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const isAdminUser = require("../middleware/isAdmin.middleware");
const uploadMiddleware = require("../middleware/upload.middleware");
const {
  uploadImage,
  fetchImage,
  deletedImage,
} = require("../controllers/image.controller");

const router = express.Router();

router.post(
  "/upload",
  authMiddleware,
  isAdminUser,
  uploadMiddleware.single("image"),
  uploadImage,
);
router.get("/get", authMiddleware, fetchImage);
router.delete("/:id", authMiddleware, isAdminUser, deletedImage);

module.exports = router;
