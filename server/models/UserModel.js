const mongoose = require("mongoose");

const user = new mongoose.Schema({
  displayName: String,
  uid: { type: String, unique: true },
  score: { type: Number, default: 0 },
});

const UserModel = mongoose.model("User", user);

module.exports = UserModel;
