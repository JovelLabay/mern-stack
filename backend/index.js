const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// SCHEMA
const { user, auto } = require("./schema.config");

// MONGODB CONNECTION
mongoose
  .connect("mongodb://localhost:27017/mern")
  .then(() => app.listen(8000, () => console.log("Running on port 8000")))
  .catch((e) => console.log(e.message));

// MIDDLEWARE
const app = express();
app.use(cors());
app.use(bodyParse.json());

// GET
app.get("/api/data/", (req, res) => {
  user
    .find()
    // FULL DATA TO BE RETURNED
    .then((data) => {
      res.send(data);
    })

    // LIMITATION OF DATA TO BE RETURNED
    // .then((data) => {
    //   res.send(
    //     data.map((d) => {
    //       return { name: d.name, id: d._id };
    //     })
    //   );
    // })
    .catch((err) => {
      res.send(err.message);
    });
});

// GET SPECIFIC ID
app.get("/api/data/:id", async (req, res) => {
  try {
    const resData = await user.findOne({
      _id: req.params.id,
    });
    const data = resData;
    res.json(data);
  } catch (error) {
    res
      .status(404)
      .json({ message: error.message, id: req.params.id + " does not exist" });
  }
});

// POST
app.post("/api/data/create", (req, res) => {
  const { name, age, address } = req.body;
  user
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
  user
    .findByIdAndDelete(req.params.id)
    .then(() => res.send("ok"))
    .catch((err) => console.log(err));
});

// PUT
app.put("/api/data/:id", (req, res) => {
  user
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          address: req.body.address,
        },
      }
    )
    .then(() => {
      res.json({ status: "OK", code: 200 });
    })
    .catch((err) => {
      res.send(err.message);
    });
});

// === FOR AUTHENTICATION === //
// REGISTER
app.post("/api/register", async (req, res) => {
  try {
    const hasPass = btoa(req.body.password);
    await auto.create({
      email: req.body.email,
      password: hasPass,
    });
    res.json({ info: "Account Successfull" });
  } catch (e) {
    res.json({ info: e.message });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const unHashPass = btoa(req.body.password);
  const authentication = await auto.findOne({
    email: req.body.email,
    password: unHashPass,
  });

  if (authentication) {
    const token = jwt.sign(
      {
        email: req.body.email,
        password: req.body.password,
      },
      "secret1234"
    );
    res.json({ status: "ok", userStatus: token });
  } else {
    res.json({ status: "invalid", userStatus: false });
  }
});
