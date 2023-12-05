const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  itemId: {
    type: objectId,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  posts: { postSchema },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("User", userModel);
