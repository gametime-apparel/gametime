import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { type schema, stores } from '$lib/server/db/schema';
import {
	type CreateStore,
	type UpdateStore,
	selectStoreSchema,
	selectStoresSchema
} from '$lib/server/contracts/stores.contract';
import { error } from '@sveltejs/kit';
import { and, eq } from 'drizzle-orm';

class StoresService {
	private readonly db: DrizzleD1Database<typeof schema>;
	private readonly orgId: number;

	constructor(db: DrizzleD1Database<typeof schema>, orgId: number) {
		this.db = db;
		this.orgId = orgId;
	}

	public async create(data: CreateStore) {
		const result = await this.db
			.insert(stores)
			.values({
				...data,
				orgId: this.orgId
			})
			.onConflictDoNothing()
			.returning()
			.get();

		if (!result) {
			throw error(409, 'Store already exists');
		}

		return selectStoreSchema.parse(result);
	}

	public async list() {
		const result = await this.db.query.stores.findMany({
			where: eq(stores.orgId, this.orgId)
		});

		if (!result) {
			throw error(404, 'Org not found');
		}

		return selectStoresSchema.parse(result);
	}

	public async getBySlug(slug: string) {
		const result = await this.db.query.stores.findFirst({
			where: and(eq(stores.orgId, this.orgId), eq(stores.slug, slug))
		});

		if (!result) {
			throw error(404, 'Store not found');
		}

		return selectStoreSchema.parse(result);
	}

	public async update(slug: string, data: UpdateStore) {
		const result = await this.db
			.update(stores)
			.set(data)
			.where(and(eq(stores.orgId, this.orgId), eq(stores.slug, slug)))
			.returning()
			.get();

		if (!result) {
			throw error(404, 'Store not found');
		}

		return selectStoreSchema.parse(result);
	}
}

export default StoresService;
