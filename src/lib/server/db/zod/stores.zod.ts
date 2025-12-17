import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import stores from '../schema/stores.schema.ts';
import { z } from 'zod';

export const insertStoreSchema = createInsertSchema(stores).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateStoreSchema = insertStoreSchema.partial();

export const selectStoreSchema = createSelectSchema(stores)
	.omit({
		updatedAt: true,
		archivedAt: true,
		orgId: true
	})
	.extend({
		createdAt: z.string()
	});
