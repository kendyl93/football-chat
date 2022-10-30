import { ENV, nodeEnvType } from './types'

export const ENVIRONMENT: ENV = {
    NODE_ENV: process.env.NODE_ENV as nodeEnvType,
    DB_HOST: process.env.DB_HOST as string,
    DB_NAME: process.env.DB_NAME as string,
    DB_USER: process.env.DB_USER as string,
    DB_PASSWORD: process.env.DB_PASSWORD as string,
    DB_PORT: process.env.DB_PORT as string,
    SERVER_PORT: process.env.SERVER_PORT as string,
    FOOTBALL_DATA_API_TOKEN: process.env.FOOTBALL_DATA_API_TOKEN as string,
    REDIS_URL: process.env.REDIS_URL as string,
    FOOTBALL_API_DATA_URL: process.env.FOOTBALL_API_DATA_URL as string
}