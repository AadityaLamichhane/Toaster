import db from "../../config/db";
import fs from "fs"
import { IAuthRequest } from "../../routes";
import { throwNotFoundError, throwValidationError } from "../../utils/errors";
import { validateData } from "../../utils/helper";
import { setting_table } from "./model";
import { contact_details_validation, setting_table_validation, theme_validation } from "./validate";
import uploadImage from "../../utils/uploadImage";
import { and, eq, inArray } from "drizzle-orm";
import Service from "./Service";
import { group } from "console";

const controller = {
	get_settings: async (req: IAuthRequest) => {
		try {
			const data = await db.select().from(setting_table);
			if (!data || data.length === 0) {
				return { message: "No settings were found", data: [], success: false };
			}
			return { success: true, data };
		} catch (error) {
			console.error("Error fetching settings:", error);
			throw error;
		}
	},
	get_by_group: async (req: IAuthRequest) => {
		try {
			const group = req.params.id?.trim() || "";
			console.log("This is the id", group);
			const data = await db.select().from(setting_table).where(eq(setting_table.group, group));
			data.forEach((data) => {
				if (data.file) {
					try {
						const image = fs.readFileSync(data.file, { encoding: "base64" });
						data.file = image;
					} catch (err) {
						console.error(err);
					}
				}
			})
			return data;
		} catch (err) {
			console.log("err");
			throw err;
		}
	}
	,
	get_setting_by_id: async (req: IAuthRequest) => {
		try {
			const id = parseInt(req.params.id);
			if (isNaN(id)) {
				throwValidationError({ isValid: false, errors: ["Invalid ID format: ID must be a valid number"], data: null });
			}
			const data = await db.select().from(setting_table).where(eq(setting_table.id, id));
			if (!data || data.length === 0) {
				throwNotFoundError("Setting");
			}
			return { success: true, data: data[0] };
		} catch (error) {
			console.error("Error fetching setting by ID:", error);
			throw error;
		}
	},

	update_contact_details: async (req: IAuthRequest) => {
		const validateResult = validateData(contact_details_validation, req.body);
		if (!validateResult.isValid) {
			throwValidationError(validateResult);
		}
		return await Service.updateContactDetails(validateResult.data);
	},
	update_theme_valiadtion: async (req: IAuthRequest) => {
		const validateResult = validateData(theme_validation, req.body);
		if (!validateResult.isValid) {
			throwValidationError(validateResult);
		}
		return await Service.updateThemeValidation(validateResult.data);

	}
	,
	update_setting: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const validateSetting = validateData(setting_table_validation, req.body);
		if (!validateSetting.isValid) {
			throwValidationError(validateSetting);
		}
		const existing_settings = await db.select().from(setting_table).where(eq(setting_table.id, id));
		if (existing_settings.length == 0) {
			throwNotFoundError('No setting with the id was found')
		}
		const setting_inputData = validateSetting.data;
		if (!!setting_inputData.file) {
			try {
				if (existing_settings[0].file) {
					fs.unlinkSync(existing_settings[0].file);
				}

			} catch (err) {
				throwNotFoundError("File not found with the id");
			}
			try {
				const file_extension = setting_inputData.file.extension;
				const new_upload_url = uploadImage({ fileName: `${Date()}_settings_.${file_extension}`, filePath: `setting/images`, base64: setting_inputData.file.base64 })
				setting_inputData.file = new_upload_url;  //Update in the global scope

			} catch (err) {
				throw new Error("Error while updating the file")
			}

		}
		const updated = await db.update(setting_table).set(setting_inputData).returning();
		return updated;
	},

	post_setting: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validate_result = validateData(setting_table_validation, input_data);
		if (!validate_result.isValid) {
			throwValidationError(validate_result);
		}
		if (!!validate_result.data.file) {
			const date = new Date();
			const extension = validate_result.data.file.trim().split(".").pop();
			const image_url = await uploadImage({ fileName: `${date}_setting.${extension}`, filePath: `settings/images`, base64: validate_result.data.file.base64 });
			validate_result.data.file = image_url;

		}
		const response = await db.insert(setting_table).values(validate_result.data).returning();
		return response;
	},

	/**
	 * Deletes all settings from the database. This is a destructive operation.
	 */
	delete_all: async () => {
		const delete_tables_data = await db.delete(setting_table).returning();
		return delete_tables_data;
	}
}



export default controller;
