import { relations } from 'drizzle-orm';
import orgs from '../schema/orgs.schema.ts';
import stores from '../schema/stores.schema';

export const orgsRelations = relations(orgs, ({ many }) => ({
	stores: many(stores)
}));

export const storesRelations = relations(stores, ({ one }) => ({
	org: one(orgs, {
		fields: [stores.orgId],
		references: [orgs.id]
	})
}));
