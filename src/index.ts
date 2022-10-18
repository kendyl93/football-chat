import express from 'express';
import mongoose from 'mongoose'
import { json } from 'body-parser';
import { chatRouter } from './routes/chat'
import { ENVIRONMENT } from './environment'

const app = express()
app.use(json())
app.use(chatRouter)

mongoose.connect(`${ENVIRONMENT.DB_HOST}://${ENVIRONMENT.DB_USER}:${ENVIRONMENT.DB_PASSWORD}localhost:${ENVIRONMENT.DB_PORT}/${ENVIRONMENT.DB_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to database successfully')
})

app.listen(ENVIRONMENT.SERVER_PORT, () => {
    console.log(`server is listening on port ${ENVIRONMENT.SERVER_PORT}`)
})