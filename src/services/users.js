const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuidv1 = require('uuid/v1')
const userFactory = require('../utils/userFactory')
const signJWT = require('../utils/signJWT')

const generateID = function() {
	return uuidv1()
}

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
	return jwt.sign(userFactory(user), process.env.JWT_SECRET, signJWT)

	// | code | name            | description                                                                                                                                                                                                                                                                                                        |   |   |
	// |------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
	// | iss  | Issuer          | Identifies principal that issued the JWT.                                                                                                                                                                                                                                                                          |   |   |
	// | sub  | Subject         | Identifies the subject of the JWT.                                                                                                                                                                                                                                                                                 |   |   |
	// | aud  | Audience        | Identifies the recipients that the JWT is intended for. Each principal intended to process the JWT must identify itself with a value in the audience claim. If the principal processing the claim does not identify itself with a value in the aud claim when this claim is present, then the JWT must be rejected |   |   |
	// | exp  | Expiration time | Identifies the expiration time on or after which the JWT must not be accepted for processing. The value should be in NumericDate[10] format.                                                                                                                                                                       |   |   |
	// | nbf  | Not before      | Identifies the time on which the JWT will start to be accepted for processing.                                                                                                                                                                                                                                     |   |   |
	// | iat  | Issued at       | Identifies the time at which the JWT was issued.                                                                                                                                                                                                                                                                   |   |   |
	// | jti  | JWT ID          | Case sensitive unique identifier of the token even among different issuers.                     																																																					 |   |   |
	// |------|-----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---|---|
}

const generateResetPasswordToken = (user) => {
	return jwt.sign(
		{
			_id: user._id,
			resetPasswordToken: user.resetPasswordToken,
		},
		process.env.JWT_SECRET,
		Object.assign(signJWT, { expiresIn: process.env.JWT_EMAIL_EXPIRATION_TIME })
	)
}

//TODO: Fix this function
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
