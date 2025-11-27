import { type DrizzleD1Database } from 'drizzle-orm/d1';
import { type schema } from '$lib/server/db/schema';

class OrgService {
	private readonly db: DrizzleD1Database<typeof schema>;

	constructor(db: DrizzleD1Database<typeof schema>) {
		this.db = db;
	}

	public async findMany() {
		return this.db.query.orgs.findMany();
	}
}

export default OrgService;
