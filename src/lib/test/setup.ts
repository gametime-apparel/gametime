import { testClient } from 'hono/testing';
import app, { type AppType } from '$lib/server/api/app.ts';
import { applyD1Migrations, env } from 'cloudflare:test';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
export const client = testClient<AppType>(app, env).api;
