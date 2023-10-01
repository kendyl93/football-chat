import express from 'express';
import mongoose from 'mongoose'
import http from 'http';
import socketIo from 'socket.io'
import { json, urlencoded } from 'body-parser';
import { initServer } from './server/init'
import { dbString, dbOptions } from './database/constants'
import { initRoutes } from './routes'
import cors from 'cors';
import { ENVIRONMENT } from './environment';

const app = express();

const io = (socketIo as any)(ENVIRONMENT.SOCKET_PORT, {
    cors: {
        origin: ENVIRONMENT.CLIENT_URL
    }
}) //in case server and client run on different urls

io.on("connection", (socket: any) => {
    console.log("⚡️[SOCKET] client connected: ", socket.id)

    socket.on('chat message', (msg: string) => {
        console.log('"⚡️[SOCKET] New message:', msg);
    });

    socket.on("disconnect", (reason: any) => {
        console.log(reason)
    })
})

io.on("error", (error: any) => {
    console.error("⚡️[SOCKET] Socket.IO error:", error);
});



// setInterval(() => {
//     io.to("clock - room").emit("time", new Date())
// }, 1000)

app.use(cors()) // TODO make it more secure
app.use(urlencoded({ extended: false }))
app.use(json())

initRoutes(app)

mongoose.connect(dbString, dbOptions, async (error) => {
    console.log(`[DB]: ${dbString}`)
    if (error) {
        console.log(`[DB ERROR]: ${error}`)
    }

    await initServer(app)
})