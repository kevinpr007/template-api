let User = require('../models/User')
const userController = require('../controllers/users')

jest.mock('../utils/email/mailer', () => {
	return {
		sendConfirmationEmailValidation: jest.fn().mockReturnValue(true),
	}
})

describe('Controllers/user.js', () => {
	describe('Test User Controller functions', () => {
		beforeEach(() => {
			jest.resetModules()
		})

		test('addRoleToUser', async () => {
			//Setting
			expect.assertions(5)

			jest.spyOn(userController, 'addRoleToUser')

			User.findOne = jest
				.fn()
				.mockResolvedValueOnce({
					roles: ['User'],
					save: jest.fn(),
				})
				.mockResolvedValueOnce(null)
				.mockRejectedValueOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					userId: '12345asdfg',
					role: 'Admin',
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
			await userController.addRoleToUser(req, res, next)
			expect(userController.addRoleToUser).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await userController.addRoleToUser(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			req.body.role = 'Unknown'
			await userController.addRoleToUser(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(2)

			req = ''
			await userController.addRoleToUser(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})

		test('RemoveRoleFromUser', async () => {
			//Setting
			expect.assertions(5)

			jest.spyOn(userController, 'RemoveRoleFromUser')

			User.findOne = jest
				.fn()
				.mockResolvedValueOnce({
					roles: {
						includes: jest.fn().mockReturnValue(() => true),
						pull: jest.fn(),
					},
					save: jest.fn(),
				})
				.mockResolvedValueOnce(null)
				.mockRejectedValueOnce(() => {
					throw Error()
				})

			let req = {
				body: {
					userId: '12345asdfg',
					role: 'Admin',
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
			await userController.RemoveRoleFromUser(req, res, next)
			expect(userController.RemoveRoleFromUser).toHaveBeenCalledTimes(1)
			expect(res.json).toHaveBeenCalledTimes(1)

			await userController.RemoveRoleFromUser(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(1)

			req.body.role = 'Unknown'
			await userController.RemoveRoleFromUser(req, res, next)
			expect(res.status().json).toHaveBeenCalledTimes(2)

			req = ''
			await userController.RemoveRoleFromUser(req, res, next)
			expect(next).toHaveBeenCalledTimes(1)
		})
	})
})
