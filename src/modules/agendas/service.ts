import AgendaModel from "./model";

const list = async (params: any) => {
	try {
		const data: any = await AgendaModel.findAllAndCount(params);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const create = async (input: any) => {
	try {
		if (!input.meeting_id) {
			throw new Error("meeting_id is required");
		}
		if (!input.agenda_title) {
			throw new Error("agenda_title is required");
		}
		
		const data: any = await AgendaModel.create(input);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const find = async (id: number) => {
	try {
		const data: any = await AgendaModel.find({ id });
		if (!data) {
			throw new Error("Agenda not found");
		}
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const update = async (input: any, id: number) => {
	try {
		const existingAgenda = await AgendaModel.find({ id });
		if (!existingAgenda) {
			throw new Error("Agenda not found");
		}

		const data: any = await AgendaModel.update(input, id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const remove = async (id: number) => {
	try {
		const existingAgenda = await AgendaModel.find({ id });
		if (!existingAgenda) {
			throw new Error("Agenda not found");
		}
		
		const data: any = await AgendaModel.destroy(id);
		return { message: "Agenda deleted successfully", data };
	} catch (err: any) {
		throw new Error(err);
	}
};

export default {
	list,
	create,
	find,
	update,
	remove,
};
