import { pgTable } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

export const agendas = pgTable(tableName, attribute);

export default agendas;
