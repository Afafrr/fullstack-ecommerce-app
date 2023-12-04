//packages import
const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const cors = require("cors");
const app = express();

//files imports
const { connectToDb } = require("./db");
const phonesRouter = require("./routes/phones");
const userRouter = require("./routes/user");

app.use(express.json()).use(
  cors({
    origin: "*",
  })
);

// connecting to db using connectToDb func that takes as arguments name of DB and a callback func, \
//which fires when connection is established
connectToDb((err) => {
  if (!err) {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  }
});

app.get("/", async (req, res) => {
  res.status(200).send("Hi");
});

//login and signup user
app.use("/user", userRouter);

// /phones/ and /phones/:id routes
app.use("/phones", phonesRouter);
