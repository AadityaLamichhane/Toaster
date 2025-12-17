import dotenv from "dotenv";
dotenv.config();
const env: any = {
  serverPort: process.env.serverPort || 9000,
  POSTGRES_USERNAME: process.env.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
  POSTGRES_HOST: process.env.POSTGRES_HOST,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT) || 5432,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_URL: process.env.DATABASE_URL || process.env.POSTGRES_URL,
  RESPONCE_SECRET: process.env.responce_secret,
  JWT_TOKEN: process.env.jwt_token,
};
export default env;
