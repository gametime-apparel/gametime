import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const orgs = sqliteTable('orgs', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull(),
	createdAt: integer('created_at', { mode: 'timestamp' })
});
