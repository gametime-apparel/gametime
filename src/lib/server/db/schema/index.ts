import { orgs } from './orgs.schema.ts';
import { stores } from './stores.schema.ts';
import * as relationsSchema from '../relations';

export { orgs, stores };

export const schema = {
	orgs,
	stores,
	...relationsSchema
};
