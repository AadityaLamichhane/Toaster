import { pgTable, index } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";
const schema = pgTable(tableName, attribute, (t) => [
	index('theme').on(t.theme)
]);
export default schema;
// Using the indexing logic here 
