const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')

module.exports = (roles = []) => {
	// roles param can be a single role string (e.g. Role.User or 'User')
	// or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
	if (typeof roles === 'string') {
		roles = [roles]
	}

	return [
		// authorize based on user role
		(req, res, next) => {
			if (
				roles.length &&
				!roles.some((r) => req.currentUser.roles.includes(r))
			) {
				return res
					.status(HttpStatus.UNAUTHORIZED)
					.json(globalErrorFactory.factory('Unauthorized user'))
			}

			next()
		},
	]
}
