export interface SubscriptionColumn {
	id: number;
	member_id: number;
	meeting_id: number;
	membership_at?: Date;
	updated_at?: Date;
}
class Resource {
	static toJson(subscription: SubscriptionColumn): Partial<SubscriptionColumn> | null {
		if (!subscription) return null;
		const data: SubscriptionColumn = {
			id: subscription.id,
			member_id: subscription.member_id,
			meeting_id: subscription.meeting_id,
			membership_at: subscription.membership_at,
			updated_at: subscription.updated_at,
		};
		return data;
	}

	static collection(subscriptions: SubscriptionColumn[]) {
		return subscriptions.map((subscription) => this.toJson(subscription));
	}
}

export default Resource;
