import express, { Application, Request, Response } from 'express'
import mongoose from 'mongoose';

const app: Application = express()

mongoose.connect('mongodb+srv://pawel:pawelstanecki@cluster0.aj5yl.mongodb.net/test');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

const port: number = 4000

app.get('/toto', (req: Request, res: Response) => {
    res.send('Hello toto change asd UUU');
})

app.listen(port, function () {
    console.log(`App is listen on port ${port} !`)
})