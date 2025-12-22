import type { LayoutServerLoad } from './$types';
import { loadFlash } from 'sveltekit-flash-message/server';

export const load: LayoutServerLoad = loadFlash(async ({ cookies, locals }) => {
	if (!cookies.get('admin_session')) {
		return;
	}

	const orgs = await locals.Org.list();

	return { orgs };
});
