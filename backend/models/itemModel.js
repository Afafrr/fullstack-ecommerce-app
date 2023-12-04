const mongoose = require("mongoose");

// const specificationModel = new mongoose.Schema({
//   display: {
//     type: String,
//   },
//   camera: {
//     type: String,
//     unique: true,
//   },
//   processor: {
//     type: String,
//   },
//   storage: {
//     type: String,
//   },
//   color: {
//     type: String,
//   },
// });

const itemModel = new mongoose.Schema({
  name: {
    type: String,
    unique: [true, "Item already exists"],
    required: [true, "Name is required"],
  },
  brand: {
    type: String,
    required: [true, "Brand is required"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
  },
  // specification: specificationModel,
  // image: {
  //   type: String,
  // },
  collectionName: {
    type: String,
    required: [true, "Collection name is required"],
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = { itemModel };
