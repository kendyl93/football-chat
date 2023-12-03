import express from "express";
import mongoose from "mongoose";
import socketIo from "socket.io";
import { json, urlencoded } from "body-parser";
import { initServer } from "./server/init";
import { dbString, dbOptions } from "./database/constants";
import { initRoutes } from "./routes";
import cors from "cors";
import { ENVIRONMENT } from "./environment";
import { ChatMessage } from "./models/chatMessage";
import { ChatRoom } from "./models/chatRoom";
import cron from "node-cron";
import { cleanupDatabase } from "./database/cleanupDB";

const app = express();

const io = (socketIo as any)(ENVIRONMENT.SOCKET_PORT, {
  cors: {
    origin: ENVIRONMENT.CLIENT_URL,
  },
}); //in case server and client run on different urls

// '*/10 * * * * *' - every 10seconds to test
// '0 2 * * *' Schedule the cleanup task to run at 2:00 AM every day
// Schedule the database cleanup task to run every 10 seconds for testing
cron.schedule("0 2 * * *", async () => {
  await cleanupDatabase();
});

io.on("connection", (socket: any) => {
  console.log("⚡️[SOCKET] client connected: ", socket.id);

  socket.on("send room message", async (msg: any) => {
    try {
      console.log('"⚡️[SOCKET] New message:', msg);

      const body = new ChatMessage(msg);

      // Create a new ChatMessage document
      const newMessage = new ChatMessage(body);
      const chatRoom = await ChatRoom.findOne({ matchId: msg.roomId });
      newMessage.roomId = chatRoom?._id;
      console.log({ newMessage, chatRoom });
      // Save the new message
      await newMessage.save();
      console.log("after save");
      // Associate the message with the chat room
      if (!chatRoom) {
        throw new Error("Chat room not found"); // Handle the case where the chat room is not found
      }

      console.log({ chatRoom });

      chatRoom.messages.push(newMessage._id); // Add the message to the chat room's messages array
      await chatRoom.save();

      io.emit("received-message", newMessage);
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("join-room", async (roomId: any, callback: any) => {
    console.log("Joined room: ", roomId);
    socket.join(roomId);

    await callback();
  });

  socket.on("disconnect", (reason: any) => {
    console.log(reason);
  });
});

io.on("error", (error: any) => {
  console.error("⚡️[SOCKET] Socket.IO error:", error);
});

app.use(cors()); // TODO make it more secure
app.use(urlencoded({ extended: false }));
app.use(json());

initRoutes(app);

mongoose.connect(dbString, dbOptions, async (error) => {
  console.log({ ENV: JSON.stringify({ ENV: process.env }) });
  console.log(`[DB]: ${dbString}`);
  if (!error) {
    await initServer(app);
  }

  console.log(`[DB ERROR]: ${error}`);
});
