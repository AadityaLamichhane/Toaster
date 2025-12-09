import { IAuthRequest } from "../../routes";
import fs from "fs"
import db from "../../config/db";
import { director_message_table, official_staff_table, Official_table_Type } from "./model";
import { introduction_table } from "./model";
import {
	introduction_validation,
	staff_validation,
	director_message_validation
} from "./validate";
import { randomnumberGenerator, validateData } from "../../utils/helper";
import { throwErrorOnValidation, throwNotFoundError, throwValidationError, } from "../../utils/errors";
import { eq } from "drizzle-orm";
import uploadImage from "../../utils/uploadImage";
import { validationErrorResponse } from "../../utils/responseHandler";
const controller = {
	getintro: async () => {
		const data = await db.select().from(introduction_table);
		return data[0];
	},

	getofficial_staff: async () => {
		const data: Official_table_Type[] = await db.select().from(official_staff_table);
		let outputData: any = [];
		data.forEach((staff) => {
			if (staff.photo_url) {
				try {
					const image_base64_content = fs.readFileSync(staff.photo_url, { encoding: "base64" });
					const extension = staff.photo_url.split('.').pop();
					outputData.push({ ...staff, photo: { base64: image_base64_content, extension } });
				} catch (err) {
					console.error(`Could not read file ${staff.photo_url}:`, err);
					outputData.push(staff);
				}
			} else {
				outputData.push(staff);
			}
		})
		return outputData;
	},

	getofficial_staff_by_id: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		console.log("The id of the get official of the staff is", id);
		const data = await db.select().from(official_staff_table).where(eq(official_staff_table.id, id));
		if (!data[0]) {
			throwNotFoundError("Staff with the given ID was not found");
		}
		if (data[0].photo_url) {
			try {
				const image_base64_content = fs.readFileSync(data[0].photo_url, { encoding: "base64" });
				const extension = data[0].photo_url.split('.').pop();
				return { ...data[0], photo: { base64: image_base64_content, extension } };
			} catch (err) {
				console.error(`Could not read file ${data[0].photo_url}:`, err);
				return data[0];
			}
		}
		return data[0];
	},

	getdirector_message: async (req: IAuthRequest) => {
		const data = await db
			.select({
				id: director_message_table.id,
				message_en: director_message_table.message_en,
				message_ne: director_message_table.message_ne,
				director_name_en: official_staff_table.name_en,
				director_name_ne: official_staff_table.name_ne,
				director_email: official_staff_table.email,
				director_phone: official_staff_table.phone,
				director_photo_url: official_staff_table.photo_url
			})
			.from(director_message_table)
			.leftJoin(
				official_staff_table,
				eq(director_message_table.director_staff_id, official_staff_table.id)
			);
		if (!data[0] || !data[0].director_photo_url || data[0].director_photo_url == "") {
			return data;
		}
		try {
			const image = fs.readFileSync(data[0].director_photo_url, { encoding: "base64" });
			const extension = data[0].director_photo_url.split('.').pop();
			return { ...data[0], photo: { base64: image, extension } };  //Only sending the image if the director has the imawge 
		} catch (err) {
			console.error(`Could not read file ${data[0].director_photo_url}:`, err);
			return data[0];
		}
	},
	update_official_staff: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const exist = await db.select().from(official_staff_table).where(eq(official_staff_table.id, id));
		if (!exist || exist.length === 0) {
			throwNotFoundError("Staff with the given ID was not found");
		}
		const validation_result = validateData(staff_validation, req.body);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const photo = validation_result.data.photo;
		if (photo) {
			const staff_image_name = `${randomnumberGenerator()}_${validation_result.data.name_en}.${photo.extension}`;
			const image_url = await uploadImage({ base64: photo.base64, fileName: staff_image_name, filePath: 'staff_official_staff/images' });
			validation_result.data.photo_url = image_url;

			// Delete old image if it exists
			if (exist[0].photo_url) {
				try {
					fs.unlinkSync(exist[0].photo_url);
				} catch (error) {
					// This is the error while deleteng the previous stored images
					console.error("Error deleting old image:", error);
				}
			}
		}
		const updatedStaff = await db.update(official_staff_table).set(validation_result.data).where(eq(official_staff_table.id, id)).returning();
		return updatedStaff[0];
	}
	,
	set_intro: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(introduction_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const introId = await db.delete(introduction_table); // Deletig the data
		const response = await db.insert(introduction_table).values(validation_result.data).returning();
		return response[0];
	},
	set_official_staff: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(staff_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		//validating the email of the official staff 
		const email_exist = (await db.select({ email: official_staff_table.email }).from(official_staff_table).where(eq(official_staff_table.email, validation_result.data.email))).length;
		if (!!email_exist && email_exist == 0) {

			throwErrorOnValidation("Email Already exists");
		}
		if (!!validation_result.data.photo) {
			const staff_image_name = `${randomnumberGenerator()}_${validation_result.data.name_en}.${validation_result.data.photo.extension}`
			const image_url = await uploadImage({ base64: validation_result.data.photo.base64, fileName: staff_image_name, filePath: 'staff_official_staff/images' });
			validation_result.data.photo_url = image_url;
		}
		const response = await db.insert(official_staff_table).values(validation_result.data).returning();

		if (validation_result.data.position_en == "Director") {
			await db.update(director_message_table).set({ director_staff_id: response[0].id })
		}
		return response[0];
	},
	set_director_message: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(director_message_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const director = await db
			.select()
			.from(official_staff_table)
			.where(eq(official_staff_table.position_en, 'Director'))
			.limit(1);
		// Add the director's staff ID to the validated data
		if (director.length == 0) {
			// Delete the object first then inset the value in the director messagetabl :
			const deleted_object = await db.delete(director_message_table).returning();
			const response = await db.insert(director_message_table).values(validation_result.data).returning(); //have a fix upsert 
			return { ...response[0], Deleted_messege: deleted_object }

		}
		const messageData = {
			...validation_result.data,
			director_staff_id: (!!director[0].id) ? director[0].id : null
		};
		const deleted_object = await db.delete(director_message_table).returning();
		const response = await db.insert(director_message_table).values(messageData).returning(); //have a fix upsert 
		return { ...response[0], Deleted_messege: deleted_object }
	}
	,
	delete_official: async (req: IAuthRequest) => {
		const id: number = parseInt(req.params.id);
		// Check if the current role is director --> delete the director message as well
		const staff = await db.select().from(official_staff_table).where(eq(official_staff_table.id, id));
		if (staff.length === 0) {
			return "Staff not found";
		}
		try {
			const deleted_data = await db.delete(official_staff_table).where(eq(official_staff_table.id, id)).returning();
			if (staff[0].photo_url) {
				try {
					fs.unlinkSync(staff[0].photo_url);
				} catch (error) {
					console.error("Error deleting image:", error);
				}
			}
			return deleted_data;
		} catch (err: any) {
			throw new Error(err);
		}
	}
}
export default controller;

