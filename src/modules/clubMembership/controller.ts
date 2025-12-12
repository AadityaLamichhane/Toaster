import type { IAuthRequest } from "../../routes";
import Service from "./Service";

const list = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getMyclub = async (req: IAuthRequest) => {
	try {
		const user = req?.user;
		if (!user || !user.id) {
			throw new Error("User not authenticated");
		}
		const memberId = user.id;
		const data = await Service.getClubsForMemberWithDetails(memberId);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};
const joinClub = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		const data = await Service.joinClub(body);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const find = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const id = parseInt(params?.id);
		if (isNaN(id)) {
			throw new Error("Invalid membership ID");
		}
		const data = await Service.find(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getClubsForMember = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const memberId = parseInt(params?.memberId);
		if (isNaN(memberId)) {
			throw new Error("Invalid member ID");
		}
		const data = await Service.getClubsForMember(memberId);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getMembersForClub = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const clubId = parseInt(params?.clubId);
		if (isNaN(clubId)) {
			throw new Error("Invalid club ID");
		}
		const data = await Service.getMembersForClub(clubId);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const leaveClub = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const id = parseInt(params?.id);
		if (isNaN(id)) {
			throw new Error("Invalid membership ID");
		}
		const data = await Service.leaveClub(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

export default {
	getMyclub,
	list,
	joinClub,
	find,
	getClubsForMember,
	getMembersForClub,
	leaveClub,
};
