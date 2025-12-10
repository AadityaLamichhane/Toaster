import type { IAuthRequest } from "../../routes";
import Service from "./service";

const get = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const subscribe = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		const data = await Service.membership(body);
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
			throw new Error("Invalid subscription ID");
		}
		const data = await Service.find(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getByMember = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const memberId = parseInt(params?.memberId);
		if (isNaN(memberId)) {
			throw new Error("Invalid member ID");
		}
		const data = await Service.getByMember(memberId);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const getByMeeting = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const meetingId = parseInt(params?.meetingId);
		if (isNaN(meetingId)) {
			throw new Error("Invalid meeting ID");
		}
		const data = await Service.getByMeeting(meetingId);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const unsubscribe = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const id = parseInt(params?.id);
		if (isNaN(id)) {
			throw new Error("Invalid subscription ID");
		}
		const data = await Service.remove_membership(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

export default {
	get,
	subscribe,
	find,
	getByMember,
	getByMeeting,
	unsubscribe,
};
