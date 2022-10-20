import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { chatRouter } from './routes/chat'
import { initServer } from './server/init'

import { dbString, dbOptions } from './database/constants'

const app = express()
app.use(json())
app.use(chatRouter)

mongoose.connect(dbString, dbOptions, initServer(app))