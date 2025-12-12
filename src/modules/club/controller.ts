import type { IAuthRequest } from "../../routes";
import Service from "./Service";

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
		const { body, headers } = req;
		const data = await Service.create(body, headers);
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
			throw new Error("Invalid meeting ID");
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
			throw new Error("Invalid meeting ID");
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
			throw new Error("Invalid meeting ID");
		}
		const data = await Service.remove(id);
		return data;
	} catch (err: any) {
		throw new Error(err);
	}
};

export default {
	get,
	create,
	find,
	update,
	remove,
};
