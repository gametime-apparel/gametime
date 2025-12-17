import { z } from 'zod';
import {
	insertOrgSchema,
	selectOrgSchema,
	selectOrgWithStoreSchema,
	updateOrgSchema
} from '../zod';

export type NewOrg = z.infer<typeof insertOrgSchema>;
export type UpdateOrg = z.infer<typeof updateOrgSchema>;
export type SelectOrg = z.infer<typeof selectOrgSchema>;
export type SelectOrgWithStore = z.infer<typeof selectOrgWithStoreSchema>;
