const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const parseErrors = require('../utils/parseErrors')
const globalError = require('../utils/globalError')
const { sendConfirmationEmailValidation } = require('../utils/email/mailer')
const setData = require('../utils/composeResponse.js')

const signUp = async (req, res) => {
	const { email, password, username } = req.body.user
	const user = new User({ email, username })

	if (user.isPasswordLength(password)) {
		user.setPassword(password)
		user.setConfirmationToken()

		let userRecord
		try {
			userRecord = await user.save()
			sendConfirmationEmailValidation(userRecord)
			res.json(setData({ user: userRecord.toAuthJSON() }))
		} catch (err) {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalError('Error saving User', parseErrors(err.errors)))
		}
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(
				globalError(
					`You have entered less than ${
						process.env.PASSWORD_LENGTH
					} characters for password`
				)
			)
	}
}

module.exports = {
	signUp,
}

//TODO: Add pagination
//https://github.com/Ivan-Marquez/momentum/blob/develop/src/middleware/paged-json.js

//TODO: Add page validations
//https://github.com/Ivan-Marquez/momentum/blob/develop/src/middleware/page-validations.js
