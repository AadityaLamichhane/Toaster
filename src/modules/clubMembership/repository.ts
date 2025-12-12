import Model from "./model";
import type { ClubMembershipColumn } from "./resource";
import clubMembership from "./schema";

const selectQuery = {
	id: clubMembership.id,
	member_id: clubMembership.member_id,
	club_id: clubMembership.club_id,
	joined_at: clubMembership.joined_at,
	updated_at: clubMembership.updated_at,
};

export default {
	selectQuery,
};
