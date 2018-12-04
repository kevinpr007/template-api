const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uniqueValidator = require('mongoose-unique-validator')
const uuidv1 = require('uuid/v1')
const userFactory = require('../utils/userFactory')

const schema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			lowercase: true,
			index: true,
			unique: true,
		},
		username: {
			type: String,
			required: true,
			index: true,
			unique: true,
		},
		passwordHash: { type: String, required: true },
		confirmed: { type: Boolean, default: false },
		confirmationToken: { type: String, default: '' },
		resetPasswordToken: { type: String, default: '' },
	},
	{ timestamps: true }
)

schema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.isPasswordLength = function isPasswordLength(password = '') {
	return password.length >= process.env.PASSWORD_LENGTH
}

schema.methods.setPassword = function setPassword(password) {
	this.passwordHash = bcrypt.hashSync(
		password,
		parseInt(process.env.SALT_ROUNDS, 10)
	)
}

schema.methods.setConfirmationToken = function setConfirmationToken() {
	this.confirmationToken = uuidv1()
}

schema.methods.setResetPassword = function setResetPassword() {
	this.setPassword(uuidv1())
}

schema.methods.setResetPasswordToken = function setResetPasswordToken() {
	this.resetPasswordToken = uuidv1()
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
	return `${process.env.HOST}:${
		process.env.API_PORT
	}/api/auth/confirmation?token=${this.confirmationToken}`
}

schema.methods.generateResetPasswordLink = function generateResetPasswordLink() {
	return `${process.env.HOST}:${
		process.env.API_PORT
	}/api/auth/reset_password?token=${this.generateResetPasswordToken()}`
}

schema.methods.generateJWT = function generateJWT() {
	return jwt.sign(userFactory(this), process.env.JWT_SECRET, {
		expiresIn: process.env.LOGIN_EXPIRATION_TIME,
	})
}

schema.methods.generateResetPasswordToken = function generateResetPasswordToken() {
	return jwt.sign(
		{
			_id: this._id,
			resetPasswordToken: this.resetPasswordToken,
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.env.EMAIL_EXPIRATION_TIME }
	)
}

schema.methods.toAuthJSON = function toAuthJSON() {
	let object = userFactory(this)
	object.token = this.generateJWT()
	return object
}

schema.plugin(uniqueValidator)

module.exports = mongoose.model('User', schema)
