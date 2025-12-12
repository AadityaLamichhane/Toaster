import { text, serial, json , integer, timestamp} from "drizzle-orm/pg-core";
import member from "../members/schema"
import club from "../club/schema"

export const tableName = "clubmembership";

export const attribute =  {
	id: serial("id").primaryKey(),
	member_id: integer("member_id").notNull().references(() => member.id, { onDelete: 'cascade' }),
	club_id: integer("club_id").notNull().references(() => club.id, { onDelete: 'cascade' }),
	joined_at: timestamp("joined_at").defaultNow(),
	updated_at: timestamp("updated_at").defaultNow(),
};