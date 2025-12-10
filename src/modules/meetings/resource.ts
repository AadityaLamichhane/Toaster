export interface MeetingColumn {
	id: number;
	theme: string;
	meetingno: string;
	date: string;
	start_time: string;
	createdAt?: Date;
	updatedAt?: Date;
}

class Resource {
	static toJson(meeting: MeetingColumn): Partial<MeetingColumn> | null {
		if (!meeting) return null;
		const data: MeetingColumn = {
			id: meeting.id,
			theme: meeting.theme,
			meetingno: meeting.meetingno,
			date: meeting.date,
			start_time: meeting.start_time,
			createdAt: meeting.createdAt,
			updatedAt: meeting.updatedAt,
		};

		return data;
	}

	static collection(meetings: MeetingColumn[]) {
		return meetings.map((meeting) => this.toJson(meeting));
	}
}

export default Resource;
