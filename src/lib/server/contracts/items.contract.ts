import { items } from '$lib/server/db/schema';
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod';
import type { z } from 'zod';

const editableFields = {
	name: true,
	description: true,
	basePrice: true,
	isActive: true
} as const;

export const createItemSchema = createInsertSchema(items).pick(editableFields);

export const selectItemSchema = createInsertSchema(items).pick({
	id: true,
	...editableFields
});

export const selectItemsSchema = selectItemSchema.array();

export const updateItemSchema = createUpdateSchema(items).pick(editableFields);

export type CreateItem = z.infer<typeof createItemSchema>;
export type Item = z.infer<typeof selectItemSchema>;
export type Items = z.infer<typeof selectItemsSchema>;
export type UpdateItem = z.infer<typeof updateItemSchema>;
