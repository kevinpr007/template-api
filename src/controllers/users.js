const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const parseErrors = require('../utils/parseErrors')
const globalErrorFactory = require('../utils/globalErrorFactory')
const { sendConfirmationEmailValidation } = require('../utils/email/mailer')
const setDataFactory = require('../utils/setDataFactory')

//TODO: Add in service
const signUp = async (req, res) => {
	const { email, password, username } = req.body.user
	const user = new User({ email, username })

	if (user.isPasswordLength(password)) {
		user.setPassword(password)
		user.setConfirmationToken()

		try {
			let userRecord = await user.save()
			sendConfirmationEmailValidation(userRecord)
			const data = setDataFactory('data', userRecord.toAuthJSON())
			res.json(data)
		} catch (err) {
			next(err)
		}
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(
				globalErrorFactory(
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
