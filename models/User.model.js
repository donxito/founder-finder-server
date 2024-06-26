const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");


const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required."],
    },
    about: {
      type: String,
      default: "I am using Founder Finder.",
    },
    phoneNumber: {
      type: String,
      unique: true,
      sparse: true,  // Allow unique null values
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,  // Allow unique null values
    },
    ads: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ad"
    },
    avatar: {
      type: String,
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);


const User = model("User", userSchema);

module.exports = User;
