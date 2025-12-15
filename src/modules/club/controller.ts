import type { IAuthRequest } from "../../routes";
import Service from "./Service";
import ClubService from "../clubMembership/Service"

const get = async (req: IAuthRequest) => {
	try {
		const data = await Service.list(req?.query);
		return data;
	} catch (err: any) {
		throw err;
	}
};

const create = async (req: IAuthRequest) => {
	try {
		const { body, headers, user } = req;
		const data = await Service.create(body, headers);
		if (!!data?.id && user != null) {
			//add the user to the club 
			const JoinClubMemberShip = {
				club_id: data.id
			}
			const number: number = Number(user.id);
			const add_to_club = await ClubService.joinClub(JoinClubMemberShip, number);
		}
		return data;
	} catch (err: any) {
		throw err;
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
		throw err;
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
		throw err;
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
		throw err;
	}
};

export default {
	get,
	create,
	find,
	update,
	remove,
};
