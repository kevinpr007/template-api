const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')

const authorize = (roles = []) => {
	// roles param can be a single role string (e.g. Role.User or 'User')
	// or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
	if (typeof roles === 'string') {
		roles = [roles]
	}

	// authorize based on user role
	let authorizeValidation = (req, res, next) => {
		if (roles.length && !roles.some((r) => req.currentUser.roles.includes(r))) {
			return res
				.status(HttpStatus.UNAUTHORIZED)
				.json(
					globalErrorFactory.factory(
						`Unauthorized user. You must have at least one of this roles (${roles}).`
					)
				)
		}

		next()
	}

	return authorizeValidation
}

module.exports = authorize
