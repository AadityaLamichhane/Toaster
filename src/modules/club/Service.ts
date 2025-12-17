import {
	clubValidationSchema,
	clubUpdateValidationSchema,
} from "./validators";
import Model from "./model";
import Resource from "./resource";
import MemberShipModel from "../clubMembership/model"
import decodeToken from "../../utils/jwtverification";

const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		return data;
	} catch (err: any) {
		console.error(err);
		throw err;
	}
};

const create = async (input: any, headers: any) => {
	try {
		console.log('input in this file is ');
		const { error }: any = await clubValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}
		// Decode JWT from headers to get user id
		const authHeader = headers?.authorization || headers?.Authorization;
		if (!authHeader) {
			throw new Error("Authorization header is required");
		}
		const decoded: any = decodeToken(authHeader);
		const userId = decoded?.id;
		const clubData = {
			...input,
			created_by: userId,
		};
		console.log(clubData);
		const data: any = await Model.create(clubData);
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};
const find = async (id: number) => {
	try {
		const data: any = await Model.find({ id });
		if (!data) {
			throw new Error("Club not found");
		}
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};

const update = async (input: any, id: number) => {
	try {
		const { error } = await clubUpdateValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}

		const existingClub = await Model.find({ id });
		if (!existingClub) {
			throw new Error("Club not found");
		}

		const data: any = await Model.update(input, id);
		const response = Resource.toJson(data);
		return response;
	} catch (err: any) {
		throw err;
	}
};

const remove = async (id: number) => {
	try {
		const existingClub = await Model.find({ id });
		if (!existingClub) {
			throw new Error("Club not found");
		}

		const data: any = await Model.destroy(id);
		return {
			message: "Club deleted successfully",
			data,
		};
	} catch (err: any) {
		throw err;
	}
};

export default {
	list,
	create,
	find,
	update,
	remove,
};
