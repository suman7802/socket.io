const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const path = require("path");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log(`NewUser login ${socket.id}`);
  io.emit("message", `NewUser login ${socket.id}`);

  socket.on("message", (data) => {
    console.log(`Received message from, ${socket.id}\n${data}`);
    io.emit("message", `${socket.id} sends message: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} Disconnected`);
    io.emit("message", `${socket.id} Disconnected`);
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
