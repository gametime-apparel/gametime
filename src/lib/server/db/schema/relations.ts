import { relations } from 'drizzle-orm';
import { orgs } from './orgs.schema';
import { stores } from './stores.schema';

export const orgsRelations = relations(orgs, ({ many }) => ({
	stores: many(stores)
}));

export const storesRelations = relations(stores, ({ one }) => ({
	org: one(orgs, {
		fields: [stores.orgId],
		references: [orgs.id]
	}),
}));
