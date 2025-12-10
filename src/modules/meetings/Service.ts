import {
	meetingValidationSchema,
	meetingUpdateValidationSchema,
} from "./validators";
import Model from "./model";
import Repository from "./repository";
import Resource from "./resource";
import AgendaModel from "../agendas/model";

const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const create = async (input: any) => {
	try {
		const { error }: any = await meetingValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		const data: any = await Model.create(input);
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

const find = async (id: number) => {
	try {
		const data: any = await Model.find({ id });
		if (!data) {
			throw new Error("Meeting not found");
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

const update = async (input: any, id: number) => {
	try {
		const { error } = await meetingUpdateValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		
		const existingMeeting = await Model.find({ id });
		if (!existingMeeting) {
			throw new Error("Meeting not found");
		}

		const data: any = await Model.update(input, id);
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

const remove = async (id: number) => {
	try {
		const existingMeeting = await Model.find({ id });
		if (!existingMeeting) {
			throw new Error("Meeting not found");
		}
		
		// First, delete all associated agendas
		await AgendaModel.destroyByMeetingId(id);
		
		// Then delete the meeting
		const data: any = await Model.destroy(id);
		return { 
			message: "Meeting and associated agendas deleted successfully", 
			data 
		};
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
