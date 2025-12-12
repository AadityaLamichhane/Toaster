export interface MeetingColumn {
	id:number,
	name:string,
	created_by:string,
	area :string,
	created_date:string,

	
}

class Resource {
	static toJson(meeting: MeetingColumn): Partial<MeetingColumn> | null {
		if (!meeting) return null;
		const data: MeetingColumn = {
			id: meeting.id,
			name: meeting.name,
			area: meeting.area,
			created_by: meeting.created_by,
			created_date: meeting.created_date,
		};
		return data;
	}
	static collection(meetings: MeetingColumn[]) {
		return meetings.map((meeting) => this.toJson(meeting));
	}
}
export default Resource;
