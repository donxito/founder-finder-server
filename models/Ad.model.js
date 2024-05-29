const { Schema, model, default: mongoose } = require("mongoose");

const adSchema = new Schema({
  posterName: {
    type: String,
    required: true,
  },
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
  }
});

const Ad = model("Ad", adSchema);

module.exports = Ad;
