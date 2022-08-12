const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
require("dotenv").config();
app.use(cors());

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

app.post("/upload", fileUpload(), async (req, res) => {
  try {
    console.log(req.files);
    const pictureToUpload = req.files.picture;
    const result = await cloudinary.uploader.upload(
      convertToBase64(pictureToUpload)
    );
    return res.json(result);
  } catch (error) {
    return res.json({ error: error.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server has started !");
});
