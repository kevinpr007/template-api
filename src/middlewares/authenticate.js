import jwt from 'jsonwebtoken'
import HttpStatus from 'http-status-codes'
import User from '../models/User'
import globalError from '../utils/globalError'
import userFactory from '../utils/userFactory'

export default (req, res, next) => {
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
