const jwt = require('jsonwebtoken')
const moment = require('moment')
const signJWT = require('../utils/signJWT')
const userFactory = require('../utils/userFactory')

module.exports = (req, res, next) => {
	const token = req.decodedToken

	if (token) {
		let date1 = moment(token.exp * 1000)
		let date2 = moment()
		let diff = date1.diff(date2)

		if (diff < parseInt(process.env.JWT_REFRESH_TOKEN)) {
			//TODO: FIX jwt
			const newToken = jwt.sign(
				userFactory(token),
				process.env.JWT_SECRET,
				signJWT
			)
			res.set('X-JWTRefresh-Token', newToken)
		}
	}

	next()
}
