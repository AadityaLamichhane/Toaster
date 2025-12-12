import {
	clubMembershipValidationSchema,
} from "./validators";
import Model from "./model";
import Resource from "./resource";
const list = async (params: any) => {
	try {
		console.log("Searching the club");
		const data: any = await Model.findAllAndCount(params);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};
const joinClub = async (input: any) => {
	try {
		const { error }: any = await clubMembershipValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		// Check if already a member
		const existing = await Model.findByMemberAndClub(input.member_id, input.club_id);
		if (existing) {
			throw new Error("Member is already part of this club");
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
			throw new Error("Club membership not found");
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getClubsForMember = async (memberId: number) => {
	try {
		const data: any = await Model.findByMemberId(memberId);
		return Resource.collection(data);
	} catch (err: any) {
		throw new Error(err);
	}
};

const getClubsForMemberWithDetails = async (memberId: number) => {
	try {
		const data: any = await Model.findByMemberIdWithDetails(memberId);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getMembersForClub = async (clubId: number) => {
	try {
		const data: any = await Model.findByClubId(clubId);
		return Resource.collection(data);
	} catch (err: any) {
		throw new Error(err);
	}
};

const leaveClub = async (id: number) => {
	try {
		const existingMembership = await Model.find({ id });
		if (!existingMembership) {
			throw new Error("Club membership not found");
		}

		const data: any = await Model.destroy(id);
		return { message: "Left club successfully", data };
	} catch (err: any) {
		throw new Error(err);
	}
};

// When a member is deleted, remove all their club memberships
const removeByMemberId = async (memberId: number) => {
	try {
		const data: any = await Model.destroyByMemberId(memberId);
		return {
			message: "All club memberships removed for deleted member",
			removed_count: data.length,
			data
		};
	} catch (err: any) {
		throw new Error(err);
	}
};

// When a club is deleted, remove all memberships for that club
const removeByClubId = async (clubId: number) => {
	try {
		const data: any = await Model.destroyByClubId(clubId);
		return {
			message: "All memberships removed for deleted club",
			removed_count: data.length,
			data
		};
	} catch (err: any) {
		throw new Error(err);
	}
};

export default {
	list,
	joinClub,
	find,
	getClubsForMember,
	getClubsForMemberWithDetails,
	getMembersForClub,
	leaveClub,
	removeByMemberId,
	removeByClubId,
};
