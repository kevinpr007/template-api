const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const userFactory = require('../utils/userFactory')
const jwtService = require('../services/jwtService')
const {
	ERROR_TOKEN_NOT_FOUND,
	ERROR_INVALID_TOKEN,
} = require('../utils/constant')

module.exports = (req, res, next) => {
	const header = req.headers.authorization
	const TOKEN_PARAMETER_POSITION = 1

	let token
	if (header) token = header.split(' ')[TOKEN_PARAMETER_POSITION]

	if (token) {
		const { err, decodedToken } = jwtService.verify(token)

		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalErrorFactory.factory(ERROR_INVALID_TOKEN, err))
		} else {
			// User.findOne({ email: decodedToken.email }).then(user => {
			//   req.currentUser = user;
			//   next();
			// });

			if (!decodedToken.confirmed) {
				res
					.status(HttpStatus.BAD_REQUEST)
					.json(
						globalErrorFactory.factory(
							'Your email is not confirmed. Please confirm your email.'
						)
					)
			} else {
				req.decodedToken = decodedToken
				req.currentUser = userFactory(decodedToken)
				next()
			}
		}
	} else {
		res
			.status(HttpStatus.UNAUTHORIZED)
			.json(globalErrorFactory.factory(ERROR_TOKEN_NOT_FOUND))
	}
}
