const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const Stock = require("./models/Stocks");

//Server is a separate http server to bind app to
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

mongoose.Promise = global.Promise;
mongoose.connect(keys.mongoURI), { useMongoClient: true };

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {});

//Server to Client Connection
wsServer.on("connection", ws => {
  ws.send(JSON.stringify({ type: "message", data: "Hello Client" }));

  //Populate clients stocksArray state
  Stock.find({}, (err, stocks) => {
    if (err) {
      console.log(err);
    } else {
      const watchlistDB = { type: "data", data: stocks };
      console.log("Current WL:", watchlistDB);
      ws.send(JSON.stringify(watchlistDB));
    }
  });

  ws.on("message", msg => {
    const payload = JSON.parse(msg);
    if (payload.data === "" || payload.data === null) {
      console.log("Cannot submit empty or undefined entry");
      return;
    }

    if (payload.type === "addSymbol") {
      const newStock = { symbol: payload.data };
      Stock.create(newStock, err => {
        if (err) {
          console.log(err);
        } else {
          wsServer.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ type: "add_stock", data: newStock })
              );
            }
          });
          console.log(`${payload.data} added to DB`);
        }
      });
    }

    if (payload.type === "removeSymbol") {
      console.log("REMOVING FROM DB:", payload.data);
      const removeStock = { symbol: payload.data };
      Stock.remove(removeStock, err => {
        if (err) {
          console.log("Mongoose Err:", err);
        } else {
          wsServer.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({ type: "remove_stock", data: removeStock })
              );
            }
          });
          console.log(`${payload.data} has been removed`);
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

if (process.env.NODE_ENV === "production") {
  //Express will serve up production assets
  //like our main.js file, or main.css file
  app.use(express.static("client/build"));

  // Express will serve up the index.html file
  // if it doesn't recognize the route

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Serving on Port ${PORT}`);
});
