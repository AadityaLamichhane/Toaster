import Model from "./model";
import type { MeetingColumn } from "./resource";
import meetings from "./schema";

const selectQuery = {
	id: meetings.id,
	created_date: meetings.created_date,
	created_by:meetings.created_by,
	name:meetings.name,
	area:meetings.area

};

export default {
	selectQuery,
};
