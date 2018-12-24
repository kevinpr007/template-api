const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const globalErrorFactory = require('../utils/globalErrorFactory')
const { sendConfirmationEmailValidation } = require('../utils/email/mailer')
const setDataFactory = require('../utils/setDataFactory')
const userFactory = require('../utils/userFactory')
const { ROLES } = require('../utils/constant')

//TODO: Add in service
const signUp = async (req, res, next) => {
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

const addRoleToUser = async (req, res, next) => {
	const { userId, role } = req.body

	if (ROLES.includes(role)) {
		let result = await User.findById(userId)
		if (result !== null && result.roles.includes(role) == false) {
			result.roles.push(role)
			result.save()
		}

		const data = setDataFactory('data', userFactory(result))
		res.json(data)
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('This role is not valid'))
	}
}

module.exports = {
	signUp,
	addRoleToUser,
}
