import { message, type SuperValidated, type Infer } from 'sveltekit-superforms';
import { isHttpError, type NumericRange } from '@sveltejs/kit';
import type { ZodType } from 'zod';

function handleActionError<T extends ZodType, M = string>(
	form: SuperValidated<Infer<T>>,
	err: unknown
) {
	if (isHttpError(err)) {
		return message(form, (err.body.message as M) ?? 'An error occurred', {
			status: err.status as NumericRange<400, 599>
		});
	}

	console.error('Unhandled Action Error:', err);
	return message(form, 'Internal Server Error' as M, { status: 500 });
}

export default handleActionError;
