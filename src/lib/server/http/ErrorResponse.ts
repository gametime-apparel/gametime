import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { HTTPException } from 'hono/http-exception';

export type AppErrorDef = {
	status: number;
	code: string;
	message: string;
};

class ErrorResponse extends HTTPException {
	public readonly code: string;
	public readonly details?: unknown;

	constructor(err: AppErrorDef, details?: unknown) {
		super(err.status as ContentfulStatusCode, {
			message: err.message,
			cause: err.code
		});

		this.code = err.code;
		this.details = details;
	}
}

export default ErrorResponse;
