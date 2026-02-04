const uploadToImageKit = require("../helpers/imagekit.helper");
const imageModel = require("../models/image.model");
const fs = require("fs");
const imagekit = require("./Image");
const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "File is required!",
      });
    }

    if (!req.userInfo) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { url, fileId } = await uploadToImageKit(req.file.path);

    const newUploadedImage = new imageModel({
      url,
      publicId: fileId,
      uploadedBy: req.userInfo.userId,
    });

    await newUploadedImage.save();
    fs.unlinkSync(req.file.path);

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: newUploadedImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in upload file",
    });
  }
};

const fetchImage = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let limit = Math.min(parseInt(req.query.limit) || 2, 50);
    let sortBy = req.query.sortBy || "createdAt";
    let sortOrder = req.query.sortOrder === "asc" ? 1 : -1;

    const totalImages = await imageModel.countDocuments();
    const totalPages = Math.ceil(totalImages / limit);
    const allowedSortFields = ["createdAt", "updatedAt"];
    const skip = (page - 1) * limit;

    if (!allowedSortFields.includes(sortBy)) {
      sortBy = "createdAt";
    }

    const images = await imageModel
      .find()
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    if (!images || images.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Images not found",
      });
    }

    return res.status(200).json({
      success: true,
      currentPage: page,
      totolPage: totalPages,
      totalImages: totalImages,
      data: images,
      message: "Images fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in upload file",
    });
  }
};
const deletedImage = async (req, res) => {
  try {
    const deletedImageId = req.params.id;
    const userId = req.userInfo.userId;
    const image = await imageModel.findById(deletedImageId);
    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Deleted image not found",
      });
    }

    if (image.uploadedBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not uploded that image so you can not delete it",
      });
    }

    await imagekit.deleteFile(image.publicId);
    await imageModel.findByIdAndDelete(deletedImageId);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server Error",
    });
  }
};

module.exports = {
  uploadImage,
  fetchImage,
  deletedImage,
};
