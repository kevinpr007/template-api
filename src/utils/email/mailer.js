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

function sendEmail(tranport, email) {
	if (process.env.NODE_ENV !== 'Artillery') {
		tranport.sendMailAsync(email)
	}
}

function sendConfirmationEmailValidation(user) {
	const tranport = setup()
	const email = emailFactory.confirmationEmailValidation(user)
	sendEmail(tranport, email)
}

function sendConfirmationEmail(user) {
	const tranport = setup()
	const email = emailFactory.confirmationEmail(user)
	sendEmail(tranport, email)
}

function sendResetPasswordEmailValidation(user) {
	const tranport = setup()
	const email = emailFactory.resetPasswordEmailValidation(user)
	sendEmail(tranport, email)
}

function sendResetPasswordEmail(user) {
	const tranport = setup()
	const email = emailFactory.resetPasswordEmail(user)
	sendEmail(tranport, email)
}

module.exports = {
	sendConfirmationEmailValidation,
	sendConfirmationEmail,
	sendResetPasswordEmailValidation,
	sendResetPasswordEmail,
}
