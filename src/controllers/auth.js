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

//TODO: Add Service
const login = async (req, res) => {
	const { credentials } = req.body

	let user = await User.findOne({ email: credentials.email })

	if (user && user.isValidPassword(credentials.password)) {
		const data = setDataFactory('data', user.toAuthJSON())
		res.json(data)
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Invalid credentials'))
	}
}

const confirmation = async (req, res, next) => {
	const { token } = req.query

	try {
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
				.json(globalErrorFactory('The confirmation token is not valid'))
		}
	} catch (err) {
		next(err)
	}
}

const resetPasswordRequest = async (req, res, next) => {
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

const resetPassword = async (req, res, next) => {
	const { password, token } = req.body
	const [err, decodedToken] = jwtService.verify(token)

	if (err) {
		res
			.status(HttpStatus.UNAUTHORIZED)
			.json(globalErrorFactory('Invalid token', err))
	} else {
		try {
			let user = await User.findOne({
				_id: decodedToken._id,
				resetPasswordToken: decodedToken.resetPasswordToken,
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
}

const validateToken = (req, res) => {
	const { token } = req.body
	const [err, decodedToken] = jwtService.verify(token)

	if (err) {
		res
			.status(HttpStatus.UNAUTHORIZED)
			.json(globalErrorFactory('The token is not valid', err))
	} else {
		res.json()
	}
}

const currentUser = (req, res) => {
	const data = setDataFactory('data', userFactory(req.currentUser))
	res.json(data)
}

const RefreshToken = (req, res) => {
	const { token } = req.body
	const [err, decodedToken] = jwtService.verify(token)

	if (err) {
		res
			.status(HttpStatus.UNAUTHORIZED)
			.json(globalErrorFactory('The token is not valid', err))
	} else if (decodedToken) {
		const decodedRefreshToken = jwtService.sign(decodedToken)
		res.set('X-JWTRefresh-Token', decodedRefreshToken)
		res.json()
	} else {
		res
			.status(HttpStatus.BAD_REQUEST)
			.json(globalErrorFactory('Token not found', err))
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
