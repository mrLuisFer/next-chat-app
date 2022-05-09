import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();
app.use(express.json());
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  const { roomId } = socket.handshake.query;
  socket.join(roomId as any);

  socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId as any).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  socket.on("disconnect", (reason) => {
    console.log(`Client disconnected 'cause: ${reason}`);
  });
});

io.listen(8000);
