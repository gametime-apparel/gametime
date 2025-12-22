import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { stores } from '$lib/server/db/schema';
import { z } from 'zod';
import { slugSchema } from '$lib/server/contracts/shared.ts';

const editableFields = {
	name: true,
	slug: true,
	color: true,
	shipping: true,
	orgId: true
} as const;

const overrides = {
	name: z.string().min(1, 'Name is required'),
	slug: slugSchema
};

export const createStoreSchema = createInsertSchema(stores, overrides).pick(editableFields);

export const selectStoreSchema = createSelectSchema(stores).pick({
	id: true,
	...editableFields
});

export const updateStoreSchema = createUpdateSchema(stores, overrides)
	.partial()
	.pick(editableFields);

export type CreateStore = z.infer<typeof createStoreSchema>;
export type Store = z.infer<typeof selectStoreSchema>;
export type UpdateStore = z.infer<typeof updateStoreSchema>;
