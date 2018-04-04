const express = require('express');
const http = require('http');

const {WebSocketServer} = require('./WebSocketServer');
const stockService = require("./stockARserver");

function startServer() {
    const httpPort = process.argv[3] || 1338;
    const folder = process.argv[2] || 'build';

    const app = express();
    const absFolder = __dirname + '/' + folder;
    app.use('/', express.static(absFolder));

    http.createServer(app).listen(httpPort);

    console.log(`serving folder '${absFolder}' on port: ${httpPort}`);
}

function startWebSocketServer() {

    const webSocketPort = process.argv[4] || 1337;

    const webSocketServer = new WebSocketServer();

    webSocketServer.onMessageCallback = (messaqeString) => {
        webSocketServer.sendStringToAllSockets(messaqeString);
    };

    webSocketServer.connect(webSocketPort);
}

startServer();
if (process.argv[5] == "ticker") {
    stockService.sendStockPrices();
}
else {
    startWebSocketServer();
}
