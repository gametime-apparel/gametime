import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { NewOrg, UpdateOrg } from '$lib/server/db/contracts';
import type { schema } from '$lib/server/db/schema';
import { orgs } from '$lib/server/db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import { ERR } from '$lib/server/faults';
import ErrorResponse from '$lib/server/http/ErrorResponse';

class OrgService {
	private readonly db: DrizzleD1Database<typeof schema>;

	constructor(db: DrizzleD1Database<typeof schema>) {
		this.db = db;
	}

	public async listWithStores() {
		return this.db.query.orgs.findMany({
			where: isNull(orgs.archivedAt),
			with: {
				stores: true
			},
			columns: {
				id: true,
				name: true,
				slug: true,
				createdAt: true
			},
			orderBy: (orgs, { asc }) => [asc(orgs.name)]
		});
	}

	public async create(insertData: NewOrg) {
		const data = {
			name: insertData.name,
			slug: insertData.slug.toLowerCase().replace(/[^a-z0-9]/g, '-')
		};

		const result = await this.db.insert(orgs).values(data).onConflictDoNothing().returning().get();

		if (!result) {
			throw new ErrorResponse(ERR.ORG_EXISTS);
		}

		return result;
	}

	public async getBySlug(slug: string) {
		const data = await this.db.query.orgs.findFirst({
			where: and(eq(orgs.slug, slug), isNull(orgs.archivedAt))
		});

		if (!data) {
			throw new ErrorResponse(ERR.ORG_NOT_FOUND);
		}

		return data;
	}

	public async updateBySlug(slug: string, updateData: UpdateOrg) {
		const data = await this.db
			.update(orgs)
			.set(updateData)
			.where(and(eq(orgs.slug, slug), isNull(orgs.archivedAt)))
			.returning()
			.get();

		if (!data) {
			throw new ErrorResponse(ERR.ORG_NOT_FOUND);
		}

		return data;
	}

	public async deleteBySlug(slug: string) {
		const data = await this.db
			.update(orgs)
			.set({ archivedAt: new Date() })
			.where(and(eq(orgs.slug, slug), isNull(orgs.archivedAt)));

		if (!data) {
			throw new ErrorResponse(ERR.ORG_NOT_FOUND);
		}

		return data;
	}
}

export default OrgService;
