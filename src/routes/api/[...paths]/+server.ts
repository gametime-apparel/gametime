import app from '$lib/server/app';
import type { RequestHandler } from './$types';

const handler: RequestHandler = ({ request, platform }) => {
	return app.fetch(request, platform?.env, platform?.context);
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
