const authController = require('./auth')
const User = require('../models/User')
const jwtService = require('../services/jwtService')

jest.mock('../utils/email/mailer', () => {
	return {
		sendResetPasswordEmailValidation: jest.fn().mockReturnValue(true),
		sendResetPasswordEmail: jest.fn().mockReturnValue(true),
		sendConfirmationEmail: jest.fn().mockReturnValue(true),
	}
})

describe('Controllers/auth.js', () => {
	describe('Test Auth Controller functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('login', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(authController, 'login')

			User.findOne = jest
				.fn()
				.mockResolvedValueOnce({
					isValidPassword: jest.fn().mockResolvedValue({}),
					toAuthJSON: jest.fn().mockReturnValue('Test'),
				})
				.mockResolvedValueOnce(null)
				.mockRejectedValueOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					credentials: {
						email: 'email@email.com',
						password: '12345',
					},
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await authController.login(req, res, next)

			//Start Test
			expect(authController.login).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await authController.login(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await authController.login(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('confirmation', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(authController, 'confirmation')

			User.findOneAndUpdate = jest
				.fn()
				.mockResolvedValueOnce({
					toAuthJSON: jest.fn().mockReturnValue('Test'),
				})
				.mockResolvedValueOnce(null)
				.mockRejectedValueOnce(() => {
					throw Error()
				})

			let req = {
				query: {
					token: 'Token-12345',
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await authController.confirmation(req, res, next)

			//Start Test
			expect(authController.confirmation).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await authController.confirmation(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await authController.confirmation(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('resetPasswordRequest', async () => {
			//Setting
			expect.assertions(4)

			jest.spyOn(authController, 'resetPasswordRequest')

			User.findOne = jest
				.fn()
				.mockResolvedValueOnce({
					setResetPassword: jest.fn().mockReturnValue(true),
					setResetPasswordToken: jest.fn().mockReturnValue(true),
					save: jest.fn().mockReturnValue(true),
				})
				.mockResolvedValueOnce(null)
				.mockRejectedValueOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					email: 'email@email.com',
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			await authController.resetPasswordRequest(req, res, next)

			//Start Test
			expect(authController.resetPasswordRequest).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await authController.resetPasswordRequest(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await authController.resetPasswordRequest(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('resetPassword', async () => {
			//Setting
			expect.assertions(7)

			jwtService.verify = jest
				.fn()
				.mockReturnValueOnce([Error(), null])
				.mockReturnValue([
					null,
					{ _id: 123456789, resetPasswordToken: 987654321 },
				])
			jest.spyOn(authController, 'resetPassword')

			User.findOne = jest
				.fn()
				.mockResolvedValueOnce({
					isPasswordLength: jest.fn().mockReturnValue(true),
					setPassword: jest.fn().mockReturnValue(true),
					save: jest.fn().mockReturnValue(true),
				})
				.mockResolvedValueOnce({
					isPasswordLength: jest.fn().mockReturnValue(false),
				})
				.mockResolvedValueOnce(null)
				.mockRejectedValueOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					password: '12345',
					token: 'Token-12345',
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			//Start Test
			await authController.resetPassword(req, res, next)
			expect(authController.resetPassword).toHaveBeenCalledTimes(1)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await authController.resetPassword(req, res, next)
			expect(authController.resetPassword).toHaveBeenCalledTimes(2)
			expect(res.json).toHaveBeenCalledTimes(1)

			await authController.resetPassword(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(2)

			await authController.resetPassword(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(3)

			await authController.resetPassword(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('validateToken', async () => {
			//Setting
			expect.assertions(5)

			jwtService.verify = jest
				.fn()
				.mockReturnValueOnce([Error(), null])
				.mockReturnValue([
					null,
					{ _id: 123456789, resetPasswordToken: 987654321 },
				])
			jest.spyOn(authController, 'validateToken')

			let req = {
				body: {
					token: 'Token-12345',
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			//Start Test
			await authController.validateToken(req, res, next)
			expect(authController.validateToken).toHaveBeenCalledTimes(1)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await authController.validateToken(req, res, next)
			expect(authController.validateToken).toHaveBeenCalledTimes(2)
			expect(res.json).toHaveBeenCalledTimes(1)

			req = null
			await authController.validateToken(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('currentUser', async () => {
			//Setting
			expect.assertions(3)

			jest.spyOn(authController, 'currentUser')

			let req = {
				currentUser: {
					_id: '123456789',
					email: 'email@email.com',
				},
			}

			let res = {
				json: jest.fn().mockReturnValue({}),
			}

			let next = jest.fn(() => {})

			//Start Test
			await authController.currentUser(req, res, next)
			expect(authController.currentUser).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			res = null
			await authController.currentUser(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('RefreshToken', async () => {
			//Setting
			expect.assertions(7)

			jwtService.verify = jest
				.fn()
				.mockReturnValueOnce([Error(), null])
				.mockReturnValueOnce([
					null,
					{ _id: 123456789, resetPasswordToken: 987654321 },
				])
				.mockReturnValueOnce([null, null])

			jwtService.sign = jest.fn().mockReturnValue({ newToken: 12345 })

			jest.spyOn(authController, 'RefreshToken')

			let req = {
				body: {
					token: 'Token-12345',
				},
			}

			let res = {
				status: jest.fn().mockReturnValue({
					json: jest.fn(),
				}),
				json: jest.fn().mockReturnValue({}),
				set: jest.fn(),
			}

			let next = jest.fn(() => {})

			//Start Test
			await authController.RefreshToken(req, res, next)
			expect(authController.RefreshToken).toHaveBeenCalledTimes(1)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			await authController.RefreshToken(req, res, next)
			expect(authController.RefreshToken).toHaveBeenCalledTimes(2)
			expect(res.json).toHaveBeenCalledTimes(1)

			await authController.RefreshToken(req, res, next)
			expect(authController.RefreshToken).toHaveBeenCalledTimes(3)
			expect(res.status().json).toHaveBeenCalledTimes(2)

			req = null
			await authController.RefreshToken(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})
	})
})
