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

const login = (req, res) => {
	const { credentials } = req.body

	//TODO: Async Away
	User.findOne({ email: credentials.email }).then((user) => {
		if (user && user.isValidPassword(credentials.password)) {
			//TODO:Add data object
			res.json({ user: user.toAuthJSON() })
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalError('Invalid credentials'))
		}
	})
}

const confirmation = (req, res) => {
	const { token } = req.query

	User.findOneAndUpdate(
		{ confirmationToken: token },
		{ confirmationToken: '', confirmed: true },
		{ new: true }
	) //TODO: Async Away
		.then((user) => {
			if (user) {
				sendConfirmationEmail(user)
				res.json({ user: user.toAuthJSON() })
			} else {
				res
					.status(HttpStatus.BAD_REQUEST)
					.json(globalError('The confirmation token is not valid'))
			}
		})
		.catch((err) =>
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalError('Error updating User'))
		)
}

const resetPasswordRequest = (req, res) => {
	const { email } = req.body
	//TODO: Async Away
	User.findOne({ email: email }).then((user) => {
		if (user) {
			user.setResetPassword()
			user.setResetPasswordToken()
			user
				.save()
				.then((updatedUser) => {
					sendResetPasswordEmailValidation(updatedUser)
					res.json()
				})
				.catch((err) =>
					res
						.status(HttpStatus.BAD_REQUEST)
						.json(globalError('Error saving User', parseErrors(err.errors)))
				)
		} else {
			res
				.status(HttpStatus.BAD_REQUEST)
				.json(globalError('There is no user with this email'))
		}
	})
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

	jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
		if (err) {
			res.status(HttpStatus.UNAUTHORIZED).json(globalError('Invalid token'))
		} else {
			User.findOne({
				_id: decoded._id,
				resetPasswordToken: decoded.resetPasswordToken,
			}).then((user) => {
				//TODO: Async Away
				if (user) {
					if (user.isPasswordLength(password)) {
						user.setPassword(password)
						user.resetPasswordToken = ''
						user
							.save()
							.then((userRecord) => {
								sendResetPasswordEmail(userRecord)
								res.json()
							})
							.catch((err) =>
								res
									.status(HttpStatus.BAD_REQUEST)
									.json(
										globalError('Error saving User', parseErrors(err.errors))
									)
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
				} else {
					res
						.status(HttpStatus.NOT_FOUND)
						.json(globalError('User or token not found'))
				}
			})
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
