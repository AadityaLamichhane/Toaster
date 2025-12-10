import subscriptions from "./schema";

const selectQuery = {
	id: subscriptions.id,
	member_id: subscriptions.member_id,
	meeting_id: subscriptions.meeting_id,
	subscribed_at: subscriptions.membership_at,
	updated_at: subscriptions.updated_at,
};

export default {
	selectQuery,
};
