import type { PageServerLoad, Actions } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { createStoreSchema } from '$lib/server/contracts/stores.contract.ts';
import { fail } from '@sveltejs/kit';
import { handleActionError } from '$lib/server/http';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ locals }) => {
	const currentOrg = locals.currentOrg;

	const form = await superValidate(zod4(createStoreSchema));
	return { currentOrg, form };
};

export const actions: Actions = {
	default: async (event) => {
		const { locals } = event;
		const form = await superValidate(event.request, zod4(createStoreSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await locals.Store.create(form.data);
		} catch (err) {
			return handleActionError(form, err);
		}

		throw redirect(
			`/admin/orgs/${locals.currentOrg.slug}`,
			{
				type: 'success',
				message: 'Organization Created'
			},
			event
		);
	}
};
