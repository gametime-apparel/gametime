import { Hono } from 'hono';
import { protect } from '$lib/server/api/middleware';
import { insertOrgSchema } from '$lib/server/db/schema';
import { sValidator } from '@hono/standard-validator';

const orgs = new Hono()
	.get('/', protect, async (c) => {
		const Org = c.var.Org;

		const data = await Org.findMany();

		return c.json({
			success: true,
			data
		});
	})
	.post('/', protect, sValidator('json', insertOrgSchema), async (c) => {
		const Org = c.var.Org;

		const insertData = c.req.valid('json');

		const data = await Org.create(insertData);

		return c.json({
			success: true,
			data,
			message: 'Organization created successfully.'
		});
	});

export default orgs;
