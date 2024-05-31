// Gets access to environment variables/settings

require("dotenv").config();

// Connects to the database
require("./db");

// Handles http requests (express is node js framework)
const express = require("express");
const app = express();

const session = require("express-session");
const passport = require("passport");

// Setup session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }));

// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());
  

// This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// ROUTES
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);

const adRoutes = require("./routes/ad.routes");
app.use("/", adRoutes);

// To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
