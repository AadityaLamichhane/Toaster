import db from "../../config/db";
import { and, eq, inArray } from "drizzle-orm";
import { setting_table } from "./model";
import { throwNotFoundError } from "../../utils/errors";
import fs from "fs";
import uploadImage from "../../utils/uploadImage";
import { Contact_Details_Validation, ThemeValidationType } from "./validate";

const Service = {
	updateContactDetails: async (inputData: Contact_Details_Validation) => {
		const groupName = 'contact-details';
		for (const key of Object.keys(inputData)) {
			const value = inputData[key as keyof Contact_Details_Validation];
			let finalValue: string;
			const isFile = typeof value === 'object' && value !== null && 'base64' in value;
			const existingSetting = await db.select().from(setting_table).where(and(eq(setting_table.group, groupName), eq(setting_table.key, key))).limit(1);
			if (isFile) {
				if (existingSetting.length > 0 && existingSetting[0].file) {
					try {
						fs.unlinkSync(existingSetting[0].file);
					} catch (err) {
						console.error(`Failed to delete old file for key ${key}:`, err);
					}
				}
				const fileExtension = value.extension;
				finalValue = await uploadImage({
					fileName: `${Date.now()}_${key}.${fileExtension}`,
					filePath: `setting/images`,
					base64: value.base64
				});
			} else {
				finalValue = value as string;
			}
			if (existingSetting.length > 0) {
				const updateData: { value?: string; file?: string } = {};
				if (isFile) {
					updateData.file = finalValue;
				} else {
					updateData.value = finalValue;
				}
				await db.update(setting_table)
					.set(updateData)
					.where(eq(setting_table.id, existingSetting[0].id));
			} else {
				const insertData: { group: string; key: string; value?: string; file?: string, title: string } = {
					group: groupName,
					key: key,
					title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
				};
				if (isFile) {
					insertData.file = finalValue;
				} else {
					insertData.value = finalValue;
				}
				await db.insert(setting_table).values(insertData);
			}
		}

		const updatedSettings = await db.select().from(setting_table).where(eq(setting_table.group, groupName));
		return updatedSettings;
	},
	updateThemeValidation: async (inputData: ThemeValidationType) => {
		const groupName = 'theme';
		for (const key of Object.keys(inputData)) {
			const value = inputData[key as keyof Contact_Details_Validation];
			let finalValue: string;
			const isFile = typeof value === 'object' && value !== null && 'base64' in value;
			const existingSetting = await db.select().from(setting_table).where(and(eq(setting_table.group, groupName), eq(setting_table.key, key))).limit(1);
			if (isFile) {
				if (existingSetting.length > 0 && existingSetting[0].file) {
					try {
						fs.unlinkSync(existingSetting[0].file);
					} catch (err) {
						console.error(`Failed to delete old file for key ${key}:`, err);
					}
				}
				const fileExtension = value.extension;
				finalValue = await uploadImage({
					fileName: `${Date.now()}_${key}.${fileExtension}`,
					filePath: `setting/images`,
					base64: value.base64
				});
			} else {
				finalValue = value as string;
			}
			if (existingSetting.length > 0) {
				const updateData: { value?: string; file?: string } = {};
				if (isFile) {
					updateData.file = finalValue;
				} else {
					updateData.value = finalValue;
				}
				await db.update(setting_table)
					.set(updateData)
					.where(eq(setting_table.id, existingSetting[0].id));
			} else {
				const insertData: { group: string; key: string; value?: string; file?: string, title: string } = {
					group: groupName,
					key: key,
					title: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')
				};
				if (isFile) {
					insertData.file = finalValue;
				} else {
					insertData.value = finalValue;
				}
				await db.insert(setting_table).values(insertData);
			}
		}
		console.log("THe updated setting information is", groupName);
		const updatedSettings = await db.select().from(setting_table).where(eq(setting_table.group, groupName));
		return updatedSettings;
	}
};
export default Service;
