import { describe, expect, it } from 'vitest';
import { client } from '$lib/test/setup';
import { generateTestTokens } from '$lib/test/defaults.ts';

const token = await generateTestTokens();

describe('Orgs', () => {
	describe('GET /orgs', () => {
		it('should fail with no token', async () => {
			const req = await client.orgs.$get();

			const res = await req.json();

			expect(res.success).toBe(false);
			expect(res.data).toBe(undefined);
		});

		it('should list all Orgs', async () => {
			const req = await client.orgs.$get(
				{},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			console.log(res);

			expect(res.success).toBe(true);
			expect(res.data).toBeDefined();
		});
	});

	describe('POST /orgs', () => {
		it('should fail with no token', async () => {
			const req = await client.orgs.$post({
				json: {
					name: 'Test Org',
					slug: 'test'
				}
			});

			const res = await req.json();

			expect(res.success).toBe(false);
			expect(res.data).toBe(undefined);
		});

		it('should create an org', async () => {
			const req = await client.orgs.$post(
				{
					json: {
						name: 'Test Org',
						slug: 'test'
					}
				},
				{
					headers: {
						Cookie: `admin_session=${token.valid}`
					}
				}
			);

			const res = await req.json();

			expect(res.success).toBe(true);
			expect(res.data).toBeDefined();
		});
	});
});
