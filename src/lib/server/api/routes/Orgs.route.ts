import { Hono } from 'hono';

const orgs = new Hono().get('/', async (c) => {
	const Org = c.var.Org;

	const data = await Org.findMany();

	return c.json({
		data
	});
});

export default orgs;
