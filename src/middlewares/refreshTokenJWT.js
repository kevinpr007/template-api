const moment = require('moment')
const jwtService = require('../services/jwtService')

module.exports = (req, res, next) => {
	const token = req.decodedToken

	if (token) {
		let expirationDate = moment(token.exp * 1000)
		let now = moment()
		let diff = expirationDate.diff(now)

		if (diff < parseInt(process.env.JWT_REFRESH_TOKEN)) {
			const newToken = jwtService.sign(token)
			res.set('X-JWTRefresh-Token', newToken)
		}
	}

	next()
}
