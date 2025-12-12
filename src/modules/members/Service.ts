import {
	memberValidationSchema,
	memberUpdateValidationSchema,
} from "./validators";
import Model from "./model";
import db from "../../config/db";
import member from "./schema";
import Resource from "./resource";
import SubscriptionModel from "../MemberMeeting/model";
import { eq } from "drizzle-orm";
import { throwErrorOnValidation } from "../../utils/errors";
import jwt from "jsonwebtoken";
import env from "../../config/env";
import bcrypt from "bcrypt";

const signup = async (input: any) => {
	try {
		const { error }: any = await memberValidationSchema.validateAsync(input);
		if (!!error) {
			throw new Error(error?.details[0].message);
		}

		// Check if user already exists
		console.log('the user with the infotmation is ')
		const doesExist = await db
			.select()
			.from(member)
			.where(eq(member.email, input.email));
		if (doesExist.length > 0 && doesExist != undefined) {
			throwErrorOnValidation("User already exists");
		}
		console.log("User with id is");
		// Hash password
		const hashedPassword = await bcrypt.hash(input.password, 10);
		const memberData = {
			...input,
			password: hashedPassword,
		};
		console.log("HashedPassword", hashedPassword);
		const data: any = await Model.create(memberData);

		// Generate JWT token
		const token = jwt.sign(
			{
				id: data.id,
				email: data.email,
				name: data.name,
			},
			env.JWT_TOKEN,
			{ expiresIn: "7d" }
		);

		const response = Resource.toJson(data);
		return { ...response, token };
	} catch (err: any) {
		throw new Error(err);
	}
};

const login = async (input: any) => {
	try {
		const { email, password } = input;

		if (!email || !password) {
			throw new Error("Email and password are required");
		}

		// Find user by email
		const userData = await db
			.select()
			.from(member)
			.where(eq(member.email, email));

		if (userData.length === 0) {
			throw new Error("User not found");
		}

		const user = userData[0];

		// Validate password exists
		if (!user.password) {
			throw new Error("User password not set");
		}

		// Compare passwords
		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			throw new Error("Invalid password");
		}

		// Generate JWT token
		const token = jwt.sign(
			{
				id: user.id,
				email: user.email,
				name: user.name,
			},
			env.JWT_TOKEN,
			{ expiresIn: "7d" }
		);

		const response = Resource.toJson(user as any);
		return { ...response, token };
	} catch (err: any) {
		throw new Error(err);
	}
};

const list = async (params: any) => {
	try {
		const data: any = await Model.findAllAndCount(params);
		return data;
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
	signup,
	login,
	list,
	find,
	update,
	remove,
};

