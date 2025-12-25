import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { schema } from '$lib/server/db/schema';
import { orgs } from '$lib/server/db/schema';
import { and, eq, isNull } from 'drizzle-orm';
import type { CreateOrg, UpdateOrg } from '$lib/server/contracts/orgs.contract';
import { selectOrgSchema, selectOrgsSchema } from '$lib/server/contracts/orgs.contract';
import { error } from '@sveltejs/kit';

class OrgService {
	private readonly db: DrizzleD1Database<typeof schema>;

	constructor(db: DrizzleD1Database<typeof schema>) {
		this.db = db;
	}

	public async create(insertData: CreateOrg) {
		const result = await this.db
			.insert(orgs)
			.values(insertData)
			.onConflictDoNothing()
			.returning()
			.get();

		if (!result) {
			throw error(409, 'Org already exists');
		}

		return selectOrgSchema.parse(result);
	}

	public async list() {
		const result = await this.db.query.orgs.findMany({
			where: isNull(orgs.archivedAt),
			with: {
				stores: true
			},
			orderBy: (orgs, { asc }) => [asc(orgs.name)]
		});

		return selectOrgsSchema.parse(result);
	}

	public async find(slug: string) {
		const data = await this.db.query.orgs.findFirst({
			where: and(eq(orgs.slug, slug), isNull(orgs.archivedAt))
		});

		if (!data) {
			throw error(404, 'Org not found');
		}

		return selectOrgSchema.parse(data);
	}

	public async update(slug: string, updateData: UpdateOrg) {
		const data = await this.db
			.update(orgs)
			.set(updateData)
			.where(and(eq(orgs.slug, slug), isNull(orgs.archivedAt)))
			.returning()
			.get();

		if (!data) {
			throw error(404, 'Org not found');
		}

		return selectOrgSchema.parse(data);
	}

	public async delete(slug: string) {
		await this.db
			.update(orgs)
			.set({ archivedAt: new Date() })
			.where(and(eq(orgs.slug, slug), isNull(orgs.archivedAt)));

		return;
	}
}

export default OrgService;
