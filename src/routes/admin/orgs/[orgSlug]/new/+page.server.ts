import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { createStoreSchema } from '$lib/server/contracts';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentOrg } = await parent();
	const form = await superValidate(zod4(createStoreSchema));
	return { currentOrg, form };
};
