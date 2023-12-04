const userModel = require("../models/userModel");
const express = require("express");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const router = express.Router();

mongoose.connect(process.env.MONGODB_URI, { dbName: "UsersDB" });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email: email,
  });

  //compares hashed and input passwords, if there is no such user then password will be null
  if (await bcrypt.compare(password, user.password)) {
    return res.status(200).json({ user: true });
  } else {
    return res.status(500).json({ user: false });
  }
});

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 13);

  try {
    //check if input is an email type
    if (!validator.isEmail(email)) {
      throw Error("It's not an email");
    }

    const emailExists = await userModel.findOne({ email: email });

    if (emailExists) {
      throw Error("Email already exists");
    }

    await userModel.create({
      name: name,
      email: email,
      password: hash,
    });

    res.status(200).json({ email, name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
