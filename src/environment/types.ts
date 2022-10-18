export type nodeEnvType = 'development' | 'production'

export interface ENV {
    NODE_ENV: nodeEnvType;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_PORT: string;
    SERVER_PORT: string;
}