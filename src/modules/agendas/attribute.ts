import { integer, text, serial } from "drizzle-orm/pg-core";
export const tableName = "agendas"
export const attribute = {
	id: serial("id").primaryKey(),
	meeting_id: integer('meeting_id').notNull().references(() => require('../meetings/schema').default.id, { onDelete: 'cascade' }),
	agenda_title: text("agenda_title").notNull(),
	created_by: integer("created_by"),
};