import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { schema } from '$lib/server/db/schema';

class ItemsService {
	private readonly db: DrizzleD1Database<typeof schema>;
	private readonly orgId: number;
	private readonly storeId: number;

	constructor(db: DrizzleD1Database<typeof schema>, orgId: number, storeId: number) {
		this.db = db;
		this.orgId = orgId;
		this.storeId = storeId;
	}
}

export default ItemsService;
