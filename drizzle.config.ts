import type { Config } from "drizzle-kit";
import env from "./src/config/env";
export default {
  schema: "./src/migrations/schema.ts",
  out: "./src/migrations/migration_schema",
  dialect: "postgresql",
  dbCredentials: {
    host: env.POSTGRES_HOST || "localhost",
    port: Number(env.POSTGRES_PORT) || 5432,
    user: env.POSTGRES_USERNAME || "postgres",
    password: env.POSTGRES_PASSWORD || "postgres",
    ssl: false,
    database: env.POSTGRES_DB || "postgres",
  },
} satisfies Config;
