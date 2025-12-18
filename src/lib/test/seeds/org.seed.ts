import { orgs } from '$lib/server/db/schema';
import { db } from '../setup';

async function seedOrgs() {
	const now = new Date();

	return db
		.insert(orgs)
		.values([
			{
				name: 'Delta Org',
				slug: 'delta',
				createdAt: now,
				updatedAt: now,
				archivedAt: null
			},
			{
				name: 'Charlie Org',
				slug: 'charlie',
				createdAt: now,
				updatedAt: now,
				archivedAt: null
			},
			{
				name: 'Bravo Org',
				slug: 'bravo',
				createdAt: now,
				updatedAt: now,
				archivedAt: null
			},
			{
				name: 'Alpha Org',
				slug: 'alpha',
				createdAt: now,
				updatedAt: now,
				archivedAt: null
			},
			{
				name: 'Archived Org',
				slug: 'archived',
				createdAt: now,
				updatedAt: now,
				archivedAt: now
			}
		])
		.returning();
}

export default seedOrgs;
