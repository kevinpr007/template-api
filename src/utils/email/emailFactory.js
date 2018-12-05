const from = `"${process.env.APP_NAME}" <${process.env.EMAIL_APP}>`

function confirmationEmailValidation(user) {
	return {
		from,
		to: user.email,
		subject: 'Welcome to Template-API',
		text: `
    Welcome to Template-API. Please, confirm your email.
    ${user.generateConfirmationUrl()}
    `,
	}
}

function confirmationEmail(user) {
	return {
		from,
		to: user.email,
		subject: `${process.env.APP_NAME} - Confirmation Email`,
		text: `Welcome to ${
			process.env.APP_NAME
		}. Your email has been confirmed. Thank you.`,
	}
}

function resetPasswordEmailValidation(user) {
	return {
		from,
		to: user.email,
		subject: `${process.env.APP_NAME} - Reset Password`,
		text: `
    To reset password follow this link
    ${user.generateResetPasswordLink()}
    `,
	}
}

function resetPasswordEmail(user) {
	return {
		from,
		to: user.email,
		subject: `${process.env.APP_NAME} - Reset Password Confirmation`,
		text: `Your password has been reset. Thank you for use ${process.env.APP_NAME}`,
	}
}

module.exports = {
	confirmationEmailValidation,
	confirmationEmail,
	resetPasswordEmailValidation,
	resetPasswordEmail
}
