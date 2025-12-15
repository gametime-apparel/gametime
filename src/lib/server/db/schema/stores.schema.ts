import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { timestamps, archivedAt } from './shared.ts';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
import { orgs } from './orgs.schema.ts';

export const stores = sqliteTable('stores', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull(),
	color: text('color').notNull(),
	shipping: text('shipping', { enum: ['required', 'optional', 'none'] }).notNull(),
	...timestamps,
	...archivedAt,
	orgId: integer('org_id').notNull().references(() => orgs.id)
}, (t) => ({
	unq: uniqueIndex('org_slug_idx').on(t.orgId, t.slug)
}));

export const insertStoreSchema = createInsertSchema(stores).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateStoreSchema = insertStoreSchema.partial();

export type NewStore = z.infer<typeof insertStoreSchema>;
export type UpdateStore = z.infer<typeof updateStoreSchema>;
