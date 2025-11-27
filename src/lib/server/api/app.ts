import { Hono } from 'hono';
import { orgs } from './routes';
import { contextMiddleware } from '$lib/server/api/middleware';
import { HTTPException } from 'hono/http-exception';

const app = new Hono().basePath('/api');

app.get('/', (c) => {
	return c.json({
		version: '2.0.0'
	});
});

app.use('*', contextMiddleware);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route('/orgs', orgs);

app.onError((error, c) => {
	if (error instanceof HTTPException) {
		console.error(error.cause);
		// Get the custom response
		return c.json(
			{
				success: false,
				message: error.message
			},
			error.status
		);
	}

	return c.json({
		success: false,
		error: 'Internal server error'
	});
});

export default app;
export type AppType = typeof routes;
