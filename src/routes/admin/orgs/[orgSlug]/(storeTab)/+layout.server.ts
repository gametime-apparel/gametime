import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
	const currentOrg = locals.currentOrg;
	const currentStore = locals.currentStore;

	if (!currentStore) {
		throw error(404, 'Store not found');
	}

	return {
		currentOrg,
		currentStore
	};
};
