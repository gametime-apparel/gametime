import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { PRIVATE_TURNSTILE_SECRET_KEY, PRIVATE_ADMIN_PASSWORD } from '$env/static/private';

interface TurnstileVerifyResponse {
	success: boolean;
	'error-codes': string[];
}

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = data.get('password');
		const token = data.get('cf-turnstile-response') as string;

		// 1. Check Turnstile first (Prevent Bot Spam)
		// We do this BEFORE checking the password to save resources
		const cfVerify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({
				secret: PRIVATE_TURNSTILE_SECRET_KEY,
				response: token
			})
		});

		const cfData: TurnstileVerifyResponse = await cfVerify.json();

		if (!cfData.success) {
			return fail(400, { error: 'Security check failed. Please try again.' });
		}

		// 2. Check Password
		if (password !== PRIVATE_ADMIN_PASSWORD) {
			return fail(403, { error: 'Incorrect access code.' });
		}

		// 3. Success
		cookies.set('admin_session', 'authenticated', {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 7 // 1 week
		});

		throw redirect(303, '/admin');
	}
} satisfies Actions;
