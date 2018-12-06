const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const parseErrors = require('../utils/parseErrors')
const globalError = require('../utils/globalError')
const { sendConfirmationEmailValidation } = require('../utils/email/mailer')
const userFactory = require('../utils/userFactory')

const signUp = (req, res) => {
	const { email, password, username } = req.body.user

	const user = new User({ email, username })
	if (user.isPasswordLength(password)) {
		user.setPassword(password)
		user.setConfirmationToken()
		//TODO:ASYNC AWAY
		user
			.save()
			.then((userRecord) => {
				sendConfirmationEmailValidation(userRecord)
				res.json({ user: userRecord.toAuthJSON() })
			})
			.catch((err) =>
				res
					.status(HttpStatus.BAD_REQUEST)
					.json(globalError('Error saving User', parseErrors(err.errors)))
			)
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

//TODO: Move to Auth
const currentUser = (req, res) => {
	//TODO: Add if it's valid token
	res.json({
		user: userFactory(req.currentUser),
	})
}

module.exports = {
	signUp,
	currentUser,
}

//TODO: Add pagination
//https://github.com/Ivan-Marquez/momentum/blob/develop/src/middleware/paged-json.js

//TODO: Add page validations
//https://github.com/Ivan-Marquez/momentum/blob/develop/src/middleware/page-validations.js
