import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const orgs = sqliteTable('orgs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	createdAt: integer('created_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date()),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.notNull()
		.$defaultFn(() => new Date())
		.$onUpdate(() => new Date()),
	archivedAt: integer('archived_at', { mode: 'timestamp' })
});

export const schema = { orgs };

export const insertOrgSchema = createSelectSchema(orgs, {
	name: (schema) => schema
}).omit({
	id: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export const updateOrgSchema = createSelectSchema(orgs, {
	name: (schema) => schema
}).omit({
	id: true,
	slug: true,
	createdAt: true,
	updatedAt: true,
	archivedAt: true
});

export type NewOrg = z.infer<typeof insertOrgSchema>;
export type UpdateOrg = z.infer<typeof updateOrgSchema>;
