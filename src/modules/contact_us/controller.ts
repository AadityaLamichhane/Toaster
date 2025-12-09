import { IAuthRequest } from "../../routes";
import db from "../../config/db";
import { contact_us_table } from "./model";
import { validate_contact, validate_update_contact } from "./validate";
import { validateData } from "../../utils/helper";
import { throwValidationError, throwNotFoundError } from "../../utils/errors";
import { eq } from "drizzle-orm";
const controller = {
	// GET operations
	get_contacts: async (req: IAuthRequest) => {
		const data = await db.select().from(contact_us_table);
		return data[0];
	},

	get_contact_by_id: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const data = await db.select().from(contact_us_table).where(eq(contact_us_table.id, id));
		if (!data.length) {
			throwNotFoundError("Contact");
		}
		return data[0];
	},

	// POST operations
	create_contact: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(validate_contact, input_data);

		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.insert(contact_us_table).values(validation_result.data).returning();
		return response[0];
	},

	// PUT operations
	update_contact: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const input_data = req.body;

		// Check if contact exists
		const existing = await db.select().from(contact_us_table).where(eq(contact_us_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Contact");
		}

		const validation_result = validateData(validate_contact, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}

		const response = await db.update(contact_us_table)
			.set(validation_result.data)
			.where(eq(contact_us_table.id, id))
			.returning();
		return response[0];
	},

	// DELETE operations
	delete_contact: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);

		const existing = await db.select().from(contact_us_table).where(eq(contact_us_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Contact");
		}

		await db.delete(contact_us_table).where(eq(contact_us_table.id, id));
		return { message: "Contact deleted successfully" };
	}
};

export default controller; 
