import { integer, serial, timestamp } from "drizzle-orm/pg-core";
export const tableName = "membermeeting"
export const attribute = {
	id: serial("id").primaryKey(),
	member_id: integer("member_id").notNull().references(() => require('../members/schema').default.id, { onDelete: 'cascade' }),
	meeting_id: integer("meeting_id").notNull().references(() => require('../meetings/schema').default.id, { onDelete: 'cascade' }),
	membership_at: timestamp("membership_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
};
