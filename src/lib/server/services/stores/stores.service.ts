import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { orgs, type schema, stores } from '$lib/server/db/schema';
import { type CreateStore, selectStoreSchema } from '$lib/server/contracts';
import { error } from '@sveltejs/kit';

class StoresService {
	private readonly db: DrizzleD1Database<typeof schema>;
	private readonly org: number;

	constructor(db: DrizzleD1Database<typeof schema>, org: number) {
		this.db = db;
		this.org = org;
	}

	public async list() {}

	public async create(data: CreateStore) {
		const result = await this.db
			.insert(stores)
			.values(data)
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
