import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { type schema, stores } from '$lib/server/db/schema';
import {
	type CreateStore,
	selectStoreSchema,
	selectStoresSchema
} from '$lib/server/contracts/stores.contract';
import { error } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

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
}

export default StoresService;
