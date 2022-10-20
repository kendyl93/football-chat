import { ENVIRONMENT } from '../environment'

export const dbString = `${ENVIRONMENT.DB_HOST}://${ENVIRONMENT.DB_USER}:${ENVIRONMENT.DB_PASSWORD}localhost:${ENVIRONMENT.DB_PORT}/${ENVIRONMENT.DB_NAME}`

export const dbOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}