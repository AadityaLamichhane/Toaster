import db from "../../config/db";
import bcrypt from "bcrypt"
import {
	admin_information,
	admin_upadte_validation
} from "./validate"
import { IAuthRequest } from "../../routes";
import { throwNotFoundError, throwUnauthorizedError } from "../../utils/errors";
import { admin_table } from "./model";
import { eq } from "drizzle-orm";
import { hashPassword, SignObject, validateData } from "../../utils/helper";
import { password } from "bun";
const controller = {
	// GET operations
	admin_details: async (req: IAuthRequest) => {
		const data = await db.select().from(admin_table);
		return data;

	},
	admin_login: async (req: IAuthRequest) => {
		const inputInformation = req.body;
		const responce = await db.select().from(admin_table).where(eq(admin_table.username, inputInformation.username));
		if (responce.length == 0) {
			throwUnauthorizedError("No such Admin id was found");
		}
		const admin_row = responce[0];
		if (!admin_row) {
			throwUnauthorizedError("Unauthorized access")
		}

		const isValid_password = bcrypt.compareSync(inputInformation.password, admin_row.password);
		if (!isValid_password) {
			throwUnauthorizedError("Incorrect Password ");
		}
		const jwtToken = SignObject({
			permissions: 'admin',
			username: admin_row.username,
			id: admin_row.id
		})
		return {
			id: admin_row.id,
			permissions: "admin",
			token: jwtToken
		}
	},
	admin_signup: async (req: IAuthRequest, header: Headers) => {
		const data = req.body;
		const isValid = validateData(admin_information, data);
		const hashed_password = await hashPassword(isValid.data.password);
		const db_upload = await db.insert(admin_table).values({ ...data, password: hashed_password }).returning();
		return db_upload[0];
	},
	password_change_id: async (req: IAuthRequest) => {
		const id = parseInt(req.params.id);
		const does_admin = await db.select().from(admin_table).where(eq(admin_table.id, id));
		if (does_admin.length === 0) {
			return throwNotFoundError("No admin with this id");
		}
		const inputInformation = req.body;
		const updatedData = await db.update(admin_table).set({ password: req.body.password }).where(eq(admin_table.id, id));
	}
}
export default controller; 
