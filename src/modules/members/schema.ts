import { pgTable, index } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";
export const members = pgTable(tableName, attribute, (t) => [
	index('idx_members_email').on(t.email),
	index('idx_members_name').on(t.name)
]);
export default members;
