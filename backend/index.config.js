const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
})

// userSchema.methods.sample = function () {
//     const {name, age} = this
//     console.log(`hello ${age}`)
// }

module.exports = mongoose.model("data", userSchema)