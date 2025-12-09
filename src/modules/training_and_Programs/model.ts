import { InferSelectModel } from "drizzle-orm";
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
const scheduled_program_table = pgTable('scheduled_program_table', {
	id: serial('id').primaryKey(),
	title_en: text('title').notNull(),
	title_ne: text('title_en'),
	event_date: timestamp('event_date'),
	event_venue: text('event_venue').notNull(),
	description: text('description').notNull(),
	added_images: text('added_images').array(),
	thumbnail_image: text('thumbnail_image')
});
export type SCHEDULED_PROGRAMS_TABLE = typeof scheduled_program_table.$inferSelect;
export { scheduled_program_table };
