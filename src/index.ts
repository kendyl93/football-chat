import express from 'express';
import mongoose from 'mongoose'
import { json, urlencoded } from 'body-parser';
import { initServer } from './server/init'
import { dbString, dbOptions } from './database/constants'
import { initRoutes } from './routes'
import cors from 'cors';

const app = express()

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