const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const adSchema = new Schema({
  businessIdea: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  investment: {
    type: String,
    required: true,
  },
  requiredSkills: {
    type: [String],
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Ad = model("Ad", adSchema);

module.exports = Ad;
