import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { createStoreSchema } from '$lib/server/contracts';
import type { Actions } from '../../../../../../.svelte-kit/types/src/routes/admin/new/$types';
import { fail } from '@sveltejs/kit';
import { handleActionError } from '$lib/server/http';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ parent }) => {
	const { currentOrg } = await parent();
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
			`/admin`,
			{
				type: 'success',
				message: 'Organization Created'
			},
			event
		);
	}
};
