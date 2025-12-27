import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const stores = await locals.Store.list();

	return { stores };
};
