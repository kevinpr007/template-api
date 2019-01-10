require('dotenv').config()

const userTest = {
	email: 'test@test.com',
}
const emailTest = 'email@email.com'

const nodemailer = require('nodemailer')
nodemailer.createTransport = jest.fn().mockReturnValue({
	sendMailAsync: jest.fn(),
})

const emailFactory = require('./emailFactory')
emailFactory.confirmationEmailValidation = jest.fn().mockReturnValue(emailTest)
emailFactory.sendConfirmationEmail = jest.fn().mockReturnValue(emailTest)
emailFactory.resetPasswordEmailValidation = jest.fn().mockReturnValue(emailTest)
emailFactory.resetPasswordEmail = jest.fn().mockReturnValue(emailTest)

const mailer = require('./mailer')

describe('mailer.js', () => {
	describe('Test Mailer functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('sendConfirmationEmailValidation', async () => {
			//Setting
			expect.assertions(1)
			jest.spyOn(mailer, 'sendConfirmationEmailValidation')

			//Check Response
			mailer.sendConfirmationEmailValidation(userTest)
			expect(mailer.sendConfirmationEmailValidation).toHaveBeenCalledTimes(1)
		})

		test('sendConfirmationEmail', async () => {
			//Setting
			expect.assertions(1)
			jest.spyOn(mailer, 'sendConfirmationEmail')

			//Check Response
			mailer.sendConfirmationEmail(userTest)
			expect(mailer.sendConfirmationEmail).toHaveBeenCalledTimes(1)
		})

		test('sendResetPasswordEmailValidation', async () => {
			//Setting
			expect.assertions(1)
			jest.spyOn(mailer, 'sendResetPasswordEmailValidation')

			//Check Response
			mailer.sendResetPasswordEmailValidation(userTest)
			expect(mailer.sendResetPasswordEmailValidation).toHaveBeenCalledTimes(1)
		})

		test('sendResetPasswordEmail', async () => {
			//Setting
			expect.assertions(1)
			jest.spyOn(mailer, 'sendResetPasswordEmail')

			//Check Response
			mailer.sendResetPasswordEmail(userTest)
			expect(mailer.sendResetPasswordEmail).toHaveBeenCalledTimes(1)
		})
	})
})
