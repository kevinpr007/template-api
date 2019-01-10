require('dotenv').config()

const emailFactory = require('./emailFactory')
const userTest = {
	email: 'test@test.com',
	generateConfirmationUrl: jest.fn(),
	generateResetPasswordLink: jest.fn(),
}

describe('emailFactory.js', () => {
	describe('Test Email Factory functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('confirmationEmailValidation', async () => {
			//Setting
			expect.assertions(2)
			jest.spyOn(emailFactory, 'confirmationEmailValidation')

			//Check Response
			let result = emailFactory.confirmationEmailValidation(userTest)
			expect(result).toBeDefined()
			expect(emailFactory.confirmationEmailValidation).toHaveBeenCalledTimes(1)
		})

		test('confirmationEmail', async () => {
			//Setting
			expect.assertions(2)
			jest.spyOn(emailFactory, 'confirmationEmail')

			//Check Response
			let result = emailFactory.confirmationEmail(userTest)
			expect(result).toBeDefined()
			expect(emailFactory.confirmationEmail).toHaveBeenCalledTimes(1)
		})

		test('resetPasswordEmailValidation', async () => {
			//Setting
			expect.assertions(2)
			jest.spyOn(emailFactory, 'resetPasswordEmailValidation')

			//Check Response
			let result = emailFactory.resetPasswordEmailValidation(userTest)
			expect(result).toBeDefined()
			expect(emailFactory.resetPasswordEmailValidation).toHaveBeenCalledTimes(1)
		})

		test('resetPasswordEmail', async () => {
			//Setting
			expect.assertions(2)
			jest.spyOn(emailFactory, 'resetPasswordEmail')

			//Check Response
			let result = emailFactory.resetPasswordEmail(userTest)
			expect(result).toBeDefined()
			expect(emailFactory.resetPasswordEmail).toHaveBeenCalledTimes(1)
		})
	})
})
