// access to the `body` property in requests
const express = require("express");
const passport = require("passport");
// log messagesin the terminal as requests are coming in
const logger = require("morgan");

// deal with cookies when dealing with authentication
const cookieParser = require("cookie-parser");

// need to accept requests from 'the outside'. CORS -> cross origin resource sharing
// unless the request is made from the same domain, by default express wont accept POST requests
const cors = require("cors");

const FRONTEND_URL = process.env.ORIGIN || "https://founder-finder.vercel.app";

// Middleware configuration

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  require("./passport-config")(passport);

}
module.exports = (app) => {
  // Because this will be hosted on a server that will accept requests from outside and it will be hosted ona server with a `proxy`, express needs to know that it should trust that setting.
  app.set("trust proxy", 1);

  // controls a very specific header to pass headers from the frontend
  app.use(
    cors({
      origin: "https://founder-finder.vercel.app", // Allow specific origin
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
      credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
  );

  // In development environment the app logs
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
};
