import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { timestamps, archivedAt } from './shared.ts';

export const orgs = sqliteTable('orgs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	...timestamps,
	...archivedAt
});

export const schema = { orgs };

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const insertOrgSchema = createInsertSchema(orgs, {
	name: (schema) => schema.min(1, 'Name is required'),
	slug: (schema) =>
		schema
			.min(3, 'Slug must be at least 3 characters')
			.regex(slugRegex, {
				message:
					'Slug must be lowercase, alphanumeric, and cannot contain spaces, double dashes, or start/end with a dash.'
			})
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateOrgSchema = insertOrgSchema.partial();

export const selectOrgSchema = createSelectSchema(orgs).omit({
	updatedAt: true,
	archivedAt: true
});

export type NewOrg = z.infer<typeof insertOrgSchema>;
export type UpdateOrg = z.infer<typeof updateOrgSchema>;
export type SelectOrg = z.infer<typeof selectOrgSchema>;
