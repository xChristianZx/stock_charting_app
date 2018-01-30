const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const WebSocket = require("ws");
const http = require("http");

const app = express();
//Server is a separate http server to bind app to
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI), { useMongoClient: true };

const Stock = require("./models/Stocks");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json([{ express: "was here" }, { twelve: "12" }]);
  wsServer.broadcast(JSON.stringify({ msg: "HELLO MOTO" }));
});

app.get("/data", (req, res) => {
  console.log(req.body);
  Stock.remove({}, err => console.log(err));
  const apple = new Stock({ symbol: "AAPL" }).save();
  const fb = new Stock({ symbol: "FB" }).save();
  res.send("Goodjob");
});

// Broadcast Function
wsServer.broadcast = function broadcast(data) {
  wsServer.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

//Server to Client Connection
wsServer.on("connection", ws => {
  ws.send(JSON.stringify({ type: "message", data: "Hello Client" }));

  //Populate clients stocksArray state
  Stock.find({}, (err, stocks) => {
    if (err) {
      console.log(err);
    } else {
      const watchlistDB = { type: "data", data: stocks };
      console.log(watchlistDB);
      ws.send(JSON.stringify(watchlistDB));
    }
  });

  ws.on("message", msg => {
    const payload = JSON.parse(msg);
    console.log("Received: ", payload.data);

    if (payload.type === "addSymbol") {
      const newStock = { symbol: payload.data };
      console.log(`${newStock} added to DB`);
      Stock.create(newStock, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  });

  ws.on("close", (code, reason) => {
    console.log(`Client Conection Closed - ${reason} code: ${code}`);
    ws.terminate();
  });

  ws.on("error", err => {
    console.log("Serverside WS Error", err);
    ws.terminate();
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});
