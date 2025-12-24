import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { type schema, stores } from '$lib/server/db/schema';
import { type CreateStore, selectStoreSchema } from '$lib/server/contracts/stores.contract';
import { error } from '@sveltejs/kit';

class StoresService {
	private readonly db: DrizzleD1Database<typeof schema>;
	private readonly orgId: number;

	constructor(db: DrizzleD1Database<typeof schema>, orgId: number) {
		this.db = db;
		this.orgId = orgId;
	}

	public async list() {}

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
}

export default StoresService;
