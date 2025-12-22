import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-zod';
import { orgs } from '$lib/server/db/schema';
import { z } from 'zod';
import { slugSchema } from '$lib/server/contracts/shared.ts';

const nameSchema = z.string().min(1, 'Name is required');

const editableFields = {
	name: true,
	slug: true
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

export const selectOrgsSchema = selectOrgSchema.array();

export const updateOrgSchema = createUpdateSchema(orgs, {
	name: nameSchema
})
	.partial()
	.pick({
		name: true
	});

export type CreateOrg = z.infer<typeof createOrgSchema>;
export type Org = z.infer<typeof selectOrgSchema>;
export type Orgs = z.infer<typeof selectOrgsSchema>;
export type UpdateOrg = z.infer<typeof updateOrgSchema>;
