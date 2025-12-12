import { password } from "bun";
import { text, serial, integer, timestamp } from "drizzle-orm/pg-core";

export const tableName = "users"

export const attribute = {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	phone: text("phone"),
	password: text("password"),
	introduction: text("introduction"),
	// club_id: integer("club_id"),
	// role: text("role"),
	created_at: timestamp("created_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
};
