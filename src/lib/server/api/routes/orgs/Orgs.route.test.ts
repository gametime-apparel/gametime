import { beforeAll, describe, expect, it } from 'vitest';
import { client, Org } from '$lib/test/setup';
import { generateTestTokens } from '$lib/test/defaults.ts';

const token = await generateTestTokens();

describe('Orgs', async () => {
	beforeAll(async () => {
		await Org.create({
			name: 'Main Store',
			slug: 'main'
		});
	});
	describe('GET /orgs', async () => {
		it('should fail with no token', async () => {
			const req = await client.orgs.$get();

			const res = await req.json();

			expect(req.status).toBe(401);
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

			expect(req.status).toBe(200);
			expect(res.success).toBe(true);
			expect(res.data).toBeDefined();
		});
	});

	describe('POST /orgs', async () => {
		it('should fail with no token', async () => {
			const req = await client.orgs.$post({
				json: {
					name: 'Test Org',
					slug: 'test'
				}
			});

			const res = await req.json();

			expect(req.status).toBe(401);
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

			expect(req.status).toBe(201);
			expect(res.success).toBe(true);
			expect(res.data).toBeDefined();
		});
	});
	describe('GET /orgs/:org', () => {
		it('should fail with invalid org', async () => {
			const req = await client.orgs[':slug'].$get({
				param: {
					slug: 'test123'
				}
			});
			const res = await req.json();

			expect(res.success).toBe(false);
		});

		it('should pass with no token', async () => {
			const req = await client.orgs[':slug'].$get({
				param: {
					slug: 'main'
				}
			});

			const res = await req.json();

			expect(req.status).toBe(200);
			expect(res.success).toBe(true);
		});
	});
});
