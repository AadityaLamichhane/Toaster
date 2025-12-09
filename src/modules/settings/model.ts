import { pgTable } from "drizzle-orm/pg-core";
import { text, serial, integer } from "drizzle-orm/pg-core";
const setting_table = pgTable("setting", {
	id:serial("id"),
	group: text("group"), // Theme setting will have this kind of the group
	key: text("key"),
	value: text("value"),
	title: text("title"),
	file: text("file")
});
export { setting_table }
