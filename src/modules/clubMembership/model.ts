import db from "../../config/db";
import clubMembership from "./schema";
import { sql, eq, and } from "drizzle-orm";
import members from "../members/schema";
import club from "../club/schema";

class ClubMembership {
	static async findAllAndCount(params: any) {
		const { page = 1, limit = 10, member_id, club_id } = params;
		const offset = (page - 1) * limit;
		const conditions = [];
		if (member_id) {
			console.log("Member trying to searhch the club is ", member_id);
			conditions.push(eq(clubMembership.member_id, parseInt(member_id)));
		}
		if (club_id) {
			conditions.push(eq(clubMembership.club_id, parseInt(club_id)));
		}

		const whereCondition = conditions.length > 0 ? and(...conditions) : undefined;

		const result = whereCondition
			? await db.select().from(clubMembership).where(whereCondition).limit(limit).offset(offset)
			: await db.select().from(clubMembership).limit(limit).offset(offset);

		const countQuery = whereCondition
			? await db.select({ count: sql<number>`count(*)` }).from(clubMembership).where(whereCondition)
			: await db.select({ count: sql<number>`count(*)` }).from(clubMembership);

		const [{ count }]: any = countQuery;

		return {
			items: result,
			page,
			totalItems: parseInt(count.toString(), 10),
			totalPages: Math.ceil(count / limit),
		};
	}

	static async create(params: any, memberId: number) {
		const result = await db
			.insert(clubMembership)
			.values({ member_id: memberId, club_id: params.club_id })
			.returning();
		return result[0];
	}

	static async find(params: any) {
		const { id } = params;
		if (!id) return null;

		const result = await db
			.select()
			.from(clubMembership)
			.where(eq(clubMembership.id, id));
		return result[0] || null;
	}

	static async findByMemberAndClub(memberId: number, clubId: number) {
		const result = await db
			.select()
			.from(clubMembership)
			.where(and(
				eq(clubMembership.member_id, memberId),
				eq(clubMembership.club_id, clubId)
			));
		return result[0] || [];
	}
	static async findByMemberId(memberId: number) {
		try {
			console.log('The data of the member is ', memberId);
			const result = await db
				.select()
				.from(clubMembership)
				.where(eq(clubMembership.member_id, memberId));
			return result;
		} catch (err) {
			console.error(err);
		}
	}

	static async findByMemberIdWithDetails(memberId: number) {
		try {
			console.log('Fetching clubs for member:', memberId);
			const result = await db
				.select()
				.from(clubMembership)
				.innerJoin(members, eq(clubMembership.member_id, members.id))
				.innerJoin(club, eq(clubMembership.club_id, club.id))
				.where(eq(clubMembership.member_id, memberId));
			return result;
			console.log(`This is the rsult :${result}`);
		} catch (err) {
			console.error('Error fetching member details with clubs:', err);
			throw err;
		}
	}

	static async findByClubId(clubId: number) {
		const result = await db
			.select()
			.from(clubMembership)
			.where(eq(clubMembership.club_id, clubId));
		return result;
	}
	static async update(params: any, id: number) {
		const result: any = await db
			.update(clubMembership)
			.set(params)
			.where(eq(clubMembership.id, id))
			.returning();
		return result[0] || null;
	}
	static async destroy(id: number) {
		const result = await db
			.delete(clubMembership)
			.where(eq(clubMembership.id, id))
			.returning();
		return result;
	}
	static async destroyByMemberId(memberId: number) {
		const result = await db
			.delete(clubMembership)
			.where(eq(clubMembership.member_id, memberId))
			.returning();
		return result;
	}
	static async destroyByClubId(clubId: number) {
		const result = await db
			.delete(clubMembership)
			.where(eq(clubMembership.club_id, clubId))
			.returning();
		return result;
	}
}

export default ClubMembership;
