const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const apiRouter = require('./routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((error, req, res, next) => {
//   if (!error.statusCode) error.statusCode = 500;

//   return res.status(error.statusCode).json({ error: error.toString() });
// });

app.use(apiRouter);

if (process.env.NODE_ENV === 'production') {
  //Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

module.exports = { app };
