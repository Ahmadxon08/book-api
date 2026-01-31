const imagekit = require("../controllers/Image");

const uploadToImageKit = async (filePath) => {
  try {
    const result = await imagekit.upload({
      file: filePath.buffer.toString("base64"),
      fileName: filePath.fileName,
      folder: "uploads",
    });
    return result;
  } catch (error) {
    console.log("Error in Image kit file", error);
    throw new Error("Error while uploading image to ImageKit");
  }
};

module.exports = uploadToImageKit;
