import type { Actions, PageServerLoad } from './$types';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { insertOrgSchema } from '$lib/server/db/zod';
import { fail } from '@sveltejs/kit';
import client from '$lib/client';
import { redirect } from 'sveltekit-flash-message/server';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(insertOrgSchema));
	return { form };
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event.request, zod4(insertOrgSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const res = await client(event.fetch).api.orgs.$post({
				json: {
					...form.data
				}
			});

			if (!res.ok) {
				const json = await res.json();
				return message(form, json.error.message, { status: res.status });
			}
		} catch (err) {
			console.error(err);
			return message(form, 'Connection failed. Please try again.', { status: 500 });
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
