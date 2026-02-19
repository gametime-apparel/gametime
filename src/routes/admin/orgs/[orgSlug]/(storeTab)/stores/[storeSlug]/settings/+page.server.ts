import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import {
	createStoreSchema,
	updateStoreSchema
} from '$lib/server/contracts/stores.contract.ts';
import { error, fail } from '@sveltejs/kit';
import { handleActionError } from '$lib/server/http';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ locals, params }) => {
	const store = locals.currentStore;
	if (!store) throw error(404, 'Store not found');

	const form = await superValidate(
		{ name: store.name, slug: store.slug, shipping: store.shipping },
		zod4(createStoreSchema)
	);

	return { currentOrg: locals.currentOrg, store, form };
};

export const actions: Actions = {
	default: async (event) => {
		const { locals, params } = event;
		const form = await superValidate(event.request, zod4(updateStoreSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.Store.update(params.storeSlug, form.data);
		} catch (err) {
			return handleActionError(form, err);
		}

		const slug = form.data.slug ?? params.storeSlug;
		throw redirect(
			`/admin/orgs/${locals.currentOrg.slug}/stores/${slug}`,
			{
				type: 'success',
				message: 'Store Updated'
			},
			event
		);
	}
};
