const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config"); 

router.get("/", (req, res, next) => {
  res.json("Hello Hello");
});

// POST /upload endpoint
router.post("/upload", fileUploader.single("file"), (req, res, next) => {
  console.log("file is: ", req.file)
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // Get the URL of the uploaded file from Cloudinary and send it as a response
  res.json({ fileUrl: req.file.path });
});


module.exports = router;
