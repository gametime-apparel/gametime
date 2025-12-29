import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { orgs } from '$lib/server/db/schema';
import { z } from 'zod';
import { slugSchema } from './_shared';
import { selectStoreSchema } from '$lib/server/contracts/stores.contract';

const nameSchema = z.string().min(1, 'Name is required');

const editableFields = {
	name: true,
	slug: true,
	color: true
} as const;

const overrides = {
	name: z.string().min(1, 'Name is required'),
	slug: slugSchema
};

export const createOrgSchema = createInsertSchema(orgs, overrides).pick(editableFields);

export const selectOrgSchema = createSelectSchema(orgs).pick({
	id: true,
	...editableFields
});

export const selectOrgWithStoreSchema = createSelectSchema(orgs)
	.pick({
		id: true,
		...editableFields
	})
	.extend({
		stores: z.array(selectStoreSchema)
	});

export const selectOrgsSchema = selectOrgWithStoreSchema.array();

export const updateOrgSchema = createUpdateSchema(orgs, {
	name: nameSchema
})
	.partial()
	.pick({
		name: true,
		color: true
	});

export type CreateOrg = z.infer<typeof createOrgSchema>;
export type Org = z.infer<typeof selectOrgSchema>;
export type OrgWithStores = z.infer<typeof selectOrgWithStoreSchema>;
export type Orgs = z.infer<typeof selectOrgsSchema>;
export type UpdateOrg = z.infer<typeof updateOrgSchema>;
