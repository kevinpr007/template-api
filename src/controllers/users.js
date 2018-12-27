const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const globalErrorFactory = require('../utils/globalErrorFactory')
const { sendConfirmationEmailValidation } = require('../utils/email/mailer')
const setDataFactory = require('../utils/setDataFactory')
const userFactory = require('../utils/userFactory')
const { ROLES } = require('../utils/constant')

//TODO: Add in service
const signUp = async (req, res, next) => {
	const { email, password, username } = req.body
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

	try {
		if (ROLES.includes(role)) {
			let user = await User.findById(userId)
			if (user) {
				if (user !== null && user.roles.includes(role) == false) {
					user.roles.push(role)
					user.save()
				}
				const data = setDataFactory('data', userFactory(user))
				res.json(data)
			} else {
				res
					.status(HttpStatus.NOT_FOUND)
					.json(globalErrorFactory('User not found'))
			}
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory('This role is not valid'))
		}
	} catch (err) {
		next(err)
	}
}

const RemoveRoleFromUser = async (req, res, next) => {
	const { userId, role } = req.body

	try {
		if (ROLES.includes(role)) {
			let user = await User.findById(userId)
			if (user) {
				if (user.roles.includes(role)) {
					user.roles.pull(role)
					user.save()
				}
				const data = setDataFactory('data', userFactory(user))
				res.json(data)
			} else {
				res
					.status(HttpStatus.NOT_FOUND)
					.json(globalErrorFactory('User not found'))
			}
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory('This role is not valid'))
		}
	} catch (err) {
		next(err)
	}
}

module.exports = {
	signUp,
	addRoleToUser,
	RemoveRoleFromUser,
}
