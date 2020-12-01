const mongoose = require('mongoose');
const WebSocket = require('ws');
const http = require('http');

const keys = require('./config/keys');
const { app } = require('./app');
const { wsService } = require('./services/websocket');

//Server is a separate http server to bind app to
const server = http.createServer(app);
const wsServer = new WebSocket.Server({ server });

const start = async () => {
  if (!keys.mongoURI) {
    throw new Error('mongoURI key must be defined');
  }

  if (!keys.IEX_CLOUD_TOKEN) {
    throw new Error('IEX_CLOUD_TOKEN must be defined');
  }

  if (!keys.IEX_SANDBOX_TOKEN) {
    throw new Error('IEX_SANDBOX_TOKEN must be defined');
  }

  try {
    mongoose.Promise = global.Promise;
    await mongoose.connect(keys.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await wsService(wsServer);

    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`Serving on Port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
