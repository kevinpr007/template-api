const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const {
	sendResetPasswordEmailValidation,
	sendResetPasswordEmail,
	sendConfirmationEmail,
} = require('../utils/email/mailer')
const globalErrorFactory = require('../utils/globalErrorFactory')
const parseErrors = require('../utils/parseErrors')
const setResponse = require('../utils/setResponse')
const userFactory = require('../utils/userFactory')
const JWTVariableFactory = require('../utils/JWTVariableFactory')

//TODO: Add Service
const login = async (req, res) => {
	const { credentials } = req.body

	let user = await User.findOne({ email: credentials.email })

	if (user && user.isValidPassword(credentials.password)) {
		res.json(setResponse({ user: user.toAuthJSON() }))
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Invalid credentials'))
	}
}

const confirmation = async (req, res) => {
	const { token } = req.query

	try {
		let user = await User.findOneAndUpdate(
			{ confirmationToken: token },
			{ confirmationToken: '', confirmed: true },
			{ new: true } //TODO: ADD Version
		)

		if (user) {
			sendConfirmationEmail(user)
			res.json(setResponse({ user: user.toAuthJSON() }))
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory('The confirmation token is not valid'))
		}
	} catch (err) {
		next(err)
	}
}

const resetPasswordRequest = async (req, res) => {
	const { email } = req.body

	try {
		let user = await User.findOne({ email: email })
		if (user) {
			user.setResetPassword()
			user.setResetPasswordToken()
			try {
				let updatedUser = await user.save() //TODO: add version
				sendResetPasswordEmailValidation(updatedUser)
				res.json()
			} catch (error) {
				next(error)
			}
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalErrorFactory('There is no user with this email'))
		}
	} catch (err) {
		next(err)
	}
}

const validateToken = (req, res) => {
	const { token } = req.body
	//TODO: Add Service
	jwt.verify(token, process.env.JWT_SECRET, JWTVariableFactory, (err) => {
		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalErrorFactory('The token is not valid', err))
		} else {
			res.json()
		}
	})
}

const resetPassword = (req, res) => {
	const { password, token } = req.body
	//TODO: Add Service
	jwt.verify(token, process.env.JWT_SECRET, JWTVariableFactory, async (err, decoded) => {
		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalErrorFactory('Invalid token', err))
		} else {
			try {
				let user = await User.findOne({
					_id: decoded._id,
					resetPasswordToken: decoded.resetPasswordToken,
				})

				if (user) {
					if (user.isPasswordLength(password)) {
						user.setPassword(password)
						user.resetPasswordToken = ''

						try {
							let userRecord = await user.save() //TODO: Check version update
							sendResetPasswordEmail(userRecord)
							res.json()
						} catch (error) {
							next(error)
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
				} else {
					res
						.status(HttpStatus.NOT_FOUND)
						.json(globalErrorFactory('User or token not found'))
				}
			} catch (err) {
				next(err)
			}
		}
	})
}

const currentUser = (req, res) => {
	res.json(setResponse({ user: userFactory(req.currentUser) }))
}

module.exports = {
	login,
	confirmation,
	resetPasswordRequest,
	validateToken,
	resetPassword,
	currentUser,
}
