const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const globalErrorFactory = require('../utils/globalErrorFactory')
const { sendConfirmationEmailValidation } = require('../utils/email/mailer')
const setDataFactory = require('../utils/setDataFactory')
const userFactory = require('../utils/userFactory')
const {
	ROLES,
	ERROR_USER_NOT_FOUND,
	ERROR_ROLE_NOT_VALID,
} = require('../utils/constant')

const signUp = async (req, res, next) => {
	try {
		const { email, password, username } = req.body
		const user = new User({ email, username })

		if (user.isPasswordLength(password)) {
			await user.setPassword(password)
			user.setConfirmationToken()

			let userRecord = await user.save()
			sendConfirmationEmailValidation(userRecord)
			const data = setDataFactory('data', userRecord.toAuthJSON())
			res.json(data)
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(
					globalErrorFactory.factory(
						`You have entered less than ${
							process.env.PASSWORD_LENGTH
						} characters for password`
					)
				)
		}
	} catch (err) {
		next(err)
	}
}

const addRoleToUser = async (req, res, next) => {
	try {
		const { userId, role } = req.body

		if (ROLES.includes(role)) {
			let user = await User.findById(userId)
			if (user) {
				if (user !== null && user.roles.includes(role) == false) {
					user.roles.push(role)
					user.save()
				}
				const data = setDataFactory('data', user.toAuthJSON())
				res.json(data)
			} else {
				res
					.status(HttpStatus.NOT_FOUND)
					.json(globalErrorFactory.factory(ERROR_USER_NOT_FOUND))
			}
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory.factory(ERROR_ROLE_NOT_VALID))
		}
	} catch (err) {
		next(err)
	}
}

const RemoveRoleFromUser = async (req, res, next) => {
	try {
		const { userId, role } = req.body

		if (ROLES.includes(role)) {
			let user = await User.findById(userId)
			if (user) {
				if (user.roles.includes(role)) {
					user.roles.pull(role)
					user.save()
				}
				const data = setDataFactory('data', user.toAuthJSON())
				res.json(data)
			} else {
				res
					.status(HttpStatus.NOT_FOUND)
					.json(globalErrorFactory.factory(ERROR_USER_NOT_FOUND))
			}
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory.factory(ERROR_ROLE_NOT_VALID))
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
