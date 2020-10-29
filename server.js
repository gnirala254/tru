const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");

const wss = new WebSocket.Server({ server: server });

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");

  ws.send("Welcome New Client!");
});

app.get("/", (req, res) => {
  console.log("hello from server");
  res.send("hello");
});

server.listen("https://gnirala254.github.io/truecaller/", (data) =>
  ws.send(data)
);
