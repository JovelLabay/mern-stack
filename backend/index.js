const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");

const mama = require("./index.config");

mongoose
  .connect("mongodb://localhost:27017/sample")
  .then(() => console.log("connected"))
  .catch((e) => console.log(e.message));

const app = express();

app.use(bodyParse.json());

// GET THE LIST OF ALL DATA
app.get("/api/data", (req, res) => {
  mama
    .find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

// CREATE NEW DATA
app.post("/api/data/create", (req, res) => {
  const { name, age, address } = req.body;
  mama
    .create({
      name: name,
      age: age,
      address: address,
    })
    .then(() => {
      res.status(200).send("Created Successfully");
    })
    .catch((err) => console.log(err));
});

app.listen(8000, () => console.log("Running on port 8000"));
