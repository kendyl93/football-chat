import express from 'express';
import mongoose from 'mongoose'
import { json, urlencoded } from 'body-parser';
import { chatRouter } from './routes/chat'
import { initServer } from './server/init'

import { dbString, dbOptions } from './database/constants'

const app = express()

app.use(urlencoded({ extended: false }))
app.use(json())
app.use(chatRouter)

app.get('/', (req: any, res: any) => {
    console.log({ req })
    res.sendFile(__dirname + '/index.html');
});


mongoose.connect(dbString, dbOptions, async (error) => {
    console.log(`[DB]: ${dbString}`)
    if (error) {
        console.log(`[DB ERROR]: ${error}`)
    }

    await initServer(app)
})