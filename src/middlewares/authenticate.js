const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const globalError = require('../utils/globalError')
const userFactory = require('../utils/userFactory')

module.exports = (req, res, next) => {
	const header = req.headers.authorization
	const TOKEN_PARAMETER = 1

	let token
	if (header) token = header.split(' ')[TOKEN_PARAMETER]

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
