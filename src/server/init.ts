import { ENVIRONMENT } from '../environment'

// any because of an express typing issue
export const initServer = (app: any) => () => {
    console.log('connected to database successfully')

    app.listen(ENVIRONMENT.SERVER_PORT, () => {
        console.log(`⚡️[server]: is listening on port ${ENVIRONMENT.SERVER_PORT}`)
    })
}