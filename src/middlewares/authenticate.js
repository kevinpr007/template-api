const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const globalError = require('../utils/globalError')
const userFactory = require('../utils/userFactory')
//TODO: Validate token when email is not confirmed
module.exports = (req, res, next) => {
	const header = req.headers.authorization
	const TOKEN_PARAMETER = 1

	let token
	if (header) token = header.split(' ')[TOKEN_PARAMETER]

	//TODO: Add refresh token
	//https://github.com/Ivan-Marquez/momentum/blob/develop/src/config/strategies/jwt.js
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
			if (err) {
				res.status(HttpStatus.UNAUTHORIZED).json(globalError('Invalid token'))
			} else {
				// User.findOne({ email: decodedToken.email }).then(user => {
				//   req.currentUser = user;
				//   next();
				// });
				req.currentUser = userFactory(decodedToken)
				next()
			}
		})
	} else {
		res.status(HttpStatus.UNAUTHORIZED).json(globalError('No token found'))
	}
}

//TODO: Add authorize middleware
//https://github.com/Ivan-Marquez/momentum/blob/develop/src/middleware/authorize.js
