const ERR = {
	ORG_EXISTS: {
		status: 409,
		code: 'ORG_EXISTS',
		message: 'Org already exists'
	},
	ORG_NOT_FOUND: {
		status: 404,
		code: 'ORG_NOT_FOUND',
		message: 'Org not found'
	},
	ORG_SLUG_BAD_FORMAT: {
		status: 400,
		code: 'ORG_SLUG_BAD_FORMAT',
		message:
			'Slug must be lowercase, alphanumeric, and cannot contain spaces, double dashes, or start/end with a dash.'
	},
	ORG_MISSING_NAME: {
		status: 400,
		code: 'ORG_MISSING_NAME',
		message: 'Name is required'
	},
	ORG_MISSING_SLUG: {
		status: 400,
		code: 'ORG_MISSING_SLUG',
		message: 'Slug is required'
	},
	ORG_SLUG_TOO_SHORT: {
		status: 400,
		code: 'ORG_SLUG_TOO_SHORT',
		message: 'Slug must be at least 3 characters'
	}
};

export default ERR;
