const { Schema, model } = require("mongoose");


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
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);


const User = model("User", userSchema);

module.exports = User;
