import {
	memberValidationSchema,
	memberUpdateValidationSchema,
} from "./validators";
import Model from "./model";
import Resource from "./resource";
import SubscriptionModel from "../MemberMeeting/model";

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
		const { error }: any = await memberValidationSchema.validateAsync(input);
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
			throw new Error("Member not found");
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

const update = async (input: any, id: number) => {
	try {
		const { error } = await memberUpdateValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		
		const existingMember = await Model.find({ id });
		if (!existingMember) {
			throw new Error("Member not found");
		}

		const data: any = await Model.update(input, id);
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

// Delete member - removes member and all their subscriptions
const remove = async (id: number) => {
	try {
		const existingMember = await Model.find({ id });
		if (!existingMember) {
			throw new Error("Member not found");
		}
		
		// First, delete all subscriptions for this member
		await SubscriptionModel.destroyByMemberId(id);
		
		// Then delete the member
		const data: any = await Model.destroy(id);
		return { message: "Member and associated subscriptions deleted successfully. Club is unaffected.", data };
	} catch (err: any) {
		throw new Error(err);
	}
};

// Called when a club is deleted - detaches all members from that club

export default {
	list,
	create,
	find,
	update,
	remove,
};

