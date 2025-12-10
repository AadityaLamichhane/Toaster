import db from "../../config/db";
import members from "./schema";
import { sql, eq } from "drizzle-orm";

class Member {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10 } = params;
		const offset = (page - 1) * limit;

		const result = await db.select().from(members).limit(limit).offset(offset);

		const countQuery = await db.select({ count: sql<number>`count(*)` }).from(members);

		const [{ count }]: any = countQuery;

		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: any) {
		const result = await db
			.insert(members)
			.values(params)
			.returning();
		return result[0];
	}

	static async find(params: any) {
		const { id, email } = params;
		if (!id && !email) return null;

		if (id) {
			const result = await db.select().from(members).where(eq(members.id, id));
			return result[0] || null;
		} else if (email) {
			const result = await db.select().from(members).where(eq(members.email, email));
			return result[0] || null;
		}
		
		return null;
	}

	static async update(params: any, id: number) {
		const result: any = await db
			.update(members)
			.set(params)
			.where(eq(members.id, id))
			.returning();
		return result[0] || null;
	}

	static async destroy(id: number) {
		const result = await db
			.delete(members)
			.where(eq(members.id, id))
			.returning();
		return result;
	}
}

export default Member;
