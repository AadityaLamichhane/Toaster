export interface ClubMembershipColumn {
	id: number;
	member_id: number;
	club_id: number;
	joined_at: Date;
	updated_at: Date;
}

class Resource {
	static toJson(membership: ClubMembershipColumn): Partial<ClubMembershipColumn> | null {
		if (!membership) return null;
		const data: ClubMembershipColumn = {
			id: membership.id,
			member_id: membership.member_id,
			club_id: membership.club_id,
			joined_at: membership.joined_at,
			updated_at: membership.updated_at,
		};

		return data;
	}

	static collection(memberships: ClubMembershipColumn[]) {
		return memberships.map((membership) => this.toJson(membership));
	}
}

export default Resource;
