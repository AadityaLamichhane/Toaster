import { IAuthRequest } from "../../routes";
import db from "../../config/db";
import { act_table, regulation_table, procedure_table, directive_table } from "./model";
import {
	act_update_validation,
	regulation_update_validation,
	procedure_update_validation,
	directive_update_validation,
	act_validation,
	regulation_validation,
	procedure_validation,
	directive_validation
} from "./validate";
import { validateData } from "../../utils/helper";
import { throwValidationError, throwNotFoundError } from "../../utils/errors";
import { eq } from "drizzle-orm";
const controller = {
	get_acts: async () => {
		const data = await db.select().from(act_table);
		return data;
	},
	get_regulations: async () => {
		const data = await db.select().from(regulation_table);
		return data;
	},
	get_procedures: async () => {
		const data = await db.select().from(procedure_table);
		return data;
	},
	get_directives: async () => {
		const data = await db.select().from(directive_table);
		return data;
	},
	get_procedure_by_id: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const data = await db.select().from(procedure_table).where(eq(procedure_table.id, id));
		if (!data.length) {
			throwNotFoundError("Procedure");
		}
		return data[0];
	},
	get_directive_by_id: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const data = await db.select().from(directive_table).where(eq(directive_table.id, id));
		if (!data.length) {
			throwNotFoundError("Directive");
		}
		return data[0];
	},
	create_act: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(act_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.insert(act_table).values(validation_result.data).returning();
		return response[0];
	},
	create_regulation: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(regulation_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.insert(regulation_table).values(validation_result.data).returning();
		return response[0];
	},
	create_procedure: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(procedure_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.insert(procedure_table).values(validation_result.data).returning();
		return response[0];
	},
	create_directive: async (req: IAuthRequest) => {
		const input_data = req.body;
		const validation_result = validateData(directive_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.insert(directive_table).values(validation_result.data).returning();
		return response[0];
	},
	// PUT operations
	update_act: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const input_data = req.body;

		// Check if act exists
		const existing = await db.select().from(act_table).where(eq(act_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Act");
		}
		const validation_result = validateData(act_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.update(act_table)
			.set(validation_result.data)
			.where(eq(act_table.id, id))
			.returning();
		return response[0];
	},
	update_regulation: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const input_data = req.body;

		const existing = await db.select().from(regulation_table).where(eq(regulation_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Regulation");
		}
		const validation_result = validateData(regulation_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.update(regulation_table)
			.set(validation_result.data)
			.where(eq(regulation_table.id, id))
			.returning();
		return response[0];
	},
	update_procedure: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const input_data = req.body;

		const existing = await db.select().from(procedure_table).where(eq(procedure_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Procedure");
		}
		const validation_result = validateData(procedure_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.update(procedure_table)
			.set(validation_result.data)
			.where(eq(procedure_table.id, id))
			.returning();
		return response[0];
	},
	update_directive: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const input_data = req.body;
		const existing = await db.select().from(directive_table).where(eq(directive_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Directive");
		}
		const validation_result = validateData(directive_validation, input_data);
		if (!validation_result.isValid) {
			throwValidationError(validation_result);
		}
		const response = await db.update(directive_table)
			.set(validation_result.data)
			.where(eq(directive_table.id, id))
			.returning();
		return response[0];
	},
	// DELETE operations
	delete_act: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const existing = await db.select().from(act_table).where(eq(act_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Act");
		}
		await db.delete(act_table).where(eq(act_table.id, id));
		return { message: "Act deleted successfully" };
	},
	delete_regulation: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const existing = await db.select().from(regulation_table).where(eq(regulation_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Regulation");
		}
		await db.delete(regulation_table).where(eq(regulation_table.id, id));
		return { message: "Regulation deleted successfully" };
	},
	delete_procedure: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const existing = await db.select().from(procedure_table).where(eq(procedure_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Procedure");
		}
		await db.delete(procedure_table).where(eq(procedure_table.id, id));
		return { message: "Procedure deleted successfully" };
	},
	delete_directive: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);

		const existing = await db.select().from(directive_table).where(eq(directive_table.id, id));
		if (!existing.length) {
			throwNotFoundError("Directive");
		}
		await db.delete(directive_table).where(eq(directive_table.id, id));
		return { message: "Directive deleted successfully" };
	}
};
export default controller; 
