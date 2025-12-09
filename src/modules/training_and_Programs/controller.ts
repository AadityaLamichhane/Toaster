import { IAuthRequest } from "../../routes";
import fs from "fs"
import joi from "joi"
import uploadImage from "../../utils/uploadImage";
import db from "../../config/db";
import { scheduled_program_table, SCHEDULED_PROGRAMS_TABLE } from "./model";
import { training_validation } from "./validate";
import { randomnumberGenerator, validateData } from "../../utils/helper";
import { throwValidationError, throwNotFoundError } from "../../utils/errors";
import { eq, inArray, and } from "drizzle-orm";
export type ImageInputType = {
	base64: string,
	extension: string
}
const controller = {
	get_programs: async (req: IAuthRequest) => {
		const id = req.query.id;
		let condistions = undefined;
		if (id && parseInt(id)) {
			condistions = eq(scheduled_program_table.id, parseInt(id));

		}
		const data: SCHEDULED_PROGRAMS_TABLE[] = await db.select().from(scheduled_program_table).where(condistions);
		if (data.length != 0) {
			data.forEach((ind_data) => {
				if (ind_data.thumbnail_image) {
					try {
						const thum_image_base64 = fs.readFileSync(ind_data.thumbnail_image, { encoding: "base64" });
						const extension = ind_data.thumbnail_image.split('.').pop();
						ind_data.thumbnail_image = { base64: thum_image_base64, extension } as any;
					} catch (err) {
						console.error(`Could not read file ${ind_data.thumbnail_image}:`, err);
					}
				}
				if (ind_data.added_images && ind_data.added_images.length > 0) {
					ind_data.added_images = ind_data.added_images.map((image_url) => {
						try {
							const base64 = fs.readFileSync(image_url, { encoding: "base64" });
							const extension = image_url.split('.').pop();
							return { base64, extension };
						} catch (err) {
							console.error(`Could not read file ${image_url}:`, err);
							return image_url;
						}
					}) as any;
				}
			})
		}
		return data;
	},
	get_program_by_id: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const data: SCHEDULED_PROGRAMS_TABLE[] = await db.select().from(scheduled_program_table).where(eq(scheduled_program_table.id, id));
		if (!data.length) {
			throwNotFoundError("Training Program");
		}
		const program = data[0];
		if (program.thumbnail_image) {
			try {
				const thum_image_base64 = fs.readFileSync(program.thumbnail_image, { encoding: "base64" });
				const extension = program.thumbnail_image.split('.').pop();
				program.thumbnail_image = { base64: thum_image_base64, extension } as any;
			} catch (err) {
				console.error(`Could not read file ${program.thumbnail_image}:`, err);
			}
		}
		if (program.added_images && program.added_images.length > 0) {
			program.added_images = program.added_images.map((image_url) => {
				try {
					const base64 = fs.readFileSync(image_url, { encoding: "base64" });
					const extension = image_url.split('.').pop();
					return { base64, extension };
				} catch (err) {
					console.error(`Could not read file ${image_url}:`, err);
					return image_url;
				}
			}) as any;
		}
		return program;
	},
	create_program: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(training_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const thumbnail_image_object: ImageInputType = validation_result.data.thumbnail_image;
		const thumbnail_image_url = await uploadImage({ filePath: "training_programs/images", fileName: `${Date.now()}_thumbnail.${thumbnail_image_object.extension}`, base64: thumbnail_image_object.base64 });
		validation_result.data.thumbnail_image = thumbnail_image_url; // strong just the thumbnail if there is not images ;
		if (validation_result.data.added_images.length == 0) { // No image in the database
			const response = await db.insert(scheduled_program_table).values(validation_result.data).returning(); //addding the data without any url 
			return { data: response[0] } // db request give the array return to the element so 
		}
		const input_images_urls: ImageInputType[] = validation_result.data.added_images;
		const array_image_url = input_images_urls.map(async (image_obj, index) => {
			const filename = `${index}_${randomnumberGenerator()}_${Date.now()}_.${image_obj.extension}}`
			console.log('The file name of the file you want to store is ', filename);
			return (uploadImage({ fileName: filename, filePath: 'training_programs/images', base64: image_obj.base64 }))
		});
		validation_result.data.added_images = await Promise.all(array_image_url)
		const response = await db.insert(scheduled_program_table).values(validation_result.data).returning();
		return { data: response[0] } // returning with the image 
	},
	update_program: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const input_data = req.body;
		const existing = await db.select().from(scheduled_program_table).where(eq(scheduled_program_table.id, id));
		if (!existing.length || existing.length == 0) {
			throwNotFoundError("Training Program");
		}
		const validation_result = validateData(training_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		if (validation_result.data.thumbnail_image) {
			const old_thumbnail = existing[0].thumbnail_image;
			if (old_thumbnail) {
				try {
					fs.unlinkSync(old_thumbnail);
				} catch (error) {
					console.error("Error deleting thumbnail image:", error);
				}
			}
			const thumbnail_image_object: ImageInputType = validation_result.data.thumbnail_image;
			const thumbnail_image_url = await uploadImage({ filePath: "training_programs/images", fileName: `${Date.now()}_thumbnail.${thumbnail_image_object.extension}`, base64: thumbnail_image_object.base64 });
			validation_result.data.thumbnail_image = thumbnail_image_url;
		}

		if (validation_result.data.added_images && validation_result.data.added_images.length > 0) {
			const old_images = existing[0].added_images;
			if (old_images && old_images.length > 0) {
				old_images.forEach((imageUrl) => {
					try {
						fs.unlinkSync(imageUrl);
					} catch (error) {
						console.error("Error deleting image:", error);
					}
				});
			}
			const input_images_urls: ImageInputType[] = validation_result.data.added_images;
			const array_image_url = input_images_urls.map(async (image_obj, index) => {
				const filename = `${index}_${randomnumberGenerator()}_${Date.now()}_.${image_obj.extension}}`
				console.log('The file name of the file you want to store is ', filename);
				return (uploadImage({ fileName: filename, filePath: 'training_programs/images', base64: image_obj.base64 }))
			});
			validation_result.data.added_images = await Promise.all(array_image_url)
		}
		const response = await db.update(scheduled_program_table)
			.set(validation_result.data)
			.where(eq(scheduled_program_table.id, id))
			.returning();
		return response[0];
	},
	delete_program: async (req: IAuthRequest) => {
		//delete the image as well 
		const id = parseInt(req.params.id);
		const existing = await db.select().from(scheduled_program_table).where(eq(scheduled_program_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Training Program");
		}
		const program = existing[0];
		if (program.thumbnail_image) {
			try {
				fs.unlinkSync(program.thumbnail_image);
			} catch (error) {
				console.error("Error deleting thumbnail image:", error);
			}
		}
		if (program.added_images && program.added_images.length > 0) {
			program.added_images.forEach((imageUrl) => {
				try {
					fs.unlinkSync(imageUrl);
				} catch (error) {
					console.error("Error deleting added image:", error);
				}
			});
		}

		await db.delete(scheduled_program_table).where(eq(scheduled_program_table.id, id));
		return { message: "Training program deleted successfully" };
	},
	delete_all: async (req: IAuthRequest) => {
		const all_programs = db.delete(scheduled_program_table).returning();
		return all_programs;
	}
};
export default controller; 
