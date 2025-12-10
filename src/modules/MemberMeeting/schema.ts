import { pgTable, index, unique } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

const schema = pgTable(tableName, attribute, (t) => [
	index('idx_membership_member_id').on(t.member_id),
	index('idx_membership_meeting_id').on(t.meeting_id),
]);

export default schema;
