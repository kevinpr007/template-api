const bcrypt = require('bcrypt')
const uuidv1 = require('uuid/v1')
const userFactory = require('../utils/userFactory')
const jwtService = require('../services/jwtService')
const { ERROR_PARAMS_CANT_BE_NULL } = require('../utils/constant')

const generateID = function() {
	return uuidv1()
}

const isValidPassword = async (password, passwordHash) => {
	if (!password) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	if (!passwordHash) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

	return await bcrypt.compare(password, passwordHash)
}

const isPasswordLength = (password = '') => {
	return password.length >= process.env.PASSWORD_LENGTH
}

const setPassword = async (password) => {
	if (!password) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

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
	if (!confirmationToken) {
		throw new Error("confirmationToken can't be null")
	}
	return `${process.env.HOST}:${
		process.env.API_PORT
	}/api/auth/confirmation?token=${confirmationToken}`
}

const generateResetPasswordLink = (user) => {
	if (!user) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}
	return `${process.env.HOST}:${
		process.env.API_PORT
	}/api/auth/reset_password?token=${generateResetPasswordToken(user)}`
}

const generateJWT = (user) => {
	if (!user) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}
	return jwtService.sign(user)
}

const generateResetPasswordToken = (user) => {
	if (!user) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}
	return jwtService.ResetPasswordSign(user)
}

const toAuthJSON = (user) => {
	if (!user) {
		throw new Error(ERROR_PARAMS_CANT_BE_NULL)
	}

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
