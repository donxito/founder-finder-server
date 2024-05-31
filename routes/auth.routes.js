const express = require("express");
const router = express.Router();
const passport = require("passport");

require("../config/passport-config.js")

//password encryption
const bcrypt = require("bcryptjs");

// password encryption
const jwt = require("jsonwebtoken");

// User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isAuthenticated) middleware in order to control access to specific routes
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// How many rounds should bcryptjs run the salt 
const saltRounds = 10;

// POST /signup  - Creates a new user in the database
router.post("/signup", (req, res, next) => {
  const { email, password, name, about, phoneNumber } = req.body;

  if (email === "" || password === "" || name === "") {
      res.status(400).json({ message: "Provide email, password, and name" });
      return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
      res.status(400).json({ message: "Provide a valid email address." });
      return;
  }

  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
      res.status(400).json({
          message:
              "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
      return;
  }

  User.findOne({ email })
      .then((foundUser) => {
          if (foundUser) {
              res.status(400).json({ message: "User already exists." });
              return;
          }

          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);

          return User.create({ email, password: hashedPassword, name, about, phoneNumber });
      })
      .then((createdUser) => {
          const { email, name, _id } = createdUser;
          const user = { email, name, _id };

          res.status(201).json({ user: user });
      })
      .catch((err) => next(err));
});



// POST  /login - Verifies email and password and returns a JWT
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log("Received login request:", req.body); // Log the request body

  if (email === "" || password === "") {
      res.status(400).json({ message: "Provide email and password." });
      return;
  }

  User.findOne({ email }) // Ensure this matches the payload key
      .then((foundUser) => {
          if (!foundUser) {
              res.status(401).json({ message: "User not found." });
              return;
          }

          const passwordCorrect = bcrypt.compareSync(password, foundUser.password);
          if (passwordCorrect) {
              const { _id, email, name } = foundUser;
              const payload = { _id, email, name };
              const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
                  algorithm: "HS256",
                  expiresIn: "6h",
              });
              res.status(200).json({ authToken: authToken });
          } else {
              res.status(401).json({ message: "Unable to authenticate the user" });
          }
      })
      .catch((err) => next(err));
});

// GET  /verify  -  Used to verify JWT stored on the client
router.get("/verify", isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and is made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the token payload object containing the user data
  res.status(200).json(req.payload);
});


// Google OAuth

// Route to start Google OAuth authentication
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    // Successful authentication, redirect home with token.
    const token = req.user.token;
    res.redirect(`/auth/google/success?token=${token}`);
  }
);

router.get('/google/success', (req, res) => {
    const token = req.query.token;
    if (token) {
      // Successful authentication, redirect home with token.
      res.redirect(`${process.env.ORIGIN}`);
      console.log(token)
    } else { 
      res.status(400).send('Token not found');
    }
});


module.exports = router;