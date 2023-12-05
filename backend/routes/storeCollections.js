const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const myDb = mongoose.connection.useDb("Store");
  const collectionNames = await myDb.db.listCollections().toArray();
  res.status(200).json(collectionNames);
});

module.exports = router;
