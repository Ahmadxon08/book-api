const uploadToImageKit = require("../helpers/imagekit.helper");
const imageModel = require("../models/image.model");
const fs = require("fs");
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

module.exports = uploadImage;
