import { memberShipValidation } from "./validators";
import Model from "./model";
import Resource from "./resource";

const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const membership = async (input: any) => {
	try {
		const { error }: any = await memberShipValidation.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}

		// Check if already subscribed
		const existing = await Model.findByMemberAndMeeting(input.member_id, input.meeting_id);
		if (existing) {
			throw new Error("Member is already subscribed to this meeting");
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
			throw new Error("Subscription not found");
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getByMember = async (memberId: number) => {
	try {
		const data: any = await Model.findByMemberId(memberId);
		return Resource.collection(data);
	} catch (err: any) {
		throw new Error(err);
	}
};

const getByMeeting = async (meetingId: number) => {
	try {
		const data: any = await Model.findByMeetingId(meetingId);
		return Resource.collection(data);
	} catch (err: any) {
		throw new Error(err);
	}
};

const remove_membership = async (id: number) => {
	try {
		const existingSubscription = await Model.find({ id });
		if (!existingSubscription) {
			throw new Error("Subscription not found");
		}
		
		const data: any = await Model.destroy(id);
		return { message: "Remove membership successfully", data };
	} catch (err: any) {
		throw new Error(err);
	}
};

// When a member is deleted, remove all their subscriptions
const removeByMemberId = async (memberId: number) => {
	try {
		const data: any = await Model.destroyByMemberId(memberId);
		return { 
			message: "All subscriptions removed for deleted member", 
			removed_count: data.length,
			data 
		};
	} catch (err: any) {
		throw new Error(err);
	}
};

// When a meeting is deleted, remove all subscriptions to that meeting
const removeByMeetingId = async (meetingId: number) => {
	try {
		const data: any = await Model.destroyByMeetingId(meetingId);
		return { 
			message: "All subscriptions removed for deleted meeting", 
			removed_count: data.length,
			data 
		};
	} catch (err: any) {
		throw new Error(err);
	}
};

export default {
	list,
	find,
	membership,
	getByMember,
	getByMeeting,
	remove_membership,
	removeByMemberId,
	removeByMeetingId,
};
