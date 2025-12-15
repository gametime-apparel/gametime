import { Hono } from 'hono';

const stores = new Hono().get('/', async (c) => {


	return c.json({
		success: true,
	});
});

export default stores;
