import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { chatRouter } from './routes/chat'

const app = express()
app.use(json())
app.use(chatRouter)

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to database')
})

app.listen(3000, () => {
    console.log('server is listening on port 3000')
})