const express = require("express");
const router = express.Router();


// POST /subscribe

router.post("/subscribe", (req, res, next) => {
    const { email } = req.body
    // Here it's to implement the subscription logic
  // For simplicity,  I only return a success message
  res.status(200).json({ message: "Subscribed successfully" });
});


module.exports = router;