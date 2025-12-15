import db from "../../config/db";
import meetings from "./schema";
import { sql, eq } from "drizzle-orm";

class Meeting {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10 } = params;
		const offset = (page - 1) * limit;

		const result = await db
			.select()
			.from(meetings)
			.limit(limit)
			.offset(offset);

		const [{ count }]: any = await db
			.select({ count: sql<number>`count(*)` })
			.from(meetings);

		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: any) {
		const result = await db
			.insert(meetings)
			.values(params)
			.returning();
		return result[0];
	}

	static async find(params: any) {
		const { id } = params;
		if (!id) return null;

		const result = await db
			.select()
			.from(meetings)
			.where(eq(meetings.id, id));
		return result[0] || null;
	}

	static async update(params: any, id: number) {
		const result: any = await db
			.update(meetings)
			.set(params)
			.where(eq(meetings.id, id))
			.returning();
		console.log(result);
		return result[0] || null;
	}

	static async destroy(id: number) {
		const result = await db
			.delete(meetings)
			.where(eq(meetings.id, id))
			.returning();
		return result;
	}
}

export default Meeting;
