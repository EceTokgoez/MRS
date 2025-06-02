const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  profilePhoto: {
    type: String,
    default: "https://example.com/default-profile.png"
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  preferences: {
    genres: [String],
    actors: [String],
    directors: [String],
    keywords: [String]
  },
  embedding: [Number]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
