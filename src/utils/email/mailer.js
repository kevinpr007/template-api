const nodemailer = require('nodemailer')
const Promise = require('bluebird')
const emailFactory = require('./emailFactory')

function setup() {
	return Promise.promisifyAll(
		nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS,
			},
		})
	)
}

function sendConfirmationEmailValidation(user) {
	const tranport = setup()
	const email = emailFactory.confirmationEmailValidation(user)
	tranport.sendMailAsync(email)
}

function sendConfirmationEmail(user) {
	const tranport = setup()
	const email = emailFactory.confirmationEmail(user)
	tranport.sendMailAsync(email)
}

function sendResetPasswordEmailValidation(user) {
	const tranport = setup()
	const email = emailFactory.resetPasswordEmailValidation(user)
	tranport.sendMailAsync(email)
}

function sendResetPasswordEmail(user) {
	const tranport = setup()
	const email = emailFactory.resetPasswordEmail(user)
	tranport.sendMailAsync(email)
}

module.exports = {
	sendConfirmationEmailValidation,
	sendConfirmationEmail,
	sendResetPasswordEmailValidation,
	sendResetPasswordEmail,
}
