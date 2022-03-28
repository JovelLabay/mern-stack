const mongoose = require("mongoose");

// USER
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: {
    zone: Number,
    street: mongoose.SchemaTypes.Mixed,
  },
});

// AUTH
const autoSchema = new mongoose.Schema({
  email: { type: String, lowercase: true, required: true },
  password: {
    type: String,
    minlength: [8, "Requires at lease 8 characters."],
    maxlength: 16,
    required: true,
  },
});

const user = mongoose.model("input", userSchema);
const auto = mongoose.model("auto", autoSchema);

module.exports = { user, auto };
