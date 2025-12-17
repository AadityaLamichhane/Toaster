import type { Config } from "drizzle-kit";
import env from "./src/config/env";
export default {
  schema: "./src/migrations/schema.ts",
  out: "./src/migrations/migration_schema",
  dialect: "postgresql",
  dbCredentials: {
    url:
      env.POSTGRES_URL ||
      `postgres://${env.POSTGRES_USERNAME}:${env.POSTGRES_PASSWORD}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`,
    ssl: true,
  },
} satisfies Config;
