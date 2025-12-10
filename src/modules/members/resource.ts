export interface MemberColumn {
	id: number;
	name: string;
	email: string;
	phone?: string;
	club_id?: number;
	introduction?: string;
	role?: string;
	created_at?: Date;
	updated_at?: Date;
}

class Resource {
	static toJson(member: MemberColumn): Partial<MemberColumn> | null {
		if (!member) return null;
		const data: MemberColumn = {
			id: member.id,
			name: member.name,
			email: member.email,
			phone: member.phone || "",
			introduction: member.introduction ||"",
			created_at: member.created_at,
			updated_at: member.updated_at,
		};

		return data;
	}

	static collection(members: MemberColumn[]) {
		return members.map((member) => this.toJson(member));
	}
}


export default Resource;
