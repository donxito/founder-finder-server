const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const mongoose = require("mongoose");

router.get("/", (req, res, next) => {
  res.json("Hello Hello");
});

// POST /upload endpoint
router.post("/upload", fileUploader.single("file"), (req, res, next) => {
  console.log("file is: ", req.file);
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  // Get the URL of the uploaded file from Cloudinary and send it as a response
  res.json({ fileUrl: req.file.path });
});

router.get("/health", (req, res) => {
  // send ping to prevent inactivity on mongodb atlas
  mongoose.connection.db
    .admin()
    .ping()
    .then(() => {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
      });
    })
    .catch((err) => {
      console.error("MongoDB ping failed:", err);
      res.status(500).json({
        status: "error",
        message: "Failed to connect to MongoDB",
      });
    });
});

module.exports = router;
