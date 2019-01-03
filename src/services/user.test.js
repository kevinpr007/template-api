const bcrypt = require('bcrypt')
const validator = require('validator')
const user = require('./users')
const jwtService = require('../services/jwtService')
const testToken = 'Token-12345'
const userData = 'user'

process.env.HOST = 'http://localhost'
process.env.API_PORT = 3000
process.env.SALT_ROUNDS = 10
process.env.PASSWORD_LENGTH = 6

describe('users.js', () => {
	describe('Test user functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('Is Valid Password', async () => {
			//Settings
			expect.assertions(5)

			const password = '12345'
			const passwordHash = 'f1g37fbjk$&^53bdj'

			//Result Can't be null
			bcrypt.compare = jest.fn(() => true)
			expect(await user.isValidPassword(password, passwordHash)).toBeDefined()

			//Compare true value
			expect(await user.isValidPassword(password, passwordHash)).toBeTruthy()

			//Compare false value
			bcrypt.compare = jest.fn(() => false)
			expect(await user.isValidPassword(password, passwordHash)).toBeFalsy()

			//Required params can't be null
			try {
				await user.isValidPassword(null, passwordHash)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}

			try {
				await user.isValidPassword(password, null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})

		test('Is Password Length', async () => {
			//Settings
			expect.assertions(4)

			//compare min length
			expect(await user.isPasswordLength('1234')).toBeFalsy()
			expect(await user.isPasswordLength('12345')).toBeFalsy()

			//compare equal length
			expect(await user.isPasswordLength('123456')).toBeTruthy()

			//compare max length
			expect(await user.isPasswordLength('1234567')).toBeTruthy()
		})

		test('Set Password', async () => {
			//Settings
			expect.assertions(2)

			const password = '12345678'

			//Test hash
			bcrypt.hash = jest.fn(() => 'asjdhas112(*&(dksfjhskd')
			await user.setPassword(password)
			expect(bcrypt.hash).toBeCalledTimes(1)

			//Result Can't be null
			try {
				await user.setPassword(null)
			} catch (err) {
				expect(err).toBeInstanceOf(Error)
			}
		})

		test('Set Confirmation Token', async () => {
			//Settings
			expect.assertions(2)

			let result = user.setConfirmationToken()

			//Can't be null
			expect(result).toBeDefined()

			//Must be a GUID
			expect(validator.isUUID(result)).toBeTruthy()
		})

		test('Set Reset Password', async () => {
			//Settings
			expect.assertions(2)

			bcrypt.hash = jest.fn(() => 'asjdhas112(*&(dksfjhskd')

			//Can't be null
			let result = await user.setResetPassword()
			expect(result).toBeDefined()

			//Must be called
			expect(bcrypt.hash).toBeCalledTimes(1)
		})

		test('Set Reset Password Token', async () => {
			//Settings
			expect.assertions(2)

			let result = user.setResetPasswordToken()

			//Can't be null
			expect(result).toBeDefined()

			//Must be a GUID
			expect(validator.isUUID(result)).toBeTruthy()
		})

		test('Generate Confirmation Url', async () => {
			//Settings
			expect.assertions(4)

			let confirmationToken = testToken

			//Must be a string
			let result = user.generateConfirmationUrl(confirmationToken)
			expect(result).toBeDefined()

			//Must contain Host
			expect(result).toContain(process.env.HOST)

			//Must contain a port
			expect(result).toContain(process.env.API_PORT)

			//Can't be null
			try {
				user.generateConfirmationUrl(null)
			} catch (error) {
				expect(error).toBeInstanceOf(Error)
			}
		})

		test('Generate Reset Password Link', async () => {
			//Settings
			expect.assertions(4)

			jwtService.ResetPasswordSign = jest.fn(() => testToken)

			//Must be defined
			let result = user.generateResetPasswordLink(userData)

			//Must contain Host
			expect(result).toContain(process.env.HOST)

			//Must contain a port
			expect(result).toContain(process.env.API_PORT)

			//Must be called
			expect(jwtService.ResetPasswordSign).toHaveBeenCalledTimes(1)

			//Can't be null
			try {
				user.generateResetPasswordLink(null)
			} catch (error) {
				expect(error).toBeInstanceOf(Error)
			}
		})

		test('Generate JWT', async () => {
			//Settings
			expect.assertions(2)

			jwtService.sign = jest.fn(() => testToken)
			user.generateJWT(userData)

			//Must be called once
			expect(jwtService.sign).toBeCalledTimes(1)

			//Can't be null
			try {
				user.generateJWT(null)
			} catch (error) {
				expect(error).toBeInstanceOf(Error)
			}
		})

		test('Generate Reset Password Token', async () => {
			//Settings
			expect.assertions(2)

			jwtService.ResetPasswordSign = jest.fn(() => testToken)
			user.generateResetPasswordToken(userData)

			//Must be called once
			expect(jwtService.ResetPasswordSign).toBeCalledTimes(1)

			//Can't be null
			try {
				user.generateResetPasswordToken(null)
			} catch (error) {
				expect(error).toBeInstanceOf(Error)
			}
		})

		test('To Auth JSON', async () => {
			//Settings
			expect.assertions(4)

			jwtService.sign = jest.fn(() => testToken)

			let result = user.toAuthJSON(userData)

			//Must be defined
			expect(result).toBeDefined()

			//Object must contain information
			expect(result.token).toBeDefined()

			//Must be called once
			expect(jwtService.sign).toBeCalledTimes(1)

			//Can't be null
			try {
				user.toAuthJSON(null)
			} catch (error) {
				expect(error).toBeInstanceOf(Error)
			}
		})
	})
})
