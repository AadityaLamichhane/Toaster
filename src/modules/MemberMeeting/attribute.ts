import { integer, serial, timestamp } from "drizzle-orm/pg-core";

export const tableName = "membermeeting"

export const attribute = {
	id: serial("id").primaryKey(),
	member_id: integer("member_id").notNull(),
	meeting_id: integer("meeting_id").notNull(),
	membership_at: timestamp("membership_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
};
