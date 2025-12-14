import { zValidator as baseZValidator } from '@hono/zod-validator';
import type { ValidationTargets } from 'hono';
import type { ZodType } from 'zod';

/**
 * A wrapper around Hono's zValidator that standardizes error responses.
 * This ensures that validation errors return the same shape as the GlobalErrorHandler
 * ({ success: false, error: { message: string } }), preventing Type Unions on the client.
 */
const zValidator = <T extends ZodType, Target extends keyof ValidationTargets>(
	target: Target,
	schema: T
) =>
	baseZValidator(target, schema, (result, c) => {
		if (!result.success) {
			return c.json(
				{
					success: false,
					error: {
						name: 'Validation Error',
						// Return the first validation issue message
						message: result.error.issues[0].message
					}
				},
				400
			);
		}
	});

export default zValidator;
