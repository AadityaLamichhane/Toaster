import db from "../../config/db";
import club from "./schema";
import member from "../members/schema"
import { sql, eq } from "drizzle-orm";
class Club {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10, area } = params;
		const offset = (page - 1) * limit;

		const whereCondition = area ? eq(club.area, area) : undefined;

		const result = whereCondition
			? await db
				.select({ ...club as any, createdBy: member.name })
				.from(club)
				.leftJoin(member, eq(club.created_by, member.id))
				.where(whereCondition)
				.limit(limit)
				.offset(offset)
			: await db
				.select({ ...club as any, createdBy: member.name })
				.from(club)
				.leftJoin(member, eq(club.created_by, member.id))
				.limit(limit)
				.offset(offset);

		const countQuery = whereCondition
			? await db
				.select({ count: sql<number>`count(*)` })
				.from(club)
				.where(whereCondition)
			: await db
				.select({ count: sql<number>`count(*)` })
				.from(club);

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
			.insert(club)
			.values(params)
			.returning();
		return result[0];
	}
	static async find(params: any) {
		const { id } = params;
		if (!id) return null;

		const result = await db
			.select()
			.from(club)
			.where(eq(club.id, id));
		return result[0] || null;
	}
	static async update(params: any, id: number) {
		const result: any = await db
			.update(club)
			.set(params)
			.where(eq(club.id, id))
			.returning();
		return result[0] || null;
	}
	static async destroy(id: number) {
		const result = await db
			.delete(club)
			.where(eq(club.id, id))
			.returning();
		return result;
	}
}
export default Club;
