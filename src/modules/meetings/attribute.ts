import { text, serial, json } from "drizzle-orm/pg-core";
export const tableName = "meetings"
export const attribute = {
	id: serial("id").primaryKey(),
	theme: text("theme"),
	meetingno: text('meeting_no'),
	date: text("date"),
	start_time: text("start_time"),
	guests: text("guests").array()
};
