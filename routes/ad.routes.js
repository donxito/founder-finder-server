const express = require("express");
const router = express.Router();

const Ad = require("../models/Ad.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");
const { isOwner } = require("../middleware/isOwner");

// POST /ads
router.post("/ads", isAuthenticated, (req, res, next) => {
  // Extract user ID from the request payload
  const userId = req.payload._id;     
  // Associate the user ID with the ad being created
  req.body.author = userId;
  console.log("Author:", userId);
  // Create the ad in the database
  Ad.create(req.body)
    .then((newAd) => {
      res.status(201).json(newAd);
    })
    .catch((error) => {
      next(error);
    });
});

// GET /ads

router.get("/ads", (req, res, next) => {
  Ad.find({})
    .populate("author")
    .then((ads) => {
      console.log("Retrieved ads ->", ads);
      res.json(ads);
    })
    .catch((error) => {
      next(error);
    });
});

// GET /ads/:adId

router.get("/ads/:adId", (req, res, next) => {
  const { adId } = req.params;

  Ad.findById(adId)
    .populate("author")
    .then((ad) => {
      res.status(200).json(ad);
    })
    .catch((error) => {
      next(error);
    });
});

// PUT /ads/:adId
router.put("/ads/:adId", isAuthenticated, isOwner, (req, res, next) => {
  const { adId } = req.params;

  Ad.findByIdAndUpdate(adId, req.body, { new: true })
    .then((updatedAd) => {
      res.status(200).json(updatedAd);
    })
    .catch((error) => {
      next(error);
    });
});

// DELETE /ads/:adId

router.delete("/ads/:adId", isAuthenticated, isOwner, (req, res, next) => {
  const { adId } = req.params;
  const userId = req.payload._id;
  req.body.author = userId;

  console.log("Author:", userId);
  console.log("Ad ID to delete:", adId);

  Ad.findByIdAndDelete(adId)
    .then(() => {
      res.status(204).send();
    })
    .catch((error) => {
      next(error);
    });
});

// GET /users/ads/:userid
router.get("/users/ads/:userId", isAuthenticated, async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId !== req.payload._id) {
      return res.status(403).json({ error: "Unauthorized to access ads" });
    }

    const ads = await Ad.find({ author: userId }).select(
      "title description date adType imageUrl"
    );

    res.json(ads);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
