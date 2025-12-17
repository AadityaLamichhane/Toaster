import type { IAuthRequest } from "../../routes";
import Service from "./Service";

const signup = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		console.log('This is the signup body of the obejct ');
		const data = await Service.signup(body);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const login = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		const data = await Service.login(body);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const get = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const create = async (req: IAuthRequest) => {
	try {
		const { body } = req;
		const data = await Service.signup(body);
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
			throw new Error("Invalid member ID");
		}
		const data = await Service.find(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const update = async (req: IAuthRequest) => {
	try {
		const { body, params } = req;
		const id = parseInt(params?.id);
		if (isNaN(id)) {
			throw new Error("Invalid member ID");
		}
		const data = await Service.update(body, id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

const remove = async (req: IAuthRequest) => {
	try {
		const { params } = req;
		const id = parseInt(params?.id);
		if (isNaN(id)) {
			throw new Error("Invalid member ID");
		}
		const data = await Service.remove(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

// Called when deleting a club - detaches all members from that club
export default {
	signup,
	login,
	get,
	create,
	find,
	update,
	remove,
};
