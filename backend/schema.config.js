const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

// HASH THE PASSWOR DEFORE SAVING TO DB
autoSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const user = mongoose.model("input", userSchema);
const auto = mongoose.model("auto", autoSchema);

module.exports = { user, auto };
