const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const userService = require('../services/users')
const timestampPlugin = require('./plugins/timestamp')
const { ROLES, USER } = require('../utils/constant.js')

let schema = new mongoose.Schema(
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
			lowercase: true,
			index: true,
			unique: true,
		},
		roles: [
			{
				type: String,
				enum: ROLES,
				default: USER,
			},
		],
		passwordHash: { type: String, required: true },
		confirmed: { type: Boolean, default: false },
		confirmationToken: { type: String, default: '' },
		resetPasswordToken: { type: String, default: '' },
	},
	{ timestamps: true }
)

schema.plugin(timestampPlugin)

schema.methods.isValidPassword = async function(password) {
	return await userService.isValidPassword(password, this.passwordHash)
}
schema.methods.isPasswordLength = function(password) {
	return userService.isPasswordLength(password)
}
schema.methods.setPassword = async function(password) {
	this.passwordHash = await userService.setPassword(password)
}
schema.methods.setConfirmationToken = function() {
	this.confirmationToken = userService.setConfirmationToken()
}
schema.methods.setResetPassword = async function() {
	this.passwordHash = await userService.setResetPassword()
}
schema.methods.setResetPasswordToken = function() {
	this.resetPasswordToken = userService.setResetPasswordToken()
}
schema.methods.generateConfirmationUrl = function() {
	return userService.generateConfirmationUrl(this.confirmationToken)
}
schema.methods.generateResetPasswordLink = function() {
	return userService.generateResetPasswordLink(this)
}
schema.methods.generateJWT = function() {
	return userService.generateJWT(this)
}
schema.methods.generateResetPasswordToken = function() {
	return userService.generateResetPasswordToken(this)
}
schema.methods.toAuthJSON = function() {
	return userService.toAuthJSON(this)
}

schema.pre('save', function(next) {
	if (this.roles.length == 0) this.roles.push(USER)
	next()
})

schema.plugin(uniqueValidator)

module.exports = mongoose.models.User || mongoose.model('User', schema)
