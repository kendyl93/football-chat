import { Express } from 'express';
import { ENVIRONMENT } from '../environment'

export const initServer = (app: Express) => () => {
    console.log('connected to database successfully')


    app.listen(ENVIRONMENT.SERVER_PORT, () => {
        console.log(`server is listening on port ${ENVIRONMENT.SERVER_PORT}`)
    })
}