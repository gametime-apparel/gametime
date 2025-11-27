import { type schema } from '$lib/server/db/schema';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { Org } from '$lib/server/services';

declare module 'hono' {
	interface ContextVariableMap {
		Org: Org;
		DB: DrizzleD1Database<typeof schema>;
	}
}

export type Env = {
	Bindings: {
		DB: D1Database;
		PRIVATE_JWT_SECRET: string;
	};
};
