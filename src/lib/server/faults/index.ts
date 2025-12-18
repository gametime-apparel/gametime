import orgsError from './orgs.fault.ts';
import authError from './auth.fault.ts';

export const ERR = {
	...orgsError,
	...authError
};
