const jwt = require('jsonwebtoken')
const HttpStatus = require('http-status-codes')
const User = require('../models/User')
const {
	sendResetPasswordEmailValidation,
	sendResetPasswordEmail,
	sendConfirmationEmail,
} = require('../utils/email/mailer')
const globalError = require('../utils/globalError')
const parseErrors = require('../utils/parseErrors')
const setData = require('../utils/composeResponse.js')

const login = async (req, res) => {
	const { credentials } = req.body

	let user = await User.findOne({ email: credentials.email })

	if (user && user.isValidPassword(credentials.password)) {
		res.json(setData({ user: user.toAuthJSON() }))
	} else {
		res.status(HttpStatus.BAD_REQUEST).json(globalError('Invalid credentials'))
	}
}

const confirmation = async (req, res) => {
	const { token } = req.query

	try {
		let user = await User.findOneAndUpdate(
			{ confirmationToken: token },
			{ confirmationToken: '', confirmed: true },
			{ new: true }
		)

		if (user) {
			sendConfirmationEmail(user)
			res.json(setData({ user: user.toAuthJSON() }))
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalError('The confirmation token is not valid'))
		}
	} catch (err) {
		//TODO: Add error object
		res.status(HttpStatus.BAD_REQUEST).json(globalError('Error updating User'))
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
				let updatedUser = await user.save()
				sendResetPasswordEmailValidation(updatedUser)
				res.json()
			} catch (error) {
				res
					.status(HttpStatus.BAD_REQUEST)
					.json(globalError('Error saving User', parseErrors(error.errors)))
			}
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalError('There is no user with this email'))
		}
	} catch (err) {
		//TODO: Add error
	}
}

const validateToken = (req, res) => {
	const { token } = req.body
	jwt.verify(token, process.env.JWT_SECRET, (err) => {
		if (err) {
			res
				.status(HttpStatus.UNAUTHORIZED)
				.json(globalError('The token is not valid'))
		} else {
			res.json()
		}
	})
}

const resetPassword = (req, res) => {
	const { password, token } = req.body.data

	jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
		if (err) {
			res.status(HttpStatus.UNAUTHORIZED).json(globalError('Invalid token'))
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
							let userRecord = await user.save()
							sendResetPasswordEmail(userRecord)
							res.json()
						} catch (error) {
							res
								.status(HttpStatus.BAD_REQUEST)
								.json(
									globalError('Error saving User', parseErrors(error.errors))
								)
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
				} else {
					res
						.status(HttpStatus.NOT_FOUND)
						.json(globalError('User or token not found'))
				}
			} catch (err) {
				//TODO: add error
			}
		}
	})
}

module.exports = {
	login,
	confirmation,
	resetPasswordRequest,
	validateToken,
	resetPassword,
}
