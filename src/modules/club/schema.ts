import { pgTable, index } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

export const club = pgTable(tableName, attribute, (t) => [
	index('idx_area').on(t.area),
	index('idx_created_by').on(t.created_by)
]);

export default club;
