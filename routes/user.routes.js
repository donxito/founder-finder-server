const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// GET /users/:id - Get user by id
router.get("/users/:id", isAuthenticated, (req, res, next) => {
    const { id } = req.params;
    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json({
                _id: user._id,
                email: user.email,
                name: user.name,
                username: user.username,
                phoneNumber: user.phoneNumber,
                about: user.about,
                avatar: user.avatar,
                
            });
        })
        .catch((error) => {
            next(error);
        });
});

// PUT /users/:id - Update user by id
router.put("/users/:id", isAuthenticated, (req, res, next) => {
    const { id } = req.params; // Changed userId to id
    User.findByIdAndUpdate(id, req.body, { new: true }) // Changed userId to id
        .then((updatedUser) => {
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            res.json(updatedUser);
        })
        .catch((error) => {
            next(error);
        });
});



// DELETE /users/:userId - Delete user by id
router.delete("/users/:id", isAuthenticated, (req, res, next) => {
    const { userId } = req.params;
    User.findByIdAndDelete(userId)
        .then((deletedUser) => {
            res.json(deletedUser);
        })
        .catch((error) => {
            next(error);
        });
});


module.exports = router;

