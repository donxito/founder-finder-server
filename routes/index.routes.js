const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.json("Hello Hello");
});

module.exports = router;
