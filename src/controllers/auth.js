const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const {
	sendResetPasswordEmailValidation,
	sendResetPasswordEmail,
	sendConfirmationEmail,
} = require('../utils/email/mailer')
const globalErrorFactory = require('../utils/globalErrorFactory')
const userFactory = require('../utils/userFactory')
const setDataFactory = require('../utils/setDataFactory')
const jwtService = require('../services/jwtService')
const {
	ERROR_TOKEN_NOT_VALID,
	ERROR_TOKEN_NOT_FOUND,
	ERROR_USER_NOT_FOUND,
	ERROR_INVALID_TOKEN,
	ERROR_INVALID_CREDENTIAL,
	ERROR_USER_OR_TOKEN_NOT_FOUND,
} = require('../utils/constant')

//TODO: Add Service
const login = async (req, res, next) => {
	try {
		const { credentials } = req.body
		let user = await User.findOne({ email: credentials.email })

		if (user && (await user.isValidPassword(credentials.password))) {
			const data = setDataFactory('data', user.toAuthJSON())
			res.json(data)
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory.factory(ERROR_INVALID_CREDENTIAL))
		}
	} catch (err) {
		next(err)
	}
}

const confirmation = async (req, res, next) => {
	try {
		const { token } = req.query

		let user = await User.findOneAndUpdate(
			{ confirmationToken: token },
			{ confirmationToken: '', confirmed: true },
			{ new: true }
		)

		if (user) {
			sendConfirmationEmail(user)
			const data = setDataFactory('data', user.toAuthJSON())
			res.json(data)
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory.factory(ERROR_TOKEN_NOT_VALID))
		}
	} catch (err) {
		next(err)
	}
}

const resetPasswordRequest = async (req, res, next) => {
	try {
		const { email } = req.body

		let user = await User.findOne({ email: email })
		if (user) {
			user.setResetPassword()
			user.setResetPasswordToken()

			let updatedUser = await user.save()
			sendResetPasswordEmailValidation(updatedUser)
			res.json()
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory.factory(ERROR_USER_NOT_FOUND))
		}
	} catch (err) {
		next(err)
	}
}

const resetPassword = async (req, res, next) => {
	try {
		const { password, token } = req.body
		const [err, decodedToken] = jwtService.verify(token)

		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalErrorFactory.factory(ERROR_INVALID_TOKEN, err))
		} else {
			let user = await User.findOne({
				_id: decodedToken._id,
				resetPasswordToken: decodedToken.resetPasswordToken,
			})

			if (user) {
				if (user.isPasswordLength(password)) {
					await user.setPassword(password)
					user.resetPasswordToken = ''

					let userRecord = await user.save()
					sendResetPasswordEmail(userRecord)
					res.json()
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
			} else {
				res
					.status(HttpStatus.NOT_FOUND)
					.json(globalErrorFactory.factory(ERROR_USER_OR_TOKEN_NOT_FOUND))
			}
		}
	} catch (err) {
		next(err)
	}
}

const validateToken = async (req, res, next) => {
	try {
		const { token } = req.body
		const [err, decodedToken] = jwtService.verify(token)

		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalErrorFactory.factory(ERROR_TOKEN_NOT_VALID, err))
		} else {
			res.json()
		}
	} catch (err) {
		next(err)
	}
}

const currentUser = async (req, res, next) => {
	try {
		const data = setDataFactory('data', userFactory(req.currentUser))
		res.json(data)
	} catch (err) {
		next(err)
	}
}

const RefreshToken = async (req, res, next) => {
	try {
		const { token } = req.body
		const [err, decodedToken] = jwtService.verify(token)

		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalErrorFactory.factory(ERROR_TOKEN_NOT_VALID, err))
		} else if (decodedToken) {
			const decodedRefreshToken = jwtService.sign(decodedToken)
			res.set('X-JWT-Refresh-Token', decodedRefreshToken)
			res.json()
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory.factory(ERROR_TOKEN_NOT_FOUND, err))
		}
	} catch (err) {
		next(err)
	}
}

module.exports = {
	login,
	confirmation,
	resetPasswordRequest,
	validateToken,
	resetPassword,
	currentUser,
	RefreshToken,
}
