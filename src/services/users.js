const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')
const userFactory = require('../utils/userFactory')
const jwtService = require('../services/jwtService')

const generateID = function() {
	return uuidv1()
}

const isValidPassword = async (password, passwordHash) => {
	return await bcrypt.compare(password, passwordHash)
}

const isPasswordLength = (password = '') => {
	return password.length >= process.env.PASSWORD_LENGTH
}

const setPassword = async (password) => {
	return await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
}

const setConfirmationToken = () => {
	return generateID()
}

const setResetPassword = () => {
	return setPassword(generateID())
}

const setResetPasswordToken = () => {
	return generateID()
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
	return jwtService.sign(user)
}

const generateResetPasswordToken = (user) => {
	return jwtService.ResetPasswordSign(user)
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
