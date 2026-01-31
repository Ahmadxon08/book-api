const imagekit = require("../controllers/Image");
const fs = require("fs");
const path = require("path");

const uploadToImageKit = async (filePath) => {
  try {
    const result = await imagekit.upload({
      file: fs.readFileSync(filePath), // 👈 MUHIM
      fileName: path.basename(filePath), // 👈 TO‘G‘RI
      folder: "uploads/",
    });

    return result;
  } catch (error) {
    console.log("Error in ImageKit file", error);
    throw new Error("Error while uploading image to ImageKit");
  }
};

module.exports = uploadToImageKit;
