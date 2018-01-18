const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json([{ express: "was here" }, { twelve: "12" }]);
});

app.post("/quote", (req, res) => {  
  console.log(req.body);
  res.send('Goodjob')
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});
