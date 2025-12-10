import Model from "./model";
import type { MeetingColumn } from "./resource";
import meetings from "./schema";

const selectQuery = {
	id: meetings.id,
	theme: meetings.theme,
	meetingno: meetings.meetingno,
	date: meetings.date,
	start_time: meetings.start_time,
};

export default {
	selectQuery,
};
