import db from "../../config/db";
import agendas from "./schema";
import { sql, eq } from "drizzle-orm";

class Agenda {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10, meeting_id } = params;
		const offset = (page - 1) * limit;

		const whereCondition = meeting_id ? eq(agendas.meeting_id, parseInt(meeting_id)) : undefined;

		const result = whereCondition
			? await db.select().from(agendas).where(whereCondition).limit(limit).offset(offset)
			: await db.select().from(agendas).limit(limit).offset(offset);

		const countQuery = whereCondition
			? await db.select({ count: sql<number>`count(*)` }).from(agendas).where(whereCondition)
			: await db.select({ count: sql<number>`count(*)` }).from(agendas);

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
			.insert(agendas)
			.values(params)
			.returning();
		return result[0];
	}

	static async find(params: any) {
		const { id } = params;
		if (!id) return null;

		const result = await db
			.select()
			.from(agendas)
			.where(eq(agendas.id, id));
		return result[0] || null;
	}

	static async findByMeetingId(meetingId: number) {
		const result = await db
			.select()
			.from(agendas)
			.where(eq(agendas.meeting_id, meetingId));
		return result;
	}

	static async update(params: any, id: number) {
		const result: any = await db
			.update(agendas)
			.set(params)
			.where(eq(agendas.id, id))
			.returning();
		return result[0] || null;
	}

	static async destroy(id: number) {
		const result = await db
			.delete(agendas)
			.where(eq(agendas.id, id))
			.returning();
		return result;
	}

	static async destroyByMeetingId(meetingId: number) {
		const result = await db
			.delete(agendas)
			.where(eq(agendas.meeting_id, meetingId))
			.returning();
		return result;
	}
}

export default Agenda;
