// const { routers, authenticateToken } = require("./user.js");
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { itemModel } = require("../models/itemModel");
mongoose.connect(process.env.MONGODB_URI, { dbName: "Store" });

//func to check if user token is still valid
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;

    next();
  });
}

router.get("/", authenticateToken, async (req, res) => {
  const user = req.user;
  console.log("Token authentication ", authenticateToken);

  res.status(200).json(user);
});

router.post("/post", authenticateToken, async (req, res) => {
  const { name, brand, price, collectionName } = req.body;
  console.log(req.user);

  const item = mongoose.model(collectionName, itemModel);

  try {
    console.log(name, brand, price);
    const result = await item.create({
      name: name,
      brand: brand,
      price: price,
      collectionName: collectionName,
      createdBy: req?.user.name,
    });
    console.log("created post", result);

    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
