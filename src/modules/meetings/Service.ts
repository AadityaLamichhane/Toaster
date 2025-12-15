import {
	meetingValidationSchema,
	meetingUpdateValidationSchema,
} from "./validators";
import Model from "./model";
import Repository from "./repository";
import Resource from "./resource";
import AgendaModel from "../agendas/model";
import SubscriptionModel from "../MemberMeeting/model";
import MemberModel from "../members/model";
import MemberMeetingModel from "../MemberMeeting/model";
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
		const { guests, ...meetingData } = input;
		let db_created_data: any = await Model.create(meetingData);
		if (guests && guests.length > 0) {
			const unregistered_guests: string[] = [];
			await Promise.all(
				guests.map(async (email: string) => {
					const member = await MemberModel.find({ email });
					if (member) {
						console.log('Only when it is the member will there me relation for the database');
						await MemberMeetingModel.create({
							member_id: member.id,
							meeting_id: db_created_data.id,
						});
					} else {
						unregistered_guests.push(email);
					}
				})
			);
			const updated_data = await Model.update({
				guests: guests
			}, db_created_data.id);
			db_created_data = updated_data;
		}
		const response = Resource.toJson(db_created_data);
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

		// First, delete all subscriptions for this meeting
		await SubscriptionModel.destroyByMeetingId(id);

		// Then delete all associated agendas
		await AgendaModel.destroyByMeetingId(id);

		// Finally delete the meeting
		const data: any = await Model.destroy(id);
		return {
			message: "Meeting, subscriptions, and agendas deleted successfully",
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
