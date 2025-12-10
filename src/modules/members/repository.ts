import members from "./schema";

const selectQuery = {
	id: members.id,
	name: members.name,
	email: members.email,
	phone: members.phone,
	introduction: members.introduction,
	created_at: members.created_at,
	updated_at: members.updated_at,
};

export default {
	selectQuery,
};

