const express = require("express");
const app = express();
const server = require("http").createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ server });
const bodyParser = require("body-parser");
const axios = require("axios");
const port = 3000;

app.use(bodyParser.json());

wss.on("connection", function connection(ws) {
  console.log("A new client Connected!");
  ws.send("Welcome New Client!");
});
app.get("/", (req, res) => {
  console.log("hello from server");
  res.send("hello");
});
app.post("/", (req, res) => {
  console.log("succesfully reached post request");
  console.log(Date.now());
  console.log(req.body);
  const truecallerApi = req.body.endpoint;
  const accessToken = req.body.accessToken;

  const instance = axios.create({
    baseURL: truecallerApi,
    timeout: 1000,
    headers: { Authorization: "Bearer" + accessToken },
  });

  const temp = instance.get("").then((response) => response.data);
  temp.then((response) => {
    console.log(response);
    res.status(200).end();
  });
});
// ​
server.listen(3000, "0.0.0.0", () => {
  console.log(`Lisening on port :3000`);
});

