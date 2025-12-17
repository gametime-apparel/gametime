import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { timestamps, archivedAt } from './shared.ts';

export const orgs = sqliteTable('orgs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	slug: text('slug').notNull().unique(),
	...timestamps,
	...archivedAt
});
