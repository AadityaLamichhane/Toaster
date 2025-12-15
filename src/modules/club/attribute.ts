import { text, serial, json, integer, timestamp } from "drizzle-orm/pg-core";
import members from "../members/schema";
export const tableName = "club"
export const attribute = {
	id: serial("id").primaryKey(),
	name: text("name"),
	created_by: integer("created_by").notNull().references(() => members.id, { onDelete: 'cascade' }),
	area: text("area"),
	district: text("district"),
	created_date: timestamp("created_date").defaultNow(),

};
