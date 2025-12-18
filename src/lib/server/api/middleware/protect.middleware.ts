import { createMiddleware } from 'hono/factory';
import type { Env } from '$lib/server/types/hono';
import { jwtVerify } from 'jose';
import { getCookie } from 'hono/cookie';
import { ERR } from '$lib/server/faults';
import ErrorResponse from '$lib/server/http/ErrorResponse';

const protectMiddleware = createMiddleware<Env>(async (c, next) => {
	const secret = new TextEncoder().encode(c.env.PRIVATE_JWT_SECRET);
	const token = getCookie(c, 'admin_session');

	if (!token) {
		throw new ErrorResponse(ERR.AUTH_NO_TOKEN);
	}

	await jwtVerify(token, secret);

	await next();
});

export default protectMiddleware;
