const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});
