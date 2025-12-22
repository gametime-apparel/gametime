import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { selectOrgSchema, updateOrgSchema } from '$lib/server/contracts';
import { fail } from '@sveltejs/kit';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async ({ params, locals }) => {
	const org = await locals.Org.find(params.orgSlug);

	const form = await superValidate(org, zod4(selectOrgSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const { params, locals, request } = event;
		const form = await superValidate(request, zod4(updateOrgSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		await locals.Org.update(params.orgSlug, form.data);

		throw redirect(
			`/admin`,
			{
				type: 'success',
				message: 'Organization Updated'
			},
			event
		);
	}
};
