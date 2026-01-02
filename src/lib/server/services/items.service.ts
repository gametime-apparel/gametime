import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { schema } from '$lib/server/db/schema';
import {
	type CreateItem,
	selectItemSchema,
	selectItemsSchema
} from '$lib/server/contracts/items.contract';
import { items } from '$lib/server/db/schema';
import { and, eq, isNull, SQL } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

class ItemsService {
	private readonly db: DrizzleD1Database<typeof schema>;
	private readonly orgId: number;
	private readonly storeId: number;

	constructor(db: DrizzleD1Database<typeof schema>, orgId: number, storeId: number) {
		this.db = db;
		this.orgId = orgId;
		this.storeId = storeId;
	}

	public async create(item: CreateItem) {
		const result = await this.db
			.insert(items)
			.values({ ...item, storeId: this.storeId })
			.returning()
			.get();

		return selectItemSchema.parse(result);
	}

	private async _find(where: SQL<unknown>) {
		const result = await this.db.query.items.findFirst({ where });
		if (!result) throw error(404, 'Item not found');
		return selectItemSchema.parse(result);
	}

	public find(id: number) {
		const where = and(
			eq(items.storeId, this.storeId),
			eq(items.id, id),
			eq(items.isActive, true),
			isNull(items.archivedAt)
		);

		if (!where) {
			throw new Error('Bad where clause');
		}

		return this._find(where);
	}

	public dangerouslyFind(id: number) {
		const where = and(eq(items.storeId, this.storeId), eq(items.id, id), isNull(items.archivedAt));

		if (!where) {
			throw new Error('Bad where clause');
		}

		return this._find(where);
	}

	private async _list(where: SQL<unknown>) {
		const result = await this.db.query.items.findMany({ where });
		if (!result) throw error(404, 'Item not found');
		return selectItemsSchema.parse(result);
	}

	public async list() {
		const where = and(
			eq(items.storeId, this.storeId),
			eq(items.isActive, true),
			isNull(items.archivedAt)
		);

		if (!where) {
			throw new Error('Bad where clause');
		}

		return this._list(where);
	}

	public async dangerouslyList() {
		const where = and(eq(items.storeId, this.storeId), isNull(items.archivedAt));

		if (!where) {
			throw new Error('Bad where clause');
		}

		return this._list(where);
	}
}

export default ItemsService;
