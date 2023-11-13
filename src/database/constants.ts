import { ENVIRONMENT } from "../environment";

export const dbString = `${ENVIRONMENT.DB_HOST}://mongo:${ENVIRONMENT.DB_PORT}/${ENVIRONMENT.DB_NAME}`;

export const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};
