import { type schema } from '$lib/server/db/schema';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import type { Org, Store } from '$lib/server/services';

declare module 'hono' {
	interface ContextVariableMap {
		Org: Org;
		Store: Store;
		DB: DrizzleD1Database<typeof schema>;
	}
}

export type Bindings = {
	DB: D1Database;
	PRIVATE_JWT_SECRET: string;
};

export type Env = {
	Bindings: Bindings;
};

declare module 'cloudflare:test' {
	interface ProvidedEnv extends Bindings {
		TEST_MIGRATIONS: D1Migration[];
	}
}
