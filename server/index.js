const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI), { useMongoClient: true };

const app = express();

const Stock = require("./models/Stocks");

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json([{ express: "was here" }, { twelve: "12" }]);
});

app.get("/data", (req, res) => {
  console.log(req.body);
  // const apple = new Stock({ symbol: "AAPL" }).save();
  res.send("Goodjob");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});
