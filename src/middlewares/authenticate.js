const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
const globalErrorFactory = require('../utils/globalErrorFactory')
const userFactory = require('../utils/userFactory')
const JWTVariableFactory = require('../utils/JWTVariableFactory')

module.exports = (req, res, next) => {
	const header = req.headers.authorization
	const TOKEN_PARAMETER = 1

	let token
	if (header) token = header.split(' ')[TOKEN_PARAMETER]

	//https://github.com/Ivan-Marquez/momentum/blob/develop/src/config/strategies/jwt.js
	if (token) {
		jwt.verify(
			token,
			process.env.JWT_SECRET,
			JWTVariableFactory,
			(err, decodedToken) => {
				if (err) {
					res
						.status(HttpStatus.UNAUTHORIZED)
						.json(globalErrorFactory('Invalid token', err))
				} else {
					// User.findOne({ email: decodedToken.email }).then(user => {
					//   req.currentUser = user;
					//   next();
					// });

					if (!decodedToken.confirmed) {
						res
							.status(HttpStatus.BAD_REQUEST)
							.json(
								globalErrorFactory(
									'Your email is not confirmed. Please confirm your email.'
								)
							)
					} else {
						//TODO: Add Authorization
						req.decodedToken = decodedToken
						req.currentUser = userFactory(decodedToken)
						next()
					}
				}
			}
		)
	} else {
		res
			.status(HttpStatus.UNAUTHORIZED)
			.json(globalErrorFactory('Token not found'))
	}
}
