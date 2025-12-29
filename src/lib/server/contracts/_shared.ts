import { z } from 'zod';

export const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
export const slugSchema = z
	.string()
	.min(3, 'Slug must be at least 3 characters')
	.regex(
		slugRegex,
		'Slug must be lowercase, alphanumeric, and cannot contain spaces, double dashes, or start/end with a dash.'
	);
