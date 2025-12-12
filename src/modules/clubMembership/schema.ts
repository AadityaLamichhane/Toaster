import { pgTable, index, unique } from "drizzle-orm/pg-core";
import { attribute, tableName } from "./attribute";

export const clubMembership = pgTable(tableName, attribute, (t) => [
	index('idx_clubmembership_member_id').on(t.member_id),
	index('idx_clubmembership_club_id').on(t.club_id),
	unique('unique_member_club').on(t.member_id, t.club_id)
]);

export default clubMembership;
