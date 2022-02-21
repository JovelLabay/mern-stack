const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");

const config = require("./index.config");

const DATABASE =
  "mongodb+srv://sample:sample1234@cluster0.drlfj.mongodb.net/sample?retryWrites=true&w=majority";

mongoose
  // .connect("mongodb://localhost:27017/sample")
  .connect(DATABASE)
  .then(() => app.listen(8000, () => console.log("Running on port 8000")))
  .catch((e) => console.log(e.message));

const app = express();

app.use(bodyParse.json());

// GET THE LIST OF ALL DATA
app.get("/api/data", (req, res) => {
  config
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
  config
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

// DELETE
app.delete("/api/data/:id", (req, res) => {
  config
    .findByIdAndDelete(req.params.id)
    .then(() => res.send("ok"))
    .catch((err) => console.log(err));
});
