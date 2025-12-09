import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
const {
	POSTGRES_PASSWORD,
	POSTGRES_USERNAME,
	POSTGRES_DB,
	POSTGRES_HOST,
	POSTGRES_PORT,
} = process.env;

if (
	!POSTGRES_PASSWORD ||
	!POSTGRES_USERNAME ||
	!POSTGRES_DB ||
	!POSTGRES_HOST
) {
	throw new Error(
		"Missing PostgreSQL environment variables. Make Sure you have the environment variable set "
	);
}
const port = POSTGRES_PORT || "5432";
const connectionString = `postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${port}/${POSTGRES_DB}`;
const client = postgres(connectionString);
export const db = drizzle(client);

export const testConnection = async () => {
	try {
		await client`SELECT 1`;
		console.log("Server is running in the port no ", port);
		return true;
	} catch (error) {
		console.log("----------Error:----------\n");
		return false;
	}
};

export default db;
