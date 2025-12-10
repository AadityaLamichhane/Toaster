import { pgTable, index } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

export const meetings = pgTable(tableName, attribute, (t) => [
	index('theme').on(t.theme)
]);

export default meetings;
