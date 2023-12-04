const express = require("express");
const router = express.Router();

const { getDb } = require("../db");
const { ObjectId } = require("mongodb");
require("../server");

let db;
//assign value of database to global db variable from getDb func that takes collection name argument
router.all("*", async function (req, res, next) {
  db = await getDb("phones");
  next();
});

//get all phones arr
router.get("/", (req, res) => {
  let phones = [];

  db.find({})
    .forEach((phone) => phones.push(phone))
    .then(() => {
      res.status(200).json(phones);
    })
    .catch((err) => {
      console.log(err);
      res.status(500);
    });
});

//chech if given ID is valid and get one phone data with its ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  if (ObjectId.isValid(id)) {
    db.findOne({ _id: new ObjectId(id) })
      .then((doc) => {
        res.status(200).json(doc);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch" });
      });
  }
});

module.exports = router;
