const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: String,
    password: String,
    role : String,
    isActive : Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);