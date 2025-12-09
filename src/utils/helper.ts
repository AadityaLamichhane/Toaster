import crypto from "crypto";
import env from '../config/env';
import Joi from "joi";
import Jwt from "jsonwebtoken";
import hash from "bcrypt"
import db from "../config/db";
export const encryptResponse = async (obj: any) => {
	const jsonString = JSON.stringify(obj);
	const encodedData = Buffer.from(jsonString, "utf-8").toString("base64");
	const signature = crypto
		.createHmac("sha256", `${env.RESPONSE_SECRET}`)
		.update(encodedData)
		.digest("hex");
	return `${encodedData}.${signature}`;
};
export const validateData = (schema: Joi.Schema, data: any) => {
	// Handle null/undefined input
	if (data === null || data === undefined) {
		return {
			isValid: false,
			errors: ['Request body is required'],
			errorsByField: { _error: ['Request body cannot be empty'] },
			data: null
		};
	}

	const { error, value } = schema.validate(data, {
		abortEarly: false,  // Collect all errors
		stripUnknown: true, // Remove unknown fields
		presence: 'required' // Ensure required fields are present
	});
	if (error) {
		console.log(`Error :${error}`);
		// Group errors by field
		const errorsByField: { [key: string]: string[] } = {};
		const errorMessages: string[] = [];

		error.details.forEach((detail) => {
			const field = detail.path.join('.');
			if (!errorsByField[field]) {
				errorsByField[field] = [];
			}
			errorsByField[field].push(detail.message);
			errorMessages.push(`${field}: ${detail.message}`);
		});
		console.log("The error of the code is", error);
		return {
			isValid: false,
			errors: errorMessages,
			errorsByField,
			data: null
		};
	}
	return {
		isValid: true,
		errors: [],
		errorsByField: {},
		data: value
	};
};
export const SignObject = (object: object) => {
	const signed_value = Jwt.sign(object, env.JWT_TOKEN, {
		expiresIn: "48h"
	});
	return signed_value;

}
export const verifyObject = (token: string) => {
	try {
		const verify_object = Jwt.verify(token, env.JWT_TOKEN);
		if (verify_object) {
			return true;
		} else {
			return false;
		}
	} catch (err) {
		return false;
	}
}

export const hashPassword = async (passwordText: string) => {
	const hashedValue = hash.hashSync(passwordText, 10);
	return hashedValue;
}
export const randomnumberGenerator = () => {
	const number_w_limit = (Math.random() * 1000) % 1000;
	return Math.floor(number_w_limit);

}
export type ValidationReturnType = {
	isValid: boolean,
	errors: string[],
	data: any
}


