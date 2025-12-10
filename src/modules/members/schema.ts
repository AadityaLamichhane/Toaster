import { pgTable, index } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

const schema = pgTable(tableName, attribute, (t) => [
	index('idx_members_email').on(t.email),
	index('idx_members_club_id').on(t.club_id)
]);

export default schema;
