import { pgTable, serial, text, timestamp, integer, boolean } from "drizzle-orm/pg-core";
const introduction_table = pgTable("introduction", {
	id: serial('id').primaryKey(),
	content_en: text('content_en').notNull(),
	content_ne: text('content_ne').notNull(),
	created_at: timestamp('created_at').defaultNow(),
	updated_at: timestamp('updated_at').defaultNow(),
});
const official_staff_table = pgTable("official_staff", {
	id: serial('id').primaryKey(),
	name_en: text('name_en').notNull(),
	name_ne: text('name_ne').notNull(),
	position_en: text('position_en').notNull(),
	position_ne: text('position_ne').notNull(),
	email: text('email'),
	phone: text('phone'),
	facebook_link: text("facebook_link"),
	twitter_link: text('twitter_link'),
	instagram_link: text('instagram_link'),
	photo_url: text('photo_url'),
	created_at: timestamp('created_at').defaultNow(),
	feature: boolean('feature').default(true)
});
const director_message_table = pgTable("director_message", {
	id: serial('id').primaryKey(),
	message_en: text('message_en').notNull(),
	message_ne: text('message_ne').notNull(),
	director_staff_id: integer('director_staff_id'),
	created_at: timestamp('created_at').defaultNow(),
});
export { introduction_table, official_staff_table, director_message_table }
export type Introduction_Type = typeof introduction_table.$inferSelect;
export type Official_table_Type = typeof official_staff_table.$inferSelect;
export type Director_message_Type = typeof director_message_table.$inferSelect;

