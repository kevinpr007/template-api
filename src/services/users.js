const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuidv1 = require('uuid/v1')
const userFactory = require('../utils/userFactory')

const isValidPassword = (password, passwordHash) => {
	return bcrypt.compareSync(password, passwordHash)
}

const isPasswordLength = (password = '') => {
	return password.length >= process.env.PASSWORD_LENGTH
}

const setPassword = (password) => {
	return bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS, 10))
}

const setConfirmationToken = () => {
	return uuidv1()
}

const setResetPassword = () => {
	return setPassword(uuidv1())
}

const setResetPasswordToken = () => {
	return uuidv1()
}

const generateConfirmationUrl = (confirmationToken) => {
	return `${process.env.HOST}:${
		process.env.API_PORT
	}/api/auth/confirmation?token=${confirmationToken}`
}

const generateResetPasswordLink = (user) => {
	return `${process.env.HOST}:${
		process.env.API_PORT
	}/api/auth/reset_password?token=${generateResetPasswordToken(user)}`
}

const generateJWT = (user) => {
	//TODO: Verify this
	return jwt.sign(userFactory(user), process.env.JWT_SECRET, {
		expiresIn: process.env.LOGIN_EXPIRATION_TIME,
	})
}

const generateResetPasswordToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			resetPasswordToken: user.resetPasswordToken,
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.EMAIL_EXPIRATION_TIME }
	)
}

const toAuthJSON = (user) => {
	let object = userFactory(user)
	object.token = generateJWT(user)
	return object
}

module.exports = {
	isValidPassword,
	isPasswordLength,
	setPassword,
	setConfirmationToken,
	setResetPassword,
	setResetPasswordToken,
	generateConfirmationUrl,
	generateResetPasswordLink,
	generateJWT,
	generateResetPasswordToken,
	toAuthJSON,
}
