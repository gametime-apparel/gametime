import { describe, it, expect } from 'vitest';
import { Hono } from 'hono';
import { env } from 'cloudflare:test';
import protect from './protect.middleware';
import { generateTestTokens } from '$lib/test/defaults';
import globalErrorHandler from '$lib/server/errors';

type TokenError = {
	error: {
		message: string;
	};
};

type TokenValidated = {
	success: boolean;
};

describe('Middleware: Protect', () => {
	const app = new Hono()
		.get('/', protect, (c) => c.json({ success: true }))
		.onError(globalErrorHandler);

	it('should return 401 if no token is provided', async () => {
		const res = await app.request('/', {}, env);
		const json: TokenError = await res.json();

		expect(res.status).toBe(401);
		expect(json.error.message).toBe('No token provided');
	});

	it('should allow access with a valid token', async () => {
		const tokens = await generateTestTokens();

		const res = await app.request(
			'/',
			{
				headers: { Cookie: `admin_session=${tokens.valid}` }
			},
			env
		);

		expect(res.status).toBe(200);
		const json: TokenValidated = await res.json();
		expect(json.success).toBe(true);
	});

	it('should block expired tokens', async () => {
		const tokens = await generateTestTokens();

		const res = await app.request(
			'/',
			{
				headers: { Cookie: `admin_session=${tokens.expired}` }
			},
			env
		);

		expect(res.status).toBe(401);
		const json: TokenError = await res.json();
		expect(json.error.message).toBe('JWT expired');
	});

	it('should block forged signatures', async () => {
		const tokens = await generateTestTokens();

		const res = await app.request(
			'/',
			{
				headers: { Cookie: `admin_session=${tokens.badSignature}` }
			},
			env
		);

		expect(res.status).toBe(401);
		const json: TokenError = await res.json();
		expect(json.error.message).toBe('Failed to verify JWS signature');
	});
});
