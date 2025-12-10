import db from "../../config/db";
import subscriptions from "./schema";
import { sql, eq, and } from "drizzle-orm";

class Subscription {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10, member_id, meeting_id } = params;
		const offset = (page - 1) * limit;

		const conditions = [];
		if (member_id) {
			conditions.push(eq(subscriptions.member_id, parseInt(member_id)));
		}
		if (meeting_id) {
			conditions.push(eq(subscriptions.meeting_id, parseInt(meeting_id)));
		}

		const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

		const result = whereCondition
			? await db.select().from(subscriptions).where(whereCondition).limit(limit).offset(offset)
			: await db.select().from(subscriptions).limit(limit).offset(offset);

		const countQuery = whereCondition
			? await db.select({ count: sql<number>`count(*)` }).from(subscriptions).where(whereCondition)
			: await db.select({ count: sql<number>`count(*)` }).from(subscriptions);

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
			.insert(subscriptions)
			.values(params)
			.returning();
		return result[0];
	}

	static async find(params: any) {
		const { id } = params;
		if (!id) return null;

		const result = await db
			.select()
			.from(subscriptions)
			.where(eq(subscriptions.id, id));
		return result[0] || null;
	}

	static async findByMemberAndMeeting(memberId: number, meetingId: number) {
		const result = await db
			.select()
			.from(subscriptions)
			.where(and(
				eq(subscriptions.member_id, memberId),
				eq(subscriptions.meeting_id, meetingId)
			));
		return result[0] || null;
	}

	static async findByMemberId(memberId: number) {
		const result = await db
			.select()
			.from(subscriptions)
			.where(eq(subscriptions.member_id, memberId));
		return result;
	}

	static async findByMeetingId(meetingId: number) {
		const result = await db
			.select()
			.from(subscriptions)
			.where(eq(subscriptions.meeting_id, meetingId));
		return result;
	}

	static async update(params: any, id: number) {
		const result: any = await db
			.update(subscriptions)
			.set(params)
			.where(eq(subscriptions.id, id))
			.returning();
		return result[0] || null;
	}

	static async destroy(id: number) {
		const result = await db
			.delete(subscriptions)
			.where(eq(subscriptions.id, id))
			.returning();
		return result;
	}

	static async destroyByMemberId(memberId: number) {
		const result = await db
			.delete(subscriptions)
			.where(eq(subscriptions.member_id, memberId))
			.returning();
		return result;
	}

	static async destroyByMeetingId(meetingId: number) {
		const result = await db
			.delete(subscriptions)
			.where(eq(subscriptions.meeting_id, meetingId))
			.returning();
		return result;
	}
}

export default Subscription;
