import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const { POSTGRES_URL, DATABASE_URL } = process.env;
if (!POSTGRES_URL && !DATABASE_URL) {
  throw new Error(
    "Missing PostgreSQL environment variables. Make Sure you have the environment variable set "
  );
}
const connectionString = `${DATABASE_URL || POSTGRES_URL}`;
console.log('The runnig connection string is ', connectionString);
const client = postgres(connectionString, {
	debug: (connection, query, parameters, types) => {
		console.log('QUERY:', query);
		console.log('PARAMS:', parameters);
	}
});
export const db = drizzle(client);
export const testConnection = async () => {
	try {
		await client`SELECT 1`;
		console.log("✅ Database connected successfully!");
		return true;
	} catch (error) {
		console.error("❌ Database connection failed:", error);
		return false;
	}
};
export default db;
