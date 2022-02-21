const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: {
    zone: Number,
    street: mongoose.SchemaTypes.Mixed,
  },
});

// userSchema.methods.sample = function () {
//     const {name, age} = this
//     console.log(`hello ${age}`)
// }

module.exports = mongoose.model("jovel", userSchema);
