const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { itemModel } = require("../models/itemModel.js");
require("../server");

let model;
let collecitonName;

//collectionName is taken from middleware, depending on this variable certain collection will be searched.
router.all("*", async function (req, res, next) {
  collecitonName = req.collectionMiddleware;
  const myDb = mongoose.connection.useDb("Store");
  model = myDb.model(collecitonName, itemModel);

  next();
});

//get all items arr
router.get("/", async (req, res) => {
  const items = await model.find();
  res.status(200).json(items);
});

//chech if given ID is valid and get one item data with its ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    const item = await model.findOne({ _id: id });
    res.status(200).json(item);
  }
});

module.exports = router;
