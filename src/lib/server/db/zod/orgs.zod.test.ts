import { describe, it, expect } from 'vitest';
import {
	insertOrgSchema,
	updateOrgSchema,
	selectOrgSchema,
	selectOrgWithStoreSchema
} from './orgs.zod';
import { ERR } from '$lib/server/faults';
import { expectZodError } from '$lib/test/zodHelper.ts';

describe('insertOrgSchema', () => {
	it('accepts valid input', () => {
		const result = insertOrgSchema.parse({
			name: 'Test Org',
			slug: 'test-org'
		});

		expect(result).toEqual({
			name: 'Test Org',
			slug: 'test-org'
		});
	});

	it('strips non-insertable fields', () => {
		const result = insertOrgSchema.parse({
			name: 'Test Org',
			slug: 'test-org',
			id: 123,
			createdAt: '2024-01-01'
		});

		expect(result).toEqual({
			name: 'Test Org',
			slug: 'test-org'
		});
	});

	it('rejects empty name', () => {
		const result = insertOrgSchema.safeParse({
			name: '',
			slug: 'test-org'
		});

		expectZodError(result, ERR.ORG_MISSING_NAME);
	});

	it('rejects empty slug', () => {
		const result = insertOrgSchema.safeParse({
			name: 'Test Org',
			slug: ''
		});

		expectZodError(result, ERR.ORG_SLUG_TOO_SHORT);
	});

	it('rejects slug shorter than 3 characters', () => {
		const result = insertOrgSchema.safeParse({
			name: 'Test',
			slug: 'ab'
		});

		expectZodError(result, ERR.ORG_SLUG_TOO_SHORT);
	});

	it.each([
		'Bad Slug', // spaces + uppercase
		'bad slug', // spaces
		'Bad-slug', // uppercase
		'bad_slug', // special character
		'-bad-slug', // starts with dash
		'bad-slug-', // ends with dash
		'bad--slug', // double dash
		'bad@slug' // special character
	])('rejects invalid slug format: "%s"', (slug) => {
		const result = insertOrgSchema.safeParse({
			name: 'Test',
			slug
		});

		expectZodError(result, ERR.ORG_SLUG_BAD_FORMAT);
	});
});

describe('updateOrgSchema', () => {
	it('allows partial updates', () => {
		const result = updateOrgSchema.parse({
			name: 'Updated Name'
		});

		expect(result).toEqual({
			name: 'Updated Name'
		});
	});

	it('allows empty object', () => {
		const result = updateOrgSchema.parse({});
		expect(result).toEqual({});
	});

	it('strips slug updates', () => {
		const result = updateOrgSchema.safeParse({
			name: 'Updated Name',
			slug: 'test-org'
		});

		expect(result.success).toBe(true);
		expect(result.data).toEqual({
			name: 'Updated Name'
		});
	});
});

describe('selectOrgSchema', () => {
	it('accepts a valid selected org shape', () => {
		const result = selectOrgSchema.parse({
			id: 1,
			name: 'Test Org',
			slug: 'test-org',
			createdAt: new Date(),
			updatedAt: new Date(),
			archivedAt: null
		});

		expect(result).toHaveProperty('id');
		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('slug');
		expect(result).toHaveProperty('createdAt');
		expect(result).not.toHaveProperty('updatedAt');
		expect(result).not.toHaveProperty('archivedAt');
	});
});

describe('selectOrgWithStoreSchema', () => {
	it('accepts a valid selected org shape', () => {
		const result = selectOrgWithStoreSchema.parse({
			id: 1,
			name: 'Test Org',
			slug: 'test-org',
			createdAt: new Date(),
			updatedAt: new Date(),
			archivedAt: null,
			stores: []
		});

		expect(result).toHaveProperty('id');
		expect(result).toHaveProperty('name');
		expect(result).toHaveProperty('slug');
		expect(result).toHaveProperty('createdAt');
		expect(result).toHaveProperty('stores');
		expect(result).not.toHaveProperty('updatedAt');
		expect(result).not.toHaveProperty('archivedAt');
	});
});
