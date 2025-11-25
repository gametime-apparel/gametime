import { Hono } from 'hono';

const app = new Hono();

const routes = app.get('/api', (c) => {
	return c.text('Hello, World!');
});

export default app;
export type AppType = typeof routes;
