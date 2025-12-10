import { pgTable } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

const schema = pgTable(tableName, attribute);

export default schema;
