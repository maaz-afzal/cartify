const mongoose = require("mongoose");

// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // For avoiding email duplication
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Enumeration = Only fixed/pre-defined value allowed
      default: "user",
    },
  },
  { timestamps: true },
);

// Model
const User = mongoose.model("User", UserSchema);

module.exports = User;
