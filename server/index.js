const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("HELLO THERE");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});
