export type nodeEnvType = 'development' | 'production'

export interface ENV {
    NODE_ENV: nodeEnvType;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    SERVER_PORT: string;
    SOCKET_PORT: string;
    CLIENT_URL: string;
    FOOTBALL_DATA_API_TOKEN: string;
    REDIS_URL: string;
    FOOTBALL_API_DATA_URL: string;
}